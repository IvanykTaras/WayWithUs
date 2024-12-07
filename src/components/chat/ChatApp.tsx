import { useState } from 'react'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import App from '../../App';
import { Chat } from './Chat';
import { Lobby } from './Lobby';



export type message = {user:string,message:string};

export const ChatApp: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<message[]>([])
  const [users, setUsers] = useState<string[]>([]);

  async function joinRoom(user: string, room: string) {
    try {
      const connection = new HubConnectionBuilder()
        // .withUrl("https://localhost:7003/chat")
        .withUrl("https://localhost:7137/chat")
        .build();

        connection.on("UsersInRoom", (users) => {
          setUsers(users);
        })

        connection.on("ReciveMessage", (user, message) => {
          // console.log("message received:" + message);
          setMessages((messages) => [...messages, {user, message}]);
        });

        localStorage.setItem("loggedInUser", user);

        connection.onclose(e=>{
          if (connection.state === "Connected") {
            connection.invoke("LeaveRoom", {user, room});
          }
          setConnection(undefined);
          setMessages([]);
          setUsers([]);
          localStorage.removeItem("loggedInUser");
        });

        await connection.start();
        await connection.invoke("JoinRoom", {user, room});
        setConnection(connection);
    } catch (error) {
      console.log(error)
    }
  }

  async function sendMessage(message: string) {
    try {
      if (connection && connection.state === "Connected") {
        await connection.invoke("SendMessage", message);
      } else {
        console.log("Connection is not in the 'Connected' state.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function closeConnection() {
    console.log(connection)
    try {
      await connection?.stop();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{
      padding: "1rem",
      textAlign: "center",
      
    }}>
     <h2>My Chat</h2>
     <hr className="line" />
     <Chat 
          users={users}
          messages={messages} 
          sendMessage={sendMessage} 
          closeConnection={closeConnection}
          />
     
    </div>
  )
}

export default ChatApp;
