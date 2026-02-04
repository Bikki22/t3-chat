import { currentUser } from "@/modules/authentication/actions";
import ChatMessageView from "@/modules/chat/components/chat-message-view";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return <ChatMessageView user={user} />;
};

export default page;
