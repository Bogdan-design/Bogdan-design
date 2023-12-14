import { Link, Navigate } from 'react-router-dom'

import Email from '../../../assets/icon/email'

import s from './check.email.module.scss'

import { useAppSelector } from '@/app/store'
import { Button, Card, Typography } from '@/component'

export const CheckEmail = () => {
  const email = useAppSelector(state => state.authSlice.email)

  if (email === '') return <Navigate to={'/recovery'} />

  return (
    <section className={s.checkEmail}>
      <Card className={s.checkCard}>
        <Typography variant={'large'}>Check Email</Typography>
        <Email />
        <Typography variant={'body2'} className={s.text}>
          We’ve sent an Email with instructions to {email}
        </Typography>
        <Button className={s.button} fullWidth as={Link} to={'/login'} variant={'primary'}>
          Back to Sign In
        </Button>
      </Card>
    </section>
  )
}
