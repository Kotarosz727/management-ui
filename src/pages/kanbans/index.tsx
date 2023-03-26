import {GetServerSideProps} from "next";
import cookie from "cookie";
import {IKanbans} from "@/types/kanbans/types";
import {useState} from "react";
import {useCookies} from 'react-cookie';
import {checkMarkIcon, deleteIcon, priorityIcon, prioritizedIcon, todoIcon, doingIcon, doneIcon, returnIcon} from "@/components/shared/Icons/Icons";

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

    const showPriority = (item: IKanbans) => (
        <>
            {item.prioritize ? (
                <button onClick={() => updateKanban(item.id, { prioritize : 0 })}>{prioritizedIcon}</button>
            ) : (
                <button onClick={() => updateKanban(item.id, { prioritize: 1 })}>{priorityIcon}</button>
            )}
        </>
    )

    const kanbanInfo = (items: IKanbans[], title:string, withNode = false) => (
        <>
            <div className="w-[350px] min-h-[720px] 2xl:min-h-[920px] bg-custom-dark-blue-100 relative rounded shadow-2xl">
                <div className="font-bold text-xl p-3 text-white tracking-wider">
                    {title}
                </div>
                <div className="h-[600px] 2xl:min-h-[800px] overflow-y-auto">
                    {items && items.map((item) => (
                        <div key={item.id} className="w-[290px] h-[100px] bg-white rounded shadow-lg mx-auto mt-6 relative">
                            <div className="flex justify-between items-center p-1">
                                {item.status !== 2 ? (
                                    <button onClick={() => updateKanban(item.id, { status: ++item.status })}>{checkMarkIcon}</button>
                                ) : null}
                                <button onClick={() => deleteKanban(item.id)}>{deleteIcon}</button>
                            </div>
                            <div onClick={() => openDetailModal(item)} className="flex justify-center cursor-pointer p-2">
                                {item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name}
                            </div>
                            <div className="flex justify-center left-0 absolute bottom-0">
                                {item.status !== 2 ? showPriority(item) : null}
                            </div>
                            <div className="flex justify-center right-0 absolute bottom-0 cursor-pointer" onClick={() => updateKanban(item.id, { status:0 })}>
                                {item.status === 1 ? returnIcon : null}
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

    const showDate = (item: IKanbans) => {
        const createdDate = new Date(item.created_at).toLocaleDateString();
        const updatedDate = new Date(item.updated_at).toLocaleDateString();
        const status = item.status;

        switch (status) {
            case 0:
            case 1:
                return <span className="text-gray-500 text-sm">Created: {createdDate}</span>;
            case 2:
                return <span className="text-gray-500 text-sm">Done: {updatedDate}</span>;
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
                                <div className="mt-8 mb-10">
                                    {detail.description}
                                </div>
                                <div className="absolute p-1 left-0 bottom-0">
                                    <span>{showIcon(detail.status)}</span>
                                </div>
                                <div className="absolute p-2 right-0 bottom-0">
                                    {showDate(detail)}
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