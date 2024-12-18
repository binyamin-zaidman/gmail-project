import React, { useEffect } from "react";

import '../styles/appPage.css'
// import { getAllChats } from "../api/chats";
// import Message from "./presentsMessages";
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";
import NavBar from "./navBar";


export default function AppPage() {
//id user
// useContext
// useState 
    return (
        <div className="ContainerPage">
            <NavBar />
            <ChatConversations />
            <ShowAllMessages />

        </div>
    );
}

