import {GetServerSideProps} from "next";
import cookie from "cookie";
import {IKanbans} from "@/types/kanbans/types";
import {useState} from "react";
import {useCookies} from 'react-cookie';

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
    const [token, setToken] = useState('');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [detail, setDetail] = useState({} as IKanbans);

    const openDetailModal = (kanban: IKanbans) => {
        setDetailModalOpen(true);
        setDetail(kanban);
    }

    const [cookies] = useCookies(['user']);
    const userCookie = cookies.user;

    const checkMarkIcon = (
        <>
            <div className="p-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#3DF179"/>
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

    const deleteIcon = (
        <>
            <div className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM9 8H11V17H9V8ZM13 8H15V17H13V8Z" fill="#D10F34"/>
                </svg>
            </div>
        </>
    )

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
            <div className="w-[331px] min-h-[700px] bg-custom-dark-blue-100 relative rounded shadow-md">
                <div className="font-bold text-xl p-3 text-white tracking-wider">
                    {title}
                </div>
                <div className="h-[600px] overflow-y-auto">
                    {items && items.map((item) => (
                        <div key={item.id} className="w-[290px] h-[87px] bg-white rounded shadow-lg mx-auto mt-6">
                            <div className="flex justify-between items-center">
                                {item.status !== 2 ? (
                                    <button onClick={() => changeStatus(item.id, ++item.status)}>{checkMarkIcon}</button>
                                ) : null}
                                <button onClick={() => deleteKanban(item.id)}>{deleteIcon}</button>
                            </div>
                            <div onClick={() => openDetailModal(item)} className="flex justify-center cursor-pointer">
                                {item.name}
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
        console.log(status);
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
                        <div className="fixed inset-0 bg-black opacity-25"></div>
                        <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl w-[800px] max-w-lg z-10">
                            <div className="relative p-5">
                                <div className="absolute right-0 top-0 p-2">
                                    <button onClick={() => setIsModalOpen(false)}>{closeIcon}</button>
                                </div>
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
                                <div className="mt-5 flex justify-end gap-3 max-w-xs mx-auto">
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

    const todoIcon = (
        <>
            <svg width="58" height="32" viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="58" height="32" rx="16" fill="#DBEAFE"/>
                <path d="M10.4616 13.1935V11.5455H18.2266V13.1935H15.332V21H13.3562V13.1935H10.4616ZM21.6439 21.1385C20.9268 21.1385 20.3067 20.9862 19.7835 20.6815C19.2633 20.3737 18.8617 19.9459 18.5786 19.3981C18.2954 18.8472 18.1539 18.2086 18.1539 17.4822C18.1539 16.7498 18.2954 16.1096 18.5786 15.5618C18.8617 15.0109 19.2633 14.5831 19.7835 14.2784C20.3067 13.9706 20.9268 13.8168 21.6439 13.8168C22.361 13.8168 22.9796 13.9706 23.4997 14.2784C24.0229 14.5831 24.4261 15.0109 24.7093 15.5618C24.9924 16.1096 25.134 16.7498 25.134 17.4822C25.134 18.2086 24.9924 18.8472 24.7093 19.3981C24.4261 19.9459 24.0229 20.3737 23.4997 20.6815C22.9796 20.9862 22.361 21.1385 21.6439 21.1385ZM21.6531 19.6151C21.9794 19.6151 22.2517 19.5227 22.4703 19.3381C22.6888 19.1503 22.8534 18.8949 22.9642 18.5717C23.0781 18.2486 23.135 17.8808 23.135 17.4684C23.135 17.056 23.0781 16.6882 22.9642 16.3651C22.8534 16.0419 22.6888 15.7865 22.4703 15.5987C22.2517 15.411 21.9794 15.3171 21.6531 15.3171C21.3238 15.3171 21.0468 15.411 20.8222 15.5987C20.6006 15.7865 20.4329 16.0419 20.319 16.3651C20.2082 16.6882 20.1528 17.056 20.1528 17.4684C20.1528 17.8808 20.2082 18.2486 20.319 18.5717C20.4329 18.8949 20.6006 19.1503 20.8222 19.3381C21.0468 19.5227 21.3238 19.6151 21.6531 19.6151ZM32.81 21H29.4585V11.5455H32.8377C33.7887 11.5455 34.6074 11.7347 35.2937 12.1133C35.98 12.4888 36.5078 13.0289 36.8771 13.7337C37.2495 14.4384 37.4357 15.2817 37.4357 16.2635C37.4357 17.2483 37.2495 18.0947 36.8771 18.8026C36.5078 19.5104 35.9769 20.0536 35.2844 20.4322C34.5951 20.8107 33.7702 21 32.81 21ZM31.4574 19.2873H32.7269C33.3178 19.2873 33.8149 19.1826 34.218 18.9734C34.6243 18.761 34.929 18.4332 35.1321 17.9901C35.3383 17.5438 35.4414 16.9683 35.4414 16.2635C35.4414 15.5649 35.3383 14.994 35.1321 14.5508C34.929 14.1076 34.6258 13.7814 34.2227 13.5721C33.8195 13.3628 33.3224 13.2582 32.7315 13.2582H31.4574V19.2873ZM42.0834 21.1385C41.3663 21.1385 40.7461 20.9862 40.2229 20.6815C39.7028 20.3737 39.3012 19.9459 39.018 19.3981C38.7349 18.8472 38.5933 18.2086 38.5933 17.4822C38.5933 16.7498 38.7349 16.1096 39.018 15.5618C39.3012 15.0109 39.7028 14.5831 40.2229 14.2784C40.7461 13.9706 41.3663 13.8168 42.0834 13.8168C42.8005 13.8168 43.4191 13.9706 43.9392 14.2784C44.4624 14.5831 44.8656 15.0109 45.1487 15.5618C45.4318 16.1096 45.5734 16.7498 45.5734 17.4822C45.5734 18.2086 45.4318 18.8472 45.1487 19.3981C44.8656 19.9459 44.4624 20.3737 43.9392 20.6815C43.4191 20.9862 42.8005 21.1385 42.0834 21.1385ZM42.0926 19.6151C42.4188 19.6151 42.6912 19.5227 42.9097 19.3381C43.1282 19.1503 43.2929 18.8949 43.4037 18.5717C43.5175 18.2486 43.5745 17.8808 43.5745 17.4684C43.5745 17.056 43.5175 16.6882 43.4037 16.3651C43.2929 16.0419 43.1282 15.7865 42.9097 15.5987C42.6912 15.411 42.4188 15.3171 42.0926 15.3171C41.7633 15.3171 41.4863 15.411 41.2616 15.5987C41.04 15.7865 40.8723 16.0419 40.7584 16.3651C40.6476 16.6882 40.5922 17.056 40.5922 17.4684C40.5922 17.8808 40.6476 18.2486 40.7584 18.5717C40.8723 18.8949 41.04 19.1503 41.2616 19.3381C41.4863 19.5227 41.7633 19.6151 42.0926 19.6151Z" fill="#2563EB"/>
            </svg>
        </>
    );

    const doingIcon = (
        <>
            <svg width="58" height="32" viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="58" height="32" rx="16" fill="#E0E7FF"/>
                <path d="M14.1733 21H10.8217V11.5455H14.201C15.152 11.5455 15.9706 11.7347 16.657 12.1133C17.3433 12.4888 17.8711 13.0289 18.2404 13.7337C18.6128 14.4384 18.799 15.2817 18.799 16.2635C18.799 17.2483 18.6128 18.0947 18.2404 18.8026C17.8711 19.5104 17.3402 20.0536 16.6477 20.4322C15.9583 20.8107 15.1335 21 14.1733 21ZM12.8207 19.2873H14.0902C14.6811 19.2873 15.1781 19.1826 15.5813 18.9734C15.9876 18.761 16.2923 18.4332 16.4954 17.9901C16.7016 17.5438 16.8047 16.9683 16.8047 16.2635C16.8047 15.5649 16.7016 14.994 16.4954 14.5508C16.2923 14.1076 15.9891 13.7814 15.5859 13.5721C15.1828 13.3628 14.6857 13.2582 14.0948 13.2582H12.8207V19.2873ZM23.4466 21.1385C22.7296 21.1385 22.1094 20.9862 21.5862 20.6815C21.0661 20.3737 20.6644 19.9459 20.3813 19.3981C20.0982 18.8472 19.9566 18.2086 19.9566 17.4822C19.9566 16.7498 20.0982 16.1096 20.3813 15.5618C20.6644 15.0109 21.0661 14.5831 21.5862 14.2784C22.1094 13.9706 22.7296 13.8168 23.4466 13.8168C24.1637 13.8168 24.7823 13.9706 25.3025 14.2784C25.8257 14.5831 26.2288 15.0109 26.512 15.5618C26.7951 16.1096 26.9367 16.7498 26.9367 17.4822C26.9367 18.2086 26.7951 18.8472 26.512 19.3981C26.2288 19.9459 25.8257 20.3737 25.3025 20.6815C24.7823 20.9862 24.1637 21.1385 23.4466 21.1385ZM23.4559 19.6151C23.7821 19.6151 24.0545 19.5227 24.273 19.3381C24.4915 19.1503 24.6562 18.8949 24.767 18.5717C24.8808 18.2486 24.9378 17.8808 24.9378 17.4684C24.9378 17.056 24.8808 16.6882 24.767 16.3651C24.6562 16.0419 24.4915 15.7865 24.273 15.5987C24.0545 15.411 23.7821 15.3171 23.4559 15.3171C23.1266 15.3171 22.8496 15.411 22.6249 15.5987C22.4033 15.7865 22.2356 16.0419 22.1217 16.3651C22.0109 16.6882 21.9555 17.056 21.9555 17.4684C21.9555 17.8808 22.0109 18.2486 22.1217 18.5717C22.2356 18.8949 22.4033 19.1503 22.6249 19.3381C22.8496 19.5227 23.1266 19.6151 23.4559 19.6151ZM28.2155 21V13.9091H30.1821V21H28.2155ZM29.2034 12.995C28.911 12.995 28.6602 12.8981 28.4509 12.7042C28.2447 12.5072 28.1416 12.2718 28.1416 11.9979C28.1416 11.727 28.2447 11.4947 28.4509 11.3008C28.6602 11.1038 28.911 11.0053 29.2034 11.0053C29.4958 11.0053 29.7451 11.1038 29.9513 11.3008C30.1605 11.4947 30.2652 11.727 30.2652 11.9979C30.2652 12.2718 30.1605 12.5072 29.9513 12.7042C29.7451 12.8981 29.4958 12.995 29.2034 12.995ZM33.7241 16.9006V21H31.7575V13.9091H33.6317V15.1602H33.7148C33.8718 14.7478 34.1349 14.4215 34.5043 14.1815C34.8736 13.9383 35.3214 13.8168 35.8477 13.8168C36.3401 13.8168 36.7694 13.9245 37.1357 14.1399C37.5019 14.3554 37.7866 14.6631 37.9897 15.0632C38.1928 15.4602 38.2944 15.9342 38.2944 16.4851V21H36.3278V16.8359C36.3308 16.402 36.2201 16.0634 35.9954 15.8203C35.7707 15.5741 35.4614 15.451 35.0675 15.451C34.8028 15.451 34.5689 15.5079 34.3658 15.6218C34.1657 15.7357 34.0088 15.9019 33.8949 16.1204C33.7841 16.3358 33.7272 16.5959 33.7241 16.9006ZM43.039 23.8068C42.4019 23.8068 41.8556 23.7191 41.4001 23.5437C40.9477 23.3713 40.5876 23.1359 40.3199 22.8374C40.0521 22.5388 39.8782 22.2034 39.7982 21.831L41.6171 21.5863C41.6725 21.7279 41.7602 21.8602 41.8802 21.9833C42.0003 22.1064 42.1588 22.2049 42.3557 22.2788C42.5558 22.3557 42.7989 22.3942 43.0851 22.3942C43.5129 22.3942 43.8653 22.2895 44.1423 22.0803C44.4224 21.8741 44.5624 21.5278 44.5624 21.0415V19.7443H44.4793C44.3931 19.9413 44.2639 20.1275 44.0915 20.3029C43.9192 20.4783 43.6976 20.6214 43.4268 20.7322C43.1559 20.843 42.8328 20.8984 42.4573 20.8984C41.9249 20.8984 41.4401 20.7753 41.0031 20.5291C40.5692 20.2798 40.2229 19.8997 39.9644 19.3888C39.709 18.8749 39.5812 18.2255 39.5812 17.4407C39.5812 16.6374 39.712 15.9665 39.9736 15.4279C40.2352 14.8893 40.583 14.4862 41.017 14.2184C41.454 13.9506 41.9326 13.8168 42.4527 13.8168C42.8497 13.8168 43.1821 13.8845 43.4498 14.0199C43.7176 14.1522 43.933 14.3184 44.0961 14.5185C44.2623 14.7154 44.3901 14.9093 44.4793 15.1001H44.5532V13.9091H46.5059V21.0692C46.5059 21.6725 46.3582 22.1772 46.0628 22.5835C45.7673 22.9897 45.358 23.2944 44.8348 23.4975C44.3147 23.7037 43.7161 23.8068 43.039 23.8068ZM43.0805 19.4212C43.3975 19.4212 43.6653 19.3427 43.8838 19.1857C44.1054 19.0257 44.2747 18.7979 44.3916 18.5025C44.5116 18.204 44.5716 17.8469 44.5716 17.4315C44.5716 17.016 44.5132 16.6559 44.3962 16.3512C44.2793 16.0434 44.11 15.8049 43.8884 15.6357C43.6668 15.4664 43.3975 15.3817 43.0805 15.3817C42.7574 15.3817 42.485 15.4695 42.2634 15.6449C42.0418 15.8172 41.8741 16.0573 41.7602 16.3651C41.6463 16.6728 41.5894 17.0283 41.5894 17.4315C41.5894 17.8408 41.6463 18.1947 41.7602 18.4933C41.8772 18.7887 42.0449 19.018 42.2634 19.1811C42.485 19.3411 42.7574 19.4212 43.0805 19.4212Z" fill="#4F46E5"/>
            </svg>
        </>
    );

    const doneIcon = (
        <>
            <svg width="58" height="40" viewBox="0 0 58 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="58" height="32" rx="16" fill="#FFE4E6"/>
                <path d="M16.1733 21H12.8217V11.5455H16.201C17.152 11.5455 17.9706 11.7347 18.657 12.1133C19.3433 12.4888 19.8711 13.0289 20.2404 13.7337C20.6128 14.4384 20.799 15.2817 20.799 16.2635C20.799 17.2483 20.6128 18.0947 20.2404 18.8026C19.8711 19.5104 19.3402 20.0536 18.6477 20.4322C17.9583 20.8107 17.1335 21 16.1733 21ZM14.8207 19.2873H16.0902C16.6811 19.2873 17.1781 19.1826 17.5813 18.9734C17.9876 18.761 18.2923 18.4332 18.4954 17.9901C18.7016 17.5438 18.8047 16.9683 18.8047 16.2635C18.8047 15.5649 18.7016 14.994 18.4954 14.5508C18.2923 14.1076 17.9891 13.7814 17.5859 13.5721C17.1828 13.3628 16.6857 13.2582 16.0948 13.2582H14.8207V19.2873ZM25.4466 21.1385C24.7296 21.1385 24.1094 20.9862 23.5862 20.6815C23.0661 20.3737 22.6644 19.9459 22.3813 19.3981C22.0982 18.8472 21.9566 18.2086 21.9566 17.4822C21.9566 16.7498 22.0982 16.1096 22.3813 15.5618C22.6644 15.0109 23.0661 14.5831 23.5862 14.2784C24.1094 13.9706 24.7296 13.8168 25.4466 13.8168C26.1637 13.8168 26.7823 13.9706 27.3025 14.2784C27.8257 14.5831 28.2288 15.0109 28.512 15.5618C28.7951 16.1096 28.9367 16.7498 28.9367 17.4822C28.9367 18.2086 28.7951 18.8472 28.512 19.3981C28.2288 19.9459 27.8257 20.3737 27.3025 20.6815C26.7823 20.9862 26.1637 21.1385 25.4466 21.1385ZM25.4559 19.6151C25.7821 19.6151 26.0545 19.5227 26.273 19.3381C26.4915 19.1503 26.6562 18.8949 26.767 18.5717C26.8808 18.2486 26.9378 17.8808 26.9378 17.4684C26.9378 17.056 26.8808 16.6882 26.767 16.3651C26.6562 16.0419 26.4915 15.7865 26.273 15.5987C26.0545 15.411 25.7821 15.3171 25.4559 15.3171C25.1266 15.3171 24.8496 15.411 24.6249 15.5987C24.4033 15.7865 24.2356 16.0419 24.1217 16.3651C24.0109 16.6882 23.9555 17.056 23.9555 17.4684C23.9555 17.8808 24.0109 18.2486 24.1217 18.5717C24.2356 18.8949 24.4033 19.1503 24.6249 19.3381C24.8496 19.5227 25.1266 19.6151 25.4559 19.6151ZM32.1821 16.9006V21H30.2155V13.9091H32.0898V15.1602H32.1729C32.3298 14.7478 32.593 14.4215 32.9623 14.1815C33.3316 13.9383 33.7794 13.8168 34.3057 13.8168C34.7981 13.8168 35.2274 13.9245 35.5937 14.1399C35.9599 14.3554 36.2446 14.6631 36.4477 15.0632C36.6508 15.4602 36.7524 15.9342 36.7524 16.4851V21H34.7858V16.8359C34.7889 16.402 34.6781 16.0634 34.4534 15.8203C34.2287 15.5741 33.9194 15.451 33.5255 15.451C33.2608 15.451 33.0269 15.5079 32.8238 15.6218C32.6237 15.7357 32.4668 15.9019 32.3529 16.1204C32.2421 16.3358 32.1852 16.5959 32.1821 16.9006ZM41.5339 21.1385C40.8045 21.1385 40.1767 20.9908 39.6504 20.6953C39.1272 20.3968 38.724 19.9751 38.4409 19.4304C38.1577 18.8826 38.0162 18.2347 38.0162 17.4869C38.0162 16.7575 38.1577 16.1173 38.4409 15.5664C38.724 15.0155 39.1226 14.5862 39.6365 14.2784C40.1536 13.9706 40.7599 13.8168 41.4554 13.8168C41.9232 13.8168 42.3587 13.8922 42.7619 14.043C43.1681 14.1907 43.5221 14.4138 43.8237 14.7124C44.1284 15.0109 44.3654 15.3864 44.5346 15.8388C44.7039 16.2881 44.7885 16.8144 44.7885 17.4176V17.9577H38.801V16.739H42.9373C42.9373 16.4558 42.8758 16.205 42.7527 15.9865C42.6296 15.768 42.4587 15.5972 42.2402 15.4741C42.0248 15.3479 41.774 15.2848 41.4877 15.2848C41.1892 15.2848 40.9245 15.354 40.6937 15.4925C40.466 15.628 40.2875 15.8111 40.1582 16.0419C40.0289 16.2696 39.9628 16.5236 39.9597 16.8036V17.9624C39.9597 18.3132 40.0243 18.6164 40.1536 18.8718C40.2859 19.1272 40.4721 19.3242 40.7122 19.4627C40.9522 19.6012 41.2369 19.6705 41.5662 19.6705C41.7847 19.6705 41.9848 19.6397 42.1664 19.5781C42.348 19.5166 42.5034 19.4242 42.6326 19.3011C42.7619 19.178 42.8604 19.0272 42.9281 18.8487L44.747 18.9688C44.6547 19.4058 44.4654 19.7874 44.1792 20.1136C43.896 20.4368 43.5298 20.6892 43.0804 20.8707C42.6342 21.0492 42.1187 21.1385 41.5339 21.1385Z" fill="#E11D48"/>
            </svg>
        </>
    );

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
                        <div className="fixed inset-0 bg-black opacity-25"></div>
                        <div className="relative mx-auto overflow-hidden rounded-lg bg-white shadow-xl min-h-[300px] w-[700px] sm:max-w-sm z-10">
                            <div className="p-5">
                                <div className="absolute right-0 top-0 p-2">
                                    <button onClick={() => setDetailModalOpen(false)}>{closeIcon}</button>
                                </div>
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