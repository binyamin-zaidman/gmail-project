import { useEffect, useRef, useState } from "react";
import "../styles/navBar.css";
import { useNavigate, useParams } from "react-router-dom";

export default function NavBar() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
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

    const changeBackground = () => {
        const newColor = prompt("Enter a color (e.g., #f0f0f0 or 'red')", backgroundColor);
        if (newColor) {
            setBackgroundColor(newColor);
        }
    };

    return (
        <div id="navContainer">
            <div id="navBar"></div>
            <div id="settings" onClick={() => setShowSettings(!showSettings)}>
                <img src="/public/cogwheel.png" alt="settingIcon" />
            </div>
            {showSettings && (
                <div id="settingsMenu">
                    <div onClick={() => { alert(`Viewing profile for user ${userId}`) }}>
                        View Profile
                    </div>
                    <div onClick={changeBackground}>Change Background</div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
        </div>
    );
}
