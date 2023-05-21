import type { Meta, StoryObj } from '@storybook/react';
import {SuccessAlert} from "@/components/shared/alert/SuccessAlert";

const meta: Meta = {
    title: 'Shared/Alert/SuccessAlert',
    component: SuccessAlert,
}

export default meta;
type Story = StoryObj<typeof SuccessAlert>;

export const Default: Story = {
    args: {
        message: 'This is a success message',
        onClick: () => console.log('Clicked'),
    }
}