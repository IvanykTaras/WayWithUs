import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { LogoSVG } from "../../assets/LogoSVG"



export const Header: React.FC = ()=>{
    return (<>

    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home"><LogoSVG/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Nav>
                    <Button>Sign in</Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

    </>)
}