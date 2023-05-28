import {IKanban} from '@/types/kanbans/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/kanbans`;

export async function index(userCookie: string): Promise<Response> {
    return await fetch(URL, {
        headers: {
            Authorization: `Bearer ${userCookie}`,
        },
    });
}

export async function create(userCookie: string, name: string, description: string): Promise<Response> {
    return await fetch(URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userCookie}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description
        })
    });
}

export async function update(userCookie: string, id:string, kanban: Partial<IKanban>): Promise<Response> {
    return await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${userCookie}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kanban)
    });
}

export async function destroy(userCookie: string, id: string): Promise<Response> {
    return await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userCookie}`,
        },
    });
}
