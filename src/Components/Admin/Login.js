import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import './Style.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Select');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.percient);
        setError('');

        if (userType === 'Admin') {
          navigate('/Admin');
        } else if (userType === 'User') {
          navigate('/User');
        }
      } else {
        const data = await response.json();
        setToken('');
        setError(data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      setToken('');
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='login'>
      <div className='left'>
      <h1 style={{ color: '#3498db' }}>Project Z</h1>
      </div>
      <div className='border'></div>
      <div className='right'>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label='Username'
              type='text'
              id='username'
              className='tff customTextField'
              value={username}
              placeholder='Username'
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label='Password'
              type='password'
              id='password'
              className='tff customTextField'
              value={password}
              autoComplete='off'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <FormControl>
              <Select
                value={userType}
                className='tff customSelect'
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <MenuItem value='Select'>Select</MenuItem>
                <MenuItem value='Admin'>Admin</MenuItem>
                <MenuItem value='User'>User</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button className='tff customTextField'variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </form>
        {token && <p>Token: {token}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
