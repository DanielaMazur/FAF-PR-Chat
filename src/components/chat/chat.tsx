import { useEffect, useRef, useState } from "react";
import "./chat.styles.css";

type ChatProps = {
  userName: string;
};

const Chat = (props: ChatProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    webSocket.current = new WebSocket(
      "wss://localhost:44324" + window.location.pathname
    );

    webSocket.current.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
  }, []);

  const handleSendMessage = (event: any) => {
    event.preventDefault();
    if (!inputRef.current) return;
    webSocket.current?.send(props.userName + ": " + inputRef.current.value);
    inputRef.current.value = "";
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

      {messages.map((message) => (
        <div key={props.userName + message}>{message}</div>
      ))}
    </div>
  );
};

export { Chat };
