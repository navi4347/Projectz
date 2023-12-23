import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Content() {
  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div>
            Vertical Content 1
          </div>
        </Grid>
        <Grid item>
          <div>
            Vertical Content 2
          </div>
        </Grid>
        {/* Add more Grid items for additional vertical content */}
      </Grid>
    </Container>
  );
}

export default Content;
