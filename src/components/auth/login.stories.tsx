import type { Meta, StoryObj } from '@storybook/react';
import Login from "@/components/auth/login";

const meta: Meta = {
    title: 'Auth/Login',
    component: Login,
}

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {}