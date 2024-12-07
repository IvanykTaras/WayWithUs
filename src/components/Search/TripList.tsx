import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Badge, ButtonGroup, Modal } from "react-bootstrap";
import { TripPlanApi } from "../../services/TripPlanApi";
import { toast } from "react-toastify";
import { TripPlan } from "../../interfaces/TripPlan";
import { AsyncAction } from "../../utils";
import { dataContext, DataEnum } from "../../App";
import { AxiosError } from "axios";
import styled from "styled-components";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { languageOptions } from "../forms/languages";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { travelTypesOptions } from "../forms/travelTypes";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../services/UserApi";
import ChatApp from "../chat/ChatApp";
import { HubConnectionBuilder } from "@microsoft/signalr";

interface TripListProps {
  trips: TripPlan[];
  users: IGoogleUser[];
}

const TripList: React.FC<TripListProps> = ({ trips, users }) => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
    
    
  async function Details(id:string){
    await downloadTripAndUser(id);
    navigate(`/trip/${id}`);
  }


  async function downloadTripAndUser(tripId:string){   
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

  function checkUserInParticipants(participants: string[]){
    const userId = context[DataEnum.User].value.id;
    console.log(participants.includes(userId))
    return participants.includes(userId);
  }

  async function hadleShowChat(chatName:string){
    context[DataEnum.Show].set(true)
  }


  

 
  // languages: string[];

  return ( 
    <div>
      {trips.map((trip, index) => (
        <Card className="mb-4 shadow-sm" key={index}>
          <Card.Header>
            <samp style={{fontSize:"10px"}}><b>id:</b> {trip.id}</samp>
            <h6>
              <samp><b>Owner:</b> {users.find(u => u.id === trip.userId) ? users.find(u => u.id === trip.userId)?.name  : "anonimus" }</samp>
              <samp className="mx-3">|</samp>
              <samp><b>Title:</b> {trip.title} </samp>
            </h6>
          </Card.Header>
          <Card.Body style={{fontSize:"14px"}}>
            <Div>
              { 
                trip.startDate && trip.endDate ? (<>
                <samp><b>Start date:</b> <Badge bg="warning"  style={{color:"black"}}>{trip.startDate?.split("T")[0]}</Badge></samp>
                <samp><b>End date:</b> <Badge bg="warning"  style={{color:"black"}}>{trip.endDate?.split("T")[0]}</Badge></samp>
                <samp className="mx-3">|</samp></>
                ) : <></>
              }
              <samp key={index}><b>City:</b> 
              {trip.cityPlans.map((city, index) => (
                <Badge key={index} bg="primary" style={{color:"black"}} className="mx-1">{city.originLocation}</Badge>
              ))}
              </samp>
            </Div>
            <details>
              <summary>
                <samp>More information</samp>
              </summary>
              
              <p>
                <b>Description:</b> <br />
                {trip.description}  
              </p>
              <hr />
              <p> 
                <Div>
                  <samp><b>Current number of participants:</b> <Badge bg="info" >{trip.participants.length}</Badge></samp>
                  <samp><b>Max participants:</b> <Badge bg="danger" >{trip.groupType}</Badge></samp>
                  <samp><b>Age:</b> <Badge bg="info" >{trip.age.min}-{trip.age.max}</Badge></samp>
                  <samp><b>Type travel:</b> <Badge bg="info" >{travelTypesOptions.find(t=>t.value==trip.typeTravel)?.label}</Badge></samp>
                  <samp><b>With children:</b> <Badge bg="info" >{trip.withChildren ? "Yes" : "No"}</Badge></samp>
                  <samp><b>Minimal budget:</b> <Badge bg="info">{trip.budget}$</Badge></samp>
                  <samp><b>Languages:</b> <Badge bg="info">{
                    trip.languages.map((lang)=><> |{languageOptions.find(l=>l.value==lang)?.label}| </>)
                  }</Badge></samp>
                  <samp><b>Gender participants:</b> <Badge bg="info" >{GenderParticipantsValueList[trip.genderParticipants]}</Badge></samp>
                  <samp><b>Participants from other countries:</b> <Badge bg="info" >{trip.participantsFromOtherCountries ? "Yes" : "No"}</Badge></samp>
                </Div>
              </p>
            </details>
          </Card.Body>
          <Card.Footer>
            <ButtonGroup>
              {
                !checkUserInParticipants(trip.participants) ?
                <Button variant="success" onClick={()=>addParticipant(trip.id as string)}>Join</Button>
                : 
                <>
                <Button variant="danger" onClick={()=>removeParticipant(trip.id as string)}>Leave</Button>
                <Button variant="primary" onClick={()=>hadleShowChat(trip.title)}>Chat</Button>
                </>
              }
              <Button variant="info" onClick={()=>Details(trip?.id as string)}>Details</Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      ))}



      <Modal 
        size="lg"
        show={context[DataEnum.Show].value}
        onHide={()=>context[DataEnum.Show].set(false)}
        >
        <ChatApp/>
      </Modal>
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


export default TripList;
