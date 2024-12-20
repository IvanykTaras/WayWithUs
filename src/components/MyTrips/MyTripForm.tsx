import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MyTripList from "./MyTripList";
import { TripPlan } from "../../interfaces/TripPlan";
import { dataContext, DataEnum } from "../../App";
import { IGoogleUser } from "../../interfaces/IGoogleUser";

const MyTripForm: React.FC = () => {
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [users, setUsers] = useState<IGoogleUser[]>([]);
  const context = useContext(dataContext);

  useEffect(() => {
    context[DataEnum.DownloadTrips].set(!context[DataEnum.DownloadTrips].value);
    setUsers(context[DataEnum.Users].value);
    setTrips(context[DataEnum.Trips].value);
  }, []);

  return (
    <Container>
      <Row>
        < Col className="p-3" >
          <h2 className="mb-4" > Your trips</h2>
          < MyTripList trips={trips} users={users} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyTripForm;
