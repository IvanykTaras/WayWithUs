import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Image, Spinner } from "react-bootstrap";
import { TripPlan } from "../../interfaces/TripPlan";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { useNavigate } from "react-router-dom";
import { dataContext, DataEnum } from "../../App";

export const Profile: React.FC = () => {
  const context = useContext(dataContext);
  const navigate = useNavigate();

  const [participantsWithTrips, setParticipantsWithTrips] = useState<
    { participant: IGoogleUser; trips: { id: string; title: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Данные из контекста
  const user: IGoogleUser | undefined = context[DataEnum.User]?.value;
  const trips: TripPlan[] = context[DataEnum.Trips]?.value || [];
  const users: IGoogleUser[] = context[DataEnum.Users]?.value || [];

  useEffect(() => {
    if (user && trips.length > 0 && users.length > 0) {
      const participantTripsMap: Record<string, { id: string; title: string }[]> = {};

      trips.forEach((trip: TripPlan) => {
        if (trip.participants?.includes(user.id!)) {
          trip.participants.forEach((participantId) => {
            if (participantId && typeof participantId === "string" && participantId !== user.id) {
              if (!participantTripsMap[participantId]) {
                participantTripsMap[participantId] = [];
              }
              if (trip.id && trip.title) {
                participantTripsMap[participantId].push({ id: trip.id, title: trip.title });
              }
            }
          });
        }
      });

      const participantsWithTripsArray = Object.entries(participantTripsMap)
        .map(([participantId, trips]) => {
          const participant = users.find((user: IGoogleUser) => user.id === participantId);
          return participant ? { participant, trips } : null;
        })
        .filter(Boolean) as { participant: IGoogleUser; trips: { id: string; title: string }[] }[];

      setParticipantsWithTrips(participantsWithTripsArray);
      setLoading(false);
    }
  }, [user, trips, users]);

  const TripCard = (id: string) => {
    navigate(`/my-trips/${id}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-4">User data not available.</p>;
  }

  return (
    <Container className="mt-4" style={{ paddingBottom: "9.7rem" }}>
      <Row>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Image
                src={user.picture || "https://via.placeholder.com/150"}
                roundedCircle
                fluid
                alt={user.name || "User"}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src = "https://th.bing.com/th/id/R.74760693646c701efeded01334dee357?rik=pJk9zY2UtYFYcA&pid=ImgRaw&r=0";
                }}
              />
              <Card.Title className="mt-3">{user.name || "Unknown User"}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Given Name:</strong> {user.given_name || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Family Name:</strong> {user.family_name || "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h2" className="bg-primary text-white">
              People that you know
            </Card.Header>
            <ListGroup variant="flush">
              {participantsWithTrips.length > 0 ? (
                participantsWithTrips.map(({ participant, trips }) => (
                  <ListGroup.Item key={participant.id} className="p-3">
                    <div className="d-flex align-items-center">
                      <Image
                        src={participant.picture || "https://via.placeholder.com/30"}
                        roundedCircle
                        style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        className="me-3"
                        onError={(e) => {
                          e.currentTarget.src = "https://th.bing.com/th/id/R.74760693646c701efeded01334dee357?rik=pJk9zY2UtYFYcA&pid=ImgRaw&r=0";
                        }}
                      />
                      <div>
                        <strong>{participant.name}</strong>
                        <p className="text-muted mb-0">
                          {trips.map((trip, index) => (
                            <span
                              key={trip.id}
                              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                              onClick={() => TripCard(trip.id)}
                            >
                              {trip.title}
                              {index < trips.length - 1 && " — "}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No participants found.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
