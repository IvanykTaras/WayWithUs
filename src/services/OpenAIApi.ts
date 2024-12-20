import axios from "axios";

export class OpenAIApi {
    private static readonly url: string = "https://localhost:7137"; 


    static async getOpenAiResponse(textMessage:string): Promise<string> {
        return (await axios.post(this.url + `/getOpenAiResponse`,{text: textMessage},
        {
          headers: {
            "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token") as string)}`,
            "Type-Content": "application/json"
    
          }
        })).data;
      }
}