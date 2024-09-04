import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { LogoSVG } from "../../assets/LogoSVG"
import { Link, useNavigate } from "react-router-dom"



export const Header: React.FC = ()=>{

    return (<>

    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">
                <Link to={"/"}>
                    <LogoSVG/>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to={"/"}>
                        <Button>Home</Button>
                    </Link>
                </Nav>
                <Nav>
                    <Link to={"/trip-view"}>
                        <Button variant="dark">Sign in</Button>
                    </Link>
                </Nav>
                
            </Navbar.Collapse>
        </Container>
    </Navbar>

    </>)
}