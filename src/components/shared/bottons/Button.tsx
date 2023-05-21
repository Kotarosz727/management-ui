import React from "react";

interface FormButtonProps {
    text: string;
    handleClick: () => void;
    isValid?: boolean;
}
export const Button: React.FC<FormButtonProps> = ({ text, handleClick, isValid = true }) => {
    return (
        <button onClick={() => handleClick()} disabled={!isValid} className="bg-custom-dark-blue-200 font-bold text-lg text-white w-[150px] h-[40px] rounded-3xl p-1 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300">
            {text}
        </button>
    )
}