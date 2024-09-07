import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,ChatSession} from "@google/generative-ai"
import { GroupType, GroupTypeValueList } from "../enums/GroupType";
import { BudgetType, BudgetTypeValueList } from "../enums/BudgetType";
import { ITripPlan, TripPlanApi } from "./TripPlanApi";

export class GeminiApi{
    private chatSession: ChatSession;
    private readonly aiPrompt = `Generate Travel Plan for Location: {location}, for {days_number} Days for {group_enum} with a {budget_enum} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format. json format sample
        {
            hotles: Array<{
                name: string,
                address: string,
                price: string,
                image_url: string,
                geo_coordinates: string,
                rating: string,
                description:string
            }>,

            itinerary: Array<{
                day: number,
                places: Array<{
                    time: string,
                    location: string,
                    details: string,
                    image_url: string,
                    geo_coordinates: string,
                    ticket_pricing: string,
                    rating: string
                }>
            }>
        }`

    constructor(
        private ApiKey:string,
    ){
        const genAI = new GoogleGenerativeAI(this.ApiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        };

        this.chatSession = model.startChat({
            generationConfig,
            history: [
                {
                  role: "user",
                  parts: [
                    {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\njson format sample\n```\n{\n    hotles: Array<{\n        name: string,\n        address: string,\n        price: string,\n        image_url: string,\n        geo_coordinates: string,\n        rating: string,\n        description:string\n    }>,\n\n    itinerary: Array<{\n        day: number,\n        places: Array<{\n            time: string,\n            location: string,\n            details: string,\n            image_url: string,\n            geo_coordinates: string,\n            ticket_pricing: string,\n            rating: string\n        }>\n    }>\n}\n```"},
                  ],
                },
                {
                  role: "model",
                  parts: [
                    {text: "```json\n{\"hotels\": [{\"name\": \"The D Las Vegas\", \"address\": \"301 Fremont Street, Las Vegas, NV 89101\", \"price\": \"$40 - $70 per night\", \"image_url\": \"https://www.the-d.com/sites/default/files/styles/main_image/public/2021-06/the-d-hotel-las-vegas-exterior.jpg?itok=T0z-M3pJ\", \"geo_coordinates\": \"36.1699,-115.1424\", \"rating\": \"4.0 stars\", \"description\": \"A budget-friendly hotel located in the heart of downtown Las Vegas, offering a vibrant atmosphere, gaming, and dining options.\"}, {\"name\": \"Circus Circus Hotel & Casino\", \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\", \"price\": \"$30 - $60 per night\", \"image_url\": \"https://www.circuscircus.com/content/dam/caesars/circus-circus/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1248,-115.1723\", \"rating\": \"3.5 stars\", \"description\": \"A classic Las Vegas hotel known for its circus theme, affordable rates, and family-friendly attractions.\"}, {\"name\": \"Golden Nugget Hotel & Casino\", \"address\": \"129 E Fremont St, Las Vegas, NV 89101\", \"price\": \"$50 - $80 per night\", \"image_url\": \"https://www.goldennugget.com/content/dam/gn/las-vegas/homepage/hero-image/gn-hero-image-las-vegas-desktop.jpg\", \"geo_coordinates\": \"36.1699,-115.1413\", \"rating\": \"4.5 stars\", \"description\": \"A historic and luxurious hotel in downtown Las Vegas, featuring a world-class casino, dining, and entertainment options.\"}, {\"name\": \"The Orleans Hotel & Casino\", \"address\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\", \"price\": \"$45 - $75 per night\", \"image_url\": \"https://www.orleanscasino.com/content/dam/caesars/orleans/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.0934,-115.1937\", \"rating\": \"4.0 stars\", \"description\": \"A popular hotel on the Strip, offering a variety of amenities, including a casino, bowling alley, and multiple dining options.\"}, {\"name\": \"The Strat Hotel, Casino & SkyPod\", \"address\": \"2000 S Las Vegas Blvd, Las Vegas, NV 89104\", \"price\": \"$35 - $65 per night\", \"image_url\": \"https://www.thestrat.com/content/dam/caesars/strat/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1097,-115.1689\", \"rating\": \"3.5 stars\", \"description\": \"A high-rise hotel on the Strip known for its observation deck, thrilling rides, and affordable rates.\"}], \"itinerary\": [{\"day\": 1, \"places\": [{\"time\": \"9:00 AM - 12:00 PM\", \"location\": \"Fremont Street Experience\", \"details\": \"Explore the vibrant pedestrian mall featuring live entertainment, street performers, and unique shops. Enjoy the iconic canopy of lights.\", \"image_url\": \"https://www.vegasexperience.com/wp-content/uploads/2018/10/Fremont-Street-Experience-1.jpg\", \"geo_coordinates\": \"36.1699,-115.1424\", \"ticket_pricing\": \"Free\", \"rating\": \"4.5 stars\"}, {\"time\": \"12:00 PM - 2:00 PM\", \"location\": \"The D Las Vegas -  \" , \"details\": \"Grab a quick and cheap lunch at one of the casual dining options at The D Las Vegas.\", \"image_url\": \"https://www.the-d.com/sites/default/files/styles/main_image/public/2021-06/the-d-hotel-las-vegas-exterior.jpg?itok=T0z-M3pJ\", \"geo_coordinates\": \"36.1699,-115.1424\", \"ticket_pricing\": \"Varies\", \"rating\": \"4.0 stars\"}, {\"time\": \"2:00 PM - 5:00 PM\", \"location\": \"Neon Museum\", \"details\": \"Explore the fascinating collection of vintage neon signs, a unique and historical experience.\", \"image_url\": \"https://www.neonmuseum.org/wp-content/uploads/2019/10/Neon-Museum-Home-Slider-1.jpg\", \"geo_coordinates\": \"36.1729,-115.1517\", \"ticket_pricing\": \"$20 - $30\", \"rating\": \"4.5 stars\"}, {\"time\": \"5:00 PM - 7:00 PM\", \"location\": \"Golden Nugget Hotel & Casino\", \"details\": \"Enjoy a happy hour with affordable drinks and snacks at the Golden Nugget.\", \"image_url\": \"https://www.goldennugget.com/content/dam/gn/las-vegas/homepage/hero-image/gn-hero-image-las-vegas-desktop.jpg\", \"geo_coordinates\": \"36.1699,-115.1413\", \"ticket_pricing\": \"Varies\", \"rating\": \"4.5 stars\"}, {\"time\": \"7:00 PM - 9:00 PM\", \"location\": \"Heart Bar at the Plaza Hotel\", \"details\": \"Enjoy a late-night dinner at the Heart Bar, known for its affordable menu and lively atmosphere.\", \"image_url\": \"https://www.plazahotelcasino.com/content/dam/caesars/plaza/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1699,-115.1405\", \"ticket_pricing\": \"Varies\", \"rating\": \"4.0 stars\"}]}, {\"day\": 2, \"places\": [{\"time\": \"9:00 AM - 12:00 PM\", \"location\": \"Hoover Dam\", \"details\": \"Take a day trip to Hoover Dam, a magnificent engineering marvel, and explore its history and panoramic views.\", \"image_url\": \"https://www.nps.gov/hdam/planyourvisit/images/hoover-dam-full-view.jpg\", \"geo_coordinates\": \"36.0265,-114.9826\", \"ticket_pricing\": \"Free\", \"rating\": \"5.0 stars\"}, {\"time\": \"12:00 PM - 2:00 PM\", \"location\": \"Boulder City, Nevada\", \"details\": \"Enjoy a casual lunch at one of the local restaurants in Boulder City, near Hoover Dam.\", \"image_url\": \"https://www.visitbouldercity.com/images/attractions/downtown/downtown-5.jpg\", \"geo_coordinates\": \"36.0559,-114.9997\", \"ticket_pricing\": \"Varies\", \"rating\": \"4.0 stars\"}, {\"time\": \"2:00 PM - 4:00 PM\", \"location\": \"Lake Mead National Recreation Area\", \"details\": \"Explore Lake Mead, a vast reservoir with opportunities for hiking, boating, and scenic views.\", \"image_url\": \"https://www.nps.gov/lame/planyourvisit/images/lake-mead-national-recreation-area-mead-view-2.jpg\", \"geo_coordinates\": \"36.1219,-114.7922\", \"ticket_pricing\": \"Free\", \"rating\": \"4.5 stars\"}, {\"time\": \"4:00 PM - 6:00 PM\", \"location\": \"The Linq Promenade\", \"details\": \"Enjoy a leisurely stroll along The Linq Promenade, a bustling outdoor mall with shops, restaurants, and entertainment.\", \"image_url\": \"https://www.thelinq.com/content/dam/caesars/linq/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1082,-115.1736\", \"ticket_pricing\": \"Free\", \"rating\": \"4.0 stars\"}, {\"time\": \"6:00 PM - 8:00 PM\", \"location\": \"In-N-Out Burger\", \"details\": \"Enjoy a classic American dinner at the iconic In-N-Out Burger.\", \"image_url\": \"https://www.in-n-out.com/images/default-source/homepage-images/in-n-out-header-image.jpg?sfvrsn=f705a3ac_4\", \"geo_coordinates\": \"36.1223,-115.1732\", \"ticket_pricing\": \"Varies\", \"rating\": \"4.5 stars\"}]}, {\"day\": 3, \"places\": [{\"time\": \"9:00 AM - 12:00 PM\", \"location\": \"Bellagio Conservatory & Botanical Garden\", \"details\": \"Admire the stunning floral displays and botanical wonders at the Bellagio Conservatory & Botanical Garden.\", \"image_url\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1146,-115.1726\", \"ticket_pricing\": \"Free\", \"rating\": \"5.0 stars\"}, {\"time\": \"12:00 PM - 2:00 PM\", \"location\": \"Caesars Palace Forum Shops\", \"details\": \"Explore the luxurious Forum Shops at Caesars Palace, home to high-end brands and designer boutiques.\", \"image_url\": \"https://www.caesars.com/content/dam/caesars/caesars-palace/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1145,-115.1722\", \"ticket_pricing\": \"Free\", \"rating\": \"4.5 stars\"}, {\"time\": \"2:00 PM - 4:00 PM\", \"location\": \"High Roller Observation Wheel\", \"details\": \"Enjoy breathtaking panoramic views of the Las Vegas Strip from the High Roller, the world's tallest observation wheel.\", \"image_url\": \"https://www.caesars.com/content/dam/caesars/linq/high-roller/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1082,-115.1736\", \"ticket_pricing\": \"$30 - $40\", \"rating\": \"4.5 stars\"}, {\"time\": \"4:00 PM - 6:00 PM\", \"location\": \"The Venetian and The Palazzo\", \"details\": \"Take a walk through the luxurious Venetian and The Palazzo, with its charming canals and replica of St. Mark's Square.\", \"image_url\": \"https://www.venetian.com/content/dam/mgmresorts/venetian/home/hero-image-mobile.jpg\", \"geo_coordinates\": \"36.1185,-115.1754\", \"ticket_pricing\": \"Free\", \"rating\": \"4.5 stars\"}, {\"time\": \"6:00 PM - 8:00 PM\", \"location\": \"The Strip\", \"details\": \"Enjoy a final stroll along the iconic Las Vegas Strip, taking in the vibrant lights and entertainment.\", \"image_url\": \"https://www.visitlasvegas.com/sites/default/files/styles/hero_image/public/2019-07/las-vegas-strip-night.jpg?itok=B-f1-68v\", \"geo_coordinates\": \"36.1145,-115.1722\", \"ticket_pricing\": \"Free\", \"rating\": \"5.0 stars\"}]}]}\n\n```"},
                  ],
                },
              ],
        });
    }

    async generateTripJson(trip:IGeminiTrip):Promise<ITripPlan>{
        const finalPrompt = this.aiPrompt
        .replace("{location}",trip.location)
        .replace("{days_number}", trip.daysNumber)
        .replace("{group_enum}", GroupTypeValueList[trip.groupType])
        .replace("{budget_enum}", BudgetTypeValueList[trip.budgetType])

        const result = await this.chatSession.sendMessage(finalPrompt);
        const tripPlan:ITripPlan = {
            ...JSON.parse(result.response.text()),
            ...trip,

        }
        return tripPlan;    
    }
}

export interface IGeminiTrip{
    userEmail:string;
    location:string;
    daysNumber:string;
    budgetType:BudgetType;
    groupType:GroupType;
}