import React, { useState } from "react";
import "../styles/signUp.css";
import { createUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        question: "",
        answer: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrorMessage("")
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.firstName || !formData.lastName) {
                setErrorMessage("First Name and Last Name are required!");
                return
            }
        }
        if (step === 2) {
            if (!formData.question || !formData.answer) {
                setErrorMessage("Security question and answer are required!");
                return;
            }
        }
        if (step === 3) {
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(formData.email)) {
                setErrorMessage("Please enter a valid email address!");
                return;
            }
            if (!formData.phone || formData.phone.length > 10 || formData.phone.length < 9) {
                setErrorMessage("Phone number is required!");
                return;
            }
        }
        if (step === 4) {
            if (!formData.password) {
                setErrorMessage("Password is required!")
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage("Passwords do not match")
                return
            }
            setErrorMessage("")
        }
        setStep((prev) => prev + 1);
    };
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("password do not match!")
            return;
        }
        setErrorMessage("")
        try {
            const result = await createUser({ ...formData });
            console.log(result);

            localStorage.setItem("user", JSON.stringify(result.token))
            navigate(`/app/${result.id}`, { replace: true });

        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div id="signUpContainer">
            <h2>SignUp</h2>
            {step === 1 && (
                <>
                    <label>First Name:</label>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                    <label>Last Name:</label>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 2 && (
                <>
                    <label>Security Question:</label>
                    <input
                        required
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Enter your question"
                    />
                    <label>Answer:</label>
                    <input
                        required
                        type="text"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        placeholder="Enter your answer"
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 3 && (
                <>
                    <label>Email:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <label>Phone:</label>
                    <input
                        required
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 4 && (
                <>
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <label>Confirm Password:</label>
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleSubmit}>Submit</button>
                </>
            )}
        </div>
    );
}
