import axios from "axios";

export class IdentityApi{
    private static readonly url: string = "https://localhost:7137/api/Identity/login"; 


    static async login(user: UserLoginDat): Promise<LoginReponse> {
        return (await axios.post(this.url, user, {
          headers: {
            "Content-Type": "application/json",
          } 
        })).data;
    }
}

type UserLoginDat = {
    email: string,
    password: string
  }

interface LoginReponse {
    userName: string,
    accessToken: string,
    expiresIn: number
  }