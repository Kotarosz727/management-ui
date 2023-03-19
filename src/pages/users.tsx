import {GetServerSideProps} from "next";
import cookie from 'cookie';
interface User {
    id: string;
    name: string;
    age: number;
    phoneNumber: string;
}
interface UsersProps {
    users: User[];
}
export default function users({users}: UsersProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="py-2">
                        <span className="font-semibold">{user.name}</span> - {user.age} - {user.phoneNumber}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { req } = context;

    const cookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie)
        : {};

    const token = cookies.user;

    const response = await fetch('http://localhost:3000/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const users = await response.json();

    return {
        props: {
            users,
        },
    };
}