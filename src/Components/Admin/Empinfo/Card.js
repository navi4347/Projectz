import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import imga from './Assets/3.jpg';
import imgb from './Assets/2.jpg';
import { Typography } from '@mui/material';
export default function InsetDividers() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imga} />
        </ListItemAvatar>
        <ListItemText
          primary="Gayathri"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', alignItems: 'center' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                TCS-PR010
              </Typography>
              {' '}
              <Typography
                variant="body2"
                color="text.primary"
              >
               5 VOCHERS
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imgb} />
        </ListItemAvatar>
        <ListItemText
          primary="Naveen"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', alignItems: 'center' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                IBM-PR020
              </Typography>
              {' '}
              <Typography
                variant="body2"
                color="text.primary"
              >
               5 VOCHERS
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
    </List>
  );
}
