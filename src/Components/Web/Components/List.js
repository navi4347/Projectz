import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../User.css'
import Dropdown from 'react-bootstrap/Dropdown';

function List() {
  return (
    <div className='list d-none d-sm-block'>
    <div className='container'>
      <div className='row'>
        <div className='col'>
        <Dropdown className="cdropdown">
        <Dropdown.Toggle as="p" id="dropdown-basic">
        Mobiles
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">SAMSUNG</Dropdown.Item>
        <Dropdown.Item href="#/action-2">OPPO</Dropdown.Item>
        <Dropdown.Item href="#/action-3">APPLE</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
        <div className='col'>
        <Dropdown className="cdropdown">
        <Dropdown.Toggle as="p" id="dropdown-basic">
        Electronics
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Laptops</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Desktops</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Speakers</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
        <div className='col'>
        <Dropdown className="cdropdown">
        <Dropdown.Toggle as="p" id="dropdown-basic">
      Fashion
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Men</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Women</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Kids</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
        <div className='col'>
        <Dropdown className="cdropdown">
        <Dropdown.Toggle as="p" id="dropdown-basic">
        Appliances
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Smart TV</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Refrigerators</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Geysers</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
        <div className='col'>
        <Dropdown className="cdropdown">
        <Dropdown.Toggle as="p" id="dropdown-basic">
        Restarents
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Veg</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Non-Veg</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </div>
         </div>
    </div>
    </div>
  );
}
export default List;
