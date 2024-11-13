import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { FaBus, FaCar, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const CitiesPlanForm = () => {
  const [selectedTransport, setSelectedTransport] = useState<string>("");

  const transportOptions = [
    { icon: <FaBus />, label: 'Bus' },
    { icon: <FaCar />, label: 'Car' },
    { icon: <FaTrain />, label: 'Train' },
    { icon: <FaPlane />, label: 'Airplane' },
    { icon: <FaShip />, label: 'Boat' },
  ];

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex justify-content-between">
        {transportOptions.map((option, index) => (
          <Button
            key={index}
            variant="link"
            className="text-dark"
            onClick={() => setSelectedTransport(option.label)}
          >
            {option.icon}
          </Button>
        ))}
      </Popover.Body>
    </Popover>
  );

  return (
    <Container className="p-4" style={{ maxWidth: '500px' }}>
      {/* Cities From Input */}
      <Form.Group controlId="citiesFrom" className="mb-3">
        <Form.Control type="text" placeholder="Cities from" />
      </Form.Group>

      {/* Choose Transport Button */}
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="primary" className="w-100 mb-3">
          {selectedTransport ? (
            <>
              Transport: {transportOptions.find(option => option.label === selectedTransport)?.icon} {selectedTransport}
            </>
          ) : (
            'Choose transport'
          )}{' '}
          <span className="float-right">&#9776;</span>
        </Button>
      </OverlayTrigger>

      {/* Cities To Input */}
      <Form.Group controlId="citiesTo" className="mb-3">
        <Form.Control type="text" placeholder="Cities to" />
      </Form.Group>

      {/* Add City Button */}
      <Button variant="primary" className="w-100 mb-4">Add city</Button>

      {/* Prev and Next Buttons */}
      <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary">Prev</Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary">Next</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CitiesPlanForm;
