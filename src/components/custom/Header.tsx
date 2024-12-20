import { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Dropdown, ListGroup, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Text } from "@radix-ui/themes";
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
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { UserApi } from "../../services/UserApi";
import { NotifyApi } from "../../services/NotifyApi";

export const Header: React.FC<{ notify: Notification[] }> = ({ notify }) => {
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
        await toast.promise(async () => {
          setIsTripGenerated(true);
          const generatedTrip: TripPlan = await TripPlanApi.aiGenerateTripPlan(context[DataEnum.User].value.id);
          await TripCard(generatedTrip.id as string);
          setIsTripGenerated(false);
        }, {
          pending: "Generating trip...",
          success: "Trip generated successfully 👌",
          error: "Failed to generate trip 🤯"
        });
      } catch (e) {
        const error: AxiosError = e as AxiosError;
        console.error(error);
        toast.error(error.message);
        toast.error(error.code);
      }
    });
  };



  const handleAiGenerateTripAndEdit = async () => {
    
    
    await AsyncAction(context[DataEnum.Loadding].set, async () => {
      try {
        await toast.promise( async () => {
            setIsTripGenerated(true)
            const generatedTrip: TripPlan = await TripPlanApi.aiGenerateTripPlanDontSave(context[DataEnum.User].value.id);
            await handleUpdateClick(generatedTrip.id as string);
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

  async function handleUpdateClick (tripId:string) {
      if (tripId) {
        navigate(`/edit-trip/${tripId}`); 
      } else {
        toast.error("Trip ID not found. Unable to update.");
      }
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
            });
          },
          {
            pending: "Loading trip...",
            success: "Trip loaded successfully 👌",
            error: "Error loading trip 🤯"
          }
        );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error);
        toast.error(e.code);
        toast.error(e.message);
      }
    });
  }

  async function tryNotify() {
    const notify = new NotifyApi();
    const n: Notification = {
      user: "user",
      title: "title",
      notification: "notification"
    };
    await notify.notificationSubscribe(n);
  }

  return (
    <>
      <style>
        {`
          .navbar-custom {
            background: linear-gradient(135deg, #87CEEB, #4682B4);
          }

          .navbar-link {
            color: white !important;
            font-weight: bold;
            transition: color 0.3s ease-in-out;
          }

          .navbar-link:hover {
            color: #FFD700 !important;
          }

          .btn-custom {
            background-color: #FFD700;
            color: #343a40;
            font-weight: bold;
          }

          .btn-custom:hover {
            background-color: #FFC107;
            color: white;
          }
        `}
      </style>

      <Navbar expand="lg" className="navbar-custom">
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
                    className={`navbar-link ${location.pathname === "/search" ? "active" : ""
                      }`}
                  >
                    Search
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/create-trip"}
                    className={`navbar-link ${location.pathname === "/create-trip" ? "active" : ""
                      }`}
                  >
                    Create
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/my-trips"}
                    className={`navbar-link ${location.pathname === "/my-trips" ? "active" : ""
                      }`}
                  >
                    My Trips
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={"/business"}
                    className={`navbar-link ${location.pathname === "/business" ? "active" : ""
                      }`}
                  >
                    Business
                  </Nav.Link>
                  <Button
                    className="btn-custom mx-3"
                    onClick={() => handleAiGenerateTrip()}
                    disabled={isTripGenerated}
                  >
                    <FaRobot size={18} /> Generate Trip by AI
                  </Button>
                  <Button onClick={tryNotify}>Click me</Button>
                </>
              )}
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              {!context[DataEnum.User].value ? (
                <Button
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#4CAF50",
                  }}
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div"
                      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      <IoNotificationsCircle style={{ fontSize: "2rem", color: "white" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ListGroup>
                        {notify.map((notification, index) => (
                          <ListGroup.Item key={index}>
                            <Badge bg="secondary">{index + 1}</Badge> {notification.notification}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={context[DataEnum.User].value.picture}
                        alt="profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "https://th.bing.com/th/id/R.74760693646c701efeded01334dee357?rik=pJk9zY2UtYFYcA&pid=ImgRaw&r=0";
                        }}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold" style={{ color: "#FFFFFF" }}>
                          {context[DataEnum.User].value.name}
                        </Text>
                        <Text as="div" size="2" style={{ color: "#E8F5E9" }}>
                          {context[DataEnum.User].value.email}
                        </Text>
                      </Box>
                   
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item>
                    <Link to={"/create-trip"}>Profile</Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={()=>handleAiGenerateTripAndEdit()}>Create Trip with AI and Edit</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleAiGenerateTrip()}>Create Trip with AI and show Details</Dropdown.Item>
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
