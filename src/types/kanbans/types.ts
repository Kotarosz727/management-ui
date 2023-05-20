type PriorityKey = 0 | 1;
export interface IKanban {
    id: string;
    name: string;
    description: string;
    status: number;
    userId: string;
    created_at: Date;
    updated_at: Date;
    prioritize: PriorityKey;
}