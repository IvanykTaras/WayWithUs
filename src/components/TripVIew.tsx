import { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaMoneyBillWave as TicketPrice, FaRegStar as Star } from "react-icons/fa";
import { IHotel, ITripPlan, TripPlanApi } from "../services/TripPlanApi";
import { Loadding } from "./custom/Loadding";
import GoogleApi from "../services/GoogleApi";
import { useParams } from "react-router-dom";
import { AspectRatio, Box, Text, Card as RadixCard, Inset, Code, DataList, Flex, IconButton, Link as RadixLink, Badge, Kbd, Button, Strong, Heading} from "@radix-ui/themes";
import { BudgetTypeValueList } from "../enums/BudgetType";
import { GroupTypeValueList } from "../enums/GroupType";


export const TripView: React.FC = ()=>{
    const [loadding ,setLoadding] = useState<boolean>(true)
    const [tripPlan, setTripPlan] = useState<ITripPlan>();
    const [headerImage, setHeaderImage] = useState<string>("");
    const [hotelLinks, setHotelLinks] = useState<string[]>([]);
    const [placeLinks, setPlaceLinks] = useState<string[][]>([]);

    const {trip_plan_id} = useParams();

    const responsive = {        
        desktop: {
          breakpoint: { max: 5000, min: 0 },
          items: 2
        }
    };

    useEffect(()=>{
        (async ()=>{
            setLoadding(true)

                const plan = await TripPlanApi.getById(trip_plan_id as string);
                const headerImg = await GoogleApi.getPhotos(plan.location, 2000, 2000);
                
                const hotelArr:string[] = [];
                for(const hotel of plan.hotels){
                    const link = await GoogleApi.getLink(hotel.name);
                    hotelArr.push(link);
                }
                setHotelLinks(hotelArr);
                
                const placeArr:string[][] = []
                for(const day of plan.itinerary){
                    const links:string[] = []
                    for(const place of day.places){
                        const link = await GoogleApi.getLink(place.location);
                        links.push(link)
                    }
                    placeArr.push(links);
                }
                setPlaceLinks(placeArr)



                setTripPlan(plan)
                console.log(headerImg[0])
                setHeaderImage(headerImg[0]);


            setLoadding(false)
        })()
    },[])


    return loadding ? <Loadding/> : <>
        <Container>
            <Box mt={"4"}>
                <RadixCard>
                    <Inset clip="padding-box" side="top" pb="current">
                        <AspectRatio ratio={4 / 1}>
                            <img
                                src={headerImage}
                                style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                }}
                            />
                        </AspectRatio>
                    </Inset>
                    <Text as="div" size="8" weight="bold" align={"center"} my={"5"}>
                        {tripPlan?.location}
                    </Text>

                    <Flex gap={"5"} justify={"center"}>
                        <Flex direction={"column"}>
                            <Heading color="gray" size={"4"}>Days number</Heading>
                            <Button>{tripPlan?.daysNumber}</Button>
                        </Flex>
                        <Flex direction={"column"}>
                            <Heading color="gray" size={"4"}>Budget type</Heading>
                            <Button>{BudgetTypeValueList[tripPlan?.budgetType as number]}</Button>
                        </Flex>
                        <Flex direction={"column"}>
                            <Heading color="gray" size={"4"}>Group type</Heading>
                            <Button>{GroupTypeValueList[tripPlan?.groupType as number]}</Button>
                        </Flex>
                    </Flex>
                </RadixCard>
            </Box>

            
            <h2 className="my-4">Hotel Recommendation</h2>

            <Carousel responsive={responsive} centerMode={true} infinite={true} containerClass="py-5">
                {tripPlan ? tripPlan.hotels.map((e,i)=>{
                    return(
                        <Card key={i} style={{ width: '18rem', height:"100%"}} className="makeBigger">
                        <Card.Img variant="top" src={e.image_url} style={{height:"200px",objectFit: "cover"}} />
                        <Card.Body className="margin-bottom-elements">
                            <Card.Title>
                                <RadixLink href={hotelLinks[i]} target="_blank">{e.name}</RadixLink>
                            </Card.Title>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaMapLocationDot/>
                                </InputGroup.Text>
                                <Form.Control value={e.address} disabled/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>
                                    <TicketPrice/>
                                </InputGroup.Text>
                                <Form.Control value={"$100-$150 per night"} disabled/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>
                                    <Star/>
                                </InputGroup.Text>
                                <Form.Control value={"5 stars"} disabled/>
                            </InputGroup>
                                                    
                        </Card.Body>
                        </Card>
                    )
                }) : []}
            </Carousel>
            <h2 className="my-4">Places to visit</h2>
            {tripPlan ? tripPlan.itinerary.map( (itinerary, day) =>{
                return (<div key={day}>
                    <h4>Day {itinerary.day}</h4>
                    <hr />
                    <Row>
                        {
                        itinerary.places.map((place,placeId)=>{
                        return (<Col style={{display:"flex"}} key={placeId} md={4} className="makeBigger">
                                    <Card style={{ minWidth: '18rem', marginBottom:"2rem"}}>
                                        <Card.Header style={{fontWeight:"bold"}}>
                                        {place.time}
                                        </Card.Header>
                                        <Card.Img variant="top"  style={{height:"200px",objectFit: "cover"}}  src={place.image_url} />
                                        

                                        <Card.Body>
                                            <Card.Title>
                                                <RadixLink href={placeLinks[day][placeId]} target="_blank">{place.location}</RadixLink>
                                            </Card.Title>
                                            <Card.Text>
                                            {place.details}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <TicketPrice/>
                                                </InputGroup.Text>
                                                <Form.Control value={"free"} disabled/>
                                                <InputGroup.Text>
                                                    <Star/>
                                                </InputGroup.Text>
                                                <Form.Control value={"5 stars"} disabled/>
                                            </InputGroup>
                                        </Card.Footer>
                                    </Card>
                                </Col>)
                        })
                        }
                    </Row>
                </div>)      
            }):[]}
           
        </Container>
    </>

}