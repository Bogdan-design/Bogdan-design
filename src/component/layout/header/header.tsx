import { Link } from 'react-router-dom'

import { Button, Typography } from '../../ui'

import s from './header.module.scss'

export const Header = () => {
  const isLogged = false
  const DropDawnMenu = () => {
    return <>Hello</>
  }

  /*const signInHandler = () => {
    setIsLogged(true)
  }*/

  return (
    <header className={s.header}>
      <Typography as={'h1'}>Cards</Typography>
      {isLogged && <DropDawnMenu />}
      {!isLogged && (
        <Button variant={'primary'} as={Link} to={'/registration'}>
          Sign In
        </Button>
      )}
    </header>
  )
}
