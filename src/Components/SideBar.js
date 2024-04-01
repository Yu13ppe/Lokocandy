import React from 'react'
import Logo from '../Assets/Images/Loko-C.png'
import WhatsApp from '../Assets/Images/WhatsApp.png'
import Instagram from '../Assets/Images/Instagram.png'
import Gmail from '../Assets/Images/Gmail.png'
import Gmap from '../Assets/Images/Gmap.png'

function SideBar() {
  return (
    <div className='SideBar scrollbar'>
      <div className='SideBar-Items'>
        <div className='SideBar-Profile'>
          <img className='image' alt='LokoCandy' src={Logo} />
        </div>
        <br />
        <div className='SideBar-Categories'>
          <div className='Categories'>
            <section>
              <div role="list" className="ui selection list">
                <div role="listitem" className="item categories__item active" id="all">
                  <div className="content">
                    <span>Todos los productos</span>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>
                      Papelería
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>
                      Viveres
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div>
                      Sin categoría
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className='SideBar-Links'>
            <h5>Contacta con nosotros</h5>
            <section>
              <div className="listItem">
                <div className="link__item d-flex ">
                  <img className="icon" alt="WhatsApp" src={WhatsApp} />
                  <div className="content" style={{cursor: 'pointer'}}>
                    +58 412 6131828
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Instagram" src={Instagram} />
                    <div className="content" style={{cursor: 'pointer'}}>
                      @lokocandy.ve
                    </div>
                  </div>
                </div>
                <div role="listitem" className="link">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Correo" src={Gmail} />
                    <div className="content" style={{cursor: 'pointer'}}>
                      lokocandyve@gmail.com
                    </div>
                  </div>
                </div>
                <div role="listitem" className="link">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Ubicación" src={Gmap} />
                    <div className="content" style={{cursor: 'pointer'}}>
                      Av 15 Sierra Maestra San Fco. Zulia
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SideBar }