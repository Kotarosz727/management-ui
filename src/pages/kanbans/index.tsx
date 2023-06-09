import {GetServerSideProps} from "next";
import cookie from "cookie";
import {IKanban} from "@/types/kanbans/types";
import {useState} from "react";
import {useCookies} from 'react-cookie';
import KanbanListItem from "@/components/kanbans/kanbanListItem";
import { index, create, update, destroy} from "@/lib/api/kanbanAPI";

interface KanbansProps {
    todos: IKanban[];
    inProgress: IKanban[];
    done: IKanban[];
}
export default function Kanbans({ todos: initialTodos, inProgress: initialInProgress, done: initialDone }: KanbansProps) {
    const [todos, setTodos] = useState(initialTodos);
    const [inProgress, setInProgress] = useState(initialInProgress);
    const [done, setDone] = useState(initialDone);

    const [cookies] = useCookies(['user']);
    const userCookie = cookies.user;

    const addTodo = async (name:string, description:string) => {
        const res = await create(userCookie, name, description);

        if (!res.ok) {
            throw new Error('Something went wrong with create');
        }

        await fetchKanbans();
    }

    const updateKanban = async (id: string, payload: Partial<IKanban>) => {
        const res = await update(userCookie, id, payload);

        if (!res.ok) {
            throw new Error('Something went wrong with update');
        }

        await fetchKanbans();
    }

    const deleteKanban = async (id: string) => {
        const res = await destroy(userCookie, id);

        if (!res.ok) {
            throw new Error('Something went wrong with delete');
        }

        await fetchKanbans();
    }

    const fetchKanbans = async () => {
        const res = await index(userCookie);

        if (!res.ok) {
            throw new Error('Something went wrong with index');
        }

        const kanbans: IKanban[] = await res.json();
        kanbans.sort((a: IKanban, b: IKanban) => {
            if (a.prioritize !== b.prioritize) {
                return b.prioritize - a.prioritize;
            } else {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

        setTodos(kanbans.filter((kanban: IKanban) => kanban.status === 0));
        setInProgress(kanbans.filter((kanban: IKanban) => kanban.status === 1));
        setDone(kanbans.filter((kanban: IKanban) => kanban.status === 2));
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-evenly mt-20">
                <KanbanListItem items={todos} title="To Do" updateKanban={updateKanban} deleteKanban={deleteKanban} addTodo={addTodo}/>
                <KanbanListItem items={inProgress} title="In Progress" updateKanban={updateKanban} deleteKanban={deleteKanban} addTodo={addTodo}/>
                <KanbanListItem items={done} title="Done" updateKanban={updateKanban} deleteKanban={deleteKanban} addTodo={addTodo}/>
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

    const response = await index(token);

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

    kanbans.sort((a: IKanban, b: IKanban) => {
        if (a.prioritize !== b.prioritize) {
            return b.prioritize - a.prioritize;
        } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    });

    const todos = kanbans.filter((kanban: IKanban) => kanban.status === 0);
    const inProgress = kanbans.filter((kanban: IKanban) => kanban.status === 1);
    const done = kanbans.filter((kanban: IKanban) => kanban.status === 2);

    return {
        props: {
            todos,
            inProgress,
            done,
        },
    };
}