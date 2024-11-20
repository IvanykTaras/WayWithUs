import React, { useState } from 'react';
import { Container, Nav, Tabs, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import GeneralInformationForm from '../forms/GeneralInformationForm';
import CitiesPlanForm from '../forms/CitiesPlanForm';
import CityDetailsForm from '../forms/CityDetailsForm';
import { CityPlan, TripPlan } from '../../interfaces/TripPlan';
import { testTripPlan, TripPlanApi } from '../../services/TripPlanApi';

const TripPlanForm = () => {

  const [dataTripPlan, setDataTripPlan] = useState<TripPlan>(testTripPlan);
  const [dataCitiesPlan, setDataCitiesPlan] = useState<TripPlan>(testTripPlan);
  const [activeTab, setActiveTab] = useState<string>('general');

  const generateTripPlan = async () => {
    await TripPlanApi.create(dataTripPlan)
  }

  const handlePrev = () => {
    const tabOrder = ['general', 'trip', 'details1', 'details2'];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const tabOrder = ['general', 'trip', 'details1', 'details2'];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  return (
    <Container className="py-4" style={{maxWidth:800,padding:0}}>
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
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'general')} id="trip-form-tabs" className="mb-4">
        <Tab eventKey="general" title="General Information">
            <GeneralInformationForm dataTripPlan = {{data:dataTripPlan, set: (e:TripPlan)=>setDataTripPlan(e)}} />
        </Tab>
        <Tab eventKey="trip" title="Trip">
        <CitiesPlanForm dataTripPlan={{ data: dataTripPlan, set: setDataTripPlan }} />

        </Tab>
        <Tab eventKey="details1" title="Details about city 1">
          <CityDetailsForm/>
        </Tab>
        <Tab eventKey="details2" title="Details about city 2" />
      </Tabs>

      <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary" onClick={handlePrev} disabled={activeTab === 'general'}>Prev</Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleNext} disabled={activeTab === 'details2'}>Next</Button>
        </Col>
      </Row>

      <Button variant="success" className="w-100 mt-2" onClick={()=>generateTripPlan()}>Save</Button>
      
    </Container>
  );
};

export default TripPlanForm;
