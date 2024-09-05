import { GoogleLogin, useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import axios from "axios";
import { USER_INFO } from "../assets/ApiKeys";

interface IProps{
    show:boolean;
    handleClose: ()=>void    
}


export const AuthModal: React.FC<IProps> = ({show,handleClose})=>{

    const auth = useGoogleLogin({
        onSuccess: tokenResponse => getUserProfile(tokenResponse.access_token),
        onError: ()=>toast("asdf")
    });

    const getUserProfile = async (token:string)=>{
        const url = USER_INFO.replace("{token}", token)
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
        sessionStorage.setItem("user",JSON.stringify(response.data))
        handleClose();  
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Footer>
                <Button variant="dark" style={{width:"100%"}} onClick={()=>auth()}>
                    <FcGoogle style={{marginRight:"1rem",fontSize:"2rem"}}/>Sing In With Google
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}