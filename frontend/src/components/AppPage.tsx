import React, { useEffect } from "react";

import '../styles/appPage.css'
// import { getAllChats } from "../api/chats";
// import Meesege from "./presentsMessages";
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";


export function Page() {


    return (
        <div className="ContainerPage">
            <ChatConversations />
            {/* <Meesege /> */}
            <ShowAllMessages />
           
        </div>
    );
}

export default Page