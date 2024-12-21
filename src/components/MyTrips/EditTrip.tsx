import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import GeneralInformationForm from "../forms/GeneralInformationForm";
import CitiesPlanForm from "../forms/CitiesPlanForm";
import CityDetailsForm from "../forms/CityDetailsForm";
import { TripPlan, CityPlan } from "../../interfaces/TripPlan";
import { TripPlanApi } from "../../services/TripPlanApi";
import textShortener from "../../hooks/useTextShortener";
import { toast } from "react-toastify";
import { dataContext, DataEnum } from "../../App";
import { Loadding } from "../custom/Loadding";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { UserApi } from "../../services/UserApi";
import { AxiosError } from "axios";
import { Notification } from "../AuthModal";
import { NotifyApi } from "../../services/NotifyApi";

export const EditTrip: React.FC = () => {
  const { trip_plan_id: tripId } = useParams<{ trip_plan_id: string }>();
  const navigate = useNavigate();
  const data = useContext(dataContext);
  const [loadding, setLoadding] = useState(false);
  const [dataTripPlan, setDataTripPlan] = useState<TripPlan | null>(null);
  const [activeTab, setActiveTab] = useState<string>("general");

  useEffect(() => {
    const user = data[DataEnum.User].value;
    if (!user) {
      toast.warn("You need to log in to edit trips.");
      return;
    }

    (async () => {
      setLoadding(true);
      await fetchTripPlan();
      setLoadding(false);
    })();
  }, []);

  const fetchTripPlan = async () => {
    if (!tripId) {
      toast.error("Trip ID is missing. Unable to load trip.");
      return;
    }

    try {
      await toast.promise(
        async () => {
          const trip = await TripPlanApi.getById(tripId);
          setDataTripPlan(trip);
        },
        {
          pending: "Loading trip data...",
          success: "Trip data loaded successfully!",
          error: "Failed to load trip data.",
        }
      );
    } catch (error) {
      toast.error("Failed to load trip data.");
      console.error("Error fetching trip plan:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!dataTripPlan || !tripId) return;

    await toast.promise(
      async () => {
        try {
          await TripPlanApi.update(tripId, dataTripPlan);

          const editNotification: Notification = {
            user: data[DataEnum.User].value.name,
            title: "Trip Updated",
            notification: `${data[DataEnum.User].value.name} updated the trip: ${dataTripPlan.title}`,
          };

          // Отправляем уведомление через SignalR
          const notifyApi = new NotifyApi();
          await notifyApi.notificationSubscribe(editNotification);

          toast.info(`${editNotification.user} updated the trip: ${dataTripPlan.title}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          navigate(`/my-trips/${tripId}`);
        } catch (error) {
          const e = error as AxiosError;
          console.error(error);
          toast.error(e.code);
          toast.error(e.message);
        }
      },
      {
        pending: "Saving changes...",
        success: "Trip updated successfully! 🎉",
        error: "Failed to save changes. Please try again. 🤯",
      }
    );
  };

  const handlePrevTab = () => {
    const tabs = getTabOrder();
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleNextTab = () => {
    const tabs = getTabOrder();
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const getTabOrder = (): string[] => {
    if (!dataTripPlan) return [];
    const cityTabs = dataTripPlan.cityPlans.map((_, index) => `details-${index}`);
    return ["general", "trip", ...cityTabs];
  };

  if (!dataTripPlan) {
    return (
      <Container className="py-4 text-center">
        <h2>Loading trip data...</h2>
      </Container>
    );
  }

  return loadding ? (
    <Loadding />
  ) : (
    <Container className="py-4" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold mb-4">Edit Your Trip</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key || "general")}
        id="edit-trip-tabs"
        className="mb-4"
      >
        <Tab eventKey="general" title="General Information">
          <GeneralInformationForm
            dataTripPlan={{
              data: dataTripPlan,
              set: setDataTripPlan,
            }}
          />
        </Tab>
        <Tab eventKey="trip" title="Trip">
          <CitiesPlanForm
            dataTripPlan={{
              data: dataTripPlan,
              set: setDataTripPlan,
            }}
          />
        </Tab>
        {dataTripPlan.cityPlans.map((cityPlan, index) => (
          <Tab
            key={`details-${index}`}
            eventKey={`details-${index}`}
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

      <Row className="justify-content-between">
        <Col xs="auto">
          {activeTab !== "general" && (
            <Button variant="secondary" onClick={handlePrevTab}>
              Previous
            </Button>
          )}
        </Col>
        <Col xs="auto">
          {activeTab === getTabOrder()[getTabOrder().length - 1] ? (
            <Button variant="success" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNextTab}>
              Next
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
