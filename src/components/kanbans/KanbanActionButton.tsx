interface IKanbanActionButtonProps {
    action: (...args: any[]) => void;
    content: any;
    args?: any[];
}
export function KanbanActionButton({action, content, args = []}: IKanbanActionButtonProps) {
    return (
        <button onClick={() => action(...args)}>{content}</button>
    )
}