import axios from "axios";
import { BudgetType } from "../enums/BudgetType";
import { GroupType } from "../enums/GroupType";
import { GenderParticipants } from "../enums/GenderParticipants";
import { Transport, TripPlan } from "../interfaces/TripPlan";

export class TripPlanApi {
    private static readonly url: string = "https://localhost:7137/api/TripPlan"; 


    static async create(data: TripPlan):Promise<TripPlan>{
        // await fetch(this.url, {
        //     method: "POST",
        //     headers:{
        //         "Content-Type": "application/json" 
        //      },
        //     body: JSON.stringify(data)
        // })
        
        return (await axios.post(this.url, data, {
          headers:{
            "Content-Type": "application/json"
          } 
        })).data;
      }

    static async get(): Promise<TripPlan[]>{
      return (await axios.get(this.url)).data;
    }

    static async getByEmail(email:string): Promise<TripPlan[]>{
      return (await axios.get(this.url+`/getByEmail?email=${email}`)).data
    }

    static async getById(id:string): Promise<TripPlan>{
      return (await axios.get(this.url+`/${id}`)).data
    }

    
}


export const testTripPlan: TripPlan = {
  "userId": "66e337245e26008a2f5331d6",
  "title": "string",
  "description": "string",
  "startDate": "2024-11-13T22:34:10.971Z",
  "endDate": "2024-11-13T22:34:10.971Z",
  "cityPlans": [
    {
      "startDate": "2024-11-13T22:34:10.971Z",
      "endDate": "2024-11-13T22:34:10.971Z",
      "originLocation": "string",
      "destiantionLocation": "string",
      "descriptionLocation": "string",
      "image_url": {
        "originUrl": "string",
        "destinationUrl": "string"
      },
      "transport": 0,
      "hotels": [
        {
          "name": "string",
          "address": "string",
          "price": "string",
          "image_url": "string",
          "geo_coordinates": "string",
          "rating": "string",
          "description": "string",
          "googleMapUrl": "string"
        }
      ],
      "itinerary": [
        {
          "day": 0,
          "places": [
            {
              "time": "string",
              "location": "string",
              "details": "string",
              "image_url": "string",
              "geo_coordinates": "string",
              "ticket_pricing": "string",
              "rating": "string",
              "googleMapUrl": "string"
            }
          ]
        }
      ]
    }
  ],
  "languages": [
    "string"
  ],
  "age": {
    "min": 0,
    "max": 0
  },
  "genderParticipants": 0,
  "withChildren": true,
  "budget": 0,
  "budgetType": 0,
  "groupType": 0,
  "typeTravel": "string",
  "participantsFromOtherCountries": true
};

