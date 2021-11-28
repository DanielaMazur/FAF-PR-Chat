import { useEffect, useRef, useState } from "react";
import "./chat.styles.css";

const webSocket = new WebSocket("wss://localhost:44324");

type ChatProps = {
  userName: string;
};

const Chat = (props: ChatProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    webSocket.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
  });

  const handleSendMessage = () => {
    if (!inputRef.current) return;
    webSocket.send(props.userName + ": " + inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className="chat-page">
      <h3>Hi {props.userName}</h3>
      <div className="actions-container ">
        <input className="chat-input" ref={inputRef} />
        <button className="submit-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>

      {messages.map((message) => (
        <div key={props.userName + message}>{message}</div>
      ))}
    </div>
  );
};

export { Chat };
