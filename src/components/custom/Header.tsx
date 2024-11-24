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
      <Navbar  expand="lg" className="bg-primary text-white py-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="text-white d-flex align-items-center">
              <LogoSVG />
              <span className="ms-2 fw-bold fs-4">WayWithUs</span>
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            {!context[DataEnum.User].value ? (
              <Button variant="light" onClick={handleSignInClick}>
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
                        <Text as="div" size="2" weight="bold">
                          {context[DataEnum.User].value.name}
                        </Text>
                        <Text as="div" size="2" color="gray">
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
      <Container className="text-center mt-4">
        <h1 className="text-black fw-bold mb-4">Create your own trip</h1>
        {context[DataEnum.User].value && ( // Показываем только если пользователь авторизован
          <Nav className="justify-content-center">
            <Nav.Item>
              <Link to={"/search"}>
                <Button variant="primary" className="mx-1">
                  Search
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/create-trip"}>
                <Button variant="primary" className="mx-1">
                  Create
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/my-trip"}>
                <Button variant="primary" className="mx-1">
                  My Trips
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/business"}>
                <Button variant="primary" className="mx-1">
                  Business
                </Button>
              </Link>
            </Nav.Item>
          </Nav>
        )}
      </Container>
    </>
  );
};
