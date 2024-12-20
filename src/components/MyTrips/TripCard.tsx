import React from "react";
import { OverlayTrigger, Tooltip, Card, ButtonGroup, Button, Row, Col, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { languageOptions } from "../forms/languages";
import { travelTypesOptions } from "../forms/travelTypes";
import { accommodationOptions } from "../../components/forms/AccommodationOption";
import { Transport } from "../../interfaces/TripPlan";
import { useContext, useEffect, useState } from "react";
import { TripPlan } from "../../interfaces/TripPlan";
import { dataContext, DataEnum } from "../../App";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { ImageCarousel } from "./ImageCarousel";
import { FaClipboard, FaComments, FaArrowLeft, FaSignOutAlt, FaEdit, FaUsers, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { AsyncAction } from "../../utils";
import { AxiosError } from "axios";
import { TripPlanApi } from "../../services/TripPlanApi";
import { UserApi } from "../../services/UserApi";
import { Loadding } from "../custom/Loadding";
import Markdown from "react-markdown";

export const TripCard: React.FC = () => {
  const [tripView, setTripView] = useState<{
    trip: TripPlan;
    user: IGoogleUser;
    users: IGoogleUser[];
  }>();
  

  const context = useContext(dataContext);
  const { trip_plan_id } = useParams<{ trip_plan_id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<string>("general");
  const [users, setUsers] = useState<IGoogleUser[]>([]);
  const [loadding, setLoading] = useState<boolean>(false);



  useEffect(()=>{

      (async ()=>{
        setLoading(true);
    
        console.log(trip_plan_id);
        const paritcipants = await TripPlanApi.paritcipants(trip_plan_id as string);
        setUsers(paritcipants);
        console.log(paritcipants);
        
        setLoading(false);
      })()
    
  },[]);

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
    setTripView(() => context[DataEnum.TripView].value);
  }, []);

  const handleBack = () => {
    navigate("/my-trips");
  };

  const handleCopiClick = () => {
    navigator.clipboard.writeText(tripView?.trip.id || "No title available").then(() => {
      toast.success("Trip title copied to clipboard!");
      toast.info("Trip ID: " + tripView?.trip.id);
    }).catch((err) => {
      toast.error("Failed to copy text: " + err);
    });
  };

  const loggedInUserId = context[DataEnum.User].value.id;
 
  async function deleteTrip(tripId: string) {
    if (!tripId) {
      toast.error("Trip ID is required to delete a trip.");
      return;
    }

    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            // Удаление поездки через API
            await TripPlanApi.deleteTrip(tripId);
          },
          {
            pending: "Deleting trip...",
            success: "Trip deleted successfully 👌",
            error: "Failed to delete trip 🤯",
          }
        );

        // Навигация после успешного удаления
        toast.info("Redirecting to My Trips...");
        navigate("/my-trips");
      } catch (error) {
        const e = error as AxiosError;
        console.error("Error during trip deletion:", e);
        toast.error(e.message || "An unexpected error occurred while deleting the trip.");
      }
    });
  }


  
  async function removeParticipant(tripId: string) {
    AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            await TripPlanApi.removeParticipant(tripId, context[DataEnum.User].value.id as string);
            navigate("/my-trips");
          },
          {
            pending: 'removing participant pending',
            success: 'Participant removed 👌',
            error: 'Promise rejected 🤯'
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error);
        toast.error(e.code);
        toast.error(e.message);
      }
    });
  }

  const handleRemoveUser = async (tripId: string, userId: string) => {
    if (!tripView?.trip.id) {
      toast.error("Trip ID is missing. Unable to remove participant.");
      return;
    }

    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise(
          async () => {
            await TripPlanApi.removeParticipant(tripView?.trip.id!, userId); 
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); 
            toast.success(`Participant with ID ${userId} removed successfully!`);
          },
          {
            pending: "Removing participant...",
            success: "Participant removed successfully 👌",
            error: "Failed to remove participant 🤯",
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error);
        toast.error(e.code || "Error removing participant.");
      }
    });
  };

  

  const handleUpdateClick = () => {
    if (tripView?.trip.id) {
      navigate(`/edit-trip/${tripView.trip.id}`); 
    } else {
      toast.error("Trip ID not found. Unable to update.");
    }
  };

  async function hadleShowChat(chatName: string) {
    navigate(`/chat/${chatName}/${tripView?.trip.id}`);
  }

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? '...' + text.slice(text.length - maxLength, text.length) : text;
  };

  return loadding ? <Loadding/> : (
    <Card className="mb-4 shadow border-0 rounded-4">
      <Card.Header className="p-3 d-flex justify-content-between align-items-left">
        <Button variant="outline-secondary" className="rounded-4 px-4" onClick={handleBack}>
          <FaArrowLeft className="me-2" /> Back
        </Button>
      </Card.Header>
      <Row className="g-0 align-items-start">
        <Col md={4}>
          <div className="d-flex align-items-start justify-content-center p-3">
            <Card.Img
              src={tripView?.trip.cityPlans[0]?.image_url || "https://via.placeholder.com/150"}
              alt={`${tripView?.trip.title || "Trip"} thumbnail`}
              className="img-fluid rounded-4 shadow-sm city-image"
            />
            
          </div>

          <div
            className="d-flex justify-content-center gap-2 mt-3"
            style={{
              padding: "0 15px",
              maxWidth: "100%",
              width: "auto", 
            }}
          >
            <Button
              variant="outline-secondary"
              className="rounded-4 px-4 d-flex align-items-center justify-content-center gap-2 border-1 flex-grow-1"
              onClick={handleCopiClick}
            >
              <FaClipboard size={18} />
              Copy
            </Button>

            <Button
              variant="outline-primary"
              className="rounded-4 d-flex align-items-center justify-content-center gap-2 border-1 flex-grow-1"
              onClick={() => hadleShowChat(`${truncateText(tripView?.trip?.id as string, 5)}, ${tripView?.trip.title}` as string)}
              >
              <FaComments size={18} />
              Chat
            </Button>

            <Button
              variant="outline-warning"
              className="rounded-4 d-flex align-items-center justify-content-center gap-2 border-1 flex-grow-1"
              onClick={() => {
                if (loggedInUserId === tripView?.trip.userId) {
                  handleUpdateClick(); 
                } else {
                  toast.warning("Only the trip creator can make changes"); 
                }
              }}
            >
              <FaEdit size={18} />
              Update
            </Button>

            <Button
              variant="outline-danger"
              className="rounded-4 d-flex align-items-center justify-content-center gap-2 border-1 flex-grow-1"
              onClick={() => {
                if (loggedInUserId === tripView?.trip.userId) {
                  deleteTrip(tripView?.trip.id as string); 
                } else {
                  removeParticipant(tripView?.trip.id as string);
                }
              }}
            >
              {loggedInUserId === tripView?.trip.userId ? (
                <>
                  <FaSignOutAlt size={18} />
                  Delete the trip
                </>
              ) : (
                <>
                  <FaSignOutAlt size={18} />
                  Leave
                </>
              )}
            </Button>

          </div>
          <div style={{ marginTop: "10px" }}>
            <Badge
              bg="info"
              className="text-uppercase p-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <h6
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <FaUsers size={18} className="me-2" />
                Participants: {tripView?.trip.participants.length}/{tripView?.trip.groupType}
              </h6>
              <div style={{ width: "100%" }}>
                {users.map((user, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "6px",
                      padding: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#495057",
                        fontSize: "0.9rem",
                      }}
                    >
                      <FaUser size={18} className="me-2" />
                      {user.name}
                    </span>
                    {loggedInUserId === tripView?.trip.userId && user.id !== tripView?.trip.userId && ( // Условие
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{
                          border: "none",
                          padding: "2px 6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (tripView?.trip.id) {
                            handleRemoveUser(tripView.trip.id, user?.id!);
                          } else {
                            toast.error("Trip ID is missing. Unable to remove participant.");
                          }
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Badge>
          </div>

        </Col>

        <Col md={8}>
          <Card.Body className="p-4">
            <Card.Title
              className="d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              <span className="text-primary">{tripView?.trip.title}</span>
              <Badge bg="info" className="text-uppercase">
                Created by {tripView?.user.name || "Creator"}
              </Badge>
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
              <Markdown>{tripView?.trip.description}</Markdown>
            </Card.Text>

            {/* Информация о поездке */}
            <Row style={{ 
              marginBottom: "30px", 
              }}>
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

            {/* Города и транспорт */}
            <Row>
              <Col md={12}>
                {tripView?.trip.cityPlans.map((cityPlan, index) => (
                  <React.Fragment key={index}>
                    <Card className="mb-4 shadow border-0 rounded-4">
                      <Row className="g-0 align-items-center">
                        <Col md={4}>
                          <div className="d-flex align-items-start justify-content-center p-3">
                            <ImageCarousel
                              images={cityPlan.places.map((place) => place.image_url || "https://via.placeholder.com/150")}
                            />
                          </div>
                        </Col>
                        <Col md={8}>
                          <Card.Body className="p-4">
                            <Card.Title
                              className="d-flex justify-content-between align-items-center"
                              style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                            >
                              <span className="text-secondary">{cityPlan.originLocation.split(",")[0]}</span>
                            </Card.Title>
                            <Card.Text
                              className="mb-3 text-muted"
                              style={{
                                fontSize: "1rem",
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                              }}
                            >
                              <p>
                                We arrive in {cityPlan.originLocation.split(",")[0]} on{" "}
                                <strong>{formatDate(cityPlan.startDate ?? null)}</strong> and want to leave
                                on <strong>{formatDate(cityPlan.endDate ?? null)}</strong>
                              </p>
                              <br />
                              <strong>About {cityPlan.originLocation.split(",")[0]}:</strong>{" "}
                              <Markdown>{cityPlan.description || "No description available"}</Markdown>
                              
                              <br />
                              <strong>Accommodation: </strong>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                <a
                                  href={cityPlan.accommodations[0]?.googleMapUrl || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: "rgba(33, 37, 41, 0.75)",
                                  }}
                                >
                                  {accommodationOptions.find((option) => option.value === cityPlan.accommodations[0]?.name)?.label ||
                                    cityPlan.accommodations[0]?.name || "No accommodation specified"} —{" "}
                                  {cityPlan.accommodations[0]?.location_acc.split(",")[0] || "No location specified"}
                                </a>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      {cityPlan.accommodations[0]?.description || "No description available"}
                                    </Tooltip>
                                  }
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      backgroundColor: "rgba(33, 37, 41, 0.2)",
                                      color: "rgba(33, 37, 41, 0.75)",
                                      fontSize: "14px",
                                      textAlign: "center",
                                      lineHeight: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    ?
                                  </span>
                                </OverlayTrigger>
                              </div>
                              <br />
                              <strong>We plan to visit:</strong>
                              <ul className="mt-2">
                                {cityPlan.places.map((place, placeIndex) => (
                                  <li key={placeIndex} className="mb-2">
                                    <a
                                      href={place.googleMapUrl || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: "rgba(33, 37, 41, 0.75)",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {place.location.split(",")[0]}:
                                    </a>{" "}
                                    <Markdown>{place.details || "No details available"}</Markdown>
                                  </li>
                                ))}
                              </ul>
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>

                    {index < tripView.trip.cityPlans.length - 1 && (
                      <>
                        <div
                          className="text-center shadow my-3 text-muted"
                          style={{
                            backgroundColor: "#f8f9fa",
                            padding: "10px",
                            borderRadius: "10px",
                            fontSize: "1.1rem",
                            margin: "20px 0",
                            textAlign: "center",
                          }}
                        >
                          We will get from <strong>{cityPlan.originLocation.split(",")[0]}</strong> to{" "}
                          <strong>{tripView.trip.cityPlans[index + 1]?.originLocation.split(",")[0]}</strong> by{" "}
                          <strong>
                            {typeof cityPlan.transport === "number" ? Transport[cityPlan.transport] : "Unknown"}
                          </strong>.
                        </div>
                        <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />
                      </>
                    )}
                  </React.Fragment>
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
