type UserNameFormProps = {
  setUserName: (userName: string) => void;
};

const UserNameForm = (props: UserNameFormProps) => {
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    props.setUserName(event.target[0].value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input placeholder="Enter your name" required />
      <button type="submit">Enter the live chat</button>
    </form>
  );
};

export { UserNameForm };
