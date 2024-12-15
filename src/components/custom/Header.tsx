import { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Dropdown, Alert, ListGroup, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Avatar, Text } from "@radix-ui/themes";
import { dataContext, DataEnum } from "../../App";
import { LogoSVG } from "../../assets/LogoSVG";
import { testTripPlan, TripPlanApi } from "../../services/TripPlanApi";
import { IoNotificationsCircle } from "react-icons/io5";
import { Notification } from "../AuthModal";
import { FaRobot } from "react-icons/fa";
import { AsyncAction } from "../../utils";
import { toast } from "react-toastify";
import { TripPlan } from "../../interfaces/TripPlan";
import { AxiosError } from "axios";
import { error } from "console";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { UserApi } from "../../services/UserApi";

export const Header: React.FC<{notify:Notification[]}> = ({notify}) => {
  const context = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTripGenerated, setIsTripGenerated] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      context[DataEnum.User].set(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!context[DataEnum.AuthModalShow].value) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        context[DataEnum.User].set(JSON.parse(storedUser));
      }
    }
  }, [context[DataEnum.AuthModalShow].value]);

  const handleSignInClick = () => {
    context[DataEnum.AuthModalShow].set(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    context[DataEnum.User].set(undefined);
    navigate("/");
  };

  async function createTripTest() {
    await TripPlanApi.create(testTripPlan);
  }

  const handleDeleteNotification = (index: number) => {
    const updatedNotifications = [...context[DataEnum.Notifies].value];
    updatedNotifications.splice(index, 1);
    context[DataEnum.Notifies].set(updatedNotifications);
  };



  const handleAiGenerateTrip = async () => {
    
    
    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise( async () => {
            setIsTripGenerated(true)
            const generatedTrip: TripPlan = await TripPlanApi.aiGenerateTripPlan(context[DataEnum.User].value.id);
            await TripCard(generatedTrip.id as string);
            setIsTripGenerated(false);
        }, {
          pending: 'Generating trip pending',
          success: 'Trip generated 👌',
          error: 'Promise rejected 🤯'
        });

      } catch (e) {
        const error: AxiosError = e as AxiosError; 
        console.error(error);
        toast.error(error.message);
        toast.error(error.code);
      }
    });

  };


  async function TripCard(id: string) {
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
    <>
      <Navbar
        expand="lg"
        bg="success"
        className="text-white"
        style={{ 
          backgroundColor: "#4CAF50", 
          // height: '10vh',
          // position: "sticky",
          // top: 0,
          zIndex: 10000
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ color: "#FFFFFF", textDecoration: "none" }} className="d-flex align-items-center">
              <LogoSVG />
              <span className="ms-2 fw-bold fs-4">WayWithUs</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {context[DataEnum.User].value && (
                <>
                  <Nav.Link
                    as={Link}
                    to={"/search"}
                    style={{
                      color: location.pathname === "/search" ? "#FFD700" : "#FFFFFF",
                      margin: "0 10px",
                      borderBottom: location.pathname === "/search" ? "2px solid #FFD700" : "none"
                    }}
                  >
                    Search
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/create-trip"}
                    style={{
                      color: location.pathname === "/create-trip" ? "#FFD700" : "#FFFFFF",
                      margin: "0 10px",
                      borderBottom: location.pathname === "/create-trip" ? "2px solid #FFD700" : "none"
                    }}
                  >
                    Create
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/my-trips"}
                    style={{
                      color: location.pathname === "/my-trips" ? "#FFD700" : "#FFFFFF",
                      margin: "0 10px",
                      borderBottom: location.pathname === "/my-trips" ? "2px solid #FFD700" : "none"
                    }}
                  >
                    My Trips
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/business"}
                    style={{
                      color: location.pathname === "/business" ? "#FFD700" : "#FFFFFF",
                      margin: "0 10px",
                      borderBottom: location.pathname === "/business" ? "2px solid #FFD700" : "none"
                    }}
                  >
                    Business
                  </Nav.Link>
                  <Button
                    variant="outline-info"
                    className="rounded-4 px-4 d-flex align-items-center justify-content-center gap-2 border-1 flex-grow-1"
                    onClick={()=>handleAiGenerateTrip()}
                    disabled={isTripGenerated}
                    >
                    <FaRobot size={18} />
                    Generate Trip By AI
                  </Button>
                </>
              )}
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              {!context[DataEnum.User].value ? (
                <Button
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#4CAF50",
                    margin: "0 10px"
                  }}
                  onClick={handleSignInClick}
                >
                  Sing in
                </Button>
              ) : (<>
                {/* Notifications */}
                <Dropdown align="end" style={{
                  marginRight: "20px"
                }}>
                  <Dropdown.Toggle
                    as="div"
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}  
                  >
                    <IoNotificationsCircle style={{fontSize:"2rem"}}/>
                    <div style={{
                      backgroundColor: "white",
                      fontWeight: "bold",
                      color: "#198754",
                      borderRadius: "100%",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      alignContent: "center",
                    }}>{context[DataEnum.Notifies].value.length}</div>
                  </Dropdown.Toggle> 
                  <Dropdown.Menu style={{width:"500px", maxHeight:"50vh", overflowY:"scroll"}}>
                  <ListGroup>
                    { 
                      notify.map((notify, index) => {
                        return (
                          <ListGroup.Item className="notification" key={index} onClick={() => handleDeleteNotification(index)}> 
                            <Badge bg="secondary">{index+1}</Badge><Badge>@{notify.user}</Badge><br/>
                            <Badge bg="info">!{notify.title}</Badge><br /> 
                            {notify.notification} 
                          </ListGroup.Item>
                        );
                      })
                    }
                  </ListGroup>
                  </Dropdown.Menu>
                </Dropdown>
                {/* User */}
                <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  style={{ cursor: "pointer", display: "flex", alignItems: "center" }}  
                >
                  <Box>
                    <Flex gap="3" align="center">
                      <img
                        src={context[DataEnum.User].value.picture}
                        onError={(e) => {
                          e.currentTarget.src = "https://th.bing.com/th/id/R.74760693646c701efeded01334dee357?rik=pJk9zY2UtYFYcA&pid=ImgRaw&r=0";
                        }}
                        alt="profile"
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold" style={{ color: "#FFFFFF" }}>
                          {context[DataEnum.User].value.name}
                        </Text>
                        <Text as="div" size="2" style={{ color: "#E8F5E9" }}>
                          {context[DataEnum.User].value.email}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item>
                    <Link to={"/create-trip"}>Profile</Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
