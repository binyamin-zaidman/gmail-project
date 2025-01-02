import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/login.css'
import { getUserExist, userExist, UserLogged } from "../api/users";


export default function Login() {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    // useEffect(() => {
    //     const checkUserLoggedIn = async () => {
    //         try {
    //             const result = await UserLogged();
                
    //             if (result) {
    //                 setUser(result);
    //                 navigate(`/app/${result}`, { replace: true });
    //             }
    //         } catch (error) {
    //             console.error("Error checking login status:", error);
    //             setErrorMessage("Unable to verify login status.");
    //         }
    //         checkUserLoggedIn();
    //     };
    // }, [navigate,setUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phone") setPhone(value) 
        if (name === "password") setPassword(value)
        setErrorMessage("")
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await getUserExist(phone, password);
            if (result) {
                localStorage.setItem("user", JSON.stringify(result.token));
                // setUser(result);
                navigate(`/app/${result.user_id}`, { replace: true });
            } else {
                setErrorMessage("Invalid credentials");
            }
        } catch (error) {
            setErrorMessage("Error during login");
            console.error(error);
        }
    };
    const handlePasswordRecovery = () => {
        navigate("/passwordRecovery", { state: { phone } }); // מעבר לדף שחזור סיסמה עם המספר
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
                    <div onClick={handlePasswordRecovery}  id="forgotPassword"><p>Forgot password?</p> </div>
                   
                    <div className="buttonForLogin">

                        <button type="button" onClick={() => navigate("/signUp")}>SignUp</button>

                        <button type="submit">login</button>
                        {errorMessage && <div id="errorMessage">{errorMessage}</div>}
                    </div>
                </form>
            </div>

        </div >

    )
}