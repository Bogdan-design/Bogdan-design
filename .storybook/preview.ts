import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import '../src/styles/index.scss'

import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorator = [withRouter]

export default preview
