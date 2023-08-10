import { Meta, StoryObj } from '@storybook/react'

import { RadioRadix } from './'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioRadix,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioRadix>

export default meta

type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    value: 'Radio group',
    disabled: false,
  },
}
