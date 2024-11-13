import React, { useState } from 'react';
import { Container, Nav, Tabs, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import { TripPlan } from '../../interfaces/TripPlan';
import { GenderParticipantsValueList } from '../../enums/GenderParticipants';

interface IGeneralInformationForm {
  dataTripPlan: {
    data: TripPlan
    set: (e: TripPlan) => void;
  }
}

const GeneralInformationForm: React.FC<IGeneralInformationForm> = ({ dataTripPlan }) => {
  const [noDates, setNoDates] = useState(false);

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const languages = e.target.value.split(',').map(lang => lang.trim());
    dataTripPlan.set({ ...dataTripPlan.data, languages });
  };

  const onGenderChange = (e: React.FormEvent<HTMLSelectElement>) => { dataTripPlan.set({ ...dataTripPlan.data, genderParticipants: Number(e.currentTarget.value) }); }

  return (<>
    {/* Form */}
    <Form>
      {/* Trip Title and Description */}
      <Form.Group controlId="tripTitle" className="mb-3">
        <Form.Label>Trip Title</Form.Label>
        <Form.Control
          type="text"
          value={dataTripPlan.data.title}
          onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="tripDescription" className="mb-3">
        <Form.Label>Trip Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={dataTripPlan.data.description}
          onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, description: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" className="w-100 mb-4">Add image</Button>

      {/* Date Selection */}
      <Row className="mb-3">
        <Col md={5}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={dataTripPlan.data.startDate ? dataTripPlan.data.startDate : ""}
              onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, startDate: e.target.value ? e.target.value : null })}
              disabled={noDates}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={dataTripPlan.data.endDate ? dataTripPlan.data.endDate : ""}
              onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, endDate: e.target.value ? e.target.value : null })}
              disabled={noDates}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            label="No dates"
            checked={noDates}
            onChange={(e) => setNoDates(e.target.checked)}
          />
        </Col>
      </Row>

      {/* Dropdowns */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="languages">
            <Form.Label>Languages</Form.Label>
            <Form.Control
              type="text"
              value={dataTripPlan.data.languages ? dataTripPlan.data.languages.join(', ') : ''}
              onChange={handleLanguagesChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="typeTravel">
            <Form.Label>Type of Travel</Form.Label>
            <Form.Control
              type="text"
              value={dataTripPlan.data.typeTravel}
              onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, typeTravel: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="genderSelect">
            <Form.Label>Select Gender</Form.Label>
            <Form.Select aria-label="Default select example" onChange={onGenderChange}>
              {(GenderParticipantsValueList).map((e, i) => (<option value={i}>{e}</option>))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="minAge">
            <Form.Label>Min Age of Participants</Form.Label>
            <Form.Control
              type="number"
              value={dataTripPlan.data.age.min}
              onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, age: { ...dataTripPlan.data.age, min: Number(e.target.value) } })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="maxAge">
            <Form.Label>Max Age of Participants</Form.Label>
            <Form.Control
              type="number"
              value={dataTripPlan.data.age.max}
              onChange={(e) => dataTripPlan.set({ ...dataTripPlan.data, age: { ...dataTripPlan.data.age, max: Number(e.target.value) } })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="participantsFromOtherCountries">
            <Form.Label>Participants from Other Countries</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="withChildren">
            <Form.Label>With Children</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="budget">
            <Form.Label>Budget</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>

      {/* Next Button */}
      <Button variant="primary" className="w-100">Next</Button>
    </Form>
  </>
  );
};

export default GeneralInformationForm;
