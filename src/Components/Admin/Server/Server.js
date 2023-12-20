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

app.post('/api/login', (req, res) => {
  const { username, password, userType } = req.body;

  const query = `SELECT * FROM Login WHERE username = ? AND password = ? AND role = ?`;

  db.query(query, [username, password, userType], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password.' });
    } else {
      req.userType = userType;
      res.json({ message: 'Login successful!' });
    }
  });
});

// Sellerinfo start
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
// Sellerinfo end
// Amazon start
app.get('/api/Amazon', (req, res) => {
  const query = 'SELECT Sno, TotV, Type, Value, Rate, Start, End FROM Amazon';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on Amazon table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ AmazonData: results });
    }
  });
});

app.post('/api/Amazon', (req, res) => {
  const { Sno, TotV, Type, Value, Rate, Start, End } = req.body;

  if (!Sno || !TotV || !Type || !Value || !Rate || !Start || !End) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Type already exists
  const checkQuery = 'SELECT * FROM Amazon WHERE Type = ?';
  db.query(checkQuery, [Type], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Type:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Type', details: 'Type must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO Amazon (Sno, TotV, Type, Value, Rate, Start, End) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, TotV, Type, Value, Rate, Start, End];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into Amazon table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/Amazon/:Type', (req, res) => {
  const Type = req.params.Type;
  const { Sno, TotV, Value, Rate, Start, End } = req.body;

  const updateQuery = 'UPDATE Amazon SET Sno=?, TotV=?, Value=?, Rate=?, Start=?, End=? WHERE Type=?';
  db.query(updateQuery, [Sno, TotV, Value, Rate, Start, End, Type], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/Amazon/:Type', (req, res) => {
  const Type = req.params.Type;

  const deleteQuery = 'DELETE FROM Amazon WHERE Type=?';
  db.query(deleteQuery, [Type], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Amazon end
// Flipkart start
app.get('/api/flipkart', (req, res) => {
  const query = 'SELECT Sno, TotV, Type, Value, Rate, Start, End FROM flipkart';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on flipkart table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ flipkartData: results });
    }
  });
});

app.post('/api/flipkart', (req, res) => {
  const { Sno, TotV, Type, Value, Rate, Start, End } = req.body;

  if (!Sno || !TotV || !Type || !Value || !Rate || !Start || !End) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Type already exists
  const checkQuery = 'SELECT * FROM flipkart WHERE Type = ?';
  db.query(checkQuery, [Type], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Type:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Type', details: 'Type must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO flipkart (Sno, TotV, Type, Value, Rate, Start, End) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, TotV, Type, Value, Rate, Start, End];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into flipkart table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/flipkart/:Type', (req, res) => {
  const Type = req.params.Type;
  const { Sno, TotV, Value, Rate, Start, End } = req.body;

  const updateQuery = 'UPDATE flipkart SET Sno=?, TotV=?, Value=?, Rate=?, Start=?, End=? WHERE Type=?';
  db.query(updateQuery, [Sno, TotV, Value, Rate, Start, End, Type], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/flipkart/:Type', (req, res) => {
  const Type = req.params.Type;

  const deleteQuery = 'DELETE FROM flipkart WHERE Type=?';
  db.query(deleteQuery, [Type], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Flipkart end
// Myntra start
app.get('/api/myntra', (req, res) => {
  const query = 'SELECT Sno, TotV, Type, Value, Rate, Start, End FROM myntra';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on myntra table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ myntraData: results });
    }
  });
});

app.post('/api/myntra', (req, res) => {
  const { Sno, TotV, Type, Value, Rate, Start, End } = req.body;

  if (!Sno || !TotV || !Type || !Value || !Rate || !Start || !End) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Type already exists
  const checkQuery = 'SELECT * FROM myntra WHERE Type = ?';
  db.query(checkQuery, [Type], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Type:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Type', details: 'Type must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO myntra (Sno, TotV, Type, Value, Rate, Start, End) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, TotV, Type, Value, Rate, Start, End];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into myntra table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/myntra/:Type', (req, res) => {
  const Type = req.params.Type;
  const { Sno, TotV, Value, Rate, Start, End } = req.body;

  const updateQuery = 'UPDATE myntra SET Sno=?, TotV=?, Value=?, Rate=?, Start=?, End=? WHERE Type=?';
  db.query(updateQuery, [Sno, TotV, Value, Rate, Start, End, Type], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/myntra/:Type', (req, res) => {
  const Type = req.params.Type;

  const deleteQuery = 'DELETE FROM myntra WHERE Type=?';
  db.query(deleteQuery, [Type], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Myntra end
// PSinfo start
app.get('/api/psinfo', (req, res) => {
  const query = 'SELECT Sno, Seller, TotV, Rate, Start, End, Status FROM psinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on psinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ psinfoData: results });
    }
  });
});

app.post('/api/psinfo', (req, res) => {
  const { Sno, Seller, TotV, Rate, Start, End, Status } = req.body;

  if (!Sno || !Seller || !TotV || !Rate || !Start || !End || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM psinfo WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO psinfo (Sno, Seller, TotV, Rate, Start, End, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, TotV, Rate, Start, End, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into psinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/psinfo/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, TotV, Rate, Start, End, Status } = req.body;

  const updateQuery = 'UPDATE psinfo SET Sno=?, TotV=?, Rate=?, Start=?, End=?, Status=? WHERE Seller=?';
  db.query(updateQuery, [Sno, TotV, Rate, Start, End, Status, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/psinfo/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM psinfo WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// PSinfo end
// PCinfo start
app.get('/api/pcinfo', (req, res) => {
  const query = 'SELECT Sno, Client, TotV, Rate, Start, End, Alloted, Remaining, Status FROM pcinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on pcinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ pcinfoData: results });
    }
  });
});

app.post('/api/pcinfo', (req, res) => {
  const { Sno, Client, TotV, Rate, Start, End, Alloted, Remaining, Status } = req.body;

  if (!Sno || !Client || !TotV || !Rate || !Start || !End || !Alloted || !Remaining || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Client already exists
  const checkQuery = 'SELECT * FROM pcinfo WHERE Client = ?';
  db.query(checkQuery, [Client], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Client:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Client', details: 'Client must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO pcinfo (Sno, Client, TotV, Rate, Start, End, Alloted, Remaining, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Client, TotV, Rate, Start, End, Alloted, Remaining, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into pcinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/pcinfo/:Client', (req, res) => {
  const Client = req.params.Client;
  const { Sno, TotV, Rate, Start, End, Alloted, Remaining, Status } = req.body;

  const updateQuery = 'UPDATE pcinfo SET Sno=?, TotV=?, Rate=?, Start=?, End=?, Alloted=?, Remaining=?, Status=? WHERE Client=?';
  db.query(updateQuery, [Sno, TotV, Rate, Start, End, Alloted, Remaining, Status, Client], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/pcinfo/:Client', (req, res) => {
  const Client = req.params.Client;

  const deleteQuery = 'DELETE FROM pcinfo WHERE Client=?';
  db.query(deleteQuery, [Client], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// PCinfo end
// PSalloted start
app.get('/api/psalloted', (req, res) => {
  const query = 'SELECT Sno, Seller, Silver, Gold, Platinum, TotV, Alloted, Remaining FROM psalloted';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on psalloted table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ psallotedData: results });
    }
  });
});

app.post('/api/psalloted', (req, res) => {
  const { Sno, Seller, Silver, Gold, Platinum, TotV, Alloted, Remaining } = req.body;

  if (!Sno || !Seller || !Silver || !Gold || !Platinum || !TotV || !Alloted || !Remaining) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM psalloted WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO psalloted (Sno, Seller, Silver, Gold, Platinum, TotV, Alloted, Remaining) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, Silver, Gold, Platinum, TotV, Alloted, Remaining];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into psalloted table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/psalloted/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, Silver, Gold, Platinum, TotV, Alloted, Remaining } = req.body;

  const updateQuery = 'UPDATE psalloted SET Sno=?, Silver=?, Gold=?, Platinum=?, TotV=?, Alloted=?, Remaining=? WHERE Seller=?';
  db.query(updateQuery, [Sno, Silver, Gold, Platinum, TotV, Alloted, Remaining, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/psalloted/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM psalloted WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// PSalloted end
// PTinfo start
app.get('/api/ptinfo', (req, res) => {
  const query = 'SELECT Sno, TotSV, TotCV, Holding FROM ptinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on ptinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ ptinfoData: results });
    }
  });
});

app.post('/api/ptinfo', (req, res) => {
  const { Sno, TotSV, TotCV, Holding } = req.body;

  if (!Sno || !TotSV || !TotCV || !Holding) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if TotSV already exists
  const checkQuery = 'SELECT * FROM ptinfo WHERE TotSV = ?';
  db.query(checkQuery, [TotSV], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate TotSV:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate TotSV', details: 'TotSV must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO ptinfo (Sno, TotSV, TotCV, Holding) VALUES (?, ?, ?, ?)';
      const values = [Sno, TotSV, TotCV, Holding];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into ptinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/ptinfo/:TotSV', (req, res) => {
  const TotSV = req.params.TotSV;
  const { Sno, TotCV, Holding } = req.body;

  const updateQuery = 'UPDATE ptinfo SET Sno=?, TotCV=?, Holding=? WHERE TotSV=?';
  db.query(updateQuery, [Sno, TotCV, Holding, TotSV], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/ptinfo/:TotSV', (req, res) => {
  const TotSV = req.params.TotSV;

  const deleteQuery = 'DELETE FROM ptinfo WHERE TotSV=?';
  db.query(deleteQuery, [TotSV], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// PTinfo end
// Clients start
app.get('/api/clients', (req, res) => {
  const query = 'SELECT Sno, Org, TotV, Rate, Start, End, Status FROM clients';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on clients table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ clientsData: results });
    }
  });
});

app.post('/api/clients', (req, res) => {
  const { Sno, Org, TotV, Rate, Start, End, Status } = req.body;

  if (!Sno || !Org || !TotV || !Rate || !Start || !End || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Org already exists
  const checkQuery = 'SELECT * FROM clients WHERE Org = ?';
  db.query(checkQuery, [Org], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Org:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Org', details: 'Org must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO clients (Sno, Org, TotV, Rate, Start, End, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Org, TotV, Rate, Start, End, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into clients table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/clients/:Org', (req, res) => {
  const Org = req.params.Org;
  const { Sno, TotV, Rate, Start, End, Status } = req.body;

  const updateQuery = 'UPDATE clients SET Sno=?, TotV=?, Rate=?, Start=?, End=?, Status=? WHERE Org=?';
  db.query(updateQuery, [Sno, TotV, Rate, Start, End, Status, Org], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/clients/:Org', (req, res) => {
  const Org = req.params.Org;

  const deleteQuery = 'DELETE FROM clients WHERE Org=?';
  db.query(deleteQuery, [Org], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Clients end
// TCS start
app.get('/api/tcs', (req, res) => {
  const query = 'SELECT Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status FROM tcs';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on tcs table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ tcsData: results });
    }
  });
});

app.post('/api/tcs', (req, res) => {
  const { Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  if (!Sno || !Seller || !TotV || !Rate || !Silver || !Gold || !Platinum || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM tcs WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO tcs (Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into tcs table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/tcs/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  const updateQuery = 'UPDATE tcs SET Sno=?, TotV=?, Rate=?, Silver=?, Gold=?, Platinum=?, Status=? WHERE Seller=?';
  db.query(updateQuery, [Sno, TotV, Rate, Silver, Gold, Platinum, Status, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/tcs/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM tcs WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// TCS end
// IBM start
app.get('/api/ibm', (req, res) => {
  const query = 'SELECT Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status FROM ibm';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on ibm table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ ibmData: results });
    }
  });
});

app.post('/api/ibm', (req, res) => {
  const { Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  if (!Sno || !Seller || !TotV || !Rate || !Silver || !Gold || !Platinum || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM ibm WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO ibm (Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into ibm table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/ibm/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  const updateQuery = 'UPDATE ibm SET Sno=?, TotV=?, Rate=?, Silver=?, Gold=?, Platinum=?, Status=? WHERE Seller=?';
  db.query(updateQuery, [Sno, TotV, Rate, Silver, Gold, Platinum, Status, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/ibm/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM ibm WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// IBM end
// DELL start
app.get('/api/dell', (req, res) => {
  const query = 'SELECT Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status FROM dell';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on dell table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ dellData: results });
    }
  });
});

app.post('/api/dell', (req, res) => {
  const { Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  if (!Sno || !Seller || !TotV || !Rate || !Silver || !Gold || !Platinum || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM dell WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO dell (Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into dell table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/dell/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, TotV, Rate, Silver, Gold, Platinum, Status } = req.body;

  const updateQuery = 'UPDATE dell SET Sno=?, TotV=?, Rate=?, Silver=?, Gold=?, Platinum=?, Status=? WHERE Seller=?';
  db.query(updateQuery, [Sno, TotV, Rate, Silver, Gold, Platinum, Status, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/dell/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM dell WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// DELL end
// ERSellerinfo start
app.get('/api/ersellerinfo', (req, res) => {
  const query = 'SELECT Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status FROM ersellerinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on ersellerinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ ersellerinfoData: results });
    }
  });
});

app.post('/api/ersellerinfo', (req, res) => {
  const { Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status } = req.body;

  if (!Sno || !Seller || !TotV || !Rate || !Silver || !Gold || !Platinum || !Alloted || !Remaining || !Status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Seller already exists
  const checkQuery = 'SELECT * FROM ersellerinfo WHERE Seller = ?';
  db.query(checkQuery, [Seller], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Seller:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Seller', details: 'Seller must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO ersellerinfo (Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, Seller, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into ersellerinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/ersellerinfo/:Seller', (req, res) => {
  const Seller = req.params.Seller;
  const { Sno, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status } = req.body;

  const updateQuery = 'UPDATE ersellerinfo SET Sno=?, TotV=?, Rate=?, Silver=?, Gold=?, Platinum=?, Alloted=?, Remaining=?, Status=? WHERE Seller=?';
  db.query(updateQuery, [Sno, TotV, Rate, Silver, Gold, Platinum, Alloted, Remaining, Status, Seller], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/ersellerinfo/:Seller', (req, res) => {
  const Seller = req.params.Seller;

  const deleteQuery = 'DELETE FROM ersellerinfo WHERE Seller=?';
  db.query(deleteQuery, [Seller], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// ERSellerinfo end
app.get('/api/empinfo', (req, res) => {
  const query = 'SELECT Sno, EmpName, EmpID, Dep, Location, TotV, Value, Company, Allocated FROM empinfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on empinfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ empinfoData: results });
    }
  });
});

app.post('/api/empinfo', (req, res) => {
  const { Sno, EmpName, EmpID, Dep, Location, TotV, Value, Company, Allocated } = req.body;

  if (!Sno || !EmpName || !EmpID || !Dep || !Location || !TotV || !Value || !Company || !Allocated) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if EmpName already exists
  const checkQuery = 'SELECT * FROM empinfo WHERE EmpName = ?';
  db.query(checkQuery, [EmpName], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate EmpName:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate EmpName', details: 'EmpName must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO empinfo (Sno, EmpName, EmpID, Dep, Location, TotV, Value, Company, Allocated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, EmpName, EmpID, Dep, Location, TotV, Value, Company, Allocated];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into empinfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/empinfo/:EmpName', (req, res) => {
  const EmpName = req.params.EmpName;
  const { Sno, EmpID, Dep, Location, TotV, Value, Company, Allocated } = req.body;

  const updateQuery = 'UPDATE empinfo SET Sno=?, EmpID=?, Dep=?, Location=?, TotV=?, Value=?, Company=?, Allocated=? WHERE EmpName=?';
  db.query(updateQuery, [Sno, EmpID, Dep, Location, TotV, Value, Company, Allocated, EmpName], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/empinfo/:EmpName', (req, res) => {
  const EmpName = req.params.EmpName;

  const deleteQuery = 'DELETE FROM empinfo WHERE EmpName=?';
  db.query(deleteQuery, [EmpName], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});

// EMPinfo end
// Ginfo start
app.get('/api/ginfo', (req, res) => {
  const query = 'SELECT Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed FROM ginfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on ginfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ ginfoData: results });
    }
  });
});

app.post('/api/ginfo', (req, res) => {
  const { Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed } = req.body;

  if (!Sno || !TotV || !Type || !Silver || !Gold || !Platinum || !Red || !NonRed) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Type already exists
  const checkQuery = 'SELECT * FROM ginfo WHERE Type = ?';
  db.query(checkQuery, [Type], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Type:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Type', details: 'Type must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO ginfo (Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into ginfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/ginfo/:Type', (req, res) => {
  const Type = req.params.Type;
  const { Sno, TotV, Silver, Gold, Platinum, Red, NonRed } = req.body;

  const updateQuery = 'UPDATE ginfo SET Sno=?, TotV=?, Silver=?, Gold=?, Platinum=?, Red=?, NonRed=? WHERE Type=?';
  db.query(updateQuery, [Sno, TotV, Silver, Gold, Platinum, Red, NonRed, Type], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/ginfo/:Type', (req, res) => {
  const Type = req.params.Type;

  const deleteQuery = 'DELETE FROM ginfo WHERE Type=?';
  db.query(deleteQuery, [Type], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Ginfo end
// Ninfo start
app.get('/api/ninfo', (req, res) => {
  const query = 'SELECT Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed FROM ninfo';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query on ninfo table:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      res.json({ ninfoData: results });
    }
  });
});

app.post('/api/ninfo', (req, res) => {
  const { Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed } = req.body;

  if (!Sno || !TotV || !Type || !Silver || !Gold || !Platinum || !Red || !NonRed) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Check if Type already exists
  const checkQuery = 'SELECT * FROM ninfo WHERE Type = ?';
  db.query(checkQuery, [Type], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking duplicate Type:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (checkResults.length > 0) {
      res.status(400).json({ error: 'Duplicate Type', details: 'Type must be unique' });
    } else {
      // Proceed with the insertion
      const insertQuery = 'INSERT INTO ninfo (Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Sno, TotV, Type, Silver, Gold, Platinum, Red, NonRed];

      db.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data into ninfo table:', err);
          res.status(500).json({ error: 'Failed to insert data', details: err.message });
        } else {
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.put('/api/ninfo/:Type', (req, res) => {
  const Type = req.params.Type;
  const { Sno, TotV, Silver, Gold, Platinum, Red, NonRed } = req.body;

  const updateQuery = 'UPDATE ninfo SET Sno=?, TotV=?, Silver=?, Gold=?, Platinum=?, Red=?, NonRed=? WHERE Type=?';
  db.query(updateQuery, [Sno, TotV, Silver, Gold, Platinum, Red, NonRed, Type], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Failed to update data', details: err.message });
    } else {
      res.json({ message: 'Record updated successfully' });
    }
  });
});

app.delete('/api/ninfo/:Type', (req, res) => {
  const Type = req.params.Type;

  const deleteQuery = 'DELETE FROM ninfo WHERE Type=?';
  db.query(deleteQuery, [Type], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Failed to delete data', details: err.message });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  });
});
// Ninfo end

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
