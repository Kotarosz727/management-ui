import type { Meta, StoryObj } from '@storybook/react';
import KanbanListItem from "@/components/kanbans/kanbanListItem";
import {IKanban, StatusKey} from "@/types/kanbans/types";

const meta: Meta<typeof KanbanListItem> = {
    title: 'Kanbans/KanbanListItem',
    component: KanbanListItem,
}

export default meta;
type Story = StoryObj<typeof KanbanListItem>;

const updateKanban = (id: string, data: any) => console.log(`Updating kanban item with id ${id} with data: ${JSON.stringify(data)}`);
const deleteKanban = (id: string) => console.log(`Deleting kanban item with id ${id}`);
const addTodo = (name: string, description: string) => console.log(`Adding todo with name ${name} and description ${description}`);

// Mock item data
const toDoItems: IKanban[] = [
    {
        id: '1',
        name: 'Test Task',
        status: StatusKey.TODO,
        prioritize: 1,
        description: 'This is a test task',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: '2',
        name: 'Test Task2',
        status: StatusKey.TODO,
        prioritize: 1,
        description: 'This is a test task2',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    }
]

const doingItems: IKanban[] = [
    {
        id: '1',
        name: 'Test Task',
        status: StatusKey.DOING,
        prioritize: 1,
        description: 'This is a test task',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: '2',
        name: 'Test Task2',
        status: StatusKey.DOING,
        prioritize: 1,
        description: 'This is a test task2',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    }
]

const doneItems: IKanban[] = [
    {
        id: '1',
        name: 'Test Task',
        status: StatusKey.DONE,
        prioritize: 1,
        description: 'This is a test task',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: '2',
        name: 'Test Task2',
        status: StatusKey.DONE,
        prioritize: 1,
        description: 'This is a test task2',
        userId: '1',
        created_at: new Date(),
        updated_at: new Date(),
    }
]

export const Todo: Story = {
    args: {
        items: toDoItems,
        title: 'Todo',
        updateKanban,
        deleteKanban,
        addTodo,
    }
}

export const Doing: Story = {
    args: {
        items: doingItems,
        title: 'Doing',
        updateKanban,
        deleteKanban,
        addTodo,
    }
}

export const Done: Story = {
    args: {
        items: doingItems,
        title: 'Done',
        updateKanban,
        deleteKanban,
        addTodo,
    }
}