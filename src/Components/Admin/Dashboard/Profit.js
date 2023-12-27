import * as React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Activity from './Activity';
const pData = [50, 320, 100, 320, 500, 350, 200, 230, 500];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
  'Page H',
  'Page I',
];

export default function TinyLineChartCard() {
  return (
    <div>
    <div className='profit'>
     <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgb(30, 136, 229)', color: '#ffffff', height: '100px', padding: '8px' }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <AccountBalanceWalletIcon style={{ fontSize: 25 }} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body2" style={{ color: '#ffffff',  fontSize: 20 }}>
            $ 50,000/-
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ position: 'absolute', top: '1px', left: '0', right: '0' }}>
          <ChartContainer
            width={300}
            height={150}
            series={[{ type: 'line', data: pData }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
              '.MuiLineElement-root': {
                stroke: '#fff',
                strokeWidth: 2,
              },
              '.MuiMarkElement-root': {
                stroke: '#fff',
                scale: '0.6',
                fill: '#000',
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot />
          </ChartContainer>
        </Grid>
      </Grid>
    </Card>
    </div>
<div>
<Activity />
</div>

</div>
  );
}