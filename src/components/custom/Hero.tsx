import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import aiImage from "../../assets/AI.png";
import aiMap from "../../assets/AIMAP.png";
import aiIndiv from "../../assets/AIIndiv.png";
import aiGT from "../../assets/AIgt.png";

export const Hero: React.FC = () => {
  return (
    <>
      {/* Animation styles and gradient background */}
      <style>
        {`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-50%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .hero-background {
            background: linear-gradient(135deg, #d4edfc, #4682B4); /* Gradient sunrise */
            height: 100vh;
            color: white;
            position: relative;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4); /* Semi-transparent dark layer for contrast */
          }

          .hero-container {
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      {/* Main Section */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <Container
          className="hero-container d-flex flex-column justify-content-center align-items-center text-center"
        >
          <Row className="align-items-center" style={{ width: "100%" }}>
            {/* Text block */}
            <Col
              md={6}
              style={{
                textAlign: "start",
                padding: "1rem",
                animation: "fadeInLeft 1.5s ease-in-out",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "white",
                  lineHeight: "1.4",
                }}
              >
                <span style={{ color: "#fd7e14" }}>
                  <b>Create your travel plan with AI:</b>
                </span>
                <br />
                Explore the world day by day!
              </h1>
              <p style={{ color: "#f1f1f1", marginBottom: "1.5rem" }}>
                Plan your perfect trips quickly and effortlessly. From destinations to accommodations and experiences — everything tailored for you!
              </p>
              <Link to={"/create-trip"}>
                <Button
                  variant="light"
                  size="lg"
                  style={{
                    fontWeight: "bold",
                    color: "#343a40",
                    padding: "0.75rem 1.5rem",
                    animation: "fadeInUp 2s ease-in-out",
                  }}
                >
                  Get started for free
                </Button>
              </Link>
            </Col>

            {/* Image */}
            <Col
              md={6}
              style={{
                animation: "fadeInRight 1.5s ease-in-out",
              }}
            >
              <img
                src={aiImage}
                alt="Travel illustration"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  marginTop: "4rem",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <Row style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Col>
            <h2 style={{ fontWeight: "bold", color: "#343a40" }}>
              Why Choose Us?
            </h2>
            <p style={{ color: "#6c757d" }}>
              We provide everything you need for a comfortable and enjoyable journey.
            </p>
          </Col>
        </Row>
        <Row
          style={{
            textAlign: "center",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {/* Feature 1 */}
          <Col
            md={4}
            style={{
              animation: "zoomIn 1.5s ease-in-out",
            }}
          >
            <img
              src={aiMap}
              alt="AI Planner"
              style={{ width: "250px", height: "250px", marginBottom: "1rem", borderRadius: "10px" }}
            />
            <h5 style={{ fontWeight: "bold", color: "#343a40" }}>
              AI-Powered Planning
            </h5>
            <p style={{ color: "#6c757d" }}>
              Let AI suggest the best routes, places, and accommodations based on your preferences.
            </p>
          </Col>

          {/* Feature 2 */}
          <Col
            md={4}
            style={{
              animation: "zoomIn 1.5s ease-in-out",
              animationDelay: "0.3s",
            }}
          >
            <img
              src={aiIndiv}
              alt="Personalization"
              style={{ width: "250px", height: "250px", marginBottom: "1rem", borderRadius: "10px" }}
            />
            <h5 style={{ fontWeight: "bold", color: "#343a40" }}>
              Personalized Itineraries
            </h5>
            <p style={{ color: "#6c757d" }}>
              Create customized travel plans tailored specifically to your needs.
            </p>
          </Col>

          {/* Feature 3 */}
          <Col
            md={4}
            style={{
              animation: "zoomIn 1.5s ease-in-out",
              animationDelay: "0.6s",
            }}
          >
            <img
              src={aiGT}
              alt="Global Coverage"
              style={{ width: "250px", height: "250px", marginBottom: "1rem", borderRadius: "10px" }}
            />
            <h5 style={{ fontWeight: "bold", color: "#343a40" }}>
              Explore the World
            </h5>
            <p style={{ color: "#6c757d" }}>
              Plan trips to any corner of the world — from popular destinations to hidden gems.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
