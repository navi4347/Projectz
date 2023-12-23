import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './Assets/world.json'; // Make sure the path is correct

const Content = () => {
  // Assuming 'world' variable holds the map data
  const mapData = {
    ...world,
    // Additional map configuration if needed
  };

  return (
    <Container>
      <Row>
        <Col lg={4}>
          1 of 3
        </Col>
        <Col lg={4}>
          Variable width content
        </Col>
        <Col lg={4}>
          3 of 3
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          1 of 3
        </Col>
        <Col lg={6}>
          <VectorMap {...mapData} />
        </Col>
      </Row>
    </Container>
  );
}

export default Content;
