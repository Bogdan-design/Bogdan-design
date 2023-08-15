import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './sign.up.module.scss'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine(date => date.password === date.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormSchema = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormSchema) => {
    console.log(data)
  }
  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Sing Up
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
          <ControlledTextField
            placeholder={'Password'}
            type={'password'}
            label={'password'}
            name={'password'}
            control={control}
          />
          <ControlledTextField
            placeholder={'Password'}
            type={'password'}
            label={'Confirm Password'}
            name={'confirmPassword'}
            control={control}
          />

          <Button fullWidth type="submit" className={s.button}>
            Sign Up
          </Button>
          <Typography variant={'body2'} className={s.accountTitle}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Already have an account?
          </Typography>
          <Typography variant={'link1'} as={'a'} className={s.signIn}>
            Sign In
          </Typography>
        </form>
      </Card>
    </div>
  )
}
