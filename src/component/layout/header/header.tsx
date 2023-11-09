import { Link } from 'react-router-dom'

import { useMeQuery } from '../../../services/auth/auth.service'
import { Button, Typography } from '../../ui'

import s from './header.module.scss'

export const Header = () => {
  const { isError } = useMeQuery()
  const DropDawnMenu = () => {
    return <>Hello</>
  }

  /*const signInHandler = () => {
        setIsLogged(true)
      }*/

  return (
    <header className={s.header}>
      <Typography as={'h1'}>Cards</Typography>
      {!isError && <DropDawnMenu />}
      {isError && (
        <Button variant={'primary'} as={Link} to={'/registration'}>
          Sign In
        </Button>
      )}
    </header>
  )
}
