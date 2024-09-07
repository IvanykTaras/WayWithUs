import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { LogoSVG } from "../../assets/LogoSVG";
import { Link, useNavigate } from "react-router-dom";
import { AuthModal } from "../AuthModal";
import { IGoogleUser } from "../../interfaces/IGoogleUser";

export const Header: React.FC = () => {
  const [authModalShow, setAuthModalShow] = useState(false); 
  const [user, setUser] = useState<IGoogleUser | undefined>(); 
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleSignInClick = () => {
    setAuthModalShow(true); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    setUser(undefined); 
    navigate("/"); 
  };

 
  useEffect(() => {
    if (!authModalShow) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        console.log(JSON.parse(storedUser))
        setUser(JSON.parse(storedUser)); 


        const imgage = new Image();
        imgage.src = user?.picture as string;
        imgage.onload = ()=>setAuthModalShow(false);

      }
    }
  }, [authModalShow]);

  return (
    <>      
      <style>
        {`
          .custom-dropdown-toggle::after {
            display: none !important; 
          }
        `}
      </style>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
              <LogoSVG />
            </Link>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav>
            <Link to={"/trip-view"} style={{ marginRight: "15px" }}>
                <Button variant="outline-dark">trip view</Button>
            </Link>
            </Nav>
            <Nav>              
              {!user ? (
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

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="div" 
                      style={{ cursor: "pointer", display: "inline-block" }}
                      className="custom-dropdown-toggle"
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          backgroundImage: `url(${user?.picture})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "40px",
                          height: "40px",
                        }}
                      />
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
      <AuthModal
        show={authModalShow}
        handleClose={() => setAuthModalShow(false)}
      />
    </>
  );
};
