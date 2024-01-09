import React from 'react';
import Container from '@mui/material/Container';
import ban from '../Assets/amz.jpg';

const Coupon = () => {
  return (
    <Container>
      <div>
        <img src={ban} alt="Coupon" style={{ width: '100%' }} />
      </div>
    </Container>
  );
};

export default Coupon;
