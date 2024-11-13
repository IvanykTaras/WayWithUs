import { BudgetType } from "../enums/BudgetType";
import { GenderParticipants } from "../enums/GenderParticipants";
import { GroupType } from "../enums/GroupType";

export interface TripPlan {
  id?: string;
  userId: string;
  title: string;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  cityPlans: CityPlan[];
  languages: string[];
  age: Age;
  genderParticipants: GenderParticipants;
  withChildren: boolean;
  budget: number;
  budgetType: BudgetType;
  groupType: GroupType;
  typeTravel: string;
}

export interface Age {
  min: number;
  max: number;
}

export interface CityPlan {
  startDate: string;
  endDate: string;
  originLocation: string;
  descriptionLocation: string;
  image_url: ImageUrl;
  transport: Transport;
  hotels: Hotel[];
  itinerary: Itinerary[];
}

export enum Transport {
  Train,
  Car,
  Bus,
  AirPlain,
  OnFeet,
  Ship,
  Bicycle
}

export interface Hotel {
  name: string;
  address: string;
  price: string;
  image_url: string;
  geo_coordinates: string;
  rating: string;
  description: string;
  googleMapUrl: string;
}

export interface Itinerary {
  day: number;
  places: Place[];
}

export interface Place {
  time: string;
  location: string;
  details: string;
  image_url: string;
  geo_coordinates: string;
  ticket_pricing: string;
  rating: string;
  googleMapUrl: string;
}

export interface ImageUrl {
  originUrl: string;
  destinationUrl: string;
}
