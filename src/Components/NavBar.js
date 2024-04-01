import React, { useState } from 'react'
import { IoCartOutline, IoSearch, IoCloseOutline } from "react-icons/io5";
import { useDataContext } from '../Context/dataContext'

function NavBar() {
  const { search, setSearch } = useDataContext();
  const [clear, setClear] = useState(true);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className='NavBar'>
      <div className='NavBar-Items'>
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
              <IoCartOutline size={20} />
            </i>
            <div className='NavBar-Checkout-Cart-Price'>
              $0.00
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export { NavBar }