import { useEffect, useRef, useState } from "react";
import "../styles/navBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { useBackground } from "./BackgroundContext";
import { useUser  } from '../components/UserContext.tsx'; 

export default function NavBar({user}) {
    // if(user){
    //     const userDatiles = user[0].username;
                
    // }
    // const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const { backgroundColor, setBackgroundColor } = useBackground();
    // const { userDetails, setUserDetails } = useUserDetails();
    const settingsRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const settingsMenu = document.getElementById("settings");
            if (settingsMenu && !settingsMenu.contains(event.target as Node)) {
                setShowSettings(false); // שינוי ל-false כדי לסגור את התפריט
            }
        };

        if (showSettings) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showSettings]);

    const predefinedColors = [
        "#ffffff",
        "#FFF0DC",
        "#ff0000",
        "#85A98F",
        "#81BFDA",
        "#FFB200",
        "#FF748B",
        "#6A669D",
    ];
    


    return (
        <div id="navContainer">
            <div id="navBar"></div>
            <div id="settings" onClick={() => setShowSettings(!showSettings)}>
                <img src="/public/settings.png" alt="settingIcon" />
            </div>
            {showSettings && (
                <div id="settingsMenu" ref={settingsRef}>
                    <div onClick={() => { alert(`Viewing profile for user ${user[0].username}`) }}>
                        <div>
                            <p>your profile is: '{user[0].username}'</p>
                        </div>
                    </div>
                    <div>
                        Change Background:
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            {predefinedColors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setBackgroundColor(color)}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        backgroundColor: color,
                                        border: color === backgroundColor ? "2px solid black" : "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                    }}
                                    title={`Set background color to ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
        </div>
    );
}