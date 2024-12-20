import { useEffect, useRef } from "react";
import { message } from "../../App";

interface IProps{
    messages: message[];
}

export const MesssageContainer: React.FC<IProps> = ({messages}) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    useEffect(()=>{
        if(messageRef && messageRef.current){
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    },[messages])

    return <>
        <div ref={messageRef} className="message-container">
            {messages.map( (message, index) =>{
                const isLoggedInUser = message.user === loggedInUser;
                return (<div key={index} className={`user-message ${isLoggedInUser ? '' : 'text-start'}`}>
                    <div className="message bg-primary">{message.message}</div>
                    <div className="from-user">{message.user}</div>
                </div>)
            })}
        </div>
    </>
}