export interface IKanbanActionButtonProps {
    action: (...args: any[]) => void;
    icon: any;
    args?: any[];
}
export default function KanbanIconButton({action, icon, args = []}: IKanbanActionButtonProps) {
    return (
        <button onClick={() => action(...args)}>{icon}</button>
    )
}