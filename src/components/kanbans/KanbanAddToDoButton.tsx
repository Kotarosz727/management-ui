interface Props {
    setAddTodoModalOpen: (open: boolean) => void;
}
export default function KanbanAddToDoButton({setAddTodoModalOpen}: Props) {
    return (
        <>
            <div className="absolute bottom-0 left-0 p-4">
                <div className="flex items-center">
                    <div className="mr-4">
                        <button onClick={() => setAddTodoModalOpen(true)} type="button"
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
}