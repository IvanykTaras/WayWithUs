import { Card, ButtonGroup, Button, Row, Col, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { languageOptions } from "../forms/languages";
import { travelTypesOptions } from "../forms/travelTypes";
import { accommodationOptions } from "../forms/AccommodationOption";
import { useContext, useEffect, useState } from "react";
import { TripPlan } from "../../interfaces/TripPlan";
import { dataContext, DataEnum } from "../../App";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { AsyncAction } from "../../utils";
import { toast } from "react-toastify";
import { TripPlanApi } from "../../services/TripPlanApi";
import { AxiosError } from "axios";
import { FaArrowLeft } from "react-icons/fa";

export const TripDetails: React.FC = () => {
  const [tripView, setTripView] = useState<{ trip: TripPlan; user: IGoogleUser }>();
  const context = useContext(dataContext);
  const { trip_plan_id } = useParams<{ trip_plan_id: string }>();
  const navigate = useNavigate(); 

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    setTripView(()=>context[DataEnum.TripView].value);
    console.log(tripView)
  }, [context]);

  const handleBack = () => {
    navigate(-1); 
  };


  function checkUserInParticipants(participants: string[]){
    console.log(participants);

    const userId = context[DataEnum.User].value.id;
    console.log(userId)
    return participants.includes(userId);
  }

  async function addParticipant(tripId:string){
    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise( 
          async () => {
            const userId = context[DataEnum.User].value.id;
            await TripPlanApi.addParticipant(tripId, userId);
          },
          {
            pending: 'load participant add',
            success: 'participant added 👌',
            error: 'some error 🤯'
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error)
        toast.error(e.code);
        toast.error(e.message);
      }
    });
  }
  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4">
      <Row className="g-0 align-items-start">
        <Col md={4}>
          <div className="d-flex align-items-start justify-content-center p-3">
            <Card.Img
              src={tripView?.trip.cityPlans[0]?.image_url || "https://via.placeholder.com/150"}
              alt={`${tripView?.trip.title || "Trip"} thumbnail`}
              className="img-fluid rounded-4 shadow-sm"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                maxHeight: "325px",
              }}
            />
          </div>
        </Col>

        <Col md={8}>
          <Card.Body className="p-4">
            <Card.Title
              className="d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <span className="text-primary">{tripView?.trip.title}</span>
              <Badge bg="info" className="text-uppercase">Created by {tripView?.user.name || "Creator"}</Badge>
            </Card.Title>
            <Card.Text
              className="mb-3 text-muted"
              style={{
                fontSize: "1.1rem",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              <strong>Route:</strong>{" "}
              {tripView?.trip.cityPlans
                ?.map((cityPlan) => {
                  const location = cityPlan.originLocation;
                  return location.includes(",") ? location.split(",")[0] : location;
                })
                .join(" -> ")}
              <br />
              <br />
              <strong>About trip:</strong>
              <p className="text-secondary">{tripView?.trip.description}</p>
            </Card.Text>
            <Row>
              <Col md={6}>
                <Card.Text>
                  <strong>Start Date:</strong> {formatDate(tripView?.trip.startDate ?? null)} <br />
                  <strong>End Date:</strong> {formatDate(tripView?.trip.endDate ?? null)} <br />
                  <strong>Languages:</strong>{" "}
                  {tripView?.trip.languages.map((lang, index) => (
                    <span key={index}>
                      {languageOptions.find((l) => l.value === lang)?.label},{" "}
                    </span>
                  ))}{" "}
                  <br />
                  <strong>Age:</strong> {tripView?.trip.age.min} - {tripView?.trip.age.max} y.o.{" "}
                  <br />
                  <strong>Budget:</strong> ${tripView?.trip.budget} <br />
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text>
                  <strong>Type of travel:</strong>{" "}
                  {travelTypesOptions.find((t) => t.value === tripView?.trip.typeTravel)?.label}{" "}
                  <br />
                  <strong>Gender Participants:</strong>{" "}
                  {GenderParticipantsValueList[tripView?.trip.genderParticipants || 0]} <br />
                  <strong>With Children:</strong> {tripView?.trip.withChildren ? "Yes" : "No"}{" "}
                  <br />
                  <strong>Participants:</strong> {tripView?.trip.participants.length}/{tripView?.trip.groupType} <br />
                  <strong>Participants From Other Countries:</strong>{" "}
                  {tripView?.trip.participantsFromOtherCountries ? "Yes" : "No"}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {tripView?.trip.cityPlans.map((cityPlan, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: index < tripView.trip.cityPlans.length - 1 ? "5px" : "20px", 
                      marginTop: "15px", 
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold", 
                        marginRight: "10px",
                        fontSize: "1rem", 
                      }}
                    >
                      Planned places in {cityPlan.originLocation.split(",")[0]}:
                    </span>
                    <span>
                      {cityPlan.places
                        .map((place) => {
                          const location = place.location;
                          return `${location.includes(",") ? location.split(",")[0] : location}`;
                        })
                        .join(", ")}
                    </span>
                  </div>
                ))}
              </Col>
            </Row>

          </Card.Body>
        </Col>
      </Row>
      <Card.Footer className="d-flex justify-content-between align-items-center p-3">
        <ButtonGroup>         
          <Button variant="outline-secondary" className="rounded-4 px-4" onClick={handleBack}>
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};
