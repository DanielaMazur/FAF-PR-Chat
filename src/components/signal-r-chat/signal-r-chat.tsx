import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";

import "./signal-r-chat.styles.css";

export type SignalRChatProps = {
  userName: string;
};

const SignalRChat = (props: SignalRChatProps) => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [chat, setChat] = useState<{ user: string; message: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        "https://localhost:44324/hubs/chat",
        HttpTransportType.ServerSentEvents
      )
      .withAutomaticReconnect()
      .configureLogging({
        log: function (logLevel, message) {
          console.log(new Date().toISOString() + ": " + message);
        },
      })
      .build();

    setConnection(newConnection);

    if (newConnection) {
      newConnection
        .start()
        .then((result) => {
          newConnection.on("ReceiveMessage", (message) => {
            setChat((prevChat) => [...prevChat, message]);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, []);

  const handleSendMessage = (event: any) => {
    event.preventDefault();
    if (!inputRef.current) return;
    sendMessage(props.userName, inputRef.current.value);
    inputRef.current.value = "";
  };

  const sendMessage = async (user: string, message: string) => {
    const chatMessage = {
      user: user,
      message: message,
    };

    if (connection) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return (
    <div className="chat-page">
      <h3>Hi {props.userName}</h3>
      <form className="actions-container" onSubmit={handleSendMessage}>
        <input className="chat-input" ref={inputRef} />
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>

      {chat.map(({ user, message }) => (
        <div key={props.userName + message}>
          {user} : {message}
        </div>
      ))}
    </div>
  );
};

export { SignalRChat };
