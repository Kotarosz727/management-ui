import React from "react";
interface SuccessAlertProps {
    message: string;
    onClick: () => void;
}
export const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClick }) => {
    return (
        <div className="flex rounded-md bg-green-50 p-4 text-sm text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 className="mr-3 h-5 w-5 flex-shrink-0">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"/>
            </svg>
            <div><b>{message}</b>
            </div>
            <button className="ml-auto" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                </svg>
            </button>
        </div>
    )
}