import React, { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import Select, { MultiValue, SingleValue } from "react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { languageOptions, OptionType } from "../forms/languages";
import { travelTypesOptions, TravelTypeOption } from "../forms/travelTypes";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";

const SearchParam: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [autocompleteValue, setAutocompleteValue] = useState<any>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<OptionType[]>([]);
  const [selectedTypeOfTreval, setSelectedTypeOfTreval] = useState<TravelTypeOption | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [withChildren, setWithChildren] = useState<boolean>(false);
  const [participantsFromOtherCountries, setParticipantsFromOtherCountries] = useState<boolean>(false);
  const [places, setPlaces] = useState<string[]>([]);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);

  const handleRemoveCity = (index: number) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
  };

  const handleSelectCity = (place: any) => {
    const cityName = place?.label;
    if (cityName && !cities.includes(cityName)) {
      setCities([...cities, cityName]);
      setAutocompleteValue(null);
    }
  };

  const handleRemovePlace = (index: number) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  const handleSelectPlace = (place: any) => {
    const placeName = place?.label;
    if (placeName && !places.includes(placeName)) {
      setPlaces([...places, placeName]);
      setAutocompleteValue(null);
    }
  };

  const handleLanguagesChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedLanguages(selectedOptions as OptionType[]);
  };

  const handleTravelTypeChange = (selectedOption: SingleValue<TravelTypeOption>) => {
    setSelectedTypeOfTreval(selectedOption || null);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBudget(e.target.value);
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleWithChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithChildren(e.target.checked);
  };

  const handleParticipantsFromOtherCountriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticipantsFromOtherCountries(e.target.checked);
  };

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
  };

  return (
    <div>
      {/* Города */}
      <div className="mb-4">
        <Form.Label>Selected Cities</Form.Label>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {cities.map((city, index) => (
            <Badge bg="primary" key={index} className="d-flex align-items-center">
              {city.length > 20 ? `${city.slice(0, 40)}...` : city}
              <Button
                variant="link"
                size="sm"
                className="text-white ms-2 p-0"
                onClick={() => handleRemoveCity(index)}
              >
                &times;
              </Button>
            </Badge>

          ))}
        </div>

        <GooglePlacesAutocomplete
          apiKey={PLACES_API_KEY}
          selectProps={{
            value: autocompleteValue,
            placeholder: "Add a city",
            onChange: (place) => handleSelectCity(place),
            styles: {
              control: (base: any) => ({
                ...base,
                width: "100%",
                padding: "5px",
                borderColor: "#ccc",
                borderRadius: "5px",
              }),
            },
          }}
        />
      </div>

      {/* Фильтры */}
      <Form>
        <Form.Group controlId="formDateOfDeparture" className="mb-3">
          <Form.Label>Date of Departure</Form.Label>
          <Form.Control
            type="date"
            value={departureDate || ""}
            onChange={handleDepartureDateChange}
          />
        </Form.Group>
        <Form.Group controlId="formDateOfReturn" className="mb-3">
          <Form.Label>Date of Return</Form.Label>
          <Form.Control
            type="date"
            value={returnDate || ""}
            onChange={handleReturnDateChange}
          />
        </Form.Group>
        <Form.Group controlId="languages" className="mb-3">
          <Form.Label>Languages</Form.Label>
          <Select
            isMulti
            options={languageOptions}
            value={selectedLanguages}
            onChange={handleLanguagesChange}
            placeholder="Select languages..."
          />
        </Form.Group>
        <Form.Group controlId="typeTravel" className="mb-3">
          <Form.Label>Type of Travel</Form.Label>
          <Select
            options={travelTypesOptions}
            value={selectedTypeOfTreval || null}
            onChange={handleTravelTypeChange}
            placeholder="Select type of travel..."
          />
        </Form.Group>
        <Form.Group controlId="genderSelect" className="mb-3">
          <Form.Label>Select Gender</Form.Label>
          <Form.Select value={selectedGender || ""} onChange={onGenderChange}>
            <option value="">Select gender...</option>
            {GenderParticipantsValueList.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="participantsFromOtherCountries" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Participants from Other Countries"
            checked={participantsFromOtherCountries}
            onChange={handleParticipantsFromOtherCountriesChange}
          />
        </Form.Group>
        <Form.Group controlId="withChildren" className="mb-3">
          <Form.Check
            type="checkbox"
            label="With Children"
            checked={withChildren}
            onChange={handleWithChildrenChange}
          />
        </Form.Group>
        <div className="mb-4">
          <Form.Label>Selected places</Form.Label>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {places.map((place, index) => (
              <Badge bg="primary" key={index} className="d-flex align-items-center">
                {place.length > 20 ? `${place.slice(0, 40)}...` : place}
                <Button
                  variant="link"
                  size="sm"
                  className="text-white ms-2 p-0"
                  onClick={() => handleRemovePlace(index)}
                >
                  &times;
                </Button>
              </Badge>

            ))}
          </div>

          <GooglePlacesAutocomplete
            apiKey={PLACES_API_KEY}
            selectProps={{
              value: autocompleteValue,
              placeholder: "Add a place",
              onChange: (place) => handleSelectPlace(place),
              styles: {
                control: (base: any) => ({
                  ...base,
                  width: "100%",
                  padding: "5px",
                  borderColor: "#ccc",
                  borderRadius: "5px",
                }),
              },
            }}
          />
        </div>
        <Form.Group controlId="formBudget">
          <Form.Label>Budget $</Form.Label>
          <Form.Select value={selectedBudget || ""} onChange={handleBudgetChange}>
            <option value="low">$500-1000</option>
            <option value="mid">$1000-2000</option>
            <option value="high">$2000+</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" className="w-100 mt-3">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchParam;
