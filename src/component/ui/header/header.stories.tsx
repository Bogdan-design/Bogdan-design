import { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

export default {}
const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof meta>

export const IsLogin: Story = {
  args: {
    label: 'Click here',
    disabled: false,
  },
}

export const LoginOut: Story = {
  args: {
    label: 'Click here',
    disabled: false,
  },
}
