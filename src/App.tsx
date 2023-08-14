import { Header, LoginForm, Typography } from './component'

export function App() {
  return (
    <div>
      <Header />
      <Typography variant={'h1'} as={'h1'}>
        Hello
      </Typography>
      <LoginForm />
    </div>
  )
}
