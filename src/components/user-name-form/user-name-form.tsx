import "./user-name-form.styles.css";

type UserNameFormProps = {
  setUserName: (userName: string) => void;
};

const UserNameForm = (props: UserNameFormProps) => {
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    props.setUserName(event.target[0].value);
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
