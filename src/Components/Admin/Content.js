import React from 'react';
import { Grid} from '@mui/material';
import Pie from './Charts/Pie'
import Bar from './Charts/Bar'
import Card from './Charts/Card'

function Content() {
  return (
      <div>
    <Grid container spacing={2}>
      <Card/>
        <Grid item xs={7}>
        <div><Bar/></div>
      </Grid>
      <Grid item xs={4}>
      <div><Pie/></div>
        <div><Pie/></div>
      </Grid>
      <Grid item xs={7}>
        <div><Bar/></div>
      </Grid>
      <Grid item xs={4}>
        <div><Bar/></div>
      </Grid>
    </Grid>
      </div>
  );
}

export default Content;
