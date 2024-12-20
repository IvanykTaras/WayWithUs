import { Text } from "@radix-ui/themes";
import { Container, Row, Col } from "react-bootstrap";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "#343a40",
        color: "white",
        padding: "2rem 0",
        textAlign: "center",
      }}
    >
      <Container>
        <Row>
          {/* Left Section */}
          <Col md={4}>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              About Us
            </Text>
            <p style={{ fontSize: "0.9rem", color: "#adb5bd", marginTop: "1rem" }}>
              We help people plan their trips by providing convenient tools and
              support at every step.
            </p>
          </Col>

          {/* Center Section */}
          <Col md={4}>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Contact Us
            </Text>
            <p style={{ fontSize: "0.9rem", color: "#adb5bd", marginTop: "1rem" }}>
              Email:{" "}
              <a
                href="mailto:support@waywithus.com"
                style={{
                  color: "#adb5bd",
                  textDecoration: "none",
                }}
              >
                support@waywithus.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+48515515515"
                style={{
                  color: "#adb5bd",
                  textDecoration: "none",
                }}
              >
                +48 515-515-515
              </a>
            </p>
          </Col>

          {/* Right Section */}
          <Col md={4}>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Follow Us
            </Text>
            <div style={{ marginTop: "1rem" }}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: "10px",
                  color: "#adb5bd",
                  textDecoration: "none",
                }}
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: "10px",
                  color: "#adb5bd",
                  textDecoration: "none",
                }}
              >
                Instagram
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#adb5bd", textDecoration: "none" }}
              >
                Twitter
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="mt-4">
          <Col>
            <p style={{ fontSize: "0.8rem", color: "#6c757d" }}>
              © {new Date().getFullYear()} WayWithUs. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
