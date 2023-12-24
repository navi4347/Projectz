import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './Assets/world.json';
import { Card } from 'react-bootstrap';

const Content = () => {
  const mapData = {
    ...world,
    style: {
      fill: 'red',
      stroke: 'red',
    },
  };

  const mapContainerStyle = {
    outline: 'none',
  };

  // Array of background-color values for each card
  const cardColors = [
    'linear-gradient(45deg,#4099ff,#73b4ff)',
    'linear-gradient(45deg,#2ed8b6,#59e0c5)',
    'linear-gradient(45deg, rgba(129, 140, 248, 1) 0%, rgba(129, 140, 248, 0) 100%)',
    'linear-gradient(45deg,#FF5370,#ff869a)',
  ];

  // Array of information for each card
  const cardInfo = ['Seller Info', 'Vouchers', 'Clients', 'Employees'];

  return (
    <div className="mt-4">
      <Container>
        <Row>
          {[0, 1, 2, 3].map((index) => (
            <Col lg={3} key={index}>
              <Card style={{ background: cardColors[index], color: '#ffffff' }}>
                <Card.Body>
                  <p><strong>Important:</strong> {cardInfo[index]}</p>
                  <p>Example of additional information in a card body.</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mt-4">
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
