import { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './index.ts'

const meta = {
  title: 'Profile/Personal information',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const IsLogin: Story = {}
