import {GetServerSideProps} from "next";
import cookie from "cookie";
import {IKanbans} from "@/types/kanbans/types";
import {useState} from "react";
import {useCookies} from 'react-cookie';
import {checkMarkIcon, deleteIcon, priorityIcon, prioritizedIcon, todoIcon, doingIcon, doneIcon, returnIcon} from "@/components/shared/Icons/Icons";
import KanbanListItem from "@/components/kanbans/kanbanListItem";

interface KanbansProps {
    todos: IKanbans[];
    inProgress: IKanbans[];
    done: IKanbans[];
}
export default function Kanbans({ todos: initialTodos, inProgress: initialInProgress, done: initialDone }: KanbansProps) {
    const [todos, setTodos] = useState(initialTodos);
    const [inProgress, setInProgress] = useState(initialInProgress);
    const [done, setDone] = useState(initialDone);

    const [cookies] = useCookies(['user']);
    const userCookie = cookies.user;

    const addTodo = async (name:string, description:string) => {
        const res = await fetch('http://localhost:3000/kanbans', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userCookie}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description
            })
        })

        if (!res.ok) {
            throw new Error('Something went wrong with create');
        }

        await fetchKanbans();
    }

    const fetchKanbans = async () => {
        const res = await fetch('http://localhost:3000/kanbans', {
            headers: {
                Authorization: `Bearer ${userCookie}`,
            },
        });
        const kanbans = await res.json();

        kanbans.sort((a: IKanbans, b: IKanbans) => {
            if (a.prioritize !== b.prioritize) {
                return b.prioritize - a.prioritize;
            } else {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

        setTodos(kanbans.filter((kanban: IKanbans) => kanban.status === 0));
        setInProgress(kanbans.filter((kanban: IKanbans) => kanban.status === 1));
        setDone(kanbans.filter((kanban: IKanbans) => kanban.status === 2));
    }

    const updateKanban = async (id: string, payload: Partial<IKanbans>) => {
        const res = await fetch(`http://localhost:3000/kanbans/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        await res.json();
        await fetchKanbans();
    }

    const deleteKanban = async (id: string) => {
        await fetch(`http://localhost:3000/kanbans/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        await fetchKanbans();
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-evenly mt-20">
                <KanbanListItem items={todos} title="TO DO" updateKanban={updateKanban} deleteKanban={deleteKanban} addToDO={addTodo}/>
                <KanbanListItem items={inProgress} title="IN PROGRESS" updateKanban={updateKanban} deleteKanban={deleteKanban} addToDO={addTodo}/>
                <KanbanListItem items={done} title="done" updateKanban={updateKanban} deleteKanban={deleteKanban} addToDO={addTodo}/>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps | undefined = async(context) => {
    const { req } = context;

    const cookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie)
        : {};

    const token = cookies.user;

    const response = await fetch('http://localhost:3000/kanbans', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            return {
                redirect: {
                    destination: 'auth/login',
                    permanent: false,
                }
            }
        }
    }

    const kanbans = await response.json();

    kanbans.sort((a: IKanbans, b: IKanbans) => {
        if (a.prioritize !== b.prioritize) {
            return b.prioritize - a.prioritize;
        } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    });

    const todos = kanbans.filter((kanban: IKanbans) => kanban.status === 0);
    const inProgress = kanbans.filter((kanban: IKanbans) => kanban.status === 1);
    const done = kanbans.filter((kanban: IKanbans) => kanban.status === 2);

    return {
        props: {
            todos,
            inProgress,
            done,
        },
    };
}