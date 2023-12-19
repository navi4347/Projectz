import React from 'react';
import { Grid} from '@mui/material';
import Table from './Layout/Table'
import Bar from './Layout/Bar'
import Card from './Layout/Card'

function Content() {
  return (
      <div>
    <Grid container spacing={2}>
      <Card/>
        <Grid item xs={7}>
        <div><Table/></div>
      </Grid>
      <Grid item xs={4}>
        <div><Bar/></div>
      </Grid>
    </Grid>
      </div>
  );
}

export default Content;
