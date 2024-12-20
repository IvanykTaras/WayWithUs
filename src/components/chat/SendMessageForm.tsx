import { useState } from "react";
import { Button, ButtonGroup, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { OpenAIApi } from "../../services/OpenAIApi";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";

interface IProps{
    sendMessage: (message:string) => void;
    closeConnection: () => void;    
}

export const SendMessageForm: React.FC<IProps> = ({sendMessage,closeConnection}) => {
    const [message, setMessage] = useState<string>("");
    const { room, tripId } = useParams<{ room: string, tripId: string }>();

    async function sendMessageToAI(){
        sendMessage(message);
        setMessage("");
        const aiMessage = await OpenAIApi.getOpenAiResponse(message);

        const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7137/chat")
                .build();
        await connection.start(); 
        await connection.invoke("JoinRoom", { user: "AI Asystant", room });
        await connection.invoke("SendMessage", aiMessage, tripId);
        await connection.stop();
    } 


    
    
    return <>
    <Form onSubmit={e=>{
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    }}>
        <FormGroup>
            
            <Form.Control
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <ButtonGroup style={{width:"100%"}}>
                <Button variant="success" type="submit" disabled={!message} >send</Button>
                <Button variant="warning" disabled={!message} onClick={sendMessageToAI} >send to AI</Button>
                <Button className="w-100" variant="danger" onClick={async ()=>await closeConnection()}>Leave room</Button>
            </ButtonGroup>
            
        </FormGroup>
    </Form>
    </>
}