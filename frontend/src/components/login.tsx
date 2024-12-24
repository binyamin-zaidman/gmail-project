import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/login.css'
import { getUserExist, userExist } from "../api/users";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleForGet = () => {
        if (!phone || !password) {
            console.log("Please fill in all fields");
            return
        } else {
            console.log({ phone, password })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phone") {
            setPhone(value)
        } else if (name === "password") {
            setPassword(value)
        }
        setErrorMessage("")
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const result = await getUserExist(phone, password);
            console.log(result);
            if (result) {
                localStorage.setItem("user", JSON.stringify(result.token));
                navigate(`/app/${result.user_id}`, { replace: true });
            } else {
                setErrorMessage("Invalid credentials");
            }
        } catch (error) {
            setErrorMessage("Error during login");
            console.error(error);
        }
    };
    // const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    //     const token = localStorage.getItem("token");
    //     return token ? children : <Navigate to="/login" />;
    // };

    return (

        <div className="LoginPageContainer">
            <h2>Login</h2>
            <div className="inputForLogin">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="phone"></label>
                    <input
                        required
                        name="phone"
                        type="text"
                        maxLength={10}
                        // pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}"
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                    />
                    <label htmlFor="password"></label>
                    <input
                        required
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                    <a href=" "><p>Forgot password?</p></a>
                    <div className="buttonForLogin">
                        <button onClick={() => console.log("Forgot password clicked")}>signup</button>
                        <button type="submit">login</button>
                        {errorMessage && <div id="errorMessage">{errorMessage}</div>}
                    </div>
                </form>
            </div>

        </div >

    )
}