import React, { useEffect } from "react";

import '../styles/appPage.css'
// import { getAllChats } from "../api/chats";
// import Message from "./presentsMessages";
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";
import NavBar from "./navBar";


export default function AppPage() {


    return (
        <div className="ContainerPage">
            <NavBar />
            <ChatConversations />
            <ShowAllMessages chat_id={1} />

        </div>
    );
}

