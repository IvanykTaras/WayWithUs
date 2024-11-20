import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Select, { MultiValue, SingleValue } from 'react-select';
import { TripPlan } from '../../interfaces/TripPlan';
import { GenderParticipantsValueList } from '../../enums/GenderParticipants';
import { languageOptions, OptionType } from './languages';
import { travelTypesOptions, TravelTypeOption } from './travelTypes';

interface IGeneralInformationForm {
  dataTripPlan: {
    data: TripPlan;
    set: (e: TripPlan) => void;
  };
}

const GeneralInformationForm: React.FC<IGeneralInformationForm> = ({ dataTripPlan }) => {
  const [noDates, setNoDates] = useState(false);

  const handleLanguagesChange = (selectedOptions: MultiValue<OptionType>) => {
    const languages = selectedOptions.map((option) => option.value);
    dataTripPlan.set({ ...dataTripPlan.data, languages });
  };

  const handleTravelTypeChange = (selectedOption: SingleValue<TravelTypeOption>) => {
    const typeTravel = selectedOption ? selectedOption.value : '';
    dataTripPlan.set({ ...dataTripPlan.data, typeTravel });
  };

  const onGenderChange = (e: React.FormEvent<HTMLSelectElement>) => {
    dataTripPlan.set({ ...dataTripPlan.data, genderParticipants: Number(e.currentTarget.value) });
  };
  const handleNoDatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNoDates(checked);

    dataTripPlan.set({
      ...dataTripPlan.data,
      startDate: checked ? null : "", 
      endDate: checked ? null : ""
    });
  };
  
  return (
    <Container className="p-4" style={{ maxWidth: '700px' }}>
      <Form>
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

        <Row className="mb-3">
          <Col md={5}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={dataTripPlan.data.startDate ? dataTripPlan.data.startDate : "null" }
                onChange={(e) =>
                  dataTripPlan.set({
                    ...dataTripPlan.data,
                    startDate: e.target.value ? e.target.value : null,
                  })
                }
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
                onChange={(e) =>
                  dataTripPlan.set({
                    ...dataTripPlan.data,
                    endDate: e.target.value ? e.target.value : null,
                  })
                }
                disabled={noDates}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="No dates"
              checked={noDates}
              onChange={handleNoDatesChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="languages">
              <Form.Label>Languages</Form.Label>
              <Select
                isMulti
                options={languageOptions}
                value={languageOptions.filter((option) =>
                  dataTripPlan.data.languages && dataTripPlan.data.languages.includes(option.value)
                )}
                onChange={handleLanguagesChange}
                placeholder="Select languages..."
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="typeTravel">
              <Form.Label>Type of Travel</Form.Label>
              <Select
                options={travelTypesOptions}
                value={travelTypesOptions.find(
                  (option) => option.value === dataTripPlan.data.typeTravel
                )}
                onChange={handleTravelTypeChange}
                placeholder="Select type of travel..."
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="genderSelect">
              <Form.Label>Select Gender</Form.Label>
              <Form.Select aria-label="Default select example" onChange={onGenderChange}>
                {GenderParticipantsValueList.map((e, i) => (
                  <option key={i} value={i}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="budget">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                value={dataTripPlan.data.budget}
                onChange={(e) =>
                  dataTripPlan.set({ ...dataTripPlan.data, budget: Number(e.target.value) })}
              />
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
                onChange={(e) =>
                  dataTripPlan.set({
                    ...dataTripPlan.data,
                    age: { ...dataTripPlan.data.age, min: Number(e.target.value) },
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="maxAge">
              <Form.Label>Max Age of Participants</Form.Label>
              <Form.Control
                type="number"
                value={dataTripPlan.data.age.max}
                onChange={(e) =>
                  dataTripPlan.set({ ...dataTripPlan.data, age: { ...dataTripPlan.data.age, max: Number(e.target.value) },})}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="maxAge">
              <Form.Label>Number of participants</Form.Label>
              <Form.Control
                type="number"
                value={dataTripPlan.data.groupType}
                onChange={(e) =>
                  dataTripPlan.set({ ...dataTripPlan.data, groupType: Number(e.target.value) })}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="participantsFromOtherCountries">
              <Form.Check
                type="checkbox"
                label="Participants from Other Countries"
                checked={dataTripPlan.data.participantsFromOtherCountries}
                onChange={(e) => dataTripPlan.set({
                  ...dataTripPlan.data,
                  participantsFromOtherCountries: e.target.checked
                })}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="withChildren">
              <Form.Check
                type="checkbox"
                label="With Children"
                checked={dataTripPlan.data.withChildren}
                onChange={(e) => dataTripPlan.set({
                  ...dataTripPlan.data,
                  withChildren: e.target.checked
                })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" className="w-100">
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default GeneralInformationForm;
