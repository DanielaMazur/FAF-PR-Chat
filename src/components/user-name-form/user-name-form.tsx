import "./user-name-form.styles.css";
import { v4 } from "uuid";
import { FormEvent, useState } from "react";
import { Pop3Email } from "../pop3-email";

type UserNameFormProps = {
  setUserName: (userName: string) => void;
  setChatType: React.Dispatch<
    React.SetStateAction<"webSocket" | "serverSentEvents">
  >;
};

const UserNameForm = (props: UserNameFormProps) => {
  const [isSMTPEmail, setSMTPEmail] = useState(false);
  const [isGetLatestPOP3Emails, setGetLatestPOP3Emails] = useState(false);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const chatType =
      event.nativeEvent.submitter.name === "webSocketChat"
        ? "webSocket"
        : "serverSentEvents";

    if (chatType === "webSocket") {
      if (window.location.pathname === "/") {
        await createRoom();
      }
    }

    props.setChatType(chatType);
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

  if (isSMTPEmail) {
    const sendEmail = async (event: FormEvent) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData: Record<string, string> = {};
      for (var i = 0; i < form.elements.length - 1; i++) {
        const input = form.elements[i] as HTMLInputElement;
        formData[input.name] = input.value;
      }

      try {
        const result = await fetch(`https://localhost:44324/smtp/gmail`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resultCode = await result.json();

        if (resultCode === 400) {
          throw Error("Check input data, some fields are not correct");
        }

        alert("Your email was successfully sent!");
      } catch (error) {
        alert(error);
      }
    };

    return (
      <form onSubmit={sendEmail} className="user-name-page">
        <input
          className="margin-bottom"
          placeholder="from"
          name="from"
          type="email"
        />
        <input
          className="margin-bottom"
          placeholder="to"
          name="to"
          type="email"
        />
        <input
          className="margin-bottom"
          placeholder="password"
          type="password"
          name="password"
        />
        <input className="margin-bottom" placeholder="Subject" name="subject" />
        <textarea
          className="margin-bottom"
          placeholder="Message"
          name="message"
        />
        <button type="submit">Send Email</button>
      </form>
    );
  }

  if (isGetLatestPOP3Emails) {
    return <Pop3Email />;
  }

  return (
    <div className="user-name-page">
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="user-name-input"
            placeholder="Enter your name"
            required
          />
          <button type="submit" name="webSocketChat">
            Enter WebSocket chat
          </button>
          <button type="submit" name="serverSentEventsChat">
            Enter ServerSentEvents chat
          </button>
        </form>
      </div>
      OR
      <button onClick={() => setSMTPEmail(true)}>Send an SMTP Email</button>
      OR
      <button onClick={() => setGetLatestPOP3Emails(true)}>
        Get POP3 Email
      </button>
    </div>
  );
};

export { UserNameForm };
