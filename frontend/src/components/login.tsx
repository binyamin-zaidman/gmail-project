import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import { getUserExist, userExist } from "../api/users";

export default function Login() {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleFotge = () => {
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
            const result = await getUserExist(phone, password) ;
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
                    <div className="buttonForLogin">
                        {errorMessage && <div>{errorMessage}</div>}
                        <button onClick={() => console.log("Forgot password clicked")}>forgot password</button>
                        <button type="submit">login</button>
                    </div>
                </form>
            </div>

        </div >

    )
}