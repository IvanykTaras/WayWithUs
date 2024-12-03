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
}


