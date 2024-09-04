import axios from "axios";

export class TripPlanApi {
    private static url = "https://localhost:7137/api/TripPlan"; 


    static async create(data: ITripPlan){
        await fetch(this.url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
             },
            body: JSON.stringify(data)
        })
    }
}

const testTrip: ITripPlan = {
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
    ]
  }

export interface ITripPlan{
    id?: string,
    hotels: Array<IHotel>
    itinerary: Array<IItinerary>
}

interface IHotel{
     name:string;
     address:string;
     price:string;
     image_url:string;
     geo_coordinates:string;
     rating:string;
     description:string;
}

interface IItinerary{
    day: number;
    places: Array<IPlace>
}

interface IPlace{
    time:string;
    location:string;
    details:string;
    image_url:string;
    geo_coordinates:string;
    ticket_pricing:string;
    rating:string;
}