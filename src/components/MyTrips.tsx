import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loadding } from "./custom/Loadding";
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi";
import { BudgetType } from "../enums/BudgetType";
import '../index.css';

export const MyTrips: React.FC = () => {

  const [loadding ,setLoadding] = useState<boolean>(true);
  const [tripPlan, setTripPlan] = useState<ITripPlan[]>();

  useEffect(()=>{
    (async ()=>{
        setLoadding(true)
        const plan = await TripPlanApi.get();
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
