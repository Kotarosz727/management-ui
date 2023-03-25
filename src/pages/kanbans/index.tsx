import {GetServerSideProps} from "next";
import cookie from "cookie";
import {IKanbans} from "@/types/kanbans/types";
import {useState} from "react";
import {useCookies} from 'react-cookie';
import {checkMarkIcon, deleteIcon, priorityIcon, prioritizedIcon, todoIcon, doingIcon, doneIcon} from "@/components/shared/Icons/Icons";

interface KanbansProps {
    todos: IKanbans[];
    inProgress: IKanbans[];
    done: IKanbans[];
}
export default function Kanbans({ todos: initialTodos, inProgress: initialInProgress, done: initialDone }: KanbansProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState(initialTodos);
    const [inProgress, setInProgress] = useState(initialInProgress);
    const [done, setDone] = useState(initialDone);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [detail, setDetail] = useState({} as IKanbans);

    const openDetailModal = (kanban: IKanbans) => {
        setDetailModalOpen(true);
        setDetail(kanban);
    }

    const [cookies] = useCookies(['user']);
    const userCookie = cookies.user;

    const addToDO = (
        <>
            <div className="absolute bottom-0 left-0 p-4">
                <div className="flex items-center">
                    <div className="mr-4">
                        <button onClick={() => setIsModalOpen(true)} type="button"
                                className="rounded-full border border-custom-dark-blue-200 bg-custom-dark-blue-200 p-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-custom-dark-blue-200 hover:bg-custom-dark-blue-200 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-custom-dark-blue-200 disabled:bg-custom-dark-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="h-4 w-4">
                                <path
                                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="text-base not-italic font-bold text-white tracking-wider">Add To Do</div>
                </div>
            </div>
        </>
    )

    const kanbanInfo = (items: IKanbans[], title:string, withNode = false) => (
        <>
            <div className="w-[331px] min-h-[720px] bg-custom-dark-blue-100 relative rounded shadow-md">
                <div className="font-bold text-xl p-3 text-white tracking-wider">
                    {title}
                </div>
                <div className="h-[600px] overflow-y-auto">
                    {items && items.map((item) => (
                        <div key={item.id} className="w-[290px] h-[87px] bg-white rounded shadow-lg mx-auto mt-6 relative">
                            <div className="flex justify-between items-center p-1">
                                {item.status !== 2 ? (
                                    <button onClick={() => changeStatus(item.id, ++item.status)}>{checkMarkIcon}</button>
                                ) : null}
                                <button onClick={() => deleteKanban(item.id)}>{deleteIcon}</button>
                            </div>
                            <div onClick={() => openDetailModal(item)} className="flex justify-center cursor-pointer">
                                {item.name}
                            </div>
                            <div className="flex justify-center left-0 absolute bottom-0">
                                {item.status === 0 ? priorityIcon : null}
                            </div>
                        </div>
                    ))}
                </div>
                {withNode ? addToDO : null}
            </div>
        </>
    )

    const isValid = () => {
        return name.trim() !== '' && description.trim() !== '';
    }

    const addTodo = async () => {
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
            setIsModalOpen(false);
            throw new Error('Something went wrong with create');
        }

        setIsModalOpen(false);
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
            if (a.created_at > b.created_at) {
                return -1;
            }
        });

        setTodos(kanbans.filter((kanban: IKanbans) => kanban.status === 0));
        setInProgress(kanbans.filter((kanban: IKanbans) => kanban.status === 1));
        setDone(kanbans.filter((kanban: IKanbans) => kanban.status === 2));
    }

    const changeStatus = async (id: string, status: number) => {
        const payload = {
            status: status
        }

        const res = await fetch(`http://localhost:3000/kanbans/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json();
        await fetchKanbans();
    }

    const deleteKanban = async (id: string) => {
        const res = await fetch(`http://localhost:3000/kanbans/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description
            })
        })
        await fetchKanbans();
    }

    const addTodoModal = (
        <>
            <div className="h-100">
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="fixed inset-0 bg-black opacity-25" onClick={() => setIsModalOpen(false)}></div>
                        <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl w-[800px] max-w-lg z-10">
                            <div className="relative p-5">
                                <div className="text-center mt-8">
                                    <div>
                                        <div className="mx-auto max-w-md">
                                            <div>
                                                <label htmlFor="example1"
                                                       className="mb-1 block text-sm font-bold text-gray-700">Title</label>
                                                <input type="text"
                                                       id="name"
                                                       className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                                       placeholder="todo title"
                                                       onChange={(e) =>setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mx-auto max-w-md mt-8">
                                            <div>
                                                <label htmlFor="5"
                                                       className="mb-1 block text-sm font-bold text-gray-700">Description</label>
                                                <textarea id="description"
                                                          rows={description ? description.split("\n").length : 2}
                                                          className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                                                          placeholder="todo description"
                                                          onChange={(e) =>setDescription(e.target.value) }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3 max-w-xs mx-auto">
                                    <button disabled={!isValid()} type="button" onClick={() => addTodo()}
                                            className="flex-1 rounded-lg border border-primary-500 bg-custom-dark-blue-200 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-custom-dark-blue-200 hover:bg-custom-dark-blue-200 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-300">Add To Do
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const showIcon = (status: number) => {
        switch (status) {
            case 0:
                return todoIcon;
            case 1:
                return doingIcon;
            case 2:
                return doneIcon;
            default:
                return '';
        }
    }

    const detailModal = (
        <>
            <div className="h-100">
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="fixed inset-0 bg-black opacity-25" onClick={() => setDetailModalOpen(false)}></div>
                        <div className="relative mx-auto overflow-hidden rounded-lg bg-white shadow-xl min-h-[300px] w-[700px] sm:max-w-sm z-10">
                            <div className="p-5">
                                <div className="text-bold text-3xl mt-1">
                                    {detail.name}
                                </div>
                                <div className="font-bold mt-8 mb-10">
                                    {detail.description}
                                </div>
                                <div className="absolute left-0 bottom-0 p-4">
                                    {showIcon(detail.status)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className="container mx-auto">
            <div className="flex justify-evenly mt-20">
                {kanbanInfo(todos, 'TO DO', true)}
                {kanbanInfo(inProgress, 'IN PROGRESS')}
                {kanbanInfo(done, 'DONE')}
                {isModalOpen && addTodoModal}
                {detailModalOpen && detailModal}
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
    // sort by created_at desc
    kanbans.sort((a: IKanbans, b: IKanbans) => {
        if (a.created_at > b.created_at) {
            return -1;
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