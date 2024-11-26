import { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Avatar, Text } from "@radix-ui/themes";
import { dataContext, DataEnum } from "../../App";
import { LogoSVG } from "../../assets/LogoSVG";
import { testTripPlan, TripPlanApi } from "../../services/TripPlanApi";

export const Header: React.FC = () => {
  const context = useContext(dataContext);
  const navigate = useNavigate();

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

  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#4CAF50" }}
        className="text-white py-3"
      >
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ color: "#FFFFFF" }} className="d-flex align-items-center">
              <LogoSVG />
              <span className="ms-2 fw-bold fs-4">WayWithUs</span>
            </Link>
          </Navbar.Brand>
          <Container className="text-center mt-4">
            {context[DataEnum.User].value && (
              <Nav className="justify-content-center">
                <Nav.Item>
                  <Link to={"/search"}>
                    <Button
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#4CAF50",
                      }}
                      className="mx-1 border-0"
                    >
                      Search
                    </Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/create-trip"}>
                    <Button
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#4CAF50",
                      }}
                      className="mx-1 border-0"
                    >
                      Create
                    </Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/my-trip"}>
                    <Button
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#4CAF50",
                      }}
                      className="mx-1 border-0"
                    >
                      My Trips
                    </Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/business"}>
                    <Button
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#4CAF50",
                      }}
                      className="mx-1 border-0"
                    >
                      Business
                    </Button>
                  </Link>
                </Nav.Item>
              </Nav>
            )}
          </Container>
          <Nav className="ms-auto d-flex align-items-center">
            {!context[DataEnum.User].value ? (
              <Button
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#4CAF50",
                }}
                onClick={handleSignInClick}
              >
                Войти
              </Button>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  <Box>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src={context[DataEnum.User].value.picture}
                        radius="full"
                        fallback="T"
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
        </Container>
      </Navbar>
    </>
  );
};
