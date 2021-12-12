import { FormEvent, useState } from "react";
import "./pop3-email.styles.css";

const Pop3Email = () => {
  const [email, setEmail] = useState<{
    from: string;
    subject: string;
    message: string;
  } | null>(null);
  const getEmail = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData: Record<string, string> = {};
    for (var i = 0; i < form.elements.length - 1; i++) {
      const input = form.elements[i] as HTMLInputElement;
      formData[input.name] = input.value;
    }

    try {
      const result = await fetch(`https://localhost:44324/pop3/gmail`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resultData = await result.json();

      if (resultData === 400) {
        throw Error("Check input data, some fields are not correct");
      }

      setEmail({
        from: resultData.from,
        subject: resultData.subject,
        message: resultData.message,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={getEmail} className="align-center">
        <input
          className="margin-bottom"
          placeholder="My email"
          name="email"
          type="email"
        />
        <input
          className="margin-bottom"
          placeholder="password"
          type="password"
          name="password"
        />
        <input
          className="margin-bottom"
          placeholder="Email Number"
          name="emailNumber"
          type="number"
        />
        <button type="submit">Get Email</button>
      </form>

      {email && (
        <div>
          <h3>From: {email.from}</h3>
          <h3>Subject: {email.subject}</h3>
          <div dangerouslySetInnerHTML={{ __html: email.message || "" }}></div>
        </div>
      )}
    </>
  );
};

export { Pop3Email };
