import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loadding } from "./custom/Loadding";
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi";
import { BudgetType } from "../enums/BudgetType";
import '../index.css';
import { IGoogleUser } from "../interfaces/IGoogleUser";

export const MyTrips: React.FC = () => {

  const [loadding ,setLoadding] = useState<boolean>(true);
  const [user, setUser] = useState<IGoogleUser | undefined>(); 
  const [tripPlan, setTripPlan] = useState<ITripPlan[]>();
  

  useEffect(()=>{

    const storedUser = sessionStorage.getItem("user");
    


    (async ()=>{
        setLoadding(true)
        
        const storedUser:IGoogleUser = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as string) : null; 
        if (storedUser) {
            console.log("user local storage:",storedUser)
            setUser(()=>storedUser); 
        }

        const plan = await TripPlanApi.getByEmail(user?.email as string);
        console.log("user email",user?.email);
        setTripPlan(plan)
        console.dir(plan)
        setLoadding(false)
    })()
  },[])

  
  return loadding ? <Loadding/> : <>
    <Container className="my-5">
      <h1>My Trips</h1>
      <Row>
        {tripPlan?.map((trip) => (
          <Col key={trip.id} sm={12} md={6} lg={4} className="mb-4">
            <Link to={"/trip-view"} style={{ textDecoration: 'none' }}>
              <Card className="h-100">
                <Card.Img variant="top" src={require("../assets/img/car.png")} />
                <Card.Body>
                  <Card.Title>{"Title"}</Card.Title>
                  <Card.Text>
                    {trip.itinerary.length} Days trip with <strong>{BudgetType.Cheap}</strong> Budget
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  </>     
  
}
