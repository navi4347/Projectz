import React from 'react';
import { Grid, Card as MaterialUICard, CardContent, Typography } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import RedeemIcon from '@mui/icons-material/Redeem';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import Container from '@mui/material/Container';

function CustomCard({ value, icon, title }) {
 

  const getIcon = () => {
    switch (icon) {
      case 'icon1':
        return <ViewInArIcon style={{ fontSize: 40 }} />;
      case 'icon2':
        return <RedeemIcon style={{ fontSize: 40 }} />;
      case 'icon3':
        return <BusinessIcon style={{ fontSize: 40 }} />;
      case 'icon4':
        return <GroupIcon style={{ fontSize: 40 }} />;
      default:
        return null;
    }
  };

  return (
    <MaterialUICard
      sx={{ 
        width: '100%',
        transition: 'background-color 0.3s',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Roboto Mono", monospace',
        color:'#ffffff',
       background:'#1976d2',
       marginTop:'100px',
      }}
      
    >
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4">{value}</Typography>
          <Typography variant="h6">{title}</Typography>
        </div>
        {getIcon()}
      </CardContent>
    </MaterialUICard>
  );
}

function Card() {
  return (
<Container>
      <div>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CustomCard value="15000" icon="icon1" title="Sellers" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CustomCard value="230" icon="icon2" title="Vouchers" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CustomCard value="500" icon="icon3" title="Client" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CustomCard value="1000" icon="icon4" title="Employees" />
      </Grid>
    </Grid>
     </div>
    </Container>

  );
}

export default Card;
