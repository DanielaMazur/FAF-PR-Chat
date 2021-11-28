import "./chat.styles.css";

type ChatProps = {
  userName: string;
};

const Chat = (props: ChatProps) => {
  return (
    <div className="chat-page">
      <h3>Hi {props.userName}</h3>
      <div className="actions-container ">
        <input className="chat-input" />
        <button className="submit-button">Send</button>
      </div>
    </div>
  );
};

export { Chat };
