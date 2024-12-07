import { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Avatar, Text } from "@radix-ui/themes";
import { dataContext, DataEnum } from "../../App";
import { LogoSVG } from "../../assets/LogoSVG";
import { testTripPlan, TripPlanApi } from "../../services/TripPlanApi";

export const Header: React.FC = () => {
  const context = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      context[DataEnum.User].set(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!context[DataEnum.AuthModalShow].value) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        context[DataEnum.User].set(JSON.parse(storedUser));
      }
    }
  }, [context[DataEnum.AuthModalShow].value]);

  const handleSignInClick = () => {
    context[DataEnum.AuthModalShow].set(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    context[DataEnum.User].set(undefined);
    navigate("/");
  };

  async function createTripTest() {
    await TripPlanApi.create(testTripPlan);
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
                    to={"/my-trip"}
                    style={{
                      color: location.pathname === "/my-trip" ? "#FFD700" : "#FFFFFF",
                      margin: "0 10px",
                      borderBottom: location.pathname === "/my-trip" ? "2px solid #FFD700" : "none"
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
                  Войти
                </Button>
              ) : (
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
                    <Dropdown.Item>
                      <Link to={"/create-trip"}>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
