import axios from "axios";

export class MessageApi{
    private static readonly url:string = "https://localhost:7137/api/Message"

    static async getMessagesByTripId(tripId:string):Promise<Message[]>{
        return (await axios.get(this.url + `/${tripId}`,{
            headers: {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token") as string)}`,
                "Type-Content": "application/json"
            }
        })).data;
    }
}

export interface Message{
    id: string;
    tripId: string;
    userConnection: UserConnection;
    messageText: string;
}

export interface UserConnection
{
    user: string;
    room: string;
}
