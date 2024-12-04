import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Badge, ButtonGroup } from "react-bootstrap";
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

interface TripListProps {
  trips: TripPlan[];
  users: IGoogleUser[];
}

const TripList: React.FC<TripListProps> = ({ trips, users }) => {
  
    
    

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
                <Badge bg="primary" style={{color:"black"}} className="mx-1">{city.originLocation}</Badge>
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
              <Button variant="success">Join</Button>
              <Button variant="info">Details</Button>
              <Button variant="danger">Leave</Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};




const Div = styled.div`
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
