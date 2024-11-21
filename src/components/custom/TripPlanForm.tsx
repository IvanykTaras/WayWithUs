import React, { useState } from 'react';
import { Container, Tabs, Tab, Button, Row, Col } from 'react-bootstrap';
import GeneralInformationForm from '../forms/GeneralInformationForm';
import CitiesPlanForm from '../forms/CitiesPlanForm';
import CityDetailsForm from '../forms/CityDetailsForm';
import { TripPlan } from '../../interfaces/TripPlan';
import { testTripPlan, TripPlanApi } from '../../services/TripPlanApi';

const TripPlanForm = () => {
  const [dataTripPlan, setDataTripPlan] = useState<TripPlan>(testTripPlan);
  const [activeTab, setActiveTab] = useState<string>('general');

  const generateTripPlan = async () => {
    await TripPlanApi.create(dataTripPlan);
  };

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
    <Container className="py-4" style={{ maxWidth: 800, padding: 0 }}>
      {/* Tab Navigation */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'general')} id="trip-form-tabs" className="mb-4">
        <Tab eventKey="general" title="General Information">
          <GeneralInformationForm
            dataTripPlan={{ data: dataTripPlan, set: (e: TripPlan) => setDataTripPlan(e) }}
          />
        </Tab>
        <Tab eventKey="trip" title="Trip">
          <CitiesPlanForm dataTripPlan={{ data: dataTripPlan, set: setDataTripPlan }} />
        </Tab>
        <Tab eventKey="details1" title="Details about city 1">
          <CityDetailsForm />
        </Tab>
        <Tab eventKey="details2" title="Details about city 2" />
      </Tabs>

      {/* Navigation Buttons */}
      <Row className="justify-content-between">
        <Col xs="auto">
          {activeTab !== 'general' && (
            <Button variant="primary" onClick={handlePrev}>
              Prev
            </Button>
          )}
        </Col>
        <Col xs="auto">
          {activeTab !== 'details2' ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={generateTripPlan}>
              Create Trip
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TripPlanForm;
