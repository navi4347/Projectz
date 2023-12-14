import React, { useState, useEffect } from 'react';
import './Style.css'; 

const Admin = () => {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    Sno: '',
    Org: '',
    TotV: '',
    Rate: '',
    Start: '',
    End: '',
    Status: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/sellerinfo')
      .then(response => response.json())
      .then(data => {
        // Format the date without the time
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
  }, []); 

  // Function to handle edit button click
  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log('Edit item:', item);
  };

  // Function to handle update button click
  const handleUpdate = (item) => {
    // Implement your update logic here
    console.log('Update item:', item);
  };

  // Function to handle delete button click
  const handleDelete = (item) => {
    // Implement your delete logic here
    console.log('Delete item:', item);
  };

  // Function to handle add button click
  const handleAdd = () => {
    setIsAdding(true);
  };

  // Function to handle cancel add button click
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

  // Function to handle submit add button click
  const handleSubmitAdd = () => {
    // Implement your add logic here
    console.log('Add new item:', newItem);
    // Send a request to add the new item to the server
    // After a successful request, you can update the UI accordingly
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

  // Function to handle input change in the add form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div className="admin-container">
      <h2>Admin</h2>
      <button onClick={handleAdd}>Add</button>
      {isAdding && (
        <div>
          <h3>Add New Item</h3>
          <form>
            <label>Sno:</label>
            <input type="text" name="Sno" value={newItem.Sno} onChange={handleInputChange} />

            <label>Org:</label>
            <input type="text" name="Org" value={newItem.Org} onChange={handleInputChange} />

            <label>TotV:</label>
            <input type="text" name="TotV" value={newItem.TotV} onChange={handleInputChange} />

            <label>Rate:</label>
            <input type="text" name="Rate" value={newItem.Rate} onChange={handleInputChange} />

            <label>Start:</label>
            <input type="text" name="Start" value={newItem.Start} onChange={handleInputChange} />

            <label>End:</label>
            <input type="text" name="End" value={newItem.End} onChange={handleInputChange} />

            <label>Status:</label>
            <input type="text" name="Status" value={newItem.Status} onChange={handleInputChange} />

            <button type="button" onClick={handleCancelAdd}>Cancel</button>
            <button type="button" onClick={handleSubmitAdd}>Submit</button>
          </form>
        </div>
      )}
      <table className="data-table">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Org</th>
            <th>TotV</th>
            <th>Rate</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.Sno}>
              <td>{item.Sno}</td>
              <td>{item.Org}</td>
              <td>{item.TotV}</td>
              <td>{item.Rate}</td>
              <td>{item.Start}</td>
              <td>{item.End}</td>
              <td>{item.Status}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

