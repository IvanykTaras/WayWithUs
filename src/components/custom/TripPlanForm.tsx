import React, { useState } from "react";
import { Container, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import GeneralInformationForm from "../forms/GeneralInformationForm";
import CitiesPlanForm from "../forms/CitiesPlanForm";
import CityDetailsForm from "../forms/CityDetailsForm";
import { TripPlan, CityPlan } from "../../interfaces/TripPlan";
import { testTripPlan, TripPlanApi } from "../../services/TripPlanApi";
import textShortener from "../../hooks/useTextShortener";

const TripPlanForm = () => {
  const [dataTripPlan, setDataTripPlan] = useState<TripPlan>(testTripPlan);
  const [activeTab, setActiveTab] = useState<string>("general");

  const generateTripPlan = async () => {
    await TripPlanApi.create(dataTripPlan);
  };

  const handlePrev = () => {
    const tabOrder = getTabOrder();
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const tabOrder = getTabOrder();
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const getTabOrder = () => {
    const cityDetailsTabs = dataTripPlan.cityPlans.map((_, index) => `details-${index}`);
    return ["general", "trip", ...cityDetailsTabs];
  };

  return (
    <Container className="py-4" style={{ maxWidth: 800, padding: 0 }}>
      {/* Tab Navigation */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "general")} id="trip-form-tabs" className="mb-4">
        <Tab eventKey="general" title="General Information">
          <GeneralInformationForm
            dataTripPlan={{ data: dataTripPlan, set: (e: TripPlan) => setDataTripPlan(e) }}
          />
        </Tab>
        <Tab eventKey="trip" title="Trip">
          <CitiesPlanForm dataTripPlan={{ data: dataTripPlan, set: setDataTripPlan }} />
        </Tab>
        {dataTripPlan.cityPlans.map((cityPlan, index) => (
          <Tab
            eventKey={`details-${index}`}
            key={`details-${index}`}
            title={textShortener(cityPlan.originLocation, 15)}
          >
            <CityDetailsForm
              index={index}
              cityPlan={{
                data: cityPlan,
                set: (updatedCityPlan: CityPlan) => {
                  const updatedCityPlans = dataTripPlan.cityPlans.map((plan, i) =>
                    i === index ? updatedCityPlan : plan
                  );
                  setDataTripPlan({ ...dataTripPlan, cityPlans: updatedCityPlans });
                },
              }}
            />
          </Tab>
        ))}
      </Tabs>

      {/* Navigation Buttons */}
      <Row className="justify-content-between">
        <Col xs="auto">
          {activeTab !== "general" && (
            <Button variant="primary" onClick={handlePrev}>
              Prev
            </Button>
          )}
        </Col>
        <Col xs="auto">
          {activeTab !== getTabOrder()[getTabOrder().length - 1] ? (
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
