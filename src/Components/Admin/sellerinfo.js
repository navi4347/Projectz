import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem } from '@mui/material';
import './Style.css';
import Container from '@mui/material/Container';

const Sellerinfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    Sno: '',
    Org: '',
    TotV: '',
    Rate: '',
    Start: '',
    End: '',
    Status: 'Select',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/sellerinfo')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.sellerinfoData.map(item => ({
          ...item,
          Start: new Date(item.Start).toLocaleDateString(),
          End: new Date(item.End).toLocaleDateString(),
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmitAdd = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sellerinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error adding new item:', data);
      } else {
        console.log('Item added successfully');
        fetchData();
        setIsAdding(false);
        setNewItem({
          Sno: '',
          Org: '',
          TotV: '',
          Rate: '',
          Start: '',
          End: '',
          Status: '',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sellerinfo/${item.Org}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error deleting item:', data);
      } else {
        console.log('Item deleted successfully');
        fetchData();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewItem({
      Sno: '',
      Org: '',
      TotV: '',
      Rate: '',
      Start: '',
      End: '',
      Status: '',
    });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditedItem(item);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedItem({});
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/sellerinfo/${editedItem.Org}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.error('Error updating item:', data);
      } else {
        console.log('Item updated successfully');
        fetchData();
        setIsEditing(false);
        setEditedItem({});
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  
  const handleInputChangeEdit = (e, fieldName) => {
    const { value } = e.target;
    const formattedValue = (fieldName === 'Start' || fieldName === 'End')
      ? value.split('/').reverse().join('-') // Assuming the date is in 'MM/DD/YYYY' format
      : value;
  
    setEditedItem(prevItem => ({
      ...prevItem,
      [fieldName]: formattedValue,
    }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };
 
  return (
    <Container>
    <div className="admin-container">
      <h2>Admin</h2>
      <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
      {isAdding && (
        <div>
         
          <form>
            <TextField label="Sno" className='tff customTextField' autoComplete="off" type="text" name="Sno" value={newItem.Sno} onChange={handleInputChange} />
            <TextField label="Org" className='tff customTextField' autoComplete="off" type="text" name="Org" value={newItem.Org} onChange={handleInputChange} />
            <TextField label="TotV" className='tff customTextField' autoComplete="off" type="text" name="TotV" value={newItem.TotV} onChange={handleInputChange} />
            <TextField label="Rate" className='tff customTextField' autoComplete="off" type="text" name="Rate" value={newItem.Rate} onChange={handleInputChange} />
            <TextField label="" className='tff customTextField' autoComplete="off" type="date" name="Start" value={newItem.Start} onChange={handleInputChange} />
            <TextField label="" className='tff customTextField' autoComplete="off" type="date" name="End" value={newItem.End} onChange={handleInputChange} />
            <Select className='tff customSelect' autoComplete="off" name="Status" value={newItem.Status} onChange={handleInputChange}>                     
            <MenuItem value="Select">Select</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <div className="button-container">
              <Button variant="contained" color="success" onClick={handleSubmitAdd}>Submit</Button>
              <Button variant="contained" color="error" onClick={handleCancelAdd}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
      {isEditing && (
        <div>
          <h3>Edit Item</h3>
          <form>
            <TextField label="Sno" className="tff customTextField" autoComplete="off" type="text" name="Sno" value={editedItem.Sno} onChange={(e) => handleInputChangeEdit(e, 'Sno')} />
            <TextField label="Org" className="tff customTextField" autoComplete="off" type="text" name="Org" value={editedItem.Org} onChange={(e) => handleInputChangeEdit(e, 'Org')} />
            <TextField label="TotV" className="tff customTextField" autoComplete="off" type="text" name="TotV" value={editedItem.TotV} onChange={(e) => handleInputChangeEdit(e, 'TotV')} />
            <TextField label="Rate" className="tff customTextField" autoComplete="off" type="text" name="Rate" value={editedItem.Rate} onChange={(e) => handleInputChangeEdit(e, 'Rate')} />
            <TextField label="" className="tff customTextField" autoComplete="off" type="date" name="Start" value={editedItem.Start} onChange={(e) => handleInputChangeEdit(e, 'Start')} />
            <TextField label="" className="tff customTextField" autoComplete="off" type="date" name="End" value={editedItem.End} onChange={(e) => handleInputChangeEdit(e, 'End')} />
            <Select  className="tff customSelect" autoComplete="off" name="Status" value={editedItem.Status} onChange={(e) => handleInputChangeEdit(e, 'Status')}>           
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
             </Select>        
            <div className="button-container">
              <Button variant="contained" color="success" onClick={handleSubmitEdit}>
                Submit
              </Button>
              <Button variant="contained" color="error" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <Table className="data-table">
        <TableHead>
          <TableRow>
            <TableCell>Sno</TableCell>
            <TableCell>Org</TableCell>
            <TableCell>TotV</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.Sno}>
              <TableCell>{item.Sno}</TableCell>
              <TableCell>{item.Org}</TableCell>
              <TableCell>{item.TotV}</TableCell>
              <TableCell>{item.Rate}</TableCell>
              <TableCell>{item.Start}</TableCell>
              <TableCell>{item.End}</TableCell>
              <TableCell>{item.Status}</TableCell>
              <TableCell>
                <div className="button-container">
                  <Button variant="contained" color="success" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(item)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Container>
  );
}

export default Sellerinfo;
