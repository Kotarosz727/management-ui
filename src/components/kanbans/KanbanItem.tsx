import {checkMarkIcon, deleteIcon, returnIcon} from "@/components/shared/Icons/Icons";
import {IKanban} from "@/types/kanbans/types";

interface IKanbanItemProps {
    item: IKanban;
    updateKanban: (id: string, data: any) => void;
    deleteKanban: (id: string) => void;
    openDetailModal: (item: IKanban) => void;
    showPriority: (item: IKanban) => JSX.Element;
}
export default function KanbanItem ({item, updateKanban, deleteKanban, openDetailModal, showPriority}: IKanbanItemProps) {
    return (
        <div key={item.id} className="w-[290px] h-[100px] bg-white rounded shadow-lg mx-auto mt-6 relative">
            <div className="flex justify-between items-center p-1">
                {item.status !== 2 ? (
                    <button
                        onClick={() => updateKanban(item.id, {status: ++item.status})}>{checkMarkIcon}</button>
                ) : null}
                <button onClick={() => deleteKanban(item.id)}>{deleteIcon}</button>
            </div>
            <div onClick={() => openDetailModal(item)} className="flex justify-center cursor-pointer p-2">
                {item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name}
            </div>
            <div className="flex justify-center left-0 absolute bottom-0">
                {item.status !== 2 ? showPriority(item) : null}
            </div>
            <div className="flex justify-center right-0 absolute bottom-0 cursor-pointer"
                 onClick={() => updateKanban(item.id, {status: 0})}>
                {item.status === 1 ? returnIcon : null}
            </div>
        </div>
    )
}