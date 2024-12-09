import { useState } from "react";
import { Button, ButtonGroup, Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";

interface IProps{
    sendMessage: (message:string) => void;
}

export const SendMessageForm: React.FC<IProps> = ({sendMessage}) => {
    const [message, setMessage] = useState<string>("");
   
    
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
            <Button variant="success" type="submit" disabled={!message} >send</Button>
        </FormGroup>
    </Form>
    </>
}