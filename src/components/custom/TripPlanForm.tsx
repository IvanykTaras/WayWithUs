import React, { useContext, useState } from "react";
import { Container, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import GeneralInformationForm from "../forms/GeneralInformationForm";
import CitiesPlanForm from "../forms/CitiesPlanForm";
import CityDetailsForm from "../forms/CityDetailsForm";
import { TripPlan, CityPlan } from "../../interfaces/TripPlan";
import { TripPlanApi, tripPlanMock } from "../../services/TripPlanApi";
import textShortener from "../../hooks/useTextShortener";
import { toast } from "react-toastify";
import { dataContext, DataEnum } from "../../App";
import { AsyncAction } from "../../utils";
import { AxiosError } from "axios";
import { FaRobot } from "react-icons/fa";
import { Loadding } from "./Loadding";
import { Notification } from "../AuthModal";
import { NotifyApi } from "../../services/NotifyApi";

const TripPlanForm = () => {
  const [dataTripPlan, setDataTripPlan] = useState<TripPlan>(tripPlanMock);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [isTripGenerated, setIsTripGenerated] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const data = useContext(dataContext);

  const validateTripPlan = (): string[] => {
    const requiredFields: string[] = [];
    const {
      title,
      description,
      languages,
      age,
      genderParticipants,
      withChildren,
      budget,
      groupType,
      typeTravel,
      participantsFromOtherCountries,
      openForBussines,
    } = dataTripPlan;

    if (!title) requiredFields.push("title");
    if (!description) requiredFields.push("description");
    if (!languages.length) requiredFields.push("languages");
    if (!age.min) requiredFields.push("age.min");
    if (!age.max) requiredFields.push("age.max");
    if (genderParticipants === undefined) requiredFields.push("genderParticipants");
    if (withChildren === undefined) requiredFields.push("withChildren");
    if (!budget) requiredFields.push("budget");
    if (!groupType) requiredFields.push("groupType");
    if (!typeTravel) requiredFields.push("typeTravel");
    if (participantsFromOtherCountries === undefined) requiredFields.push("participantsFromOtherCountries");
    if (openForBussines === undefined) requiredFields.push("openForBussines");

    return requiredFields;
  };

  const generateTripPlan = async () => {
    const missingFields = validateTripPlan();
    if (missingFields.length) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    await AsyncAction(data[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            dataTripPlan.userId = data[DataEnum.User].value?.id ?? "default-user-id";
            await TripPlanApi.create(dataTripPlan);

            // Отправляем уведомление через SignalR
            const newNotification: Notification = {
              user: data[DataEnum.User].value.name,
              title: "New Trip Created",
              notification: `${data[DataEnum.User].value.name} created a trip: ${dataTripPlan.title}`,
            };

            const notifyApi = new NotifyApi();
            await notifyApi.notificationSubscribe(newNotification);

            toast.success("Trip created successfully! 👌");
          },
          {
            pending: "Creating trip...",
            success: "Trip created successfully 👌",
            error: "Failed to create trip 🤯",
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(e);
        toast.error(e.message);
        toast.error(e.code);
      }
    });
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

  const handleAiGenerateTripAndEdit = async () => {
    try {
      await toast.promise(
        async () => {
          setLoadding(true);
          const generatedTrip: TripPlan = await TripPlanApi.aiGenerateTripPlanDontSave(
            data[DataEnum.User].value.id
          );
          setDataTripPlan(() => generatedTrip);
          setLoadding(false);
        },
        {
          pending: "Generating trip...",
          success: "Trip generated 👌",
          error: "Failed to generate trip 🤯",
        }
      );
    } catch (e) {
      const error: AxiosError = e as AxiosError;
      console.error(error);
      toast.error(error.message);
      toast.error(error.code);
    }
  };

  return loadding ? (
    <Loadding />
  ) : (
    <Container className="py-4" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold mb-4 d-flex justify-content-between align-items-center">
        Create your own trip
        <Button className="btn-custom" onClick={handleAiGenerateTripAndEdit} disabled={isTripGenerated}>
          <FaRobot size={18} /> Fill inputs with AI
        </Button>
      </h1>

      {/* Tab Navigation */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "general")} id="trip-form-tabs" className="mb-4">
        <Tab eventKey="general" title="General Information">
          <GeneralInformationForm
            dataTripPlan={{ data: dataTripPlan, set: setDataTripPlan }}
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
          {activeTab === getTabOrder()[getTabOrder().length - 1] ? (
            <Button variant="success" onClick={generateTripPlan}>
              Create Trip
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TripPlanForm;
