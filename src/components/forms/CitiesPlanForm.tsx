import React from "react";
import { Container, Row, Col, Button, Form, Popover, OverlayTrigger } from "react-bootstrap";
import { FaBus, FaCar, FaTrain, FaPlane, FaShip, FaBicycle, FaWalking } from "react-icons/fa";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { TripPlan, Transport, CityPlan } from "../../interfaces/TripPlan";

interface ICitiesPlanForm {
  dataTripPlan: {
    data: TripPlan;
    set: (e: TripPlan) => void;
  };
}

const CitiesPlanForm: React.FC<ICitiesPlanForm> = ({ dataTripPlan }) => {
  const transportOptions = [
    { icon: <FaBus />, label: "Bus", value: Transport.Bus },
    { icon: <FaCar />, label: "Car", value: Transport.Car },
    { icon: <FaTrain />, label: "Train", value: Transport.Train },
    { icon: <FaPlane />, label: "Airplane", value: Transport.AirPlain },
    { icon: <FaShip />, label: "Boat", value: Transport.Ship },
    { icon: <FaBicycle />, label: "Bicycle", value: Transport.Bicycle },
    { icon: <FaWalking />, label: "Walk", value: Transport.OnFeet },
  ];

  const handleCityChange = (value: any, index: number, field: "originLocation") => {
    const updatedCityPlans = dataTripPlan.data.cityPlans.map((cityPlan, i) => {
      if (i === index) {
        return {
          ...cityPlan,
          [field]: value?.label || "",
        };
      }
      return cityPlan;
    });

    dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });
  };

  const handleTransportChange = (transport: Transport, index: number) => {
    const updatedCityPlans = dataTripPlan.data.cityPlans.map((cityPlan, i) => {
      if (i === index) {
        return {
          ...cityPlan,
          transport,
        };
      }
      return cityPlan;
    });

    dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });
  };

  const handleAddCity = () => {
    const updatedCityPlans = [...dataTripPlan.data.cityPlans];

    
    const newCityPlan: CityPlan = {
      "startDate": "2024-11-23T20:21:48.658Z",
      "endDate": "2024-11-23T20:21:48.658Z",
      "description": "string",
      "originLocation": "string",
      "image_url": "string",
      "transport": 0,
      "accommodations": [
        {
          "name": "string",
          "location_acc": "string",
          "description": "string",
          "image_url": "string",
          "googleMapUrl": "string"
        }
      ],
      "places": [
        {
          "location": "string",
          "details": "string",
          "image_url": "string",
          "googleMapUrl": "string"
        }
      ]
    }

    updatedCityPlans.push(newCityPlan);

    dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });

  };

  const handleDeleteLastCity = () => {
    if (dataTripPlan.data.cityPlans.length > 1) {
      const updatedCityPlans = dataTripPlan.data.cityPlans.slice(0, -1); // Удаляем последний город
      dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });
    }
  };

  return (
    <Container className="p-4" style={{ maxWidth: "500px" }}>
      {dataTripPlan.data.cityPlans.map((cityPlan, index) => (
        <Row key={index} className="align-items-center mb-4">
          {/* Cities Input */}
          <Col xs={12}>
            <Form.Group controlId={`citiesFrom-${index}`} className="mb-0">
              <GooglePlacesAutocomplete
                apiKey={PLACES_API_KEY}
                selectProps={{
                  placeholder: index === 0 ? "Cities from" : `Cities to ${index}`,
                  onChange: (value) => handleCityChange(value, index, "originLocation"),
                  styles: {
                    control: (base) => ({
                      ...base,
                      width: "100%", 
                    }),
                  },
                }}
              />
            </Form.Group>
          </Col>

          {/* Transport Selector */}
          {index < dataTripPlan.data.cityPlans.length - 1 && (
            <Col xs={12} className="mt-2">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id={`popover-transport-${index}`} style={{ minWidth: "30%" }}>
            <Popover.Body
              style={{
                display: "flex",
                whiteSpace: "nowrap", // Все элементы в одну строку
              }}
            >
              {transportOptions.map((option, i) => (
                <Button
                  key={i}
                  variant="link"
                  className="text-dark"
                  onClick={() => handleTransportChange(option.value, index)}
                  style={{
                    flex: "0 0 0", // Убирает автоматическое растяжение кнопок
                    textAlign: "center",
                    margin: "0 5px", // Отступы между кнопками
                  }}
                >
                  {option.icon}
                </Button>
              ))}
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="outline-primary" className="w-100">
          {cityPlan.transport !== null ? (
            <>
              Transport: {transportOptions.find((option) => option.value === cityPlan.transport)?.icon}{" "}
              {Transport[cityPlan.transport]}
            </>
          ) : (
            "Choose transport"
          )}
        </Button>
      </OverlayTrigger>

            </Col>
          )}
        </Row>
      ))}

      {/* Add and Delete Buttons */}
      <Row className="justify-content-between">
        {dataTripPlan.data.cityPlans.length > 1 && (
          <Col xs={12} className="mb-2">
            <Button
              variant="outline-danger"
              className="w-100"
              onClick={handleDeleteLastCity}
            >
              Delete city
            </Button>
          </Col>
        )}
        <Col xs={12}>
          <Button variant="primary" className="w-100" onClick={handleAddCity}>
            Add city
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CitiesPlanForm;
