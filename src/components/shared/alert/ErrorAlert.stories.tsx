import type { Meta, StoryObj } from '@storybook/react';
import {ErrorAlert} from "@/components/shared/alert/ErrorAlert";

const meta: Meta = {
    title: 'Shared/Alert/ErrorAlert',
    component: ErrorAlert,
}

export default meta;
type Story = StoryObj<typeof ErrorAlert>;

export const Default: Story = {
    args: {
        message: 'This is an error message',
        onClick: () => console.log('Clicked'),
    }
}