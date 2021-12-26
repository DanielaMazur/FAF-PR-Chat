import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";

const SignalRChat = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  //   const [chat, setChat] = useState([]);
  //   const latestChat = useRef(null);

  //   latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44324/hubs/chat")
      .withAutomaticReconnect()
      .configureLogging({
        log: function (logLevel, message) {
          console.log(new Date().toISOString() + ": " + message);
        },
      })
      .build();

    setConnection(newConnection);
    console.log(newConnection);
    if (newConnection) {
      newConnection
        .start()
        .then((result) => {
          console.log("Connected!", result);

          newConnection.on("ReceiveMessage", (message) => {
            console.log(message);
            // const updatedChat = [...latestChat.current];
            // updatedChat.push(message);
            // setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, []);

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
    <button onClick={() => sendMessage("Dana", "any")}>SendMessage</button>
  );
};

export { SignalRChat };
