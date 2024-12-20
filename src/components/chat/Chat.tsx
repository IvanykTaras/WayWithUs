import { Button } from "react-bootstrap";

import { MesssageContainer } from "./MessageContainer";
import { SendMessageForm } from "./SendMessageForm";
import { ConnectedUsers } from "./ConnectedUsers";
import { message } from "./ChatApp";
import { useNavigate } from "react-router-dom";
import { AsyncAction } from "../../utils";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { dataContext, DataEnum } from "../../App";
import { IGoogleUser } from "../../interfaces/IGoogleUser";
import { TripPlan } from "../../interfaces/TripPlan";
import { TripPlanApi } from "../../services/TripPlanApi";
import { UserApi } from "../../services/UserApi";

interface IProps{
    users: string[];
    messages: message[];
    sendMessage: (message:string) => void;
    closeConnection: () => void;    
}

export const Chat: React.FC<IProps> = ({users,messages,sendMessage,closeConnection}) => {
    

    return <>
    <div className="leave-room">
        <Button className="w-100" variant="danger" onClick={async ()=>await closeConnection()}>Leave room</Button>
    </div>
    <ConnectedUsers users={users}/>
    <div className="chat">
        <MesssageContainer messages={messages}/>
        <SendMessageForm sendMessage={sendMessage}/>
    </div>
    </>
}