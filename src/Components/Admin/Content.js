import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './Assets/world.json';
import { Card } from 'react-bootstrap';
import SellerIcon from '@mui/icons-material/ViewInAr';
import ClientsIcon from '@mui/icons-material/Business';
import EmployeesIcon from '@mui/icons-material/SwitchAccount';
import VouchersIcon from '@mui/icons-material/CardGiftcard';

const Content = () => {
  const [data] = useState({
    sellers: 100,
    vouchers: 10000,
    clients: 500,
    employees: 10000,
  });

  const mapData = {
    ...world,
    style: {
      fill: '#1976d2',
      stroke: '#1976d2',
    },
  };

  const mapContainerStyle = {
    outline: 'none',
  };

  const cardColors = [
    '#007bff',
    '#ef5350',
    '#66bb6a',
    '#8278DA',
  ];

  const cardInfo = ['Sellers', 'Vouchers', 'Clients', 'Employees'];

  const cardIcons = [SellerIcon, VouchersIcon, ClientsIcon, EmployeesIcon];

  return (
    <div className="mt-3">
      <Container>
        <Row>
          {[0, 1, 2, 3].map((index) => (
            <Col lg={3} key={index}>
              <Card style={{ background: cardColors[index], color: '#ffffff' }}>
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      {React.createElement(cardIcons[index], { fontSize: 'large' })}
                    </div>
                    <div>
                      <p>{cardInfo[index]}</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-0">{data[cardInfo[index].toLowerCase()]}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mt-3">
          <Row>
            <Col lg={6}>1 of 3</Col>
            <Col lg={6} style={mapContainerStyle}>
              <VectorMap {...mapData} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Content;
