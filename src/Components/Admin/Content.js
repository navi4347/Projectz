import React from 'react';
import { Grid} from '@mui/material';
import Table from './Layout/Table'
import Bar from './Layout/Bar'
import Card from './Layout/Card'

function Content() {
  return (
    
    <Grid container spacing={2}>
      <Card/>
        <Grid item xs={6}>
        <div><Table/></div>
      </Grid>
      <Grid item xs={6}>
        <div><Bar/></div>
      </Grid>
    
     
    </Grid>
  );
}

export default Content;
