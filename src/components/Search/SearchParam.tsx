import React, { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import Select, { MultiValue, SingleValue } from "react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { languageOptions, OptionType } from "../forms/languages";
import { travelTypesOptions, TravelTypeOption } from "../forms/travelTypes";
import { GenderParticipantsValueList } from "../../enums/GenderParticipants";
import { TripPlan } from "../../interfaces/TripPlan";

interface SearchParamProps {
  trips: TripPlan[];
  setTrips: (e:TripPlan[])=>void;
}

const SearchParam: React.FC<SearchParamProps> = ({trips,setTrips}) => {
  const [saveTrips, setSaveTrips] = useState<TripPlan[]>([...trips]);
  const [cities, setCities] = useState<string[]>([]);
  const [autocompleteValue, setAutocompleteValue] = useState<any>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<OptionType[]>([]);
  const [selectedTypeOfTreval, setSelectedTypeOfTreval] = useState<TravelTypeOption[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [withChildren, setWithChildren] = useState<boolean>(false);
  const [participantsFromOtherCountries, setParticipantsFromOtherCountries] = useState<boolean>(false);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<TripPlan[]>(trips);
  const [showDates, setShowDates] = useState<boolean>(false);

  useEffect(() => {
    filterTrips();
  }, [cities, selectedLanguages, selectedTypeOfTreval, selectedBudget, selectedGender, withChildren, participantsFromOtherCountries, departureDate, returnDate]);

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

  const handleLanguagesChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedLanguages(selectedOptions as OptionType[]);
  };

  const handleTravelTypeChange = (selectedOption: MultiValue<TravelTypeOption>) => {
    setSelectedTypeOfTreval(selectedOption as OptionType[]);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleShowDatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDates(e.target.checked);
  };

  const filterTrips = () => {
    let filtered = saveTrips
    .filter(trip =>cities.length<=0 ? true : (
      trip.cityPlans.some(cityPlan => cities.includes(cityPlan.originLocation))
    ))
    .filter(trip =>{
      if(trip.startDate && departureDate){
        const newStartDate = new Date(trip.startDate?.split("T")[0]);
        const newDepartureDate = new Date(departureDate);
        return newStartDate.getTime() >= newDepartureDate.getTime();
      }
      return true;
    })
    .filter(trip =>{
      if(trip.endDate && returnDate){
        const newEndDate = new Date(trip.endDate?.split("T")[0]);
        const newReturnDate = new Date(returnDate);
        return newEndDate.getTime() <= newReturnDate.getTime();
      }
      return true;
    })
    .filter(trip=>{
       return showDates ? trip.startDate && trip.endDate : true;      
    })
    .filter(trip =>selectedLanguages.length<=0 ? true : (
      trip.languages.some(lang => selectedLanguages.map(lang=>lang.value).includes(lang))
    ))
    .filter(trip =>selectedTypeOfTreval.length<=0 ? true : (
      selectedTypeOfTreval.map(type=>type.value).includes(trip.typeTravel))
    )
    .filter(trip =>{
      console.log(selectedGender)
      return !selectedGender  ? true : selectedGender === GenderParticipantsValueList[trip.genderParticipants];
    })  
    .filter(trip =>withChildren ? trip.withChildren : true)
    .filter(trip =>participantsFromOtherCountries ? trip.participantsFromOtherCountries : true)
    .filter(trip =>selectedBudget ? trip.budget <= Number(selectedBudget) : true)
    
    setFilteredTrips(filtered);
    setTrips(filtered);
  };

  return (
    <div>
      {/* Города */}
      <div className="my-3">
        <Form.Label>Selected Cities</Form.Label>
        <div className="d-flex flex-wrap gap-2 mb-1">
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
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={departureDate || ""}
            onChange={handleDepartureDateChange}
          />
        </Form.Group>
        <Form.Group controlId="formDateOfReturn" className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={returnDate || ""}
            onChange={handleReturnDateChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="with dates"
            checked={showDates}
            onChange={handleShowDatesChange}
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
            isMulti
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
        <Form.Group controlId="formBudget">
          <Form.Label>Your Max Budget $</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter budget"
            value={selectedBudget || ""}
            onChange={handleBudgetChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchParam;
