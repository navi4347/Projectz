import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const localRowStyle = {
    backgroundColor: '#ddd',
  };

  const localCellTextStyle = {
    color: '#000',
    textAlign: 'center',
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.Sno}</TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.Org}
        </TableCell>
        <TableCell align="center">{row.TotV}</TableCell>
        <TableCell align="center">{row.Rate}</TableCell>
        <TableCell align="center">{row.Start}</TableCell>
        <TableCell align="center">{row.End}</TableCell>
        <TableCell align="center">{row.Status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={localRowStyle}>
                    <TableCell style={localCellTextStyle}>Type</TableCell>
                    <TableCell style={localCellTextStyle}>Vouchers</TableCell>
                    <TableCell style={localCellTextStyle}>Value</TableCell>
                    <TableCell style={localCellTextStyle}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history && row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell style={localCellTextStyle}>{historyRow.type}</TableCell>
                      <TableCell style={localCellTextStyle}>{historyRow.vouchers}</TableCell>
                      <TableCell style={localCellTextStyle}>{historyRow.value}</TableCell>
                      <TableCell style={localCellTextStyle}>{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Sno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    TotV: PropTypes.string.isRequired,
    Rate: PropTypes.string.isRequired,
    Start: PropTypes.string.isRequired,
    End: PropTypes.string.isRequired,
    Status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        vouchers: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      }),
    ),
    Org: PropTypes.string.isRequired,
  }).isRequired,
};

const globalRowStyle = {
  backgroundColor: '#000',
};

const globalCellTextStyle = {
  color: '#fff',
};

export default function CollapsibleTable() {
  const [sellerinfoData, setSellerinfoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/sellerinfo');
        const updatedData = response.data.sellerinfoData.map((seller) => ({
          ...seller,
          history: [
            { id: 1, type: "Silver", vouchers: 20, value: 500, amount: 10000 },
            { id: 2, type: "Gold", vouchers: 13, value: 1000, amount: 13000 },
            { id: 3, type: "Platinum", vouchers: 12, value: 2000, amount: 24000 },
          ],
        }));
        setSellerinfoData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={globalRowStyle}>
            <TableCell />
            <TableCell align="center" style={globalCellTextStyle}>S.No</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>Sellers</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>Vouchers</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>Rate</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>Start</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>End</TableCell>
            <TableCell align="center" style={globalCellTextStyle}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerinfoData.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
