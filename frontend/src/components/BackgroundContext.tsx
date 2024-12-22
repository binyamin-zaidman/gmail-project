import React, { createContext, useState, useContext, ReactNode } from "react";

type BackgroundContextType = {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // צבע ברירת מחדל

    return (
        <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
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
