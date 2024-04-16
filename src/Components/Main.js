import React, { useState, useEffect } from 'react'
import { NavBar } from './NavBar'
import { SideBar } from './SideBar'
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import LokoC from '../Assets/Images/Loko-C.png'
import { Card, CardBody, CardSubtitle, CardFooter, Col } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'

function Main() {
  const { filteredSearch } = useDataContext();
  const [isLoading, setIsLoading] = useState(true);

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
                <Card className='card mt-2 mb-2' style={{ borderRadius: '10px' }}>
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
              </Col>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export { Main }