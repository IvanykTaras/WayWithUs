import axios from "axios"

export default class GoogleApi{
    private static readonly url:string = "https://localhost:7137/api/GoogleApi"


    static async getPhotos(location:string, height:number, width:number):Promise<string[]>{
        return (await axios.get(this.url + `/photos?location=${location}&height=${height}&width=${width}`)).data;
    }

}