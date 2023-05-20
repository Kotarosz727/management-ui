import {checkMarkIcon, deleteIcon, prioritizedIcon, priorityIcon, returnIcon} from "@/components/shared/Icons/Icons";
import {IKanban, StatusKey} from "@/types/kanbans/types";
import KanbanIconButton from "@/components/kanbans/KanbanIconButton";

interface IKanbanItemProps {
    item: IKanban;
    updateKanban: (id: string, data: any) => void;
    deleteKanban: (id: string) => void;
    openDetailModal: (item: IKanban) => void;
}
export default function KanbanItem ({item, updateKanban, deleteKanban, openDetailModal }: IKanbanItemProps) {
    const showPriorityIcon = (item: IKanban) => (
        <>
            {item.prioritize ? (
                <KanbanIconButton action={updateKanban} icon={prioritizedIcon} args={[item.id, { prioritize: 0 }]}/>
            ) : (
                <KanbanIconButton action={updateKanban} icon={priorityIcon} args={[item.id, { prioritize: 1 }]}/>
            )}
        </>
    )

    const displayName = (name: string) => {
        if (name.length > 15) {
            return name.slice(0, 15) + '...';
        }
        return name;
    }

    return (
        <div key={item.id} className="w-[290px] h-[100px] bg-white rounded shadow-lg mx-auto mt-6 relative">
            <div className="flex justify-between items-center p-1">
                {item.status !== StatusKey.DONE ? (
                    <KanbanIconButton action={updateKanban} icon={checkMarkIcon} args={[item.id, { status: item.status + 1 }]}/>
                ) : null}
                <KanbanIconButton action={deleteKanban} icon={deleteIcon} args={[item.id]}/>
            </div>
            <div onClick={() => openDetailModal(item)} className="flex justify-center cursor-pointer p-2">
                {displayName(item.name)}
            </div>
            <div className="flex justify-center left-0 absolute bottom-0">
                {item.status !== StatusKey.DONE ? showPriorityIcon(item) : null}
            </div>
            <div className="flex justify-center right-0 absolute bottom-0 cursor-pointer">
                {item.status === StatusKey.DOING ? (
                    <KanbanIconButton action={updateKanban} icon={returnIcon} args={[item.id, { status: 0 }]}/>
                ) : null}
            </div>
        </div>
    )
}