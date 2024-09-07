import axios from "axios";
import { BudgetType } from "../enums/BudgetType";
import { GroupType } from "../enums/GroupType";

export class TripPlanApi {
    private static readonly url: string = "https://localhost:7137/api/TripPlan"; 


    static async create(data: ITripPlan):Promise<ITripPlan>{
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

    static async get(): Promise<ITripPlan[]>{
      return (await axios.get(this.url)).data;
    }

    static async getByEmail(email:string): Promise<ITripPlan[]>{
      return (await axios.get(this.url+`/getByEmail?email=${email}`)).data
    }

    static async getById(id:string): Promise<ITripPlan>{
      return (await axios.get(this.url+`/${id}`)).data
    }

    
}

const testTrip: ITripPlan = {
  "location": "somelocation",
  "userEmail": "some@some.som",
  "daysNumber": 0,
  "budgetType": BudgetType.Cheap,
  "groupType": GroupType.OnePerson,
  "hotels": [
    {
      "name": "testFront",
      "address": "string",
      "price": "string",
      "image_url": "string",
      "geo_coordinates": "string",
      "rating": "string",
      "description": "string"
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
          "rating": "string"
        }
      ]
    }
  ],
}

export interface ITripPlan{
    id?: string
    userEmail: string
    location: string
    daysNumber: number
    budgetType: BudgetType
    groupType: GroupType
    hotels: Array<IHotel>
    itinerary: Array<IItinerary>
}

export interface IHotel{
     name:string;
     address:string;
     price:string;
     image_url:string;
     geo_coordinates:string;
     rating:string;
     description:string;
}

export interface IItinerary{
    day: number;
    places: Array<IPlace>
}

export interface IPlace{
    time:string;
    location:string;
    details:string;
    image_url:string;
    geo_coordinates:string;
    ticket_pricing:string;
    rating:string;
}