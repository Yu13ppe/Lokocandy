import React, { useState, useEffect } from 'react'
import { NavBar } from './NavBar'
import { SideBar } from './SideBar'
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import LokoC from '../Assets/Images/Loko-C.png'
import { Card, CardBody, CardSubtitle, CardFooter, Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'

function Main() {
  const { filteredSearch } = useDataContext();
  const [isLoading, setIsLoading] = useState(true);
  const [selectProduct, setSelectProduct] = useState(null);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (filteredSearch.length > 0) {
      setIsLoading(false);
    }
  }, [filteredSearch]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  }

  return (
    <div className='Content'>
      <SideBar />
      <div className='list-product scrollbar'>
        <NavBar />
        <div className="cards row m-4">
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh' }}>
              <img src={LokoC} alt="Loading..." style={{ animation: 'fade 1s infinite' }} />
            </div>
          ) : (
            filteredSearch.filter(prod => prod.prod_status === 'Activo').map(product => (
              <Col className="col" key={product.prod_id}>
                <Card className='card mt-2 mb-2' style={{ borderRadius: '10px', cursor: 'pointer' }} onClick={() => {
                  setSelectProduct(product);
                  setModal(!modal);
                }}>
                  <CardBody className='text-center'>
                    <img src={product.prod_img !== '' ? `https://lokocandy.up.railway.app/products/image/${product.prod_img}` : LokoLogo} style={{ borderRadius: '10px', objectFit: 'cover' }} width={200} height={200} alt={product.prod_name} />
                  </CardBody>
                  <CardFooter className='card-footer'>
                    <h5 style={{ color: '#212121', fontWeight: '700' }}>{product.prod_name}</h5>
                    <CardSubtitle style={{ color: '#454545', fontSize: '12px' }}>
                      {product.prod_desc ? truncateText(product.prod_desc, 18) : '...'}
                    </CardSubtitle>
                    <CardSubtitle style={{ color: '#426B1F', fontWeight: '500', fontSize: '20px' }}>
                      ${product.prod_price}
                    </CardSubtitle>
                  </CardFooter>
                </Card>

                <Modal isOpen={modal} toggle={toggle} centered size='xl'>
                  <ModalHeader toggle={toggle}>
                    <h2>{selectProduct ? selectProduct.prod_name : 'Producto'}</h2>
                  </ModalHeader>
                  <ModalBody className='ModalBody d-flex'>
                    <div className='ModalBody-image'>
                      <img src={selectProduct && selectProduct.prod_img !== '' ? `https://lokocandy.up.railway.app/products/image/${selectProduct.prod_img}` : LokoLogo} className='image' style={{
                        borderRadius: '10px',
                        objectFit: 'cover',
                      }}
                        width={150} height={150}
                        alt={selectProduct ? selectProduct.prod_name : 'Producto'} />
                    </div>
                    <div style={{ marginLeft: '10px', width: '100%' }} className='ModalBody-Price-Desc'>
                      <h3 style={{ color: '#426B1F', fontWeight: '500', fontSize: '25px' }} className='ModalBody-Price'>${selectProduct ? selectProduct.prod_price : 'Precio'}</h3>
                      <p style={{ color: '#454545', fontSize: '14px' }} className='ModalBody-Desc'>{selectProduct ? truncateText(selectProduct.prod_desc, 30) : '...'}</p>

                      <div className='d-flex' >
                        <p style={{ color: '#212121', fontSize: '14px', width: '100%' }} className='ModalBody-Desc'>Total:</p>
                        <p style={{ color: '#212121', fontSize: '14px', justifyContent: 'flex-end' }} className='ModalBody-Desc'>{selectProduct ? selectProduct.prod_price * quantity : 0}</p>
                      </div>

                      <hr style={{ padding: '0 1px', marginBottom: '10px', marginTop: '0' }} />

                      <div className='d-flex'>
                        <p style={{ color: '#454545', fontSize: '14px', width: '100%' }} className='ModalBody-Desc'>Cantidad:</p>
                        <button style={{ borderRadius: '5px', backgroundColor: '#ababab', marginRight: '5px', width: '35px', height: '25px', boxShadow: 'none', border: 'none' }} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                        <p style={{ color: '#212121', fontSize: '14px', justifyContent: 'flex-end' }} className='ModalBody-Desc'>{quantity}</p>
                        <button style={{ borderRadius: '5px', backgroundColor: '#ababab', marginLeft: '5px', width: '35px', height: '25px', boxShadow: 'none', border: 'none' }} onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className='ModalBody-Total-Agg'>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button className='btn btn-secondary' onClick={toggle}>Volver</button>
                    <button className='btn btn-success' onClick={toggle}>Agregar a Carrito</button>
                  </ModalFooter>
                </Modal>

              </Col>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export { Main }