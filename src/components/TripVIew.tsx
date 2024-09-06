import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import { FaMapLocationDot } from "react-icons/fa6";
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi";
import { Loadding } from "./custom/Loadding";

export const TripView: React.FC = ()=>{
    const [loadding ,setLoadding] = useState<boolean>(true)
    const [tripPlan, setTripPlan] = useState<ITripPlan>();

    const responsive = {        
        desktop: {
          breakpoint: { max: 5000, min: 0 },
          items: 2
        }
    };

    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
                const plan = await TripPlanApi.get();
                setTripPlan(plan[0])
                console.log(plan)
            setLoadding(false)
        })()
    },[])


    return loadding ? <Loadding/> : <>
        <Container>

        
            <Card className="mt-4">
                <Card.Img src={require("../assets/img/car.png")} style={{maxHeight:"40vh",objectFit: "cover"}}/>
                <Card.Header>
                    <InputGroup>
                        <InputGroup.Text>Place</InputGroup.Text>
                        <Form.Control value={"New York, Nowy Jork, Stany Zjednoczone"} disabled/>
                    </InputGroup>
                </Card.Header>
                <Card.Footer>
                    <Row>
                        <Col md={2}>
                        <InputGroup>
                            <InputGroup.Text>Budget</InputGroup.Text>
                            <Form.Control value={"Luxury"} disabled/>
                        </InputGroup>
                        </Col>
                        <Col md={2}>
                        <InputGroup>
                            <InputGroup.Text>Days</InputGroup.Text>
                            <Form.Control value={"1"} disabled/>
                        </InputGroup>
                        </Col>
                        <Col md={4}>
                        <InputGroup>
                            <InputGroup.Text>No. Of Traveler</InputGroup.Text>
                            <Form.Control value={" 3 to 5 People"} disabled/>
                        </InputGroup>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <h2 className="my-4">Hotel Recommendation</h2>

            <Carousel responsive={responsive} centerMode={true} infinite={true} containerClass="mb-4">
                {tripPlan ? tripPlan.hotels.map((e,i)=>{
                    return(
                        <Card key={i} style={{ width: '18rem', height:"100%"}} className="makeBigger">
                        <Card.Img variant="top" src={require("../assets/img/car.png")} />
                        <Card.Body className="margin-bottom-elements">
                            <Card.Title>{e.name}</Card.Title>
                            <p>
                                <i style={{marginRight:'1rem'}}><FaMapLocationDot/></i> 
                                649 S Olive St, Los Angeles, CA 90014, USA
                            </p>
                            <InputGroup>
                                <InputGroup.Text>Avg Price</InputGroup.Text>
                                <Form.Control value={"$100-$150 per night"} disabled/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>Rating</InputGroup.Text>
                                <Form.Control value={"5 stars"} disabled/>
                            </InputGroup>
                                                    
                        </Card.Body>
                        </Card>
                    )
                }) : []}
            </Carousel>
            <h2 className="my-4">Places to visit</h2>
            <h4>Day 1</h4>
            <hr />
            <Row>
                {
                    Array(19).fill(null).map((e,i)=>{
                        return (<Col key={i} md={4} className="makeBigger">
                            <Card style={{ minWidth: '18rem', marginBottom:"2rem"}}>
                                <Card.Header style={{fontWeight:"bold"}}>
                                2:00 PM - 4:00 PM
                                </Card.Header>
                                <Card.Img variant="bottom" style={{borderRadius:"0px"}} src={require("../assets/img/car.png")} />
                            
                                <Card.Body>
                                    <Card.Title>TCL Chinese Theatre</Card.Title>
                                    <Card.Text>
                                    A historic movie theater on Hollywood Boulevard, featuring handprints and footprints of famous stars.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <InputGroup>
                                        <InputGroup.Text>Ticket prc.</InputGroup.Text>
                                        <Form.Control value={"free"} disabled/>
                                        <InputGroup.Text>Rating</InputGroup.Text>
                                        <Form.Control value={"5 stars"} disabled/>
                                    </InputGroup>
                                </Card.Footer>
                            </Card>
                        </Col>)
                    })
                }
            </Row>
        </Container>
    </>

}