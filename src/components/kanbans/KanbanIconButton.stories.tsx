import type { Meta, StoryObj } from '@storybook/react';
import KanbanIconButton from "./KanbanIconButton";
import {checkMarkIcon, deleteIcon, prioritizedIcon, priorityIcon, returnIcon} from "../shared/icons/Icons";

const meta: Meta<typeof KanbanIconButton> = {
    title: 'Kanbans/KanbanIconButtons',
    component: KanbanIconButton,
}

export default meta;
type Story = StoryObj<typeof KanbanIconButton>;

export const CheckMarkIcon: Story = {
    args: {
        action: () => {console.log('button clicked')},
        icon: checkMarkIcon,
        args: ['test'],
    }
}

export const DeleteIcon: Story = {
    args: {
        action: () => {console.log('button clicked')},
        icon: deleteIcon,
        args: ['test'],
    }
}

export const PrioritizedIcon: Story = {
    args: {
        action: () => {console.log('button clicked')},
        icon: prioritizedIcon,
        args: ['test'],
    }
}

export const PriorityIcon: Story = {
    args: {
        action: () => {console.log('button clicked')},
        icon: priorityIcon,
        args: ['test'],
    }
}

export const ReturnIcon: Story = {
    args: {
        action: () => {console.log('button clicked')},
        icon: returnIcon,
        args: ['test'],
    }
}