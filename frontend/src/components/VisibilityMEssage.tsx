import { createContext, useContext, useState, ReactNode } from "react";

const VisibilityMEssageContext = createContext<boolean>(true);


export const VisibilityMEssageProvider = ({ children }: { children: ReactNode }) => {
    const [isVisibleMeassage, setIsVisibleMeassage] = useState(true);

    return (
        <VisibilityMEssageContext.Provider value={{ isVisibleMeassage, setIsVisibleMeassage }}>
            {children}
        </VisibilityMEssageContext.Provider>
    );
};

export const useVisibilityMeassage = () => useContext(VisibilityMEssageContext);
