import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaSearch, FaEdit, FaTimes } from 'react-icons/fa';

const CityDetailsForm = () => {
  return (
    <Container className="p-4" style={{ maxWidth: '600px' }}>
      {/* Number of Days, Start Date, End Date, No Dates */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select>
            <option>Number of days</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <InputGroup>
            <Form.Control type="date" placeholder="Start date" />
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <Form.Control type="date" placeholder="End date" />
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <Form.Check type="checkbox" label="No dates" />
        </Col>
      </Row>

      {/* Plan for Each Day */}
      <Form.Group controlId="planForEachDay" className="mb-3">
        <Form.Control type="text" placeholder="Plan for each day" />
      </Form.Group>

      {/* Lodging Type and Location Search */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select>
            <option>Type of lodging</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Control type="text" placeholder="Searching for a location" />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Button variant="primary" className="w-100 mb-4">Add lodging documents</Button>

      {/* Transport Type and Preferred Cuisine */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select>
            <option>Type of transportation in the place</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select>
            <option>Preferred cuisine</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Activity at Location */}
      <Form.Group controlId="activityLocation" className="mb-3">
        <Form.Select>
          <option>The activity at this location</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" className="w-100 mb-4">Add a place to visit</Button>

      {/* Place to Visit (with Edit and Delete Icons) */}
      <InputGroup className="mb-3">
        <Form.Control type="text" placeholder="Muzeum Narodowe w Warszawie" />
        <InputGroup.Text>
          <FaEdit />
        </InputGroup.Text>
        <InputGroup.Text>
          <FaTimes />
        </InputGroup.Text>
      </InputGroup>

      {/* Transfer to City and Transfer Type */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select>
            <option>Transfer to the city 2</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select>
            <option>Transfer type</option>
          </Form.Select>
        </Col>
      </Row>
      <Button variant="primary" className="w-100 mb-4">Add transfer documents</Button>

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

export default CityDetailsForm;
