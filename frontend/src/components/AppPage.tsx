import React, { useEffect } from "react";

import '../styles/appPage.css'
// import { getAllChats } from "../api/chats";
// import Message from "./presentsMessages";
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";


export default function AppPage() {


    return (
        <div className="ContainerPage">
            <ChatConversations />
            {/* <Message /> */}
            <ShowAllMessages />

        </div>
    );
}

