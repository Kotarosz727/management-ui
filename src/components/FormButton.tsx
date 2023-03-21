import React from "react";

interface FormButtonProps {
    text: string;
    isValid: boolean;
}
export const FormButton: React.FC<FormButtonProps> = ({ text, isValid }) => {
    return (
        <div className="grid grid-cols-3 items-center">
            <div className="col-span-2 col-start-2">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                >
                    {text}
                </button>
            </div>
        </div>
    )
}