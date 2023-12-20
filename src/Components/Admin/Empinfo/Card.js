import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imga from './Assets/1.jpg'
import imgc from './Assets/3.jpg'



export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imga} />
        </ListItemAvatar>
        <ListItemText
          primary="K Naveen"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               IBM
              </Typography>
              {" — PR020"}
              <Typography           
               color="#000"
              >Location: Bangalore</Typography>
             <Typography color="#000" >Wallet: 5 Vouchers</Typography>    
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker"  src={imgc} />
        </ListItemAvatar>
        <ListItemText
          primary="A Gayathri"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               TCS
              </Typography>
              {" — PR010"}
              <Typography           
               color="#000"
              >Location: Bangalore</Typography>
             <Typography color="#000" >Wallet: 5 Vouchers</Typography>            
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}