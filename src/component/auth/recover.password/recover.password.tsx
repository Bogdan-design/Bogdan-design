import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useRecoveryMutation } from '../../../services/auth/auth.service'
import { authSlice } from '../../../services/auth/auth.slice'
import { useAppDispatch } from '../../../services/store'
import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './recover.password.module.scss'

const schema = z.object({
  email: z.string().email(),
})

type FormType = z.infer<typeof schema>

export const RecoverPassword = () => {
  const [recovery] = useRecoveryMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormType) => {
    try {
      await recovery(data)
      dispatch(authSlice.actions.setRecoveryEmail(data.email))
      navigate('/check')
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Forgot your password?
        </Typography>
        <form className={s.form} onSubmit={handleFormSubmitted}>
          <ControlledTextField
            control={control}
            name={'email'}
            placeholder={'email'}
            label={'Email'}
          />
          <Typography variant={'body2'} className={s.text}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button fullWidth type="submit" className={s.button}>
            Send Instructions
          </Button>
          <Typography variant={'body2'} className={s.text2}>
            Did you remember your password?
          </Typography>
          <Typography variant={'link1'} as={Link} to={'/login'} className={s.tryLoggingIn}>
            Try logging in
          </Typography>
        </form>
      </Card>
    </div>
  )
}
