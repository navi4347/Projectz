import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { Button, Stack } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Export from '@mui/icons-material/FileDownload';
import Import from '@mui/icons-material/ImportExport';
import { FaFilter } from 'react-icons/fa';

function Sellerinfo() {
  const [SellerinfoData, setSellerinfoData] = useState([]);
  const [filteredSellerinfoData, setFilteredSellerinfoData] = useState([]);
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [portcode, setPortcode] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingPortcode, setEditingPortcode] = useState(null);
  const [countryFilter, setCountryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const fetchData = useCallback(() => {
    fetch('http://localhost:5000/api/Sellerinfo')
      .then((response) => response.json())
      .then((data) => {
        setSellerinfoData(data.SellerinfoData);
        setFilteredSellerinfoData(data.SellerinfoData); // Initially set filtered data to all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const applyFilters = useCallback(() => {
    const filteredData = SellerinfoData.filter((record) => {
      return (
        record.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
        record.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    });
    setFilteredSellerinfoData(filteredData);
  }, [countryFilter, locationFilter, SellerinfoData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
 
  const handleCreateClick = () => {
    setEditMode(true);
    setEditingPortcode(null);
  };

  const handleExportClick = () => {
    const convertToCSV = (data) => {
      const header = Object.keys(data[0]).join(',') + '\n';
      const csv = data.map((row) => Object.values(row).join(',')).join('\n');
      return header + csv;
    };

    const csvData = convertToCSV(SellerinfoData);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const downloadLink = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'SellerinfoData.csv';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        processCSVData(result);
      };
      reader.readAsText(file);
    };
    input.click();
  };
  
  const processCSVData = (csvData) => {
    const lines = csvData.split('\n');
    const importedData = lines.map((line) => line.split(','));
    importedData.forEach((record) => {
      const [country, location, portcode] = record;
      const newRecord = { country, location, portcode };
  
      fetch('http://localhost:5000/api/Sellerinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      })
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error('Error adding data:', error);
        });
    });
  };
  
  const handleEditClick = (portcode) => {
    setEditMode(true);
    setEditingPortcode(portcode);
    const recordToEdit = SellerinfoData.find((record) => record.portcode === portcode);
    setCountry(recordToEdit.country);
    setLocation(recordToEdit.location);
    setPortcode(recordToEdit.portcode);
  };

  const handleDeleteClick = (portcode) => {
    // Delete from the database
    fetch(`http://localhost:5000/api/Sellerinfo/${portcode}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedSellerinfoData = SellerinfoData.filter((record) => record.portcode !== portcode);
        setSellerinfoData(updatedSellerinfoData);
        setFilteredSellerinfoData(updatedSellerinfoData);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  
  

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingPortcode(null);
    setCountry('');
    setLocation('');
    setPortcode('');
  };

  const handleSaveEdit = () => {
    const updatedRecord = { country, location, portcode };
  
    if (editingPortcode) {
      fetch(`http://localhost:5000/api/Sellerinfo/${editingPortcode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      })
        .then(() => {
          const updatedSellerinfoData = SellerinfoData.map((record) =>
            record.portcode === editingPortcode ? updatedRecord : record
          );
          setSellerinfoData(updatedSellerinfoData);
          setFilteredSellerinfoData(updatedSellerinfoData);
          handleCancelEdit();
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    } else {
      fetch('http://localhost:5000/api/Sellerinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      })
        .then(() => {
          fetchData(); // Fetch all data again
          handleCancelEdit();
        })
        .catch((error) => {
          console.error('Error adding data:', error);
        });
    }
  };
  
  

  return (
    <>
    <div className="slider">
      <div className={`slide ${editMode ? 'slide-out' : 'slide-in'}`}>
        <div className='rowx'>
          <div className='colxa'>
            <h1>Port Pair</h1>
          </div>
          <div className='colxb'>
            <Stack spacing={3} direction="row">
              <Button variant="contained" onClick={handleExportClick} startIcon={<Export />}>
                Export
              </Button>
              <Button variant="contained" onClick={handleImportClick} startIcon={<Import />}>
                Import
              </Button>
              <Button variant="contained" onClick={handleCreateClick} startIcon={<Add />}>
                ADD
              </Button>
            </Stack>
          </div>
        </div>
        <br />
        <input
          type="text"
          className="inp"
          placeholder="Country Filter"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
        <input
          type="text"
          className="inp"
          placeholder="Location Filter"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <Button variant="contained" className="filter-button" onClick={applyFilters}>
          SUBMIT
        </Button>
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Country&nbsp;<FaFilter /></th>
              <th>Location&nbsp;<FaFilter /></th>
              <th>Port Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredSellerinfoData.slice(indexOfFirstItem, indexOfLastItem).map((record, index) => (
              <tr key={record.portcode}>
                <td>{index + 1}</td>
                <td>{record.country}</td>
                <td>{record.location}</td>
                <td>{record.portcode}</td>
                <td>
                  <Button variant="outlined" onClick={() => handleEditClick(record.portcode)}>
                    Edit
                  </Button>&nbsp;&nbsp;&nbsp;
                  <Button variant="outlined" onClick={() => handleDeleteClick(record.portcode)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className={`slide second-slide slide-in`}>
          <h1>Port Pair</h1>
          <input
            type="text"
            className="inp"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            className="inp"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            className="inp"
            placeholder="Port Code"
            value={portcode}
            onChange={(e) => setPortcode(e.target.value)}
          />
          <Stack spacing={3} direction="row">
            <Button variant="contained" className="add-record-button" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="contained" className="add-record-button" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Stack>
        </div>
      )}


    </div>
    <div className="pagination">
        {Array(Math.ceil(filteredSellerinfoData.length / itemsPerPage))
          .fill(null)
          .map((_, index) => (
            <Button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Button>
          ))}
      </div>
      </>
  );
}

export default Sellerinfo;