import React from 'react';
import Card from 'react-bootstrap/Card';
import play  from '../Assets/play.jpg';
import tab from '../Assets/tab.jpg';
import head from '../Assets/head.jpg';
import phone from '../Assets/phone.jpg';
import Button from '@mui/material/Button';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

function Content() {
  return (
    <div className='container'>
        <div className='row'>
          <div className='col'>
          <Card>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Img variant="top" src={play} style={{ width: '50%' }} />
      </div>    
      <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card.Title> Playstation </Card.Title>
        <Button variant="text" startIcon={<ShoppingCartRoundedIcon />}>
  40% off
</Button>
      </Card.Body>
    </Card>
          </div>
          <div className='col'>
  <Card>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card.Img variant="top" src={phone} style={{ width: '50%' }} />
      </div>
      <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card.Title> Google Pixel
 </Card.Title>
        <Button variant="text" startIcon={<ShoppingCartRoundedIcon />}>
  40% off
</Button>
      </Card.Body>
    </Card>
        </div>
          <div className='col'>
          <Card>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card.Img variant="top" src={tab}  style={{ width: '50%' }} />
      </div>    
      <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
       <Card.Title> Apple iPad </Card.Title>
        <Button variant="text" startIcon={<ShoppingCartRoundedIcon />}>
  40% off
</Button>
      </Card.Body>
    </Card>
          </div>
          <div className='col'>
          <Card>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card.Img variant="top" src={head}  style={{ width: '50%' }} />
      </div>
      <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card.Title> Airpods </Card.Title>
        <Button variant="text" startIcon={<ShoppingCartRoundedIcon />}>
  40% off
</Button>
      </Card.Body>
    </Card>

        </div>
        </div>
        </div>
  );
}

export default Content;
