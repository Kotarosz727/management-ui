import {useState} from "react";

interface Props {
    setAddTodoModalOpen: (open: boolean) => void;
    addTodo: (name: string, description: string) => void;
}
export default function KanbanAddToDoModal({setAddTodoModalOpen, addTodo}: Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const isValid = () => {
        return name.trim() !== '' && description.trim() !== '';
    }

    const handleClick = async () => {
        await addTodo(name, description);
        setAddTodoModalOpen(false);
    }

    return (
        <>
            <div className="h-100">
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="fixed inset-0 bg-black opacity-25" onClick={() => setAddTodoModalOpen(false)}></div>
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
                                    <button disabled={!isValid()} type="button" onClick={() => handleClick()}
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
}