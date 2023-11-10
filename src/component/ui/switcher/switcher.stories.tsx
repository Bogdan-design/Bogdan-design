import type { Meta, StoryObj } from '@storybook/react'

import { Switcher } from './switcher'

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['active', 'default'],
    },
  },
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Switcher',
    disabled: false,
  },
}

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Switcher',
    disabled: false,
  },
}
