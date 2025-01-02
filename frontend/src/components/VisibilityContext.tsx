import { createContext, useContext, useState, ReactNode } from "react";

const VisibilityContext = createContext<boolean>(true);


export const VisibilityProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <VisibilityContext.Provider value={{isVisible, setIsVisible }}>
            {children}
        </VisibilityContext.Provider>
    );
};

export const useVisibility = () => useContext(VisibilityContext);
