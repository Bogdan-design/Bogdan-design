import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './sign.up'

const meta = {
  title: 'Auth/Sign Up Form',
  component: SignUpForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const SingUp: Story = {}
