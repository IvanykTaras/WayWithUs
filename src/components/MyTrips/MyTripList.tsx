import React, { useContext, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { travelTypesOptions } from "../forms/travelTypes";
import { languageOptions } from "../forms/languages";
import { accommodationOptions } from "../forms/AccommodationOption";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TripPlanApi } from "../../services/TripPlanApi";
import { TripPlan } from "../../interfaces/TripPlan";
import { AsyncAction } from "../../utils";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { dataContext, DataEnum } from "../../App";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../services/UserApi";
import '../../index.css';
import { FaArrowRight } from "react-icons/fa";

interface MyTripListProps {
  trips: TripPlan[];
  users: IGoogleUser[];
}

const MyTripList: React.FC<MyTripListProps> = ({ trips, users }) => {
  const navigate = useNavigate();
  const context = useContext(dataContext);

  const user: IGoogleUser = context[DataEnum.User].value;
  

  async function TripCard(id: string) {
    await downloadTripAndUser(id);
    navigate(`/my-trips/${id}`);
  }

  async function downloadTripAndUser(tripId: string) {
    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            const trip: TripPlan = await TripPlanApi.getById(tripId);
            const user: IGoogleUser = await UserApi.getUserById(trip.userId);
            context[DataEnum.TripView].set({
              trip: trip,
              user: user
            })
          },
          {
            pending: 'load trip',
            success: 'trip downloaded 👌',
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

  const filteredTrips = trips.filter(
    (trip) =>
      trip.participants.includes(user.id!)
  );


  useEffect(() => {
    context[DataEnum.DownloadTrips].set(!context[DataEnum.DownloadTrips].value);
  }, []);

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

  return (
    <div>
      {filteredTrips.map((trip: TripPlan, index: number) => (
        <Card
          className="mb-4 shadow-sm"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => TripCard(trip?.id as string)}
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
                    {trip.cityPlans.map((cityPlan, index) => {
                      const location = cityPlan.originLocation;
                      const city = location.includes(",") ? location.split(",")[0] : location;

                      return (
                        <span key={index}>
                          {city}
                          {index < trip.cityPlans.length - 1  && (
                             <> <FaArrowRight /> </>
                          )}
                        </span>
                      );
                    })}
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
                      <strong>Participants:</strong> {trip.participants.length}/{trip.groupType} <br />
                      <strong>Participants From Other Countries:</strong>{" "}
                      {trip.participantsFromOtherCountries ? "Yes" : "No"} <br />
                      <strong>Creator:</strong>{" "}
                      {users.find((u) => u.id === trip.userId)
                        ? users.find((u) => u.id === trip.userId)?.name
                        : "Anonymous"}{" "}
                      <br />
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default MyTripList;
