import { useBackground } from "./BackgroundContext";
import "../styles/SettingsPage.css";
export default function SettingsPage() {
    const { backgroundColor, setBackgroundColor } = useBackground();
    const predefinedColors = ["#ffffff", "#f0f0f0", "#ff0000", "#00ff00", "#0000ff"];

    const handlePredefinedColorClick = (color: string) => {
        setBackgroundColor(color); // שינוי צבע לרקע שהמשתמש בחר
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(event.target.value); // עדכון צבע מותאם אישית
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <p>Current Background Color: <span style={{ color: backgroundColor }}>{backgroundColor}</span></p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {predefinedColors.map((color) => (
                    <div
                        key={color}
                        onClick={() => handlePredefinedColorClick(color)}
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: color,
                            border: color === backgroundColor ? "3px solid black" : "1px solid #ccc",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
            <div style={{ marginTop: "20px" }}>
                <label>
                    Choose a custom background color: 
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={handleColorChange}
                        style={{ marginLeft: "10px" }}
                    />
                </label>
            </div>
        </div>
    );
}
