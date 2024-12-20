import { useContext, useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { dataContext, DataEnum } from '../../App';
import { Chat } from './Chat';
import { IGoogleUser } from '../../interfaces/IGoogleUser';
import { useNavigate, useParams } from 'react-router-dom';
import { AsyncAction } from '../../utils';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { TripPlan } from '../../interfaces/TripPlan';
import { TripPlanApi } from '../../services/TripPlanApi';
import { UserApi } from '../../services/UserApi';
import { MessageApi } from '../../services/MessageApi';
import { Loadding } from '../custom/Loadding';
import { Button } from 'react-bootstrap';

export type message = { user: string, message: string };

export const ChatApp: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<message[]>([])
  const [users, setUsers] = useState<string[]>([]);
  const [loadding, setLoadding] = useState<boolean>(false);
  const context = useContext(dataContext);
  const { room, tripId } = useParams<{ room: string, tripId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
   
    
   
    return () => {
      (async () => {
        if (room && !connection) {
          // setLoadding(true);
          
          // const messages = await MessageApi.getMessagesByTripId(tripId as string);
          // setMessages(messages.map(m => ({ user: m.userConnection.user, message: m.messageText })));
  
          // const user = context[DataEnum.User].value as IGoogleUser;
          
          // await joinRoom(user.name, room ? room : "general");
          
          // setLoadding(false);
        }
      })()
    }
  }, [])

  function formatRoomName(roomName: string): string {
    // Убираем GUID, если он есть, и оставляем читаемое название
    const parts = roomName.split(' '); // Разделяем строку по пробелам
    if (parts.length > 1) {
      return parts.slice(1).join(' '); // Возвращаем название без первой части
    }
    return roomName; // Если разделения нет, возвращаем как есть
  }

  async function joinRoom(user: string, room: string) {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7137/chat")
        .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      })

      connection.on("ReciveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      sessionStorage.setItem("loggedInUser", user);

      connection.onclose(e => {
        if (connection.state === "Connected") {
          connection.invoke("LeaveRoom", { user, room });
        }
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
        sessionStorage.removeItem("loggedInUser");
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error)
    }
  }

  async function sendMessage(message: string) {
    try {
      if (connection && connection.state === "Connected") {
        await connection.invoke("SendMessage", message, tripId);
      } else {
        console.log("Connection is not in the 'Connected' state.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function closeConnection() {
    try {
      // navigate("/search");
      await TripCard(tripId as string);
      await connection?.stop();
    } catch (error) {
      console.log(error)
    }
  }




    async function TripCard(id: string) {
        await downloadTripAndUser(id);
        navigate(`/my-trips/${id}`);
    }

    async function downloadTripAndUser(tripId: string) {
        
      try {
      await toast.promise(
          async () => {
          const trip: TripPlan = await TripPlanApi.getById(tripId);
          const user: IGoogleUser = await UserApi.getUserById(trip.userId);
          context[DataEnum.TripView].set({
              trip: trip,
              user: user
          })
          },
          {
          pending: 'load trip',
          success: 'trip downloaded 👌',
          error: 'some error 🤯'
          }
      );
      } catch (error) {
        const e = error as AxiosError;
        console.error(error)
        toast.error(e.code);
        toast.error(e.message);
      }
      
    }




  return  !connection ? <>
    <Button variant="primary" onClick={async()=>{
      const messages = await MessageApi.getMessagesByTripId(tripId as string);
      setMessages(messages.map(m => ({ user: m.userConnection.user, message: m.messageText })));

      const user = context[DataEnum.User].value as IGoogleUser;
      
      await joinRoom(user.name, room ? room : "general");
    }} >Start chat</Button>
  </>:
  (
    <div style={{
      padding: "1rem",
      textAlign: "center",
    }}>
      <h2>Chat {room ? formatRoomName(room) : ""}</h2>
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
