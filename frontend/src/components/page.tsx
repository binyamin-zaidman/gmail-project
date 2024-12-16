import React, { useEffect } from "react";

import '../styles/page.css'
// import { getAllChats } from "../api/chats";
import ChatBar from "./chatConversations";
import Chat from "./chat";
import Meesege from "./displaysMessages";

export function Page() {


    return (
        <div className="ContainerPage">
            <ChatBar />
            <Chat />
            <Meesege />
        </div>
    );
}

export default Page