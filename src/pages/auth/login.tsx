import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useRouter } from 'next/router';

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

            if (response.status === 401) {
                setLoginError('Invalid username or password');
                setTimeout(() => {
                    setLoginError('');
                }, 3000);
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

        setUsername('');
        setPassword('');
        setLoading(false);

        await router.push('/kanbans');
    };

    const isValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    const iconMan = (
        <>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.809 30.714C17.654 29.714 22.367 29.8 29.221 30.749C29.7174 30.821 30.1709 31.0701 30.4979 31.4504C30.8249 31.8307 31.0033 32.3165 31 32.818C31 33.298 30.835 33.764 30.537 34.128C30.0176 34.7626 29.4855 35.3868 28.941 36H31.582C31.748 35.802 31.915 35.6 32.084 35.395C32.6772 34.6676 33.0007 33.7576 33 32.819C33 30.794 31.522 29.049 29.495 28.769C22.479 27.798 17.575 27.705 10.52 28.736C8.472 29.035 7 30.807 7 32.846C7 33.751 7.295 34.646 7.854 35.371C8.019 35.585 8.182 35.795 8.344 36.001H10.921C10.4144 35.3945 9.92032 34.7777 9.439 34.151C9.15296 33.7758 8.99866 33.3168 9 32.845C9 31.768 9.774 30.865 10.809 30.714ZM20 21C20.7879 21 21.5681 20.8448 22.2961 20.5433C23.0241 20.2417 23.6855 19.7998 24.2426 19.2426C24.7998 18.6855 25.2417 18.0241 25.5433 17.2961C25.8448 16.5681 26 15.7879 26 15C26 14.2121 25.8448 13.4319 25.5433 12.7039C25.2417 11.9759 24.7998 11.3145 24.2426 10.7574C23.6855 10.2002 23.0241 9.75825 22.2961 9.45672C21.5681 9.15519 20.7879 9 20 9C18.4087 9 16.8826 9.63214 15.7574 10.7574C14.6321 11.8826 14 13.4087 14 15C14 16.5913 14.6321 18.1174 15.7574 19.2426C16.8826 20.3679 18.4087 21 20 21ZM20 23C22.1217 23 24.1566 22.1571 25.6569 20.6569C27.1571 19.1566 28 17.1217 28 15C28 12.8783 27.1571 10.8434 25.6569 9.34315C24.1566 7.84285 22.1217 7 20 7C17.8783 7 15.8434 7.84285 14.3431 9.34315C12.8429 10.8434 12 12.8783 12 15C12 17.1217 12.8429 19.1566 14.3431 20.6569C15.8434 22.1571 17.8783 23 20 23Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C10.059 2 2 10.059 2 20C2 29.941 10.059 38 20 38ZM20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40Z" fill="white"/>
            </svg>
        </>
    )

    const alertIcon = (
        <>
            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33783 11.4615H11.3829V13.1923H9.33783V11.4615ZM9.33783 4.53847H11.3829V9.73078H9.33783V4.53847ZM10.3604 0.211548C4.70581 0.211548 0.135132 4.10578 0.135132 8.86539C0.135132 11.1605 1.21243 13.3617 3.13003 14.9846C4.07953 15.7882 5.20675 16.4256 6.44733 16.8605C7.68791 17.2954 9.01756 17.5192 10.3604 17.5192C13.0723 17.5192 15.6731 16.6075 17.5907 14.9846C19.5083 13.3617 20.5856 11.1605 20.5856 8.86539C20.5856 7.72896 20.3211 6.60364 19.8072 5.55371C19.2934 4.50378 18.5402 3.54978 17.5907 2.7462C16.6412 1.94262 15.514 1.30518 14.2734 0.870283C13.0328 0.435386 11.7032 0.211548 10.3604 0.211548ZM10.3604 15.7885C8.19084 15.7885 6.11018 15.0591 4.5761 13.7608C3.04202 12.4624 2.18018 10.7015 2.18018 8.86539C2.18018 7.02928 3.04202 5.26837 4.5761 3.97004C6.11018 2.67171 8.19084 1.94232 10.3604 1.94232C12.5299 1.94232 14.6105 2.67171 16.1446 3.97004C17.6787 5.26837 18.5405 7.02928 18.5405 8.86539C18.5405 10.7015 17.6787 12.4624 16.1446 13.7608C14.6105 15.0591 12.5299 15.7885 10.3604 15.7885Z" fill="white"/>
            </svg>
        </>
    )


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
                    <span>Invalid username or password</span>
                </div>
            </div>}
        </div>
    );
};


