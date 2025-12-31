import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toast } from './toast';
import { Button } from './button';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    onClose: () => { },
  },
  render: () => {
    const [toasts, setToasts] = useState([
      {
        id: '1',
        title: 'Success!',
        description: 'Your changes have been saved.',
        variant: 'default' as const,
      },
    ]);

    return (
      <div className="space-y-4">
        <Button onClick={() => {
          const newToast = {
            id: Date.now().toString(),
            title: 'New Toast',
            description: 'This is a toast notification',
            variant: 'default' as const,
          };
          setToasts([...toasts, newToast]);
        }}>
          Show Toast
        </Button>

        <div className="fixed bottom-4 right-4 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => setToasts(toasts.filter(t => t.id !== toast.id))}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const Success: Story = {
  args: {
    id: '1',
    title: 'Success!',
    description: 'Operation completed successfully.',
    variant: 'success',
    onClose: () => { },
  },
};

export const Destructive: Story = {
  args: {
    id: '1',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    variant: 'destructive',
    onClose: () => { },
  },
};

export const Warning: Story = {
  args: {
    id: '1',
    title: 'Warning',
    description: 'Please review before proceeding.',
    variant: 'warning',
    onClose: () => { },
  },
};

export const WithAction: Story = {
  args: {
    id: '1',
    title: 'Changes saved',
    description: 'Your document has been updated.',
    action: <Button size="sm" variant="ghost">Undo</Button>,
    variant: 'default',
    onClose: () => { },
  },
};
