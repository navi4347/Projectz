import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function StackBars() {
  const customColors = ['#3f51b5','#e91e63','#f44336']; 

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar'] }]}
      series={[
        { data: [50, 80, 100], stack: 'A', label: 'Investment' },
        { data: [40, 75, 90], stack: 'B', label: 'Sale' },
        { data: [10, 5, 10], stack: 'C', label: 'Hold' },
      ]}
      width={500}
      height={350}
      colors={customColors}
    />
  );
}
