import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

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
            setLoginError('Invalid username or password');
        }

        const responseData: LoginResponse = await response.json();
        const token = responseData.access_token;

        setCookie("user", token, {
            path: "/",
            maxAge: 36000,
            sameSite: true,
        })
    };

    const isFormValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    return (
        <div className="container items-center mx-auto max-w-md justify-center mt-[15rem]">
            <form action="" className="space-y-5" onSubmit={onSubmit}>
                {loginError && (
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-2 col-start-2 text-red-500">
                            {loginError}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-3 items-center">
                    <h2 className="col-span-2 col-start-2 text-3xl font-bold mb-5">Login</h2>
                </div>
                <div className="grid grid-cols-3 items-center">
                    <label htmlFor="username"
                           className="col-span-1 block text-sm font-medium text-gray-700">Name</label>
                    <div className="col-span-2">
                        <input id="username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                               placeholder="username"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                    <label htmlFor="password"
                           className="col-span-1 block text-sm font-medium text-gray-700">Password</label>
                    <div className="col-span-2">
                        <input type="password"
                               id="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                               placeholder="password"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center">
                    <div className="col-span-2 col-start-2">
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


