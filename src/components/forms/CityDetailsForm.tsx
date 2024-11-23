import React from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaCalendarAlt, FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import { CityPlan } from "../../interfaces/TripPlan";

interface CityDetailsFormProps {
  cityPlan: CityPlan;
}

const CityDetailsForm: React.FC<CityDetailsFormProps> = ({ cityPlan }) => {
  return (
    <Container className="p-4" style={{ maxWidth: "600px" }}>
      <h5 className="mb-4">Details about {cityPlan.originLocation || "City"}</h5>
      <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="startDate">
              <Form.Label>First day</Form.Label>
              <Form.Control
                type="date"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>Last day</Form.Label>
              <Form.Control
                type="date"
              />
            </Form.Group>
          </Col>
        </Row>

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
    </Container>
  );
};

export default CityDetailsForm;
