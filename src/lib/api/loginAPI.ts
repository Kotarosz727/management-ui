import {LoginForm} from "@/types/auth/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
export async function login(data: LoginForm) {
    return await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}