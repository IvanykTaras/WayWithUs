import { useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import Carousel from "react-multi-carousel";

export const TripView: React.FC = ()=>{
    const [index, setIndex] = useState<number>(0);

    const handleSelect = (selectedIndex:number) => {
        setIndex(selectedIndex);
    };

    const responsive = {        
        desktop: {
          breakpoint: { max: 5000, min: 0 },
          items: 2
        }
      };


    return <Container>
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
            {Array(10).fill(1).map((e,i)=>{
                return(
                    <Card key={i}style={{ width: '18rem'}}>
                    <Card.Img variant="top" src={require("../assets/img/car.png")} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    </Card>
                )
            })}
        </Carousel>
    </Container>

}