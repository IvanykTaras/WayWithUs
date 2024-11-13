import { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Dropdown, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { Box, Flex, Avatar,Text } from "@radix-ui/themes";
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


  async function createTripTest(){
    await TripPlanApi.create(testTripPlan);
  }

  return (
    <>      
      <style>
        {`
          .custom-dropdown-toggle::after {
            display: none !important; 
          }
        `}
      </style>

      <Navbar expand="lg" className="bg-body-tertiary"  > {/*data-bs-theme="dark"*/}
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
              <LogoSVG/>
            </Link>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav>
              {/* <Link to={"/theme"}>
                <Button variant="outline-dark">Theme</Button>
              </Link> */}
            </Nav>
            <Nav style={{alignItems:"center"}}>              
              {!context[DataEnum.User].value ? (
                <Button variant="dark" onClick={handleSignInClick}>
                  Sign in
                </Button>
              ) : (
                <>
                  <Link to={"/create-trip"} style={{ marginRight: "15px" }}>
                    <Button variant="outline-dark">+ Create Trip</Button>
                  </Link>
                  <Link to={"/my-trips"} style={{ marginRight: "15px" }}>
                    <Button variant="outline-dark">My Trips</Button>
                  </Link>

                  <Button variant="outline-dark" onClick={()=>createTripTest()}>Create Trip Test</Button>

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div" 
                      style={{ cursor: "pointer", display: "inline-block" }}
                      className="custom-dropdown-toggle"
                    >
                      {/* <div
                        style={{
                          borderRadius: "50%",
                          backgroundImage: `url(${user?.picture})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "40px",
                          height: "40px",
                        }}
                      /> */}
                      <Box  width="300px">
                        <Card style={{padding:".5rem"}}>
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
                        </Card>
                      </Box>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
};
