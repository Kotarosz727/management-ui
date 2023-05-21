import type { Meta, StoryObj } from '@storybook/react';
import { todoIcon, doingIcon, doneIcon, iconMan, alertIcon } from './Icons';

const meta: Meta = {
    title: 'Shared/Icons',
}

export default meta;

export const Todo　= {
    render: () => (
        <div>
            {todoIcon}
        </div>
    ),
}

export const Doing　= {
    render: () => (
        <div>
            {doingIcon}
        </div>
    ),
}

export const Done　= {
    render: () => (
        <div>
            {doneIcon}
        </div>
    ),
}

export const IconMan　= {
    render: () => (
        <div>
            {iconMan}
        </div>
    ),
}

export const Alert　= {
    render: () => (
        <div>
            {alertIcon}
        </div>
    ),
}