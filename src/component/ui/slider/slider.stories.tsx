import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: [20, 40],
    max: 100,
  },
}
