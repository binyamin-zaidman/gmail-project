import React, { useEffect, useState } from "react";
import { useBackground } from "./BackgroundContext";
import NavBar from "./navBar";
import '../styles/appPage.css'
import ChatConversations from "./chatConversations";
import ShowAllMessages from "./showMessages";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../api/users";
// import { getAllChats } from "../api/chats";
// import Message from "./presentsMessages";

export default function AppPage() {
    const { backgroundColor } = useBackground();
    const { userId } = useParams()
    const [user, setUser] = useState("")

    useEffect(() => {
        if (userId) {
            const fetchUserDetails = async () => {                
                try {
                    const userDetails = await getUserDetails(userId);
                    setUser(userDetails);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserDetails();
        }
    }, [userId,setUser]);
    //id user
    // useContext
    // useState 
    return (
        <div className="ContainerPage" style={{ backgroundColor, height: "100vh" }}>
            <NavBar user={user}/>
            <ChatConversations />
            <ShowAllMessages user={user }/>

        </div>
    );
}

