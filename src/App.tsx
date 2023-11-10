import { Provider } from 'react-redux'

import { store } from './app/store'
import { Router } from './router'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
