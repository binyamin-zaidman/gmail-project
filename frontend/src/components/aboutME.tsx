import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/aboutME.css";

const Introduction: React.FC = () => {
    const navigate = useNavigate();

    const checkUser = async () => {
        const token = localStorage.getItem("user");

        if (token) {
        navigate('/login')
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div className="introduction-container">
            <div className="intro-content">
                <h1 className="app-title">ברוכים הבאים לצ'אט השיחות שלנו!</h1>
                <p className="app-description">
                    האפליקציה שלנו נועדה לחבר אותך עם האנשים החשובים לך, בצורה קלה ונוחה. 
                    ממשק מהיר, מאובטח ומותאם אישית יבטיח שהשיחות שלך תמיד זמינות בכל מקום ובכל זמן.
                </p>
                <p className="app-features">
                    - צ'אט פרטי <br />
                    - מערכת מאובטחת לשמירה על פרטיות<br />
                    - ממשק נח וקליל <br />
                    - שליחת הודעות בזמן אמת
                </p>
                <p className="app-call-to-action">
                    התחבר או הירשם עכשיו כדי להתחיל
                </p>
                <button className="app-button" onClick={() => navigate("/login")}>
                    התחבר/הירשם
                </button>
            </div>
        </div>
    );
};

export default Introduction;
