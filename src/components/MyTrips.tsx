import { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loadding } from "./custom/Loadding";
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi";
import { BudgetType, BudgetTypeValueList } from "../enums/BudgetType";
import '../index.css';
import { IGoogleUser } from "../interfaces/IGoogleUser";
import { dataContext, DataEnum } from "../App";
import GoogleApi from "../services/GoogleApi";
import { GroupTypeValueList } from "../enums/GroupType";

export const MyTrips: React.FC = () => {

  const navigate = useNavigate();
  const context = useContext(dataContext);
  const [loadding ,setLoadding] = useState<boolean>(true);
  const [tripPlan, setTripPlan] = useState<ITripPlan[]>();
  const [tripPlanPhotos,setTripPlanPhotos] = useState<string[]>(()=>[]);

  useEffect(()=>{

    const storedUser = sessionStorage.getItem("user");
    


    (async ()=>{
        setLoadding(true)
        
        const storedUser:IGoogleUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) : null; 
        if (storedUser) {
            context[DataEnum.User].set(storedUser); 
        }else{
          navigate("/")
        }



        const plan = await TripPlanApi.getByEmail(storedUser?.email as string);

        setTripPlanPhotos([]);
        const photosArr = [];
        for(const p of plan){
          console.count()
          const photo = await GoogleApi.getPhotos(p.location,400,400);
          photosArr.push(photo[0])
        }
        setTripPlanPhotos([...photosArr]);
        setTripPlan(plan)

        setLoadding(false) 
    })()
  },[])

  
  return loadding ? <Loadding/> : <>
    <Container className="my-5" style={{minHeight:"75vh"}}>
      <h1>My Trips</h1>
      <Row>
        
        {tripPlan?.map((trip,i) =>{ 
          return(
          <Col key={i} sm={12} md={6} lg={4} className="mb-4" >
            <Card className="h-100">
              <Link to={"/trip-view/"+trip.id} style={{ textDecoration: 'none', color:"black" }}>
                <Card.Img style={{height:"200px",objectFit: "cover"}} variant="top" src={tripPlanPhotos[i]} />
                <Card.Body>
                  <Card.Title>{trip.location}</Card.Title>
                  <Card.Text>
                    {trip.itinerary.length} Days trip with <strong>{BudgetTypeValueList[trip.budgetType]}</strong> Budget and  <strong>{GroupTypeValueList[trip.groupType]}</strong>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col> 
        )})}
      </Row>  
    </Container>
  </>     
  
}
