import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Button, Container, Form, FormControlProps } from "react-bootstrap"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Option } from "react-google-places-autocomplete/build/types"
import styled from "styled-components"
import { BudgetType } from "../enums/BudgetType"
import { GroupType } from "../enums/GroupType"
import { PLACES_API_KEY } from "../assets/ApiKeys"
import { AI_PROMPT, chatSession } from "../assets/AiModel"
import { toast } from "react-toastify"
import { AuthModal } from "./AuthModal"
import { IGoogleUser } from "../interfaces/IGoogleUser"
import { MongoClient } from "mongodb"
import { ITripPlan, TripPlanApi } from "../services/TripPlanApi"

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
type FormData = {
    googlePlaces: Option | null,
    days: number,
    budget: BudgetType,
    group: GroupType
}

export const CreateTrip: React.FC = ()=>{

    const [authModalShow,setAuthModalShow] = useState(true);
    const [user,setUser] = useState<IGoogleUser>();
    const [formData, setFormData] = useState<FormData>({
        googlePlaces: null,
        days: 0,
        budget: BudgetType.Cheap,
        group: GroupType.OnePerson
    });

    const onDaysChange = (e:React.FormEvent<FormControlElement>)=>{setFormData({...formData, days: Number(e.currentTarget.value) })}
    const onBudgetChange = (e:React.FormEvent<HTMLSelectElement>)=>{setFormData({...formData, budget: e.currentTarget.value as BudgetType  })}
    const onGroupChange = (e:React.FormEvent<HTMLSelectElement>)=>{setFormData({...formData, group: e.currentTarget.value as GroupType })}

    
    useEffect(()=>{
        const user = sessionStorage.getItem("user")
        if(user){
            console.log(JSON.parse(user))
            setUser(JSON.parse(user))
            setAuthModalShow(false)
            console.log(user)
        }

        console.log(formData);
    },[formData,authModalShow])

    const generateTrip = async ()=>{
        toast(123)
        const finalPrompt = AI_PROMPT
        .replace("{location}",formData.googlePlaces?.label as string)
        .replace("{days_number}", formData.days.toString())
        .replace("{group_enum}", formData.group)
        .replace("{budget_enum}", formData.budget)
       
        const result = await chatSession.sendMessage(finalPrompt);

        console.log(finalPrompt)
        console.log(JSON.parse(result.response.text()));
        const tripPlan:ITripPlan = JSON.parse(result.response.text())
        await TripPlanApi.create(tripPlan);      
        toast("created") 
    }






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
                        value: formData?.googlePlaces,
                        onChange: (newValue)=>setFormData({...formData, googlePlaces: newValue})
                    }}
                />
                
                <h2 className="title">How many days are you planning your trip?</h2>
                <Form.Control type="number" placeholder="Example: 3" onChange={onDaysChange} />

                <h2 className="title">What is Your Budget?</h2>
                <Form.Select aria-label="Default select example" onChange={onBudgetChange}>
                    {(Object.keys(BudgetType) as Array<keyof typeof BudgetType>).map(e=>(<option value={e}>{e}</option>))}
                </Form.Select>
                
                <h2 className="title">Who do you plan on traveling with on your next adventure?</h2>
                <Form.Select aria-label="Default select example" onChange={onGroupChange}>
                    {(Object.keys(GroupType) as Array<keyof typeof GroupType>).map(e=>(<option value={e}>{e}</option>))}
                </Form.Select>
                
                <Button className="button" onClick={()=>generateTrip()}>create trip</Button>
            </div>
        </Container>
        <AuthModal show={authModalShow} handleClose={()=>setAuthModalShow(false)}/>
    </div>
}



