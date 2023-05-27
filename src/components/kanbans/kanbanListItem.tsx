import {IKanban} from "@/types/kanbans/types";
import {useState} from "react";
import KanbanItem from "./KanbanItem";
import KanbanDetailModal from "./KanbanDetailModal";
import KanbanAddToDoButton from "@/components/kanbans/KanbanAddToDoButton";
import KanbanAddToDoModal from "@/components/kanbans/KanbanAddToDoModal";

interface props {
    items: IKanban[],
    title: string,
    updateKanban: (id: string, payload: Partial<IKanban>) => void,
    deleteKanban: (id: string) => void,
    addTodo: (name: string, description: string) => void
}

export default function KanbanListItem({items, title, updateKanban, deleteKanban, addTodo}: props) {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [detail, setDetail] = useState({} as IKanban);
    const [addModalOpen, setAddTodoModalOpen] = useState(false);
    const openDetailModal = (kanban: IKanban) => {
        setDetailModalOpen(true);
        setDetail(kanban);
    }

    return (
        <>
            <div className="w-[350px] min-h-[720px] 2xl:min-h-[920px] bg-custom-dark-blue-100 relative rounded shadow-2xl">
                <div className="font-bold text-xl p-3 text-white tracking-wider">
                    {title}
                </div>
                <div className="h-[600px] 2xl:min-h-[800px] overflow-y-auto">
                    {items && items.map((item) => (
                        <div key={item.id} className="mt-6 mx-auto w-[290px]">
                            <KanbanItem key={item.id} item={item} updateKanban={updateKanban} deleteKanban={deleteKanban} openDetailModal={openDetailModal} />
                        </div>
                    ))}
                </div>
                {title === 'TO DO' ? <KanbanAddToDoButton setAddTodoModalOpen={setAddTodoModalOpen}/> : null}
            </div>
            <div>
                {addModalOpen && <KanbanAddToDoModal setAddTodoModalOpen={setAddTodoModalOpen} addTodo={addTodo} />}
                {detailModalOpen && <KanbanDetailModal detail={detail} setDetailModalOpen={setDetailModalOpen} />}
            </div>
        </>
    )
}

