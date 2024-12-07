import { Card, Badge, ButtonGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { languageOptions } from "../forms/languages";
import { travelTypesOptions } from "../forms/travelTypes";
import { Div } from "../Search/TripList";
import { useContext, useEffect, useState } from "react";
import { TripPlan } from "../../interfaces/TripPlan";
import { TripPlanApi } from "../../services/TripPlanApi";
import { AsyncAction } from "../../utils";
import { dataContext, DataEnum } from "../../App";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IGoogleUser } from "../../interfaces/IGoogleUser";

export const TripDetails: React.FC = () => {
    const [tripView, setTripView] = useState<{trip: TripPlan, user: IGoogleUser}>();
    const context = useContext(dataContext);
    const {trip_plan_id} = useParams<{trip_plan_id:string}>();

    useEffect(() => {
        console.log(context[DataEnum.TripView].value)
        setTripView(context[DataEnum.TripView].value);
    }, []);

    


    return <>        
    <Card className="mb-4 shadow-sm">
    <Card.Header>
      <samp style={{fontSize:"10px"}}><b>id:</b> {tripView?.trip.id}</samp>
      <h6>
        <samp><b>Owner:</b>{tripView?.user.email}</samp>
        <samp className="mx-3">|</samp>
        <samp><b>Title:</b>{tripView?.trip.title}</samp>
      </h6>
    </Card.Header>
    <Card.Body style={{fontSize:"14px"}}>
      <Div>
        { 
          tripView?.trip.startDate ? (<>
          <samp><b>Start date:</b> <Badge bg="warning"  style={{color:"black"}}>{tripView.trip.startDate?.split("T")[0]}</Badge></samp>
          <samp><b>End date:</b> <Badge bg="warning"  style={{color:"black"}}>{tripView.trip.endDate?.split("T")[0]}</Badge></samp>
          <samp className="mx-3">|</samp></>
          ) : <></>
        }
        <samp><b>City:</b> 
        {tripView?.trip.cityPlans.map((city, index) => (
          <Badge key={index} bg="primary" style={{color:"black"}} className="mx-1">{city.originLocation}</Badge>
        ))}
        </samp>
      </Div>
      <details open>
        <summary>
          <samp>More information</samp>
        </summary>
        
        <p>
          <b>Description:</b> <br />
          {tripView?.trip.description}
        </p>
        <hr />
        <p> 
          <Div>
          <samp><b>Current number of participants:</b> <Badge bg="info" >{tripView?.trip.participants.length}</Badge></samp>
                  <samp><b>Max participants:</b> <Badge bg="danger" >{tripView?.trip.groupType}</Badge></samp>
                  <samp><b>Age:</b> <Badge bg="info" >{tripView?.trip.age.min}-{tripView?.trip.age.max}</Badge></samp>
                  <samp><b>Type travel:</b> <Badge bg="info" >{travelTypesOptions.find(t=>t.value==tripView?.trip.typeTravel)?.label}</Badge></samp>
                  <samp><b>With children:</b> <Badge bg="info" >{tripView?.trip.withChildren ? "Yes" : "No"}</Badge></samp>
                  <samp><b>Minimal budget:</b> <Badge bg="info">{tripView?.trip.budget}$</Badge></samp>
                    <samp><b>Languages:</b> <Badge bg="info">{
                    tripView?.trip.languages.map((lang)=><> |{languageOptions.find(l=>l.value==lang)?.label}| </>)
                    }</Badge></samp>
            <samp><b>Gender participants:</b> <Badge bg="info" >{GenderParticipantsValueList[tripView?.trip.genderParticipants as number]}</Badge></samp>
            <samp><b>Participants from other countries:</b> <Badge bg="info" >{tripView?.trip.participantsFromOtherCountries ? "Yes" : "No"}</Badge></samp>
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
  </>
}