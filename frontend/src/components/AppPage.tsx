import React, { useEffect } from "react";
import { useBackground } from "./BackgroundContext";
import NavBar from "./navBar";
import '../styles/appPage.css'
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";
// import { getAllChats } from "../api/chats";
// import Message from "./presentsMessages";

export default function AppPage() {
    const { backgroundColor } = useBackground();
//id user
// useContext
// useState 
    return (
        <div className="ContainerPage" style={{ backgroundColor, height: "100vh" }}>
            <NavBar />
            <ChatConversations />
            <ShowAllMessages />

        </div>
    );
}

