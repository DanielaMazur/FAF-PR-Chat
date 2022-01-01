import { useState } from "react";

import { Chat } from "./components/chat";
import { SignalRChat } from "./components/signal-r-chat";
import { UserNameForm } from "./components/user-name-form";

const App = () => {
  const [userName, setUserName] = useState<string>();
  const [chatType, setChatType] = useState<"webSocket" | "serverSentEvents">(
    "webSocket"
  );

  if (!userName) {
    return <UserNameForm setUserName={setUserName} setChatType={setChatType} />;
  }

  if (chatType === "serverSentEvents") {
    return <SignalRChat userName={userName} />;
  }

  return <Chat userName={userName} />;
};

export default App;
