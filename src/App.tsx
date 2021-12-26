import { useState } from "react";

import { Chat } from "./components/chat";
import { SignalRChat } from "./components/signal-r-chat";
import { UserNameForm } from "./components/user-name-form";

const App = () => {
  const [userName, setUserName] = useState<string>();

  return <SignalRChat />;
  // if (!userName) {
  //   return <UserNameForm setUserName={setUserName} />;
  // }

  // return <Chat userName={userName} />;
};

export default App;
