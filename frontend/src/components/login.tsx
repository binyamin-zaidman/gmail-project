import React, { useState } from "react";
import '../styles/login.css'
export default function Login() {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (!phone || !password) {
            console.log("Please fill in all fields");
            return
        } else {
            console.log({ phone, password })
        }

    }

    return (

        <div className="LoginPageContainer">
            <h2>Login</h2>
            <div className="inputForLogin">
                <label htmlFor="phone"></label>
                <input
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="password"></label>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="buttonForLogin">
                <button onClick={() => handleLogin()}>forgot password</button>
                <button onClick={() => handleLogin()}>login</button>
            </div>


        </div>

    )
}