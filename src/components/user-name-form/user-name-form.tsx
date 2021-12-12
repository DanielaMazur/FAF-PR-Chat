import "./user-name-form.styles.css";
import { v4 } from "uuid";
import { FormEvent, useState } from "react";

type UserNameFormProps = {
  setUserName: (userName: string) => void;
};

const UserNameForm = (props: UserNameFormProps) => {
  const [isSMTPEmail, setSMTPEmail] = useState(false);
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
        <input className="margin-bottom" placeholder="from" name="from" />
        <input className="margin-bottom" placeholder="to" name="to" />
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

  return (
    <div className="user-name-page">
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="user-name-input"
            placeholder="Enter your name"
            required
          />
          <button type="submit">Enter the live chat</button>
        </form>
      </div>
      OR
      <button onClick={() => setSMTPEmail(true)}>Send an SMTP Email</button>
    </div>
  );
};

export { UserNameForm };
