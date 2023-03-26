import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useRouter } from 'next/router';
import { iconMan, alertIcon } from '@/components/shared/Icons/Icons';

interface LoginForm {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
}

export default function Login() {
    const loginUrl = 'http://localhost:3000/auth/login';
    const router = useRouter();

    const [cookie, setCookie] = useCookies(["user"])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);

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
            setUsername('');
            setPassword('');
            setLoading(false);

            setLoginError(`${response.statusText} code:${response.status}`);
            setTimeout(() => {
                setLoginError('');
            }, 3000);
            return;
        }

        const responseData: LoginResponse = await response.json();
        const token = responseData.access_token;

        setCookie("user", token, {
            path: "/",
            maxAge: 36000,
            sameSite: true,
        })

        setUsername('');
        setPassword('');
        setLoading(false);

        await router.push('/kanbans');
    };

    const isValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    return (
        <div className="container items-center mx-auto max-w-md justify-center mt-[12rem] p-[10px] h-[320px]">
            <div className="w-[500px] h-[417px] bg-custom-dark-blue-100 rounded-lg drop-shadow-lg">
                <div className="flex flex-col items-center p-5">
                    <span>{iconMan}</span>
                    <span className="font-bold text-3xl text-white mt-2 tracking-wide">Login</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3">
                    <input type="text"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           className="block w-[300px] border-b-2 bg-custom-dark-blue-100 border-white-200 disabled:cursor-not-allowed disabled:text-gray-500 mt-10 text-white"
                           placeholder="username"/>
                    <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                           className="block w-[300px] border-b-2 bg-custom-dark-blue-100 border-white-200 disabled:cursor-not-allowed disabled:text-gray-500 mt-10 text-white"
                           placeholder="password"/>
                    <button onClick={() => onSubmit()} disabled={!isValid() || loading } className="bg-custom-dark-blue-200 font-bold text-lg text-white w-[150px] h-[40px] rounded-3xl mt-14 p-1 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300">
                        Login
                    </button>
                </div>
            </div>
            {loginError && <div className="w-[500px] h-[30px] text-white flex justify-center mt-5">
                <div className="w-[300px] bg-custom-red-100 flex justify-center items-center rounded-sm p-1">
                    <span className="mr-2">{alertIcon}</span>
                    <span>{loginError}</span>
                </div>
            </div>}
        </div>
    );
};


