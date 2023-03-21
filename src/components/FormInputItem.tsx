import React from "react";

interface FormInputItemProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FormInputItem: React.FC<FormInputItemProps> = ({ label, type = 'text', value, onChange }) => {
    return (
        <div className="grid grid-cols-3 items-center">
            <label htmlFor={label}
                   className="col-span-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="col-span-2">
                <input type={type}
                       id={label}
                       value={value}
                       onChange={onChange}
                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                       placeholder={label}/>
            </div>
        </div>
    )
}