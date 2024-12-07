import { Button } from "react-bootstrap";

import { MesssageContainer } from "./MessageContainer";
import { SendMessageForm } from "./SendMessageForm";
import { ConnectedUsers } from "./ConnectedUsers";
import { message } from "./ChatApp";

interface IProps{
    users: string[];
    messages: message[];
    sendMessage: (message:string) => void;
    closeConnection: () => void;    
}

export const Chat: React.FC<IProps> = ({users,messages,sendMessage,closeConnection}) => {
    return <>
    <div className="leave-room">
        <Button className="w-100" variant="danger" onClick={()=>closeConnection()}>Leave room</Button>
    </div>
    <ConnectedUsers users={users}/>
    <div className="chat">
        <MesssageContainer messages={messages}/>
        <SendMessageForm sendMessage={sendMessage}/>
    </div>
    </>
}