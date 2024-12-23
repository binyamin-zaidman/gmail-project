// import { useBackground } from "./BackgroundContext";

// export default function SettingsPage() {
//     const { backgroundColor, setBackgroundColor } = useBackground();

//     // רשימת צבעים לבחירה
//     const colors = ["#ffffff", "#f0f0f0", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

//     const handleColorChange = (color: string) => {
//         setBackgroundColor(color); // שינוי צבע דרך ה-Context
//     };

//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h1 style={{ marginBottom: "20px" }}>Settings</h1>
//             <p style={{ marginBottom: "20px" }}>
//                 Current Background Color:{" "}
//                 <span style={{ fontWeight: "bold", color: backgroundColor }}>{backgroundColor}</span>
//             </p>

//             {/* רשימת צבעים */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
//                 {colors.map((color) => (
//                     <div
//                         key={color}
//                         onClick={() => handleColorChange(color)}
//                         style={{
//                             width: "40px",
//                             height: "40px",
//                             backgroundColor: color,
//                             border: color === backgroundColor ? "3px solid black" : "1px solid #ccc",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                             transition: "transform 0.2s, border 0.2s",
//                         }}
//                         title={`Set background color to ${color}`} // תצוגה של צבע בבחירה
//                     />
//                 ))}
//             </div>

//             {/* אפשרות לשנות צבע מותאם אישית */}
//             <button
//                 onClick={() => {
//                     const newColor = prompt("Enter a color (e.g., #f0f0f0 or 'blue')", backgroundColor);
//                     if (newColor) {
//                         setBackgroundColor(newColor);
//                     }
//                 }}
//                 style={{
//                     padding: "10px 20px",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     borderRadius: "5px",
//                     border: "none",
//                     backgroundColor: "#007BFF",
//                     color: "#fff",
//                     transition: "background-color 0.3s",
//                 }}
//             >
//                 Enter Custom Color
//             </button>
//         </div>
//     );
// }
