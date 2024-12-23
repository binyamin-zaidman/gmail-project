import React, { createContext, useState, useContext, ReactNode } from "react";

type BackgroundContextType = {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const [backgroundColor, setBackgroundColor] = useState(
        localStorage.getItem("backgroundColor") || "#ffffff"
    );
    const updateBackgroundColor = (color: string) => {
        setBackgroundColor(color);
        localStorage.setItem("backgroundColor", color);
    };

    return (
        <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor: updateBackgroundColor }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error("useBackground must be used within a BackgroundProvider");
    }
    return context;
};