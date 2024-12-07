import axios from "axios";
import { BudgetType } from "../enums/BudgetType";
import { GroupType } from "../enums/GroupType";
import { GenderParticipants } from "../enums/GenderParticipants";
import { Transport, TripPlan } from "../interfaces/TripPlan";

export class TripPlanApi {
  private static readonly url: string = "https://localhost:7137/api/TripPlan"; 


  private static addOneDay(date: string | null): string | null {
      if (!date) return null;
      const d = new Date(date);
      d.setDate(d.getDate() + 1); 
      return d.toISOString().split("T")[0]; 
  }

  static async create(data: TripPlan): Promise<TripPlan> {
      const preparedData = {
          ...data,
          startDate: this.addOneDay(data.startDate),
          endDate: this.addOneDay(data.endDate),
          cityPlans: data.cityPlans.map(cityPlan => ({
              ...cityPlan,
              startDate: this.addOneDay(cityPlan.startDate),
              endDate: this.addOneDay(cityPlan.endDate),
          })),
      };

      return (await axios.post(this.url, preparedData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`
        } 
      })).data;
  }

  static async get(): Promise<TripPlan[]> {
    return (await axios.get(this.url)).data;
  }

  static async getByEmail(email: string): Promise<TripPlan[]> {
    return (await axios.get(`${this.url}/getByEmail?email=${email}`)).data;
  }

  static async getById(id: string): Promise<TripPlan> {
    return (await axios.get(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`,
        "Type-Content": "application/json"
      }
    })).data;
  }

  static async addParticipant(tripId: string, userId:string):Promise<void>{
    console.log("tripid", tripId, "userid", `${userId}`)
    await axios.post(this.url + `/${tripId}/addParticipant/${userId}`, {},{
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`,
        "Type-Content": "application/json"
      }
    })
  }

  static async removeParticipant(tripId: string, userId:string):Promise<void>{
    console.log("tripid", tripId, "userid", `${userId}`)
    await axios.delete(this.url + `/${tripId}/removeParticipant/${userId}`,{
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`,
        "Type-Content": "application/json"
      }
    })
  }
}




export const testTripPlan: TripPlan = {
  "userId": "66e337245e26008a2f5331d6",
  "title": "string",
  "description": "string",
  "startDate": "2024-11-23T20:21:48.658Z",
  "endDate": "2024-11-23T20:21:48.658Z",
  "cityPlans": [
    {
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
  "groupType": 0,
  "typeTravel": "string",
  "participantsFromOtherCountries": true,
  "participants": []
}