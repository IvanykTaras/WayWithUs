import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export const TravelForm = () => {
  const [noDates, setNoDates] = useState(false);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <Button variant="outline-primary">Prev</Button>
        <div className="d-flex">
          <Button variant="primary" className="me-2">General Information</Button>
          <Button variant="outline-secondary" className="me-2">Trip</Button>
          <Button variant="outline-secondary" className="me-2">Details about city 1</Button>
          <Button variant="outline-secondary">Details about city 2</Button>
        </div>
        <Button variant="outline-primary">Next</Button>
      </div>
      
      <Form>
        <Form.Group controlId="tripTitle" className="mb-3">
          <Form.Control type="text" placeholder="The trip title" />
        </Form.Group>
        <Form.Group controlId="tripDescription" className="mb-3">
          <Form.Control as="textarea" rows={3} placeholder="Brief description of the trip" />
        </Form.Group>
        
        <Button variant="primary" className="mb-3">Add image</Button>

        <Row className="mb-3">
          <Col>
            <Form.Label>Start date</Form.Label>
            <Form.Control type="date" disabled={noDates} />
          </Col>
          <Col>
            <Form.Label>End date</Form.Label>
            <Form.Control type="date" disabled={noDates} />
          </Col>
        </Row>
        
        <Form.Check 
          type="checkbox" 
          label="No dates" 
          onChange={(e) => setNoDates(e.target.checked)} 
          className="mb-3"
        />

        <Row className="mb-3">
          <Col>
            <Form.Select>
              <option>Languages</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option>Main Objectives</option>
              <option>Relaxation</option>
              <option>Adventure</option>
              <option>Cultural Exploration</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select>
              <option>Type of travel</option>
              <option>Solo</option>
              <option>Couple</option>
              <option>Family</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option>Gender of participants</option>
              <option>Male</option>
              <option>Female</option>
              <option>Mixed</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select>
              <option>Age of participants</option>
              <option>18-30</option>
              <option>30-50</option>
              <option>50+</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option>Participants from other countries</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select>
              <option>With children</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option>Budget</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Select>
          </Col>
        </Row>

        <Form.Check 
          type="checkbox" 
          label="Receive offers from travel agencies" 
          className="mb-3"
        />

        <Button variant="primary">Next</Button>
      </Form>
    </div>
  );
};

export default TravelForm;