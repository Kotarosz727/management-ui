import {IKanban, StatusKey} from "@/types/kanbans/types";
import {doingIcon, doneIcon, todoIcon} from "@/components/shared/icons/Icons";

interface props {
    detail: IKanban,
    setDetailModalOpen: (open: boolean) => void
}
export default function KanbanDetailModal({detail, setDetailModalOpen}: props) {
    const showIcon = (status: number) => {
        switch (status) {
            case StatusKey.TODO:
                return todoIcon;
            case StatusKey.DOING:
                return doingIcon;
            case StatusKey.DONE:
                return doneIcon;
            default:
                return '';
        }
    }

    const showDate = (item: IKanban) => {
        const createdDate = new Date(item.created_at).toLocaleDateString();
        const updatedDate = new Date(item.updated_at).toLocaleDateString();
        const status = item.status;

        switch (status) {
            case StatusKey.TODO:
            case StatusKey.DOING:
                return <span className="text-gray-500 text-sm">Created: {createdDate}</span>;
            case StatusKey.DONE:
                return <span className="text-gray-500 text-sm">Done: {updatedDate}</span>;
        }
    }

    return (
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
                                <div className="mt-8 mb-10 whitespace-pre-wrap">
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
}
