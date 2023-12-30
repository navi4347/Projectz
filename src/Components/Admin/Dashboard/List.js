import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import imga from './img/a.png';
import imgb from './img/b.png';
import imgc from './img/c.png';
import imgd from './img/d.png';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

const darkDividerStyle = {
  backgroundColor: '#000',
};

const calculateTotalInvestment = (timeRange) => {
  if (timeRange === 'Last week') return '1000';
  if (timeRange === 'Last month') return '4000';
  if (timeRange === 'Last 6 months') return '24000';
  if (timeRange === 'Last year') return '48000';
  return null;
};

const calculateTotalSales = (timeRange) => {
  if (timeRange === 'Last week') return '1500';
  if (timeRange === 'Last month') return '6000';
  if (timeRange === 'Last 6 months') return '36000';
  if (timeRange === 'Last year') return '72000';
  return null;
};

const calculateTotalRevenue = (timeRange) => {
  if (timeRange === 'Last week') return '500';
  if (timeRange === 'Last month') return '2000';
  if (timeRange === 'Last 6 months') return '8000';
  if (timeRange === 'Last year') return '15000';
  return null;
};

const calculateTotalProfit = (timeRange) => {
  if (timeRange === 'Last week') return '300';
  if (timeRange === 'Last month') return '1000';
  if (timeRange === 'Last 6 months') return '4000';
  if (timeRange === 'Last year') return '8000';
  return null;
};

export default function ListDividers() {
  const [timeRange, setTimeRange] = React.useState('Last week');
  const [totalInvestment, setTotalInvestment] = React.useState(calculateTotalInvestment(timeRange));
  const [totalSales, setTotalSales] = React.useState(calculateTotalSales(timeRange));
  const [totalRevenue, setTotalRevenue] = React.useState(calculateTotalRevenue(timeRange));
  const [totalProfit, setTotalProfit] = React.useState(calculateTotalProfit(timeRange));

  const handleTimeRangeChange = (event) => {
    const selectedTimeRange = event.target.value;
    setTimeRange(selectedTimeRange);
    setTotalInvestment(calculateTotalInvestment(selectedTimeRange));
    setTotalSales(calculateTotalSales(selectedTimeRange));
    setTotalRevenue(calculateTotalRevenue(selectedTimeRange));
    setTotalProfit(calculateTotalProfit(selectedTimeRange));
  };

  return (
    <div>
      <FormControl variant="standard" style={{ margin: '20px', width: '100%' }}>
        <Select
          labelId="time-range-label"
          id="time-range-select"
          name="time-range-select"
          value={timeRange}
          label="Time Range"
          onChange={handleTimeRangeChange}
        >
          <MenuItem value="Last week">Last week</MenuItem>
          <MenuItem value="Last month">Last month</MenuItem>
          <MenuItem value="Last 6 months">Last 6 months</MenuItem>
          <MenuItem value="Last year">Last 1 year</MenuItem>
        </Select>
      </FormControl>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imga} />
          </ListItemAvatar>
          <Grid container justifyContent="space-between">
            <Typography>Total Investment</Typography>
            <Typography>${totalInvestment}</Typography>
          </Grid>
        </ListItem>
        <Divider style={darkDividerStyle} />
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imgb} />
          </ListItemAvatar>
          <Grid container justifyContent="space-between">
            <Typography>Total Sales</Typography>
            <Typography>${totalSales}</Typography>
          </Grid>
        </ListItem>
        <Divider style={darkDividerStyle} />
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imgc} />
          </ListItemAvatar>
          {totalRevenue !== null ? (
            <Grid container justifyContent="space-between">
              <Typography>Total Revenue</Typography>
              <Typography>${totalRevenue}</Typography>
            </Grid>
          ) : (
            <ListItemText primary="No data available" />
          )}
        </ListItem>
        <Divider style={darkDividerStyle} />
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imgd} />
          </ListItemAvatar>
          {totalProfit !== null ? (
            <Grid container justifyContent="space-between">
              <Typography>Total Profit</Typography>
              <Typography>${totalProfit}</Typography>
            </Grid>
          ) : (
            <ListItemText primary="No data available" />
          )}
        </ListItem>
      </List>
    </div>
  );
}
