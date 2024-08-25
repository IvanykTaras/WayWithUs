import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Hero: React.FC = ()=>{
    return (<div>
        <Container className="hero-container">
            <h1 className="header">
                <span className="orange-text">
                    <b>Discover Your Next Adventure with AI:</b>
                </span>
                Personalized Itineraries at Your Fingertips
            </h1>

            <p className="">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

            <Link to={"/create-trip"}>
                <Button variant="dark">Get started, It's Free</Button>
            </Link>
        </Container>
    </div>)
}

