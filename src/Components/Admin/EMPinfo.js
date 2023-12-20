import React from 'react'
import Container from '@mui/material/Container';
import { Grid} from '@mui/material';
import Cards from './Empinfo/Card'
import Table from './Empinfo/Table'

function EMPinfo() {
  return (
    <Container>
    <div>
    <Grid container spacing={2}>
        <Grid item xs={9}>
        <div><Table/></div>
      </Grid>
      <Grid item xs={3}>
      <div><Cards/></div>
      </Grid>
    </Grid>
      </div>
    </Container>

  );
}

export default EMPinfo;