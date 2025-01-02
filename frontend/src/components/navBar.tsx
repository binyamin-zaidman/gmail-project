import { useEffect, useRef, useState } from "react";
import "../styles/navBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { useBackground } from "./BackgroundContext";
import { useVisibility } from './VisibilityContext';
import { useVisibilityMeassage } from './VisibilityMEssage';
export default function NavBar({ user }) {
    const { setIsVisible } = useVisibility();
    const { isVisible } = useVisibility();
    const { setIsVisibleMeassage } = useVisibilityMeassage();
    const { isVisibleMeassage } = useVisibilityMeassage();
    // if(user){
    //     const userDatiles = user[0].username;

    // }
    // const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const { backgroundColor, setBackgroundColor } = useBackground();
    // const { userDetails, setUserDetails } = useUserDetails();
    const settingsRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };
    const handleMenu = () => {
        const chats = document.getElementById("chats");

        if (!menu && chats) {
            chats.classList.remove("hidden");
            chats.classList.add("block");
            setMenu(true);
        } else if (menu && chats) {
            chats.classList.remove("block");
            chats.classList.add("hidden");
            setMenu(false);
        }
    }

    const handleChats = () => {
        if (isVisible) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
            setIsVisibleMeassage(false)
        }
    }

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
            <nav id="navBar">
                <div id="menu" onMouseLeave={handleChats}><img src="/public/menu_27dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg" alt="menue" /></div>
                {/* <div id="chats" className="collapsible-item hidden" onClick={handleChats} ><p>chats</p></div> */}
            </nav>
            <div id="settings" onClick={() => setShowSettings(!showSettings)}>
                <img src="/public/user_14251527.gif" alt="settingIcon" />
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