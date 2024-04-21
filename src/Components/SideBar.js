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
                    <span style={{ fontSize: '15px', color: '#212121' }}>Todos los productos</span>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div style={{ fontSize: '15px', color: '#212121' }}>
                      Papelería
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div style={{ fontSize: '15px', color: '#212121' }}>
                      Viveres
                    </div>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="content categories__item flex ">
                    <div style={{ fontSize: '15px', color: '#212121' }}>
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
                  <div className="content" style={{ cursor: 'pointer' }}>
                    <a href="https://api.whatsapp.com/send?phone=584126131828&text=Hola,%20este%20es%20mi%20mensaje%20predefinido." style={{ textDecoration: 'none', fontSize: '15px', color: '#212121' }} target="_blank" rel="noreferrer">
                      +58 412 6131828
                    </a>
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Instagram" src={Instagram} />
                    <div className="content">
                      <a href="https://www.instagram.com/lokocandy.ve" style={{ textDecoration: 'none', fontSize: '15px', color: '#212121' }} target="_blank" rel="noreferrer">
                        @lokocandy.ve
                      </a>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="link">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Correo" src={Gmail} />
                    <div className="content" style={{ cursor: 'pointer' }}>
                      <a href="mailto:lokocandyve@gmail.com" style={{ textDecoration: 'none', fontSize: '15px', color: '#212121' }} target="_blank" rel="noreferrer">
                        lokocandyve@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div role="listitem" className="link">
                  <div className="link__item d-flex ">
                    <img className="icon" alt="Ubicación" src={Gmap} />
                    <div className="content" style={{ cursor: 'pointer' }}>
                      <a href="https://maps.app.goo.gl/ZkhA1FqTeE1AzBAu6" style={{ textDecoration: 'none', fontSize: '15px', color: '#212121' }} target="_blank" rel="noreferrer">
                        Av 15 Sierra Maestra San Fco. Zulia
                      </a>
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