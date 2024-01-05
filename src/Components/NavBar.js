import React, {useState} from 'react'
// import { Input, FormGroup, Button } from 'reactstrap'
import { IoCartOutline, IoSearch, IoCloseOutline } from "react-icons/io5";

function NavBar() {

  const [clear, setClear] = useState(true)

  return (
    <div className='NavBar'>
      <div className='NavBar-Items'>

        <div className='NavBar-Search'>
          <div className='NavBar-Search-Header'>
            <i class="search-bar-clear" hidden={clear}>
              <IoCloseOutline />
            </i>
            <input className='Search-Bar' type='text' onChange={
              (e) => {
                if (e.target.value === '') {
                  setClear(true)
                } else {
                  setClear(false)
                }
              }
            } />
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