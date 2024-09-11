import { useContext, useState } from "react"
import { Container, Form } from "react-bootstrap"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Option } from "react-google-places-autocomplete/build/types"
import { BudgetType, BudgetTypeValueList } from "../enums/BudgetType"
import { GroupType, GroupTypeValueList } from "../enums/GroupType"
import { apiKeyAndUrl, PLACES_API_KEY } from "../assets/ApiKeys"
import { toast } from "react-toastify"
import { TripPlanApi } from "../services/TripPlanApi"
import { GeminiApi, IGeminiTrip } from "../services/GeminiApi"
import { useNavigate } from "react-router-dom"
import { dataContext, DataEnum } from "../App"
import { Button } from "@radix-ui/themes"

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
type FormData = {
    location: Option | null,
    days: number,
    budget: BudgetType,
    group: GroupType
}

export const CreateTrip: React.FC = ()=>{

    const navigate = useNavigate();
    const context = useContext(dataContext);

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
        context[DataEnum.Loadding].set(true)
        if(context[DataEnum.User].value){
            try {
                toast.info("start creating");
                await toast.promise(
                    (async ()=>{
                        const geminiApi = new GeminiApi(apiKeyAndUrl.GEMINI_API_KEY);
                    
                    const geminiTrip:IGeminiTrip = {
                        userEmail: context[DataEnum.User].value.email as string,
                        location: formData.location?.label as string,
                        daysNumber: formData.days.toString(),
                        groupType: formData.group,
                        budgetType: formData.budget
                    }
        
                    const tripPlan = await geminiApi.generateTripJson(geminiTrip);
                    
                    const newTripPlan = await TripPlanApi.create(tripPlan);
                    
                    navigate(`/trip-view/${newTripPlan.id}`);
                    
                    }),
                    {
                    pending: 'creating trip pending',
                    success: 'Trip created 👌',
                    error: 'Promise rejected 🤯'
                    }
                )
                
                
                toast.info("created") 
            } catch (error) {
                toast.error("some input is empty")
            }
        }else{
            context[DataEnum.IsUser].set(!context[DataEnum.IsUser].value);
        }
        context[DataEnum.Loadding].set(false)
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
                        value: formData?.location,
                        onChange: (newValue)=>setFormData({...formData, location: newValue})
                    }}
                />
                
                <h2 className="title">How many days are you planning your trip?</h2>
                <Form.Control type="number" min={1} max={3}  placeholder="Example: 3" onChange={onDaysChange} />

                <h2 className="title">What is Your Budget?</h2>
                <Form.Select aria-label="Default select example" onChange={onBudgetChange}>
                    {(BudgetTypeValueList).map((e,i)=>(<option value={i}>{e}</option>))}
                </Form.Select>
                
                <h2 className="title">Who do you plan on traveling with on your next adventure?</h2>
                <Form.Select aria-label="Default select example" onChange={onGroupChange}>
                    {(GroupTypeValueList).map((e,i)=>(<option value={i}>{e}</option>))}
                </Form.Select>
                
                <Button 
                    className="button"
                    color="iris"
                    onClick={()=>generateTrip()}
                    loading={context[DataEnum.Loadding].value}
                    >
                    create trip
                </Button>
            </div>
        </Container>
    </div>
}



