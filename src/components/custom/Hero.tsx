import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Hero: React.FC = ()=>{
    return (<div>
        <Container className="hero-container" style={{height:"75vh"}}>
            <h1 className="header">
                <span className="orange-text">
                    <b>Create your trip plan with AI:</b>
                </span>
                Day by day in entire world!
            </h1>

            <p className="">I beliew that work. But that machine doesn't work everytime</p>

            <Link to={"/create-trip"}>
                <Button variant="dark">Get started, It's Free</Button>
            </Link>
        </Container>
    </div>)
}

