import { Meta, StoryObj } from '@storybook/react'

import { Header } from './index.ts'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const IsLogin: Story = {}
