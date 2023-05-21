import type { Meta } from '@storybook/react';
import { todoIcon, doingIcon, doneIcon, iconMan, alertIcon } from './Icons';

const meta: Meta = {
    title: 'Shared/Icons',
}

export default meta;

export const TodoIcon　= {
    render: () => (
        <div>
            {todoIcon}
        </div>
    ),
}

export const DoingIcon　= {
    render: () => (
        <div>
            {doingIcon}
        </div>
    ),
}

export const DoneIcon　= {
    render: () => (
        <div>
            {doneIcon}
        </div>
    ),
}

export const IconManIcon　= {
    render: () => (
        <div>
            {iconMan}
        </div>
    ),
}

export const AlertIcon　= {
    render: () => (
        <div>
            {alertIcon}
        </div>
    ),
}