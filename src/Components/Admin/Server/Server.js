const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'projectz',
});

function handleDisconnect() {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  db.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Routes for Sellerinfo
app.get('/api/sellerinfo', (req, res) => {
  const query = 'SELECT Sno, Org, TotV, Rate, Start, End, Status FROM sellerinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on sellerinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ sellerinfoData: results });
    }
  });
});

app.post('/api/sellerinfo', (req, res) => {
  const { Sno, Org, TotV, Rate, Start, End, Status } = req.body;

  if (!Sno || !Org || !TotV || !Rate || !Start || !End || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Org already exists
  const checkQuery = 'SELECT * FROM sellerinfo WHERE Org = ?';
  db.query(checkQuery, [Org], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Org:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Org', details: 'Org must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO sellerinfo (Sno, Org, TotV, Rate, Start, End, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Org, TotV, Rate, Start, End, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into sellerinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/sellerinfo/:Org', (req, res) => {
  const Org = req.params.Org;
  const { Sno, TotV, Rate, Start, End, Status } = req.body;

  const updateQuery = 'UPDATE sellerinfo SET Sno=?, TotV=?, Rate=?, Start=?, End=?, Status=? WHERE Org=?';
  db.query(updateQuery, [Sno, TotV, Rate, Start, End, Status, Org], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/sellerinfo/:Org', (req, res) => {
  const Org = req.params.Org;

  const deleteQuery = 'DELETE FROM sellerinfo WHERE Org=?';
  db.query(deleteQuery, [Org], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
