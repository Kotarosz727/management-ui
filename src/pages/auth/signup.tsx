import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface SignUpForm {
    name: string;
    age: number;
    phoneNumber: string;
    password: string;
}

export default function SignUp() {
    const signUpUrl = 'http://localhost:3000/auth/signup';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>();
    const [signUpError, setSignUpError] = useState('');
    const router = useRouter();

    const onSubmit = async (data: SignUpForm) => {
        const response = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            setSignUpError('Error during signup');
        }

        const responseData = await response.json();
        console.log(responseData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold text-white-900">Sign Up</h2>
                {signUpError && <p className="text-red-500 text-xs text-center">{signUpError}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                id="name"
                                name="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="age" className="sr-only">
                                Age
                            </label>
                            <input
                                {...register('age', { required: 'Age is required', valueAsNumber: true })}
                                id="age"
                                name="age"
                                type="number"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Age"
                            />
                            {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                        </div>

                        <div className="mt-2">
                            <label htmlFor="phoneNumber" className="sr-only">
                                Phone Number
                            </label>
                            <input
                                {...register('phoneNumber', { required: 'Phone number is required' })}
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text 900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
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
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
