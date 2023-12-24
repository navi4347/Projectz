import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './Assets/world.json';

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

  return (
    <Container>
      <Row>
        <Col lg={3}>
          1 of 4
        </Col>
        <Col lg={3}>
          2 of 4
        </Col>
        <Col lg={3}>
          3 of 4
        </Col>
        <Col lg={3}>
          4 of 4
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          1 of 3
        </Col>
        <Col lg={6} style={mapContainerStyle}>
          <VectorMap {...mapData} />
        </Col>
      </Row>
    </Container>
  );
}

export default Content;
