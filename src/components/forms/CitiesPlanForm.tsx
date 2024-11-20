import React from 'react';
import { Container, Row, Col, Button, Form, Popover, OverlayTrigger, ButtonGroup } from 'react-bootstrap';
import { FaBus, FaCar, FaTrain, FaPlane, FaShip, FaBicycle, FaWalking } from 'react-icons/fa';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { TripPlan, CityPlan, Transport } from '../../interfaces/TripPlan';

interface ICitiesPlanForm {
  dataTripPlan: {
    data: TripPlan;
    set: (e: TripPlan) => void;
  };
}

const CitiesPlanForm: React.FC<ICitiesPlanForm> = ({ dataTripPlan }) => {
  const transportOptions = [
    { icon: <FaBus />, label: 'Bus', value: Transport.Bus },
    { icon: <FaCar />, label: 'Car', value: Transport.Car },
    { icon: <FaTrain />, label: 'Train', value: Transport.Train },
    { icon: <FaPlane />, label: 'Airplane', value: Transport.AirPlain },
    { icon: <FaShip />, label: 'Boat', value: Transport.Ship },
    { icon: <FaBicycle />, label: 'Bicycle', value: Transport.Bicycle },
    { icon: <FaWalking />, label: 'Walk', value: Transport.OnFeet },
  ];

  const handleCityChange = (value: any, index: number) => {
    const updatedCityPlans = dataTripPlan.data.cityPlans.map((cityPlan, i) => {
      if (i === index) {
        return {
          ...cityPlan,
          originLocation: value?.label || '',
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
    const newCityPlan: CityPlan = {
      startDate: '',
      endDate: '',
      originLocation: '',
      destiantionLocation: '',
      image_url: { originUrl: '', destinationUrl: '' },
      transport: null as any, // Пустое значение для транспорта
      hotels: [],
      itinerary: [],
    };

    const updatedCityPlans = [...dataTripPlan.data.cityPlans, newCityPlan];
    dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });
  };

  const handleDeleteCity = (index: number) => {
    const updatedCityPlans = dataTripPlan.data.cityPlans.filter((_, i) => i !== index);
    dataTripPlan.set({ ...dataTripPlan.data, cityPlans: updatedCityPlans });
  };

  return (
    <Container className="p-4" style={{ maxWidth: '500px' }}>
      {dataTripPlan.data.cityPlans.map((cityPlan, index) => (
        <div key={index} className="mb-4">
          {/* Cities Input */}
          <Form.Group controlId={`citiesFrom-${index}`} className="mb-3">
            <GooglePlacesAutocomplete
              apiKey={PLACES_API_KEY}
              selectProps={{
                placeholder: index === 0 ? 'Cities From' : `Cities To ${index}`,
                onChange: (value) => handleCityChange(value, index),
              }}
            />
            <ButtonGroup className='w-100 d-flex align-items-center my-2'>
              {/* Delete City Button */}
            <Button variant="danger" className="w-100" onClick={() => handleDeleteCity(index)}>
              Delete city
            </Button>
            {/* Transport Selector */}
            {index < dataTripPlan.data.cityPlans.length - 1 && (
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover id={`popover-transport-${index}`}>
                    <Popover.Body className="d-flex justify-content-between">
                      {transportOptions.map((option, i) => (
                        <Button
                          key={i}
                          variant="link"
                          className="text-dark"
                          onClick={() => handleTransportChange(option.value, index)}
                        >
                          {option.icon}
                        </Button>
                      ))}
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button variant="primary" className="w-100">
                  {cityPlan.transport !== null ? (
                    <>
                      Transport: {transportOptions.find(option => option.value === cityPlan.transport)?.icon}{' '}
                      {Transport[cityPlan.transport]}
                    </>
                  ) : (
                    'Choose transport'
                  )}
                </Button>
              </OverlayTrigger>
            )}
            </ButtonGroup>
          </Form.Group>

          

          
        </div>
      ))}

      {/* Add City Button */}
      <Button variant="primary" className="w-100 mb-4" onClick={handleAddCity}>
        Add city
      </Button>

      {/* Prev and Next Buttons */}
      <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary">Prev</Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary">Next</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CitiesPlanForm;
