import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './new.password.module.scss'

const schema = z.object({
  password: z.string().min(3),
})

type FormType = z.infer<typeof schema>

export const NewPassword = () => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormType) => {
    console.log(data)
  }

  const handelSubmitForm = handleSubmit(onSubmit)

  return (
    <div className={s.main}>
      <Card className={s.card}>
        <Typography variant={'large'} className={s.title}>
          Create new password
        </Typography>
        <form onSubmit={handelSubmitForm} className={s.form}>
          <ControlledTextField
            type={'password'}
            label={'password'}
            placeholder={'password'}
            name={'password'}
            control={control}
          />
          <Typography variant={'body2'} className={s.text}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button fullWidth type={'submit'}>
            Create New Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
