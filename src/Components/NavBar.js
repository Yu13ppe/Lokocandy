import React, { useState, useEffect } from 'react'
import LokoC from '../Assets/Images/Loko-C.png'
import { IoCartOutline, IoSearch, IoCloseOutline } from "react-icons/io5";
import { useDataContext } from '../Context/dataContext'
import { SideBar } from './SideBar';
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Modal, ModalBody, ModalFooter, ModalHeader, Button, Table } from 'reactstrap';

function NavBar() {
  const { search, setSearch, cart, setCart } = useDataContext();
  const [clear, setClear] = useState(true);
  const [count, setCount] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [modalCart, setModalCart] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const toggleModal = () => setModalCart(!modalCart);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // const handleCount = () => {
  // }

  useEffect(() => {
    if (cart && cart.length > 0) {
      setCount(false);
    } else {
      setCount(true);
    }
  }, [cart]);

  function deleteFromCart(productToDelete) {
    // Obtener el carrito actual del estado
    let currentCart = [...cart];

    // Encontrar el índice del producto en el carrito
    const productIndex = currentCart.findIndex(item => item.prod_id === productToDelete.prod_id);

    if (productIndex !== -1) {
      // Si el producto existe, eliminarlo del carrito
      currentCart.splice(productIndex, 1);

      // Usar setCart para actualizar el estado del carrito
      setCart(currentCart);
    }
  }

  return (
    <div className='NavBar'>
      <div className='NavBar-Items'>

        <div className='NavBar-Logo' onClick={showSidebar}>
          <img
            src={LokoC}
            alt='LokoCandy'
            className='NavBar-Logo-Image'
          />
        </div>

        <Offcanvas isOpen={sidebar} toggle={() => setSidebar(showSidebar)}>
          <OffcanvasHeader toggle={() => showSidebar()}>
            lokocandy
          </OffcanvasHeader>
          <OffcanvasBody>
            <SideBar />
          </OffcanvasBody>
        </Offcanvas>

        <div className='NavBar-Search'>
          <div className='NavBar-Search-Header'>
            <i
              className="search-bar-clear"
              hidden={clear}
              onClick={() => {
                setSearch('');
                setClear(true);
              }}
            >
              <IoCloseOutline />
            </i>
            <input
              className='Search-Bar'
              type='text'
              placeholder='Buscar productos'
              value={search}
              onChange={
                (e) => {
                  if (e.target.value === '') {
                    setClear(true)
                  } else {
                    setClear(false)
                  }
                  handleSearch(e)
                }
              }
            />
            <i className='Search-Icon'>
              <IoSearch />
            </i>
          </div>
        </div>

        <div className='NavBar-Checkout'>
          <div className='NavBar-Checkout-Text'>
            Haga su pedido
          </div>
          <div className='NavBar-Checkout-Button' onClick={toggleModal}>
            <i className='NavBar-Checkout-Cart-Icon'>
              <div hidden={count} className='NavBar-Checkout-Cart-Icon-Count'>
                {cart.length}
              </div>
              <IoCartOutline size={20} />
            </i>
          </div>
        </div>

        <Modal isOpen={modalCart} toggle={toggleModal} centered fullscreen={window.innerWidth <= 760 && true}>
          <ModalHeader >
            <h2> <IoCartOutline size={40} /> Carrito de productos</h2>
          </ModalHeader>
          <ModalBody className='ModalBody d-flex'>
            <Table className='tableView' responsive borderless hover striped style={{ width: '100%', flex: '1.2' }}>
              <div>
                {/* <div className="products-header">
                  <div className="product-cell image">
                    Producto
                  </div>
                  <div className="product-cell category">Cantidad</div>
                  <div className="product-cell price">Precio</div>
                  <div className="product-cell price">Total</div>
                  <div className="product-cell status-cell">Eliminar</div>
                </div> */}

                <thead style={{ width: '100%' }}>
                  <tr className='d-flex'>
                    <th style={{ width: '100%', maxWidth: '80px' }} className='product-cell'>
                      Producto
                    </th>
                    <th style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>
                      Cantidad
                    </th>
                    <th style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>
                      Precio
                    </th>
                    <th style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>
                      Total
                    </th>
                    <th style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>
                      Eliminar
                    </th>
                  </tr>
                </thead>

                {cart.map((product, index) => (
                  <tr key={index} style={{ width: '100%', marginLeft: '5px' }} className='d-flex'>
                    <td style={{ width: '100%', maxWidth: '80px' }} className='product-cell'>
                      <img src={product.prod_img !== '' ? `https://lokocandy.up.railway.app/products/image/${product.prod_img}` : LokoLogo} style={{ padding: '0', width: '20px', objectFit: 'fill' }} alt={product.prod_name} />
                      <span>{product.prod_name}</span>
                    </td>
                    <td style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>{product.quantity}</td>
                    <td style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>${product.prod_price}</td>
                    <td style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>${(product.prod_price * product.quantity).toFixed(2)}</td>
                    <td style={{ width: '100%', justifyContent: 'center', maxWidth: '70px' }} className='product-cell'>
                      <Button onClick={() => deleteFromCart(product)} style={{ maxWidth: '70px' }} size="sm" outline color='danger'>X</Button>                      </td>
                  </tr>
                ))}
                <hr style={{ marginBottom: '-2px' }} />
                <tr style={{ width: '100%', marginLeft: '5px' }} className='d-flex'>
                  <td style={{ justifyContent: 'flex-end', fontSize: '15px' }} className='product-cell'>Total: ${cart.reduce((acc, product) => acc + product.prod_price * product.quantity, 0).toFixed(2)}</td>
                </tr>
              </div>
            </Table>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-secondary' onClick={toggleModal}>Volver</button>
            <a href={`https://api.whatsapp.com/send?phone=584126131828&text=${'Hola 🥰, me gustaría realizar un pedido con los siguientes productos:%0A' + cart.map((product) => '%0A' + product.quantity + `%20-%20` + product.prod_name + `%20($` + product.prod_price + `)%20........%20$` + (product.prod_price * product.quantity).toFixed(2)) + '%0A%0ATotal:%20$' + cart.reduce((acc, product) => acc + product.prod_price * product.quantity, 0).toFixed(2)}`}>
              <button className='btn btn-success'>Realizar Pedido</button>
            </a>
          </ModalFooter>
        </Modal>


      </div>
    </div>
  )
}

export { NavBar }