import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, ButtonGroup, Col } from "react-bootstrap";
import { TripPlanApi } from "../../services/TripPlanApi";
import { toast } from "react-toastify";
import { TripPlan } from "../../interfaces/TripPlan";
import { AsyncAction } from "../../utils";
import { dataContext, DataEnum, message } from "../../App";
import { AxiosError } from "axios";
import styled from "styled-components";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { languageOptions } from "../forms/languages";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { travelTypesOptions } from "../forms/travelTypes";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../services/UserApi";
import { FaArrowRight } from "react-icons/fa";
import ChatApp from "../chat/ChatApp";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

interface TripListProps {
  trips: TripPlan[];
  users: IGoogleUser[];
}

const TripList: React.FC<TripListProps> = ({ trips, users }) => {
  const navigate = useNavigate();
  const context = useContext(dataContext);

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

  async function removeParticipant(tripId:string){
    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise( 
          async () => {
            const userId = context[DataEnum.User].value.id;
            await TripPlanApi.removeParticipant(tripId, userId);
          },
          {
            pending: 'load participant remove',
            success: 'participant removed 👌',
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
  (trip) => trip.participants.length < trip.groupType
);


   const getTravelTypeLabel = (value: string): string => {
      const match = travelTypesOptions.find((option) => option.value === value);
      return match ? match.label : value;
    };
 
  function checkUserInParticipants(participants: string[]){
    const userId = context[DataEnum.User].value.id;
    return participants.includes(userId);
  }

    const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

   const getLanguageLabels = (values: string[]): string[] => {
      return values.map((value) => {
        const match = languageOptions.find((option) => option.value === value);
        return match ? match.label : value;
      });
    };


  async function Details(id: string) {
    await downloadTripAndUser(id);
    navigate(`/trip/${id}`);
  }

  async function tripCard(id: string) {
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

  return ( 
    <div>
      {filteredTrips.map((trip, index) => (
        <Card className="mb-4 shadow-sm position-relative" key={index}>
          {checkUserInParticipants(trip.participants) && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "yellow",
                color: "blue",
                fontWeight: "bold",
                padding: "5px 10px",
                borderRadius: "5px",
                zIndex: 1,
              }}
            >
              You are already a participant
            </div>
          )}

          <Row>
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
            <Col md={4} className="d-flex align-items-center justify-content-center">
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
                          {index < trip.cityPlans.length - 1 && (
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
          <Card.Footer>
            <ButtonGroup>
              {!checkUserInParticipants(trip.participants) ? (
                <>
                  <Button variant="success" onClick={() => addParticipant(trip.id as string)}>
                    Join
                  </Button>
                  <Button variant="info" onClick={() => Details(trip?.id as string)}>
                    Details
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={() => tripCard(trip.id as string)}>
                    Open
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Card.Footer>
        </Card>

      ))}



      {/* <Modal 
        size="lg"
        show={context[DataEnum.Show].value}
        onHide={()=>context[DataEnum.Show].set(false)}
        >
        <ChatApp room={room}/>
      </Modal> */}
    </div>
  );
};




export const Div = styled.div`
.badge{
  font-size: 14px;
  color: black;
}

samp{
display: inline-block;
margin: .25rem 0;
margin-right: .5rem;
}
`
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? '...' + text.slice(text.length-maxLength, text.length)  : text;
};

export default TripList;
