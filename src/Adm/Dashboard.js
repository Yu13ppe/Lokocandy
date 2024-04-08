import React, { useCallback, useEffect, useState } from 'react'
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import { useDataContext } from '../Context/dataContext'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Dashboard() {
  const { url,access_token, logged, filteredSearch, search, setSearch, categoriesList, brandsList } = useDataContext();
  const [user, setUser] = useState({});
  const [table, setTable] = useState('tableView');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const fetchUser = useCallback( async () => {
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

  const [prod_name, setProd_name] = useState('');
  const [category_id, setProd_category] = useState('');
  const [brand_id, setProd_brand] = useState('');
  const [prod_price, setProd_price] = useState('');
  const [prod_description, setProd_description] = useState('');
  const [prod_img, setProd_img] = useState('');

  const toggleTable = () => {
    table === 'tableView' ? setTable('gridView') : setTable('tableView');
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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
      axios.post(`${url}/products`, formData)
        .then(() => {
          // console.log(response);
          setModal(false);
          setProd_name('');
          setProd_category('');
          setProd_brand('');
          setProd_price('');
          setProd_description('');
          setProd_img('');
          window.location.reload();
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    !logged ? (
      <Redirect to="/" />
    ) :
      (<div className="app-container">

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z" /></svg>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <a href="/Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Home</span>
              </a>
            </li>
            <li className="sidebar-list-item active">
              <a href="/Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                <span>Productos</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                <span>Statistics</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/Dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                <span>Inbox</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                <span>Notifications</span>
              </a>
            </li>
          </ul>
          <div class="account-info">
            <div class="account-info-picture">
              <img src={LokoLogo} alt="Account"/>
            </div>
            <div class="account-info-name">{user && user.adm_username}</div>
            <button class="account-info-more">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="app-content">

          {/* Header */}
          <div className="app-content-header">
            <h1 className="app-content-headerText">Productos</h1>
            <button className="app-content-headerButton" onClick={toggle}>Agregar Producto</button>
          </div>

          {/* Modal agregar Pordulcto */}
          <Modal centered size='lg' isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar producto</ModalHeader>
            <ModalBody>
              <FormGroup className="row">
                <div className="form-group col-6">
                  <Label htmlFor="productName">Nombre del producto</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="productName"
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
              <Button color="success" onClick={handleSubmit}>
                Agregar
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          {/* Nav */}
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Buscar producto..." type="text" value={search} onChange={(e) => { handleSearch(e) }} />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </button>
            </div>
          </div>

          {/* Products */}
          <div className={`products-area-wrapper ${table}`}>
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
              <div className="products-row" key={index}>
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

          </div>
        </div>
      </div>)
  )
}

export { Dashboard }