import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; 
import { DataGrid } from '@mui/x-data-grid';
import { useGridRootProps } from '@mui/x-data-grid-pro'; 
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';

import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';

const initialRows = [];

function EditToolbar({ onAddRecord }) {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={onAddRecord}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = () => {
    // If needed, add logic related to row edit stop
  };

  const handleSaveClick = (id) => () => {
    const editedRow = rows.find((row) => row.id === id);
    const { Sno, TotV, Rate, Silver, Gold, Platinum, Status } = editedRow;

    console.log('Updating data:', {
      Seller: editedRow.Seller,
      Sno,
      TotV: Number(TotV),
      Rate: Number(Rate),
      Silver: Number(Silver),
      Gold: Number(Gold),
      Platinum: Number(Platinum),
      Status,
    });

    fetch(`http://localhost:5000/api/tcs/${editedRow.Seller}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Sno,
        TotV: Number(TotV),
        Rate: Number(Rate),
        Silver: Number(Silver),
        Gold: Number(Gold),
        Platinum: Number(Platinum),
        Status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update successful:', data);

        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? { ...row, ...editedRow } : row))
        );

        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'Sno', headerName: 'Sno', width: 100, editable: false },
    { field: 'Seller', headerName: 'Seller', width: 160, editable: true },
    { field: 'TotV', headerName: 'TotV', type: 'number', width: 120, align: 'center', headerAlign: 'center', editable: true },
    { field: 'Rate', headerName: 'Rate', type: 'number', width: 150, align: 'center', headerAlign: 'center', editable: true },
    { field: 'Silver', headerName: 'Silver', type: 'number', width: 120, align: 'center', headerAlign: 'center', editable: true },
    { field: 'Gold', headerName: 'Gold', type: 'number', width: 120, align: 'center', headerAlign: 'center', editable: true },
    { field: 'Platinum', headerName: 'Platinum', type: 'number', width: 120, align: 'center', headerAlign: 'center', editable: true },
    {
      field: 'Status',
      headerName: 'Status',
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Active', 'Inactive'], 
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: '#388e3c',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />} // Changed from 'Close'
              label="Cancel"
              onClick={handleCancelClick(id)}
              sx={{ color: '#f44336'}}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            sx={{ color: 'primary.main'}}
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: '#f44336'}}
          />,
        ];
      },
    },
  ];

  const fetchData = () => {
    fetch('http://localhost:5000/api/tcs')
      .then((response) => response.json())
      .then((data) => {
        const rowsWithIds = data.tcsData.map((row) => ({ id: uuidv4(), ...row }));
        setRows(rowsWithIds);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (id) => () => {
    const deletedRow = rows.find((row) => row.id === id);

    if (deletedRow) {
      const { Seller } = deletedRow;

      fetch(`http://localhost:5000/api/tcs/${Seller}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Delete successful:', data);
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        })
        .catch((error) => console.error('Error deleting data:', error));
    }
  };

  const handleAddRecord = () => {
    // Implement logic to add a new record
  };

  return (
    <Box    
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
         <Typography variant="h5" gutterBottom>
        TCS Clientinfo 
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => <EditToolbar onAddRecord={handleAddRecord} />,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        gridRootProps={useGridRootProps}
      />
    </Box>
  );
}
