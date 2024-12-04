import { useState } from "react";
import { TripPlan } from "../interfaces/TripPlan";
import { useParams } from "react-router-dom";


export const TripView: React.FC = ()=>{
    const [loadding ,setLoadding] = useState<boolean>(true)
    const [tripPlan, setTripPlan] = useState<TripPlan>();
    const [headerImage, setHeaderImage] = useState<string>("");
    const [hotelLinks, setHotelLinks] = useState<string[]>([]);
    const [placeLinks, setPlaceLinks] = useState<string[][]>([]);

    const {trip_plan_id} = useParams();

    


    return <>
    </>

}