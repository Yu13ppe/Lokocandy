import React, { useCallback, useEffect, useState } from 'react'
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import { useDataContext } from '../Context/dataContext'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Card, Col, CardBody, CardFooter, CardSubtitle } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { IoMdExit, IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { clearLocalStorage } from '../Hooks/useLocalStorage'

function Dashboard() {
  const { url, fetchProducts, fetchCategories, fetchBrands, access_token, logged, filteredSearch, search, setSearch, categoriesList, brandsList } = useDataContext();
  const [user, setUser] = useState({});
  const [table, setTable] = useState('tableView');
  const [modal, setModal] = useState(false);
  const toggle = () => { setModal(!modal) };
  const [activeItem, setActiveItem] = useState('Productos');
  const [selected, setSelected] = useState(null);

  const [prod_name, setProd_name] = useState('');
  const [category_id, setProd_category] = useState('');
  const [brand_id, setProd_brand] = useState('');
  const [prod_price, setProd_price] = useState('');
  const [prod_description, setProd_description] = useState('');
  const [prod_img, setProd_img] = useState('');

  const [cat_name, setCat_name] = useState('');

  const [bra_name, setBrand_name] = useState('');

  const [addCategory, setAddCategory] = useState(false);

  const [addBrand, setAddBrand] = useState(false);

  const toggleCategory = () => {
    setAddCategory(!addCategory);
  }

  const toggleBrand = () => {
    setAddBrand(!addBrand);
  }

  const handleSubmitCategory = () => {
    try {
      axios.post(`${url}/category`,
        { cat_name: cat_name }
      )
        .then(() => {
          setCat_name('');
          fetchCategories();
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitBrand = () => {
    try {
      axios.post(`${url}/brand`,
        { bra_name: bra_name }
      )
        .then(() => {
          setBrand_name('');
          fetchBrands();
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Auth/findByTokenAdmin/${access_token}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [url, access_token])

  useEffect(() => {
    fetchUser();
  }, [fetchUser])


  const toggleTable = () => {
    table === 'tableView' ? setTable('gridView') : setTable('tableView');
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (product) => {
    setSelected(product);
    setModal(true);
    setProd_name(product.prod_name);
    setProd_category(product.category && product.category[0].cat_id);
    setProd_brand(product.brand && product.brand[0].bra_id);
    setProd_price(product.prod_price);
    setProd_description(product.prod_desc);
    setProd_img(product.prod_img);
  }

  const handleStatus = (product, prop) => {
    const formData = new FormData();
    formData.append('prod_status', prop);

    try {
      axios.put(`${url}/products/update/${product.prod_id}`, formData)
        .then(() => {
          toggle();
          fetchProducts();
        })
    } catch (error) {
      console.error(error);
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('prod_name', prod_name);
    formData.append('category_id', category_id);
    formData.append('brand_id', brand_id);
    formData.append('prod_price', prod_price);
    formData.append('prod_desc', prod_description);
    formData.append('prod_img', prod_img);
    formData.append('prod_status', 'Activo');

    try {
      if (selected) {
        axios.put(`${url}/products/update/${selected.prod_id}`, formData)
          .then(() => {
            setModal(false);
            setProd_name('');
            setProd_category('');
            setProd_brand('');
            setProd_price('');
            setProd_description('');
            setProd_img('');
            setSelected(null);
            window.location.reload();
          })
      } else {
        axios.post(`${url}/products`, formData)
          .then(() => {
            setModal(false);
            setProd_name('');
            setProd_category('');
            setProd_brand('');
            setProd_price('');
            setProd_description('');
            setProd_img('');
            window.location.reload();
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const clearLocal = () => {
    clearLocalStorage();
    clearLocalStorage();
    window.location.reload();
  }

  return (
    !logged ? (
      <Redirect to="/" />
    ) :
      (<div className="app-container">

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-h">
            <div class="account-info">
              <div class="account-info-picture">
                <img src={LokoLogo} alt="Account" />
              </div>
              <div class="account-info-name">{user && user.adm_username}</div>
              <button class="account-info-more" onClick={clearLocal}>
                <IoMdExit style={{ color: '#212121', fontSize: '20px' }} />
              </button>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className={activeItem === 'Home' ? "sidebar-list-item active" : "sidebar-list-item"} onClick={() => handleClick('Home')}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Home</span>
              </div>
            </li>
            <li className={activeItem === 'Productos' ? "sidebar-list-item active" : "sidebar-list-item"} onClick={() => handleClick('Productos')}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                <span>Productos</span>
              </div>
            </li>
            <li className={activeItem === 'Categorías' ? "sidebar-list-item active" : "sidebar-list-item"} onClick={() => handleClick('Categorías')}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                <span>Categorías</span>
              </div>
            </li>
            <li className={activeItem === 'Marcas' ? "sidebar-list-item active" : "sidebar-list-item"} onClick={() => handleClick('Marcas')}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                <span>Marcas</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="app-content">

          {/* Header */}
          <div className="app-content-header">
            <h1 className="app-content-headerText">{activeItem}</h1>
            <Button
              className="app-content-headerButton"
              hidden={activeItem === 'Categorías' || activeItem === 'Marcas'? true : false}
              onClick={toggle}
            >Agregar {activeItem === 'Home' ? 'Productos' : activeItem}
            </Button>
          </div>

          {/* Modal agregar Pordulcto */}
          <Modal centered size='lg' isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={
              () => {
                setModal(false);
                setProd_name('');
                setProd_category('');
                setProd_brand('');
                setProd_price('');
                setProd_description('');
                setProd_img('');
                setSelected(null);
              }}>
              {selected ? 'Editar producto' : 'Agregar Producto'}
            </ModalHeader>
            <ModalBody>
              <FormGroup className="row">
                <div className="form-group col-6">
                  <Label htmlFor="productName">Nombre del producto</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
                    defaultValue={prod_name}
                    onChange={(e) => setProd_name(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <Label htmlFor="productCategory">Categoría</Label>
                  <Input
                    className='form-group-select'
                    defaultValue={category_id}
                    id="exampleSelect"
                    name="select"
                    onChange={(e) => setProd_category(e.target.value)}
                    type="select"
                  >
                    <option>Selecciona una opción</option>
                    {categoriesList.map((category, index) => (
                      <option key={index} value={category.cat_id}>{category.cat_name}</option>
                    ))}
                  </Input>
                </div>
              </FormGroup>
              <FormGroup className="row">
                <div className="form-group col-6">
                  <Label htmlFor="productStock">Marca</Label>
                  <Input
                    className='form-group-select'
                    defaultValue={brand_id}
                    id="exampleSelect"
                    name="select"
                    onChange={(e) => setProd_brand(e.target.value)}
                    type="select"
                  >
                    <option>Selecciona una opción</option>
                    {brandsList.map((brand, index) => (
                      <option key={index} value={brand.bra_id}>{brand.bra_name}</option>
                    ))}
                  </Input>
                </div>
                <div className="form-group col-6">
                  <Label htmlFor="productPrice">Precio</Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    min="0"
                    pattern="^\d*(\.\d{0,2})?$"
                    step="any"
                    name="productPrice"
                    defaultValue={prod_price}
                    onChange={(e) => setProd_price(e.target.value)}
                  />
                </div>
              </FormGroup>
              <div className="form-group">
                <Label htmlFor="productDescription">Descripción</Label>
                <Input
                  className="form-control"
                  id="productDescription"
                  rows="3"
                  name="productDescription"
                  type="textarea"
                  defaultValue={prod_description}
                  onChange={(e) => setProd_description(e.target.value)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="productImage">Imagen</Label>
                <Input
                  type="file"
                  className="form-control-file"
                  id="productImage"
                  name="productImage"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setProd_img(e.target.files[0])}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              {selected && selected.prod_status === 'Activo' ? <Button onClick={() => handleStatus(selected, 'Inactivo')} color='danger' outline> Desactivar </Button> : <Button onClick={() => handleStatus(selected, 'Activo')} color='success' outline> Activar </Button>}
              <Button color={selected ? 'warning' : 'success'} onClick={handleSubmit}>
                {selected ? 'Editar' : 'Agregar'}
              </Button>
              <Button color="secondary"
                onClick={
                  () => {
                    setModal(false);
                    setProd_name('');
                    setProd_category('');
                    setProd_brand('');
                    setProd_price('');
                    setProd_description('');
                    setProd_img('');
                    setSelected(null);
                  }
                }>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          {/* Nav */}
          <div className="app-content-actions">
            <input className="search-bar"
              placeholder={`Buscar ${activeItem}...`}
              type="text" value={search}
              onChange={(e) => { handleSearch(e) }} />
            <div className="app-content-actions-wrapper">
              <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter"><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></button>
                <div className="filter-menu">
                  <label>Category</label>
                  <select>
                    <option>All Categories</option>
                    <option>Furniture</option>
                    <option>Decoration</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                  </select>
                  <label>Status</label>
                  <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                  <div className="filter-menu-buttons">
                    <button className="filter-button reset">
                      Reset
                    </button>
                    <button className="filter-button apply">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <button className="action-button list active" title="List View" onClick={toggleTable}>
                {table === 'tableView' ? <IoIosList style={{ color: '#212121', fontSize: '20px' }} /> : <IoGridOutline style={{ color: '#212121', fontSize: '20px' }} />}
              </button>
            </div>
          </div>

          {/* Products Main */}
          {activeItem === 'Home' && <div className="cards row m-4">
            {filteredSearch.filter(prod => prod.prod_status === 'Activo').map(product => (
              <Col className="col" key={product.prod_id}>
                <Card className='card mt-2 mb-2' style={{ borderRadius: '10px', maxWidth: '250px' }}
                // onClick={() => {
                //   setSelectModal(product);
                //   toggle1();
                // }}
                >
                  <CardBody className='text-center'>
                    <img src={product.prod_img !== '' ? `https://lokocandy.up.railway.app/products/image/${product.prod_img}` : LokoLogo} style={{ borderRadius: '10px', objectFit: 'cover' }} width={200} height={200} alt={product.prod_name} />
                    {/* {product.prod_img && <img style={{ width: '100%' }} alt='ImageMovement' src={`https://lokocandy.up.railway.app/products/image/${product.prod_img}`} />} */}
                  </CardBody>
                  <CardFooter>
                    <h5 style={{ color: '#212121', fontWeight: '700', fontSize: '20px' }}>{product.prod_name}</h5>
                    <CardSubtitle style={{ color: '#454545', fontSize: '12px' }}>
                      {product.prod_desc}
                    </CardSubtitle>
                    <CardSubtitle style={{ color: '#426B1F', fontWeight: '500', fontSize: '18px' }}>
                      ${product.prod_price}
                    </CardSubtitle>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </div>}

          {/* Products */}
          {activeItem === 'Productos' && <div className={`products-area-wrapper ${table}`}>
            <div className="products-header">
              <div className="product-cell image">
                Producto
                <button className="sort-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                </button>
              </div>
              <div className="product-cell category">Categoría<button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button></div>
              <div className="product-cell price">Marca<button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button></div>
              <div className="product-cell status-cell">Estado<button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button></div>
              <div className="product-cell price">Precio<button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button></div>
            </div>

            {filteredSearch.map((product, index) => (
              <div className="products-row" onClick={() => handleEdit(product)} key={index}>
                <div className="product-cell image">
                  <img src={product.prod_img !== '' ? `https://lokocandy.up.railway.app/products/image/${product.prod_img}` : LokoLogo} alt={product.prod_name} />
                  <span>{product.prod_name}</span>
                </div>
                <div className="product-cell category"><span className="cell-label">Categoría:</span>{product.category.length > 0 ? product.category[0].cat_name : 'Sin categoría'}</div>
                <div className="product-cell brand"><span className="cell-label">Marca:</span>{product.brand.length > 0 ? product.brand[0].bra_name : 'Sin marca'}</div>
                <div className="product-cell status-cell">
                  <span className="cell-label">Estado:</span>
                  <span className={`status ${product.prod_status === 'Activo' ? 'active' : 'disabled'}`}>{product.prod_status}</span>
                </div>
                <div className="product-cell price"><span className="cell-label">Precio:</span>${product.prod_price}</div>
              </div>
            ))}
          </div>}

          {/* Categories */}
          {activeItem === 'Categorías' &&
            <div className={`products-area-wrapper tableView`}>
              <div className="products-header">
                <div className="product-cell image">
                  Categoría
                  <button className="sort-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                  </button>
                </div>
                <div className="product-cell category">Cantidad<button className="sort-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                </button></div>
              </div>

              {categoriesList.map((cat, index) => (
                <div className="products-row" key={index}>
                  <div className="product-cell image">
                    <img src={LokoLogo} alt={cat.cat_name} />
                    <span> {cat.cat_name}</span>
                  </div>
                  {
                    (() => {
                      const productsInCategory = filteredSearch.filter(product => product.category[0].cat_id === cat.cat_id);
                      return <div className="product-cell category"><span className="cell-label">Cantidad:</span>{productsInCategory.length}</div>
                    })()
                  }
                </div>
              ))}

              <div class="products-row">
                <div class="product-cell image">
                  {/* <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="product"> */}
                  <span><Button color='secondary' style={{ marginRight: '1rem' }} onClick={toggleCategory}>+</Button></span>
                  {addCategory &&
                    <Input
                      type="text"
                      placeholder="Agregar categoría"
                      defaultValue={cat_name}
                      onChange={(e) => setCat_name(e.target.value)}
                      style={{ marginRight: '1rem' }} />
                  }
                  {addCategory &&
                    <Button color='success'
                      disabled={cat_name === ''}
                      onClick={handleSubmitCategory}
                    >Agregar
                    </Button>}
                </div>
                <div class="product-cell category"><span class="cell-label"></span></div>
              </div>
            </div>
          }

          {/* Brands */}
          {activeItem === 'Marcas' &&
            <div className={`products-area-wrapper tableView`}>
              <div className="products-header">
                <div className="product-cell image">
                  Marca
                  <button className="sort-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                  </button>
                </div>
                <div className="product-cell category">Cantidad<button className="sort-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                </button></div>
              </div>

              {brandsList.map((brand, index) => (
                <div className="products-row" key={index}>
                  <div className="product-cell image">
                    <img src={LokoLogo} alt={brand.bra_name} />
                    <span> {brand.bra_name}</span>
                  </div>
                  {
                    (() => {
                      const productsInBrand = filteredSearch.filter(product => product.brand[0].bra_id === brand.bra_id);
                      return <div className="product-cell brand"><span className="cell-label">Cantidad:</span>{productsInBrand.length}</div>
                    })()
                  }
                </div>
              ))}
              <div class="products-row">
                <div class="product-cell image">
                  {/* <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="product"> */}
                  <span><Button color='secondary' style={{ marginRight: '1rem' }} onClick={toggleBrand}>+</Button></span>
                  {addBrand &&
                    <Input
                      type="text"
                      placeholder="Agregar marca"
                      defaultValue={bra_name}
                      onChange={(e) => setBrand_name(e.target.value)}
                      style={{ marginRight: '1rem' }} />
                  }
                  {addBrand &&
                    <Button color='success'
                      disabled={bra_name === ''}
                      onClick={handleSubmitBrand}
                    >Agregar
                    </Button>}
                </div>
                <div class="product-cell category"><span class="cell-label"></span></div>
              </div>
            </div>
          }

        </div>
      </div>)
  )
}

export { Dashboard }