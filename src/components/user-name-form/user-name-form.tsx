import "./user-name-form.styles.css";
import { v4 } from "uuid";

type UserNameFormProps = {
  setUserName: (userName: string) => void;
};

const UserNameForm = (props: UserNameFormProps) => {
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    if (window.location.pathname === "/") {
      await createRoom();
    }
    props.setUserName(event.target[0].value);
  };

  const createRoom = async () => {
    try {
      const roomId = v4();

      await fetch(`https://localhost:44324/room?name=${roomId}`, {
        method: "POST",
      });

      window.history.pushState({}, "", roomId);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="user-name-page">
      <form onSubmit={handleFormSubmit}>
        <input
          className="user-name-input"
          placeholder="Enter your name"
          required
        />
        <button type="submit">Enter the live chat</button>
      </form>
    </div>
  );
};

export { UserNameForm };
