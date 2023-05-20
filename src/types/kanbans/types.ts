type PriorityKey = 0 | 1;
type Status = 0 | 1 | 2;
export interface IKanban {
    id: string;
    name: string;
    description: string;
    status: Status;
    userId: string;
    created_at: Date;
    updated_at: Date;
    prioritize: PriorityKey;
}