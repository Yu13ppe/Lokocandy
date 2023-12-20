import React from 'react'
// import { Input, FormGroup, Button } from 'reactstrap'
import { IoCartOutline, IoSearch } from "react-icons/io5";

function NavBar() {
  return (
    <div className='NavBar'>
      <div className='NavBar-Items'>
        <div className='NavBar-Search'>
          <div className='NavBar-Search-Header'>
            <input className='Search-Bar' type='search' />
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