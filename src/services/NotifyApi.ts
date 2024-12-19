import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import { LoginReponse } from "./IdentityApi";
import { Notification } from "../components/AuthModal";

export class NotifyApi{
    async notificationSubscribe(notification: Notification) {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7137/chat")
            .build();
          await connection.start();
          await connection.invoke("SendNotification", notification);
          await connection.stop();
    }
}

