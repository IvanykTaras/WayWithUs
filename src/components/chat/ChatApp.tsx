import { useContext, useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { dataContext, DataEnum } from '../../App';
import { Chat } from './Chat';
import { IGoogleUser } from '../../interfaces/IGoogleUser';
import { useNavigate, useParams } from 'react-router-dom';

export type message = { user: string, message: string };

export const ChatApp: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<message[]>([])
  const [users, setUsers] = useState<string[]>([]);
  const context = useContext(dataContext);
  const { room } = useParams<{ room: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      (async () => {
        if (room && !connection) {
          const user = context[DataEnum.User].value as IGoogleUser;
          await joinRoom(user.name, room ? room : "general");
        } else {
          await closeConnection();
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

      localStorage.setItem("loggedInUser", user);

      connection.onclose(e => {
        if (connection.state === "Connected") {
          connection.invoke("LeaveRoom", { user, room });
        }
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
        localStorage.removeItem("loggedInUser");
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
        await connection.invoke("SendMessage", message);
      } else {
        console.log("Connection is not in the 'Connected' state.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function closeConnection() {
    try {
      navigate("/search");
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
