import { useLocation, useNavigate } from "react-router-dom";
import { getUserForIdentification, restartPassword } from "../api/users";
import { useState, useEffect } from "react";
import "../styles/passwordRecovery.css";

export default function PasswordRecovery() {
    const location = useLocation();
    const phone = location.state?.phone || "";

    const navigate = useNavigate();
    const [user, setUser] = useState<{ id?: string; question?: string; answer?: string }>({});
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch user data when the component loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData: userData = await getUserForIdentification(phone);
                setUser(userData); // Save user data in state
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (phone) fetchUser();
        else navigate("/login");
    }, [phone]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh on form submit
        if (!password || !answer) {
            setErrorMessage("Please enter both password and answer");
            return;
        }

        try {
            const response = await restartPassword(user.id!, answer, password);
            console.log({ response });
            if (response) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setErrorMessage("Failed to reset password. Please try again later.");
        }
    };

    return (
        <div id="passwordRecovery">
            <h2>Password Recovery</h2>
            <p>Enter a new password.</p>
            <form onSubmit={handleSubmit}>
                <input
                    id="passwordForm"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state with password value
                />
                <h3>Security Question: {user.question ?? "Loading..."}</h3>
                <input
                    id="answerForm"
                    type="text"
                    placeholder="Enter answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)} // Update state with answer value
                />
                <button id="resetButton" type="submit">Send Reset Link</button>
                {errorMessage && <p id="errorMessage" className="error">{errorMessage}</p>}
            </form>
            <p>
                Remember your password?{" "}
                <span onClick={() => navigate("/login")} id="rememberPassword">Click here to Login</span>
            </p>
        </div>
    );
}
