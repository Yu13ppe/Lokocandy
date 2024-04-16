import React, { useState } from 'react'
import LokoC from '../Assets/Images/Loko-C.png'
import { IoCartOutline, IoSearch, IoCloseOutline } from "react-icons/io5";
import { useDataContext } from '../Context/dataContext'
import { SideBar } from './SideBar';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';

function NavBar() {
  const { search, setSearch } = useDataContext();
  const [clear, setClear] = useState(true);
  const [count, setCount] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCount(false);
  };

  // const handleCount = () => {
  // }

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
          <div className='NavBar-Checkout-Button'>
            <i className='NavBar-Checkout-Cart-Icon'>
              <div hidden={count} className='NavBar-Checkout-Cart-Icon-Count'>
                0
              </div>
              <IoCartOutline size={20} />
            </i>
          </div>
        </div>


      </div>
    </div>
  )
}

export { NavBar }