import axios from "axios"

export default class GoogleApi{
    private static readonly url:string = "https://localhost:7137/api/GoogleApi"


    static async getPhotos(location:string, height:number, width:number):Promise<string[]>{
        return (await axios.get(this.url + `/photos?location=${location}&height=${height}&width=${width}`)).data;
    }

    static async getPhoto(location:string, height:number, width:number){
        const photoes: string[] = await this.getPhotos(location,height,width);
        return photoes[0];
    }

    static async getLink(location:string):Promise<string>{
        return (await axios.get(this.url + `/link?location=${location}}`)).data;
    }

}