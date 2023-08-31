import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'

import s from './login.form.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type LoginFormSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data)
  }
  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Sing In
        </Typography>
        <form className={s.form} onSubmit={handleFormSubmitted}>
          {/*rhf dev tool*/}
          <DevTool control={control} />
          {/*rhf dev tool*/}
          <ControlledTextField
            placeholder={'Email'}
            label={'Email'}
            name={'email'}
            control={control}
          />
          {/*{errors.email?.message}*/}
          <ControlledTextField
            placeholder={'Password'}
            type={'password'}
            label={'password'}
            name={'password'}
            control={control}
          />
          {/*{errors.password?.message}*/}
          <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
          <Typography variant="body2" className={s.forgotPassword}>
            Forgot Password?
          </Typography>
          <Button fullWidth type="submit">
            Sign In
          </Button>
          <Typography variant={'body2'} className={s.accountTitle}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
          </Typography>
          <Typography variant={'link1'} as={Link} to={'/registration'} className={s.signUp}>
            Sign Up
          </Typography>
        </form>
      </Card>
    </div>
  )
}
