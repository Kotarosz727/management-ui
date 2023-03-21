export default function Kanbans() {
    const checkMarkIcon = (
        <>
            <div className="p-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="black"/>
                </svg>
            </div>
        </>
    )

    const closeIcon = (
        <>
            <div className="p-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="black"/>
                </svg>
            </div>
        </>
    )

    return (
        <div className="container mx-auto h-[100%]">
            <h1 className="text-2xl font-bold">Kanbans</h1>
            <div className="flex justify-evenly mt-20">
                <div className="w-[331px] min-h-[600px] bg-gray-300 relative">
                    <div className="font-bold text-xl p-2">
                        To Do
                    </div>
                    <div className="w-[290px] h-[87px] bg-white rounded shadow-lg mx-auto">
                        <div className="flex justify-between items-center">
                            <button onClick={() => alert('hello')}>{checkMarkIcon}</button>
                            <button onClick={() => alert('close')}>{closeIcon}</button>
                        </div>
                        <div className="flex justify-center">
                            Go to shopping!
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <div className="flex items-center">
                            <div className="mr-4">
                                <button type="button"
                                        className="rounded-full border border-primary-500 bg-primary-500 p-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         className="h-4 w-4">
                                        <path
                                            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="text-base not-italic font-bold">Add To Do</div>
                        </div>
                    </div>
                </div>

                <div className="w-[331px] min-h-[600px] bg-gray-300 relative">
                    <div className="font-bold text-xl p-2">
                        In Progress
                    </div>
                    <div className="w-[290px] h-[87px] bg-white rounded shadow-lg mx-auto">
                        <div className="flex justify-between items-center">
                            <button onClick={() => alert('hello')}>{checkMarkIcon}</button>
                            <button onClick={() => alert('close')}>{closeIcon}</button>
                        </div>
                        <div className="flex justify-center">
                            Go to shopping!
                        </div>
                    </div>
                </div>

                <div className="w-[331px] min-h-[600px] bg-gray-300 relative">
                    <div className="font-bold text-xl p-2">
                        Done
                    </div>
                    <div className="w-[290px] h-[87px] bg-white rounded shadow-lg mx-auto">
                        <div className="flex justify-between items-center">
                            {checkMarkIcon}
                        </div>
                        <div className="flex justify-center">
                            Go to shopping!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}