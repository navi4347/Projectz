import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Price', label: 'Price', minWidth: 100 },
  { id: 'Payment', label: 'Payment', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Voucher', label: 'Vouchers', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 100 },
];

function createData(Name, Price, Payment, Date, Voucher, Status) {
  return { Name, Price, Payment, Date, Voucher, Status };
}

const rows = [
  createData('IBM', '$100', 'Credit', '26/11/2023', '50', 'Delivered'),
  createData('Flipkart', '$50', 'Debit', '20/11/2023', '50', 'Success'),
  createData('Dell', '$50', 'Credit', '25/11/2023', '25', 'Delivered'),
  createData('TCS', '$50', 'Credit', '26/11/2023', '25', 'Delivered'),
  createData('Amazon', '$50', 'Debit', '20/11/2023', '50', 'Success'),
];

const rowsWithKeys = rows.map((row, index) => ({ ...row, key: `${row.Name}-${row.Date}-${index}` }));

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.id === 'Voucher' ? 'center' : 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsWithKeys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const cellProps = {
                      key: column.id,
                      align: column.id === 'Voucher' ? 'center' : 'left',
                      style: {},
                    };

                    if (column.id === 'Status') {
                      if (value === 'Success') {
                        cellProps.style.color = 'green';
                      } else if (value === 'Delivered') {
                        cellProps.style.color = 'blue';
                      }
                    }

                    return (
                      <TableCell {...cellProps}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
