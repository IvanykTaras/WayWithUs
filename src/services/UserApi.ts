import axios from "axios";
import { BudgetType } from "../enums/BudgetType";
import { GroupType } from "../enums/GroupType";
import { GenderParticipants } from "../enums/GenderParticipants";
import { Transport, TripPlan } from "../interfaces/TripPlan";
import { IGoogleUser } from "../interfaces/IGoogleUser";

export class UserApi {
  private static readonly url: string = "https://localhost:7137/api/User"; 

  public static async registerUser(user: IGoogleUser): Promise<any> {
    
      const response = await axios.post(`${this.url}/register`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
  }

  public static async getUsers(): Promise<IGoogleUser[]> {
    const response = await axios.get(this.url,{
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token") as string)}`
      }
    });
    return response.data;
  }

  public static async getUserById(id:string): Promise<IGoogleUser> {
    return (await axios.get(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token") as string)}`,
          'Content-Type': 'application/json'
      }
    })).data;
    
  }
}


