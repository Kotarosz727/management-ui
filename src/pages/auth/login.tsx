import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

interface LoginForm {
    username: string;
    password: string;
}

export default function Login() {
    const [cookie, setCookie] = useCookies(["user"])
    const loginUrl = 'http://localhost:3000/auth/login';

    interface LoginResponse {
        access_token: string;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const [loginError, setLoginError] = useState('');
    const router = useRouter();

    const onSubmit = async (data: LoginForm) => {
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
            maxAge: 3600,
            sameSite: true,
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold text-white-900">Login</h2>
                {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('username', { required: 'username is required' })}
                                id="username"
                                name="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-90 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="username"
                            />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register('password', { required: 'Password is required' })}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-90 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


