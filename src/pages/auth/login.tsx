import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import {FormButton} from "@/components/FormButton";
import {FormInputItem} from "@/components/FormInputItem";
import {ErrorAlert} from "@/components/ErrorAlert";
import {SuccessAlert} from "@/components/SuccessAlert";

interface LoginForm {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
}

export default function Login() {
    const loginUrl = 'http://localhost:3000/auth/login';

    const [cookie, setCookie] = useCookies(["user"])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: LoginForm = {
            username: username,
            password: password
        }

        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 401) {
                setLoginError('Invalid username or password');
            }
            return;
        }

        const responseData: LoginResponse = await response.json();
        const token = responseData.access_token;

        setCookie("user", token, {
            path: "/",
            maxAge: 36000,
            sameSite: true,
        })

        setLoginSuccess('Login successful');
    };

    const isFormValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    return (
        <div className="container items-center mx-auto max-w-md justify-center mt-[15rem] border-2 p-[10px] h-[320px]">
            {loginError && (
                <ErrorAlert message={loginError} onClick={() => setLoginError('')}></ErrorAlert>
            )}
            {loginSuccess && (
                <SuccessAlert message={loginSuccess} onClick={() => setLoginSuccess('')}></SuccessAlert>
            )}
            <form action="" className="space-y-5 p-3" onSubmit={onSubmit}>
                <div className="grid grid-cols-3 items-center">
                    <h2 className="col-span-2 col-start-2 text-3xl font-bold mb-5">Login</h2>
                </div>
                <FormInputItem label="Username" value={username} onChange={(e) => setUsername(e.target.value)}></FormInputItem>
                <FormInputItem label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></FormInputItem>
                <FormButton text="Submit" isValid={isFormValid()}></FormButton>
            </form>
        </div>
    );
};


