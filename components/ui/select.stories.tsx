import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './select';
import { Label } from './label';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <Select
        options={defaultOptions}
        placeholder="Select an option"
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <div className="space-y-2">
        <Label>Choose an option</Label>
        <Select
          options={defaultOptions}
          placeholder="Select an option"
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
  },
  render: () => (
    <Select
      options={defaultOptions}
      placeholder="Select an option"
      disabled
    />
  ),
};

export const WithDefault: Story = {
  args: {
    options: defaultOptions,
    value: 'option2',
  },
  render: () => {
    const [value, setValue] = useState('option2');
    return (
      <Select
        options={defaultOptions}
        placeholder="Select an option"
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Countries: Story = {
  args: {
    options: [],
  },
  render: () => {
    const [value, setValue] = useState('');
    const countries = [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Brazil', value: 'br' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
    ];
    return (
      <div className="space-y-2">
        <Label>Select Country</Label>
        <Select
          options={countries}
          placeholder="Choose a country"
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};
