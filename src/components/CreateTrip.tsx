import { useFormik } from "formik"
import { useState } from "react"
import { Container, Form } from "react-bootstrap"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Option } from "react-google-places-autocomplete/build/types"
import styled from "styled-components"

export const CreateTrip: React.FC = ()=>{
    // const googlePlaces = useFormik<Option>({
    //     initialValues:{
    //         label: "",
    //         value: {
    //             description: "",
    //             place_id: "",
    //             reference: ""
    //         }
    //     },
    //     onSubmit: ()=>{}
    // })
    const [googlePlaces,setGooglePlaces] = useState<Option>(); 
    
    return <div>
        <Container className="create-trip">
            <div className="create-trip__intro">
                <h1>Tell us your travel preferences</h1>
                <p>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            </div>

            <div className="create-trip__forms">
                <h2 className="title">What is destination of choice?</h2>
                <GooglePlacesAutocomplete 
                    apiKey="AIzaSyAaeF8LsmkU_Al-0NJ0Isg2BWvNOTrSxvY"
                    selectProps={{
                        value: googlePlaces,
                        onChange: (newValue)=>setGooglePlaces({...newValue} as Option)
                    }}
                />
                <h2 className="title">How many days are you planning your trip?</h2>
                <Form.Control type="number" placeholder="Example: 3" />
                <h2 className="title">What is Your Budget?</h2>
            </div>
        </Container>
    </div>
}

