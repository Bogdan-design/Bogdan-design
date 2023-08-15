import { useState } from 'react'

import logo from '../../../assets/icon/Logo.png'
import { Button } from '../../ui'

import s from './header.module.scss'

export const Header = () => {
  const [isLogged, setIsLogged] = useState(false)
  const DropDawnMenu = () => {
    return <>Hello</>
  }

  const signInHandler = () => {
    setIsLogged(true)
  }

  return (
    <header className={s.header}>
      <a>
        <img src={logo} />
      </a>
      {isLogged && <DropDawnMenu />}
      {!isLogged && (
        <Button variant={'primary'} onClick={signInHandler}>
          Sign In
        </Button>
      )}
    </header>
  )
}
