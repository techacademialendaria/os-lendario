import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <input
        id="email"
        type="email"
        className="rounded border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="you@example.com"
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    children: 'Email Address *',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled label',
    htmlFor: 'disabled-input',
  },
};
