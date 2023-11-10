import { Link } from 'react-router-dom'

import avatar from '../../../assets/icon/avatar.png'
import { useMeQuery } from '../../../services/auth/auth.service'
import { Button, Typography } from '../../ui'

import s from './header.module.scss'

export const Header = () => {
  const { isError, data } = useMeQuery()
  const DropDawnMenu = () => {
    return (
      <section className={s.dropDownMenu}>
        <Typography className={s.nickHeader} variant={'h2'}>
          {data?.name}
        </Typography>
        <Button className={s.avatarButton} variant={'link'} as={Link} to={'/user'}>
          {data?.avatar || <img className={s.avatarImg} src={avatar} alt={''} />}
        </Button>
      </section>
    )
  }

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
