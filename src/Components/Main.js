import React from 'react'
import { NavBar } from './NavBar'
import { SideBar } from './SideBar'
import LokoLogo from '../Assets/Images/LokoCandy-Logo.jpg'
import { Card, CardBody, CardSubtitle, CardFooter, Col } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'

function Main() {
  const { filteredSearch } = useDataContext();
  // const [selectModal, setSelectModal] = useState({});
  // const [modal1, setModal1] = useState(false);
  // const toggle1 = () => setModal1(!modal1);

  return (
    <div className='Content'>
      <SideBar />
      <div className='list-product scrollbar'>
        <NavBar />
        <div className="cards row m-4">
          {filteredSearch.map(product => (
            <Col className="col" key={product.prod_id}>
              <Card className='card mt-2 mb-2' style={{ borderRadius: '10px', maxWidth: '250px'}}
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
                  {/* <CardSubtitle>
                    {product.prod_desc}
                  </CardSubtitle> */}
                  <CardSubtitle style={{ color: '#426B1F', fontWeight: '500', fontSize: '20px' }}>
                    ${product.prod_price}
                  </CardSubtitle>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Main }