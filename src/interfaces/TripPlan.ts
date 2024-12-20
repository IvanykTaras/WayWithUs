import { BudgetType } from "../enums/BudgetType";
import { GenderParticipants } from "../enums/GenderParticipants";
import { GroupType } from "../enums/GroupType";

export interface TripPlan {
  id?: string;
  userId: string;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  cityPlans: CityPlan[];
  languages: string[];
  age: Age;
  genderParticipants: GenderParticipants;
  withChildren: boolean;
  budget: number;
  groupType: number;
  typeTravel: string;
  participantsFromOtherCountries: boolean;
  participants: string[];
  openForBussines: boolean;
}

export interface Age {
  min: number;
  max: number;
}

export interface CityPlan {
  startDate: string;
  endDate: string;
  description: string;
  originLocation: string;
  image_url: string;                                     
  transport: Transport | null;
  accommodations: Accommodation[];
  places: Place[];
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

export interface Accommodation {
  name: string;
  location_acc: string;
  description: string;
  image_url: string;
  googleMapUrl: string;
}

export interface Place {
  location: string;
  details: string;
  image_url: string;
  googleMapUrl: string;
}