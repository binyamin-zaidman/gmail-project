import { useBackground } from "../components/BackgroundContext";

export default function SettingsPage() {
    const { backgroundColor, setBackgroundColor } = useBackground();

    const changeBackground = () => {
        const newColor = prompt("Enter a color (e.g., #f0f0f0 or 'blue')", backgroundColor);
        if (newColor) {
            setBackgroundColor(newColor);
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <button onClick={changeBackground}>Change Background</button>
        </div>
    );
}
