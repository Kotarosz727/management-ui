import type { Meta, StoryObj } from '@storybook/react';
import KanbanItem from './KanbanItem';
import { StatusKey } from '@/types/kanbans/types';
import { IKanban } from '@/types/kanbans/types';

const meta: Meta<typeof KanbanItem> = {
    title: 'KanbanItem',
    component: KanbanItem,
};

export default meta;
type Story = StoryObj<typeof KanbanItem>;

// Mock item data
const itemData: IKanban = {
    id: '1',
    name: 'Test Task',
    status: StatusKey.TODO,
    prioritize: 1,
    description: 'This is a test task',
    userId: '1',
    created_at: new Date(),
    updated_at: new Date(),
};

// Mock functions
const updateKanban = (id: string, data: any) => console.log(`Updating kanban item with id ${id} with data: ${JSON.stringify(data)}`);
const deleteKanban = (id: string) => console.log(`Deleting kanban item with id ${id}`);
const openDetailModal = (item: IKanban) => console.log(`Opening detail modal for item with id ${item.id}`);

export const ToDo: Story = {
    args: {
        item: itemData,
        updateKanban,
        deleteKanban,
        openDetailModal
    },
};
export const Doing: Story = {
    args: {
        item: { ...itemData, status: StatusKey.DOING },
        updateKanban,
        deleteKanban,
        openDetailModal
    },
};

export const Done: Story = {
    args: {
        item: { ...itemData, status: StatusKey.DONE },
        updateKanban,
        deleteKanban,
        openDetailModal
    }
}