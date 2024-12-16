import React, { useState } from "react";
import "../styles/signUp.css";

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        question: "",
        answer: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Form Data:", formData);
    };

    return (
        <div className="signUpContainer">
            <h2>SignUp</h2>
            {step === 1 && (
                <>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                    />
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 2 && (
                <>
                    <label>Security Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Enter your question"
                    />
                    <label>Answer:</label>
                    <input
                        type="text"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        placeholder="Enter your answer"
                    />
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 3 && (
                <>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                    />
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </>
            )}

            {step === 4 && (
                <>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleSubmit}>Submit</button>
                </>
            )}
        </div>
    );
}
