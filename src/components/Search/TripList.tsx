import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { TripPlanApi } from "../../services/TripPlanApi";
import { toast } from "react-toastify";
import { TripPlan } from "../../interfaces/TripPlan";
import { AsyncAction } from "../../utils";
import { dataContext, DataEnum } from "../../App";
import { AxiosError } from "axios";

// const trips = [
//   {
//     title: "Best Trip Ever",
//     route: "Krakow - Berlin - Paris - London",
//     participants: "10-12 people",
//     age: "18-25 y.o.",
//     languages: "English, Polish, Russian",
//     type: "Cultural education",
//     date: "01/04/2024 - 20/04/2024",
//     budget: "$1500-2000",
//   },
//   {
//     title: "European Explorer",
//     route: "Vienna - Prague - Budapest",
//     participants: "6-8 people",
//     age: "25-35 y.o.",
//     languages: "English, German",
//     type: "Adventure",
//     date: "15/05/2024 - 25/05/2024",
//     budget: "$1200-1800",
//   },
//   {
//     title: "Mediterranean Escape",
//     route: "Rome - Athens - Barcelona",
//     participants: "12-15 people",
//     age: "30-45 y.o.",
//     languages: "English, Spanish, Italian",
//     type: "Cultural education",
//     date: "01/06/2024 - 10/06/2024",
//     budget: "$2000-2500",
//   },
// ];




const TripList: React.FC = () => {
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const context = useContext(dataContext);


  useEffect(() => {
    context[DataEnum.DownloadTrips].set(false);
    context[DataEnum.DownloadTrips].set(true);
    setTrips(context[DataEnum.Trips].value);
    console.log(trips)
  }, []);
  
  
  return (
    <div>
      {trips.map((trip, index) => (
        <Card className="mb-4 shadow-sm" key={index}>
          <Card.Body>
            <Card.Title>{trip.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              trip
            </Card.Subtitle>
            <Card.Text>
              {/* <strong>Number of participants:</strong> {trip.participants} <br />
              <strong>Age:</strong> {trip.age} <br />
              <strong>Languages:</strong> {trip.languages} <br />
              <strong>Type of travel:</strong> {trip.type} <br />
              <strong>Date:</strong> {trip.date} <br />
              <strong>Budget:</strong> {trip.budget} */}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="primary">Respond</Button>
              <div>
                <Button variant="link" className="text-muted me-2">
                  ❤️
                </Button>
                <Button variant="link" className="text-muted">
                  🔗
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TripList;
