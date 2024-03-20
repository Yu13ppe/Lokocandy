import React from 'react'
import Logo from '../Assets/Images/LokoCandy-Logo.jpg'

function SideBar() {
  return (
    <div className='SideBar'>
      <div className='SideBar-Items scrollbar'>
        <div className='SideBar-Profile'>
          <img className='image' alt='LokoCandy' src={Logo} style={{ width: '8.75rem', height: '8.75rem', color: 'black' }} />
        </div>
        <div className='SideBar-Categories'>
          <div className='Categories'>
            <section>
              <div role="list" className="ui selection list">
                <div role="listitem" className="item categories__item active" id="all">
                  <div className="content">
                    <span>Todos los productos (128)</span>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>
                      accesorios
                      <span className="categories__item__total_products">
                        (2)
                      </span>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>calzado<span className="categories__item__total_products">
                      (101)
                    </span>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>ropa<span className="categories__item__total_products">
                      (22)
                    </span>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>
                      Sin categoría
                      <span className="categories__item__total_products">
                        (3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export { SideBar }