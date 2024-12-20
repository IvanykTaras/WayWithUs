import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select, { SingleValue } from "react-select";
import { FaCalendarAlt, FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { accommodationOptions, AccommodationOption } from "./AccommodationOption";
import { CityPlan, Place, Accommodation } from "../../interfaces/TripPlan";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
        

interface CityDetailsFormProps {
  cityPlan: {
    data: CityPlan;
    set: (e: CityPlan) => void;
  };
  index: number;
}

const CityDetailsForm: React.FC<CityDetailsFormProps> = ({ cityPlan }) => {
  const handleAccommodationNameChange = (selectedOption: SingleValue<AccommodationOption>) => {
    if (!selectedOption) return;

    const updatedAccommodations = cityPlan.data.accommodations.map((accommodation) => ({
      ...accommodation,
      name: selectedOption.value, 
    }));

    cityPlan.set({ ...cityPlan.data, accommodations: updatedAccommodations });
  };

  const handleChooseLocation = (selectedOption: any) => {
    if (!selectedOption) return;

    const updatedAccommodations = cityPlan.data.accommodations.map((accommodation) => ({
      ...accommodation,
      location_acc: selectedOption.label, 
    }));

    cityPlan.set({ ...cityPlan.data, accommodations: updatedAccommodations });
  };

  const handleChoosePlace = (selectedOption: any, placeIndex: number) => {
    if (!selectedOption) return;

    const updatedPlaces = cityPlan.data.places.map((place, index) =>
      index === placeIndex
        ? { ...place, location: selectedOption.label }
        : place
    );

    cityPlan.set({ ...cityPlan.data, places: updatedPlaces });
  };

  const handleDescriptionChange = (input: HTMLInputElement, placeIndex: number) => {
    const updatedPlaces = cityPlan.data.places.map((place, index) =>
      index === placeIndex
        ? { ...place, details: input.value } 
        : place
    );

    cityPlan.set({ ...cityPlan.data, places: updatedPlaces });
  };

  const handleAccommodationDescriptionChange = (input: HTMLInputElement, accommodationIndex: number) => {
    const updatedAccommodations = cityPlan.data.accommodations.map((accommodation, index) =>
      index === accommodationIndex
        ? { ...accommodation, description: input.value }
        : accommodation
    );

    cityPlan.set({ ...cityPlan.data, accommodations: updatedAccommodations });
  };

  const handleAddPlace = () => {
    const newPlace: Place = {
      location: "",
      details: "",
      image_url: "",
      googleMapUrl: "",
    };

    cityPlan.set({ ...cityPlan.data, places: [...cityPlan.data.places, newPlace] });
  };

  return (
    <Container className="p-4" style={{ maxWidth: "600px" }}>
      <h5 className="mb-4">Details about {cityPlan.data.originLocation || "City"}</h5>

      {/* Даты */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="startDate">
            <Form.Label>First day</Form.Label>
            <Form.Control
              type="date"
              value={cityPlan.data.startDate.split("T")[0]}
              onChange={(e) =>
                cityPlan.set({
                  ...cityPlan.data,
                  startDate: e.target.value || "",
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>Last day</Form.Label>
            <Form.Control
              type="date"
              value={cityPlan.data.endDate.split("T")[0]}
              onChange={(e) =>
                cityPlan.set({
                  ...cityPlan.data,
                  endDate: e.target.value || "",
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={12} className="mt-4">
        <Form.Group controlId="tripDescription" className="mb-3">
          <Form.Label>City description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={cityPlan.data.description}
            onChange={(e) =>{
              cityPlan.set({
                ...cityPlan.data,
                description: e.target.value || "",
              })
            }}
          />
          
          
          <Markdown className="md" remarkPlugins={[remarkGfm]}>{cityPlan.data.description}</Markdown>
          
        </Form.Group>
        </Col>
      </Row>

      {/* Тип размещения */}
       {/* Места для посещения */}
       <Row className="mb-3">
        <Col>
          <h6>Type of accomodation</h6>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="AccommodationName">
            <Form.Label>Type of accommodation</Form.Label>
            <Select
              options={accommodationOptions}
              value={accommodationOptions.find(
                (option) => cityPlan.data.accommodations[0]?.name === option.value
              )}
              onChange={handleAccommodationNameChange}
              placeholder="Select type"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="AccommodationLocation">
            <Form.Label>Location</Form.Label>
            <GooglePlacesAutocomplete
              apiKey={PLACES_API_KEY}
              selectProps={{
                value: { label: cityPlan.data.accommodations[0]?.location_acc || "", value: cityPlan.data.accommodations[0]?.location_acc || "" },
                placeholder: "Find a location",
                onChange: handleChooseLocation,
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
        <Form.Group controlId="AccommodationDescription" className="mb-3">
          <Form.Label>Accommodation description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter small description"
            value={cityPlan.data.accommodations[0]?.description || ""}
            onChange={(e) =>
              handleAccommodationDescriptionChange(e.target as HTMLInputElement, 0)
            }
          />
        </Form.Group>

      </Row>

      {/* Места для посещения */}
      <Row className="mb-3">
        <Col>
          <h6>Places to Visit</h6>
        </Col>
      </Row>
      {cityPlan.data.places.map((place, placeIndex) => (
        <Row className="mb-3" key={placeIndex}>
          <Col md={6}>
            <Form.Group controlId={`PlaceLocation-${placeIndex}`}>
              <Form.Label>Location</Form.Label>
              <GooglePlacesAutocomplete
                apiKey={PLACES_API_KEY}
                selectProps={{
                  value: { label: place.location || "", value: place.location || "" },
                  placeholder: "Find a location",
                  onChange: (value) => handleChoosePlace(value, placeIndex),
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
          <Col md={6}>
            <Form.Group controlId={`PlaceDetails-${placeIndex}`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={place.details || ""}
                onChange={(e) =>
                  handleDescriptionChange(e.target as HTMLInputElement, placeIndex)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      ))}

      {/* Добавить место */}
      <Button variant="primary" className="w-100 mb-4" onClick={handleAddPlace}>
        Add new place
      </Button>
    </Container>
  );
};

export default CityDetailsForm;
