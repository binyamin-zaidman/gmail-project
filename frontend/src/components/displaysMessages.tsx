import { useState, useEffect } from "react";
import { getAllMesseges, sendMessege } from "../api/messege";
import { useParams } from "react-router-dom";

export default function Message() {
    const params = useParams();
    const chatId = params.id; // מזהה הצ'אט מתוך ה-URL
    const sender = Number(1); // מזהה השולח כ-מספר

    const [messages, setMesseges] = useState([]); // רשימת ההודעות
    const [newMessege, setNewMessege] = useState(""); // הודעה חדשה לשליחה
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!chatId) return;

        const fetchMesseges = async () => {
            setLoading(true);
            try {
                const res = await getAllMesseges(Number(chatId));
                console.log(res);

                setMesseges(res);
            } catch (error: any) {
                setError(error.message || "שגיאה בטעינת הודעות");
            } finally {
                setLoading(false);
            }
        };

        fetchMesseges(); // קריאה לפונקציה בטעינת הרכיב
    }, [chatId]); // עדכון אם מזהה הצ'אט משתנה

    const handleSendMessege = async () => {
        if (!newMessege.trim()) return; // בדיקה שההודעה אינה ריקה
        try {
            
            const res = await sendMessege({
                text: newMessege,
                chat_id: Number(chatId),
                read: false,
                sender_id: sender,
            });

            setMesseges([...messages, res]); // עדכון רשימת ההודעות
            setNewMessege(""); // איפוס שדה ההודעה
        } catch (error: any) {
            setError(error.message || "שגיאה בשליחת ההודעה");
        }
    };

    if (!chatId) {
        return <div>לא נמצא מזהה צ'אט</div>;
    }

    return (
        <div>
            <h1>Messages</h1>

            {loading ? (
                <p>טוען הודעות...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    {messages.map((msg: any, id: number) => (
                        <p key={id}>{msg.message}</p>
                    ))}
                </div>
            )}

            <div>
                <input
                    type="text"
                    value={newMessege}
                    onChange={(e) => setNewMessege(e.target.value)}
                    placeholder="כתוב הודעה..."
                />
                <button onClick={handleSendMessege}>שלח</button>
            </div>
        </div>
    );
}
