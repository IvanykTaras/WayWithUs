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
    setTripView(context[DataEnum.TripView].value);
  }, [context]);

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4">
      <Row className="g-0 align-items-start">
        {/* Левая колонка с изображением */}
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

        {/* Средняя колонка с основной информацией */}
        <Col md={8}>
          <Card.Body className="p-4">
            <Card.Title
              className="d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <span className="text-primary">{tripView?.trip.title}</span>
              <Badge bg="info" className="text-uppercase">{tripView?.user.name || "Creator"}</Badge>
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
                  <strong>Number of participants:</strong> {tripView?.trip.groupType} <br />
                  <strong>Participants From Other Countries:</strong>{" "}
                  {tripView?.trip.participantsFromOtherCountries ? "Yes" : "No"}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              {tripView?.trip.cityPlans.map((cityPlan, index) => (
                <Col md={6} key={index} className="mb-4">
                  <Card className="shadow-sm rounded-4 border-0">
                    <Card.Body>
                      <h5 style={{ marginTop: index > 0 ? "20px" : "0px" }} className="text-dark">
                        {cityPlan.originLocation.split(",")[0]}
                      </h5>
                      <p>
                        <strong>First day:</strong> {formatDate(cityPlan.startDate)} <br />
                        <strong>Last day:</strong> {formatDate(cityPlan.endDate)} <br />
                        <strong>Accommodation:</strong>{" "}
                        {
                          accommodationOptions.find(
                            (t) => t.value === cityPlan.accommodations[0].name
                          )?.label
                        }{" "}
                        <br />
                        <strong>Places to visit:</strong>{" "}
                        {cityPlan.places
                          .map((place) => {
                            const location = place.location;
                            return `${location.includes(",") ? location.split(",")[0] : location}`;
                          })
                          .join(", ")}
                        <br />
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Col>
      </Row>
      <Card.Footer className="d-flex justify-content-between align-items-center p-3">
        <ButtonGroup>
          <Button variant="outline-secondary" className="rounded-4 px-4" onClick={handleBack}>
            Back
          </Button>
          <Button variant="success" className="rounded-4 px-4">
            Join
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};
