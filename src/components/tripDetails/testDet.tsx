import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Row, Col, Modal } from "react-bootstrap";
import { TripPlanApi } from "../../services/TripPlanApi";
import { travelTypesOptions } from "../forms/travelTypes";
import { languageOptions } from "../forms/languages";
import { accommodationOptions } from "../forms/AccommodationOption";
import { TripPlan, Transport, CityPlan } from "../../interfaces/TripPlan";
import '../../index.css';

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<TripPlan | null>(null);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTravelTypeLabel = (value: string): string => {
    const match = travelTypesOptions.find((option) => option.value === value);
    return match ? match.label : value;
  };

  const getAccommodationLabel = (value: string): string => {
    const match = accommodationOptions.find((option) => option.value === value);
    return match ? match.label : value;
  };

  const getLanguageLabels = (values: string[]): string[] => {
    return values.map((value) => {
      const match = languageOptions.find((option) => option.value === value);
      return match ? match.label : value;
    });
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await TripPlanApi.get();
        setTrips(response);
      } catch (err) {
        setError("Failed to load trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleCardClick = (trip: TripPlan) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {trips.map((trip) => (
        <Card
          className="mb-4 shadow-sm"
          key={trip.id}
          onClick={() => handleCardClick(trip)}
          style={{ cursor: "pointer" }}
        >
          <Row className="g-0">
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <Card.Img
                src={trip.cityPlans[0]?.image_url || "https://via.placeholder.com/150"}
                alt={`${trip.title} thumbnail`}
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "325px",
                  maxHeight: "325px",
                }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.30rem", fontWeight: "bold" }}>
                  {trip.title}
                </Card.Title>
                <Card.Text
                  className="mb-3"
                  style={{
                    fontSize: "1.10rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>
                    {trip.cityPlans
                      .map((cityPlan) => {
                        const location = cityPlan.originLocation;
                        return `${location.includes(",") ? location.split(",")[0] : location}`;
                      })
                      .join(" -> ")}
                  </strong>
                </Card.Text>
                <Row>
                  <Col md={6}>
                    <Card.Text>
                      <strong>Start Date:</strong> {formatDate(trip.startDate)} <br />
                      <strong>End Date:</strong> {formatDate(trip.endDate)} <br />
                      <strong>Languages:</strong> {getLanguageLabels(trip.languages).join(", ")} <br />
                      <strong>Age:</strong> {trip.age.min} - {trip.age.max} y.o. <br />
                      <strong>Budget:</strong> ${trip.budget} <br />
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <Card.Text>
                      <strong>Type of travel:</strong> {getTravelTypeLabel(trip.typeTravel)} <br />
                      <strong>Gender Participants:</strong>{" "}
                      {trip.genderParticipants === 0
                        ? "Male"
                        : trip.genderParticipants === 1
                          ? "Female"
                          : trip.genderParticipants === 2
                            ? "Both"
                            : trip.genderParticipants === 3
                              ? "Other"
                              : ""}{" "}
                      <br />
                      <strong>With Children:</strong> {trip.withChildren ? "Yes" : "No"} <br />
                      <strong>Number of participants:</strong> {trip.groupType} <br />
                      <strong>Participants From Other Countries:</strong>{" "}
                      {trip.participantsFromOtherCountries ? "Yes" : "No"}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {/* Модальное окно */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal-width"
      >
        {selectedTrip && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedTrip.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {/* Левая часть с изображением и параметрами */}
                <Col md={4}>
                  <img
                    src={selectedTrip.cityPlans[0]?.image_url || "https://via.placeholder.com/150"}
                    alt={selectedTrip.title}
                    style={{
                      width: "100%",
                      height: "325px",
                      maxHeight: "325px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  />
                  <p>
                    <strong>Start Date:</strong> {formatDate(selectedTrip.startDate)} <br />
                    <strong>End Date:</strong> {formatDate(selectedTrip.endDate)} <br />
                    <strong>Languages:</strong> {getLanguageLabels(selectedTrip.languages).join(", ")} <br />
                    <strong>Age:</strong> {selectedTrip.age.min} - {selectedTrip.age.max} y.o. <br />
                    <strong>Type of travel:</strong> {getTravelTypeLabel(selectedTrip.typeTravel)} <br />
                    <strong>With Children:</strong> {selectedTrip.withChildren ? "Yes" : "No"} <br />
                    <strong>Number of participants:</strong> {selectedTrip.groupType} <br />
                    <strong>Participants From Other Countries:</strong>{" "}
                    {selectedTrip.participantsFromOtherCountries ? "Yes" : "No"} <br />
                  </p>
                </Col>
                {/* Правая часть с заголовком и описанием */}
                <Col md={8}>
                  <h4>
                    {selectedTrip.cityPlans
                      .map((cityPlan) => {
                        const location = cityPlan.originLocation;
                        return `${location.includes(",") ? location.split(",")[0] : location}`;
                      })
                      .join(" -> ")}
                  </h4>
                  <p style={{ marginTop: "10px" }}>{selectedTrip.description}</p>
                </Col>
              </Row>
              <hr />
              {/* Строки с городами */}
              <Row>
                {selectedTrip.cityPlans.map((cityPlan, index) => (
                  <Col md={6} key={index} className="mb-4">
                    <h5>{cityPlan.originLocation.split(",")[0]}</h5>
                    <p>
                      <strong>First day:</strong> {formatDate(cityPlan.startDate)} <br />
                      <strong>Last day:</strong> {formatDate(cityPlan.endDate)} <br />
                      <strong>Accommodation:</strong>{" "}
                      {getAccommodationLabel(cityPlan.accommodations[0].name)} <br />
                      <strong>Places to visit:</strong>{" "}
                      {cityPlan.places
                        .map((place) => {
                          const location = place.location;
                          return `${location.includes(",") ? location.split(",")[0] : location}`;
                        })
                        .join(", ")}
                      <br />
                    </p>
                  </Col>
                ))}
              </Row>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => alert("Respond clicked!")}>
                Respond
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>



    </div>
  );
};

export default TripList;
