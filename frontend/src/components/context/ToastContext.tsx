// ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextProps {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const showToast = (msg: string) => {
        if (msg === "") {
            setVisible(false);
        } else {
            setMessage(msg);
            setVisible(true);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
