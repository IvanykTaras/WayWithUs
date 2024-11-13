import React, { useState } from 'react';
import { Container, Nav, Tabs, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import GeneralInformationForm from '../forms/GeneralInformationForm';
import CitiesPlanForm from '../forms/CitiesPlanForm';
import CityDetailsForm from '../forms/CityDetailsForm';
import { TripPlan } from '../../interfaces/TripPlan';
import { testTripPlan, TripPlanApi } from '../../services/TripPlanApi';

const TripPlanForm = () => {

  const [dataTripPlan, setDataTripPlan] = useState<TripPlan>(testTripPlan);
  

  const generateTripPlan = async () => {
    await TripPlanApi.create(dataTripPlan)
  }

  return (
    <Container className="py-4">
      {/* Top Navigation */}
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          <Button variant="primary" className="mx-1">Search</Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="primary" className="mx-1">Create</Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="primary" className="mx-1">Liked</Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="primary" className="mx-1">Profile</Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="primary" className="mx-1">Business</Button>
        </Nav.Item>
      </Nav>

      {/* Tab Navigation */}
      <Tabs defaultActiveKey="general" id="trip-form-tabs" className="mb-4">
        <Tab eventKey="general" title="General Information">
            <GeneralInformationForm dataTripPlan = {{data:dataTripPlan, set: (e:TripPlan)=>setDataTripPlan(e)}} />
        </Tab>
        <Tab eventKey="trip" title="Trip">
          <CitiesPlanForm/>
        </Tab>
        <Tab eventKey="details1" title="Details about city 1">
          <CityDetailsForm/>
        </Tab>
        <Tab eventKey="details2" title="Details about city 2" />
      </Tabs>

      <Button variant="success" className="w-100 mt-2" onClick={()=>generateTripPlan()}>Save</Button>
      
    </Container>
  );
};

export default TripPlanForm;
