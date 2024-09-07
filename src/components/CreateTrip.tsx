import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Button, Container, Form, FormControlProps } from "react-bootstrap"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Option } from "react-google-places-autocomplete/build/types"
import styled from "styled-components"
import { BudgetType, BudgetTypeValueList } from "../enums/BudgetType"
import { GroupType, GroupTypeValueList } from "../enums/GroupType"
import { apiKeyAndUrl, PLACES_API_KEY } from "../assets/ApiKeys"
import { toast } from "react-toastify"
import { AuthModal } from "./AuthModal"
import { IGoogleUser } from "../interfaces/IGoogleUser"
import { MongoClient } from "mongodb"
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi"
import { GeminiApi, IGeminiTrip } from "../services/GeminiApi"
import { useNavigate } from "react-router-dom"

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
type FormData = {
    location: Option | null,
    days: number,
    budget: BudgetType,
    group: GroupType
}

export const CreateTrip: React.FC = ()=>{

    const navigate = useNavigate();
    const [authModalShow,setAuthModalShow] = useState(true);
    const [user,setUser] = useState<IGoogleUser>();
    const [formData, setFormData] = useState<FormData>({
        location: null,
        days: 0,
        budget: BudgetType.Cheap,
        group: GroupType.OnePerson
    });

    const onDaysChange = (e:React.FormEvent<FormControlElement>)=>{setFormData({...formData, days: Number(e.currentTarget.value) })}
    const onBudgetChange = (e:React.FormEvent<HTMLSelectElement>)=>{setFormData({...formData, budget: Number(e.currentTarget.value)   })}
    const onGroupChange = (e:React.FormEvent<HTMLSelectElement>)=>{setFormData({...formData, group: Number(e.currentTarget.value)  })}

    const generateTrip = async ()=>{
        toast("start creating")
        const geminiApi = new GeminiApi(apiKeyAndUrl.GEMINI_API_KEY);
        const geminiTrip:IGeminiTrip = {
            userEmail: user?.email as string,
            location: formData.location?.label as string,
            daysNumber: formData.days.toString(),
            groupType: formData.group,
            budgetType: formData.budget
        }
        console.log("geminiTrip",geminiTrip)
        const tripPlan = await geminiApi.generateTripJson(geminiTrip);
        const newTripPlan = await TripPlanApi.create(tripPlan);
        navigate(`/trip-view/${newTripPlan.id}`);
        toast("created") 
    }

    useEffect(()=>{
        const user = sessionStorage.getItem("user")
        if(user){
            setUser(JSON.parse(user))
            setAuthModalShow(false)
        }
    },[authModalShow])

    return <div>
        <Container className="create-trip">
            <div className="create-trip__intro">
                <h1>Tell us your travel preferences</h1>
                <p>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            </div>

            <div className="create-trip__forms">
                <h2 className="title">What is destination of choice?</h2>
                <GooglePlacesAutocomplete 
                    apiKey={PLACES_API_KEY}
                    selectProps={{
                        value: formData?.location,
                        onChange: (newValue)=>setFormData({...formData, location: newValue})
                    }}
                />
                
                <h2 className="title">How many days are you planning your trip?</h2>
                <Form.Control type="number" placeholder="Example: 3" onChange={onDaysChange} />

                <h2 className="title">What is Your Budget?</h2>
                <Form.Select aria-label="Default select example" onChange={onBudgetChange}>
                    {(BudgetTypeValueList).map((e,i)=>(<option value={i}>{e}</option>))}
                </Form.Select>
                
                <h2 className="title">Who do you plan on traveling with on your next adventure?</h2>
                <Form.Select aria-label="Default select example" onChange={onGroupChange}>
                    {(GroupTypeValueList).map((e,i)=>(<option value={i}>{e}</option>))}
                </Form.Select>
                
                <Button className="button" onClick={()=>generateTrip()}>create trip</Button>
            </div>
        </Container>
    </div>
}



