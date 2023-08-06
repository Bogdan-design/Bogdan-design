import { useController, useForm } from 'react-hook-form'

import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/checkbox'
import { TextField } from '../../ui/text.field'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

const MIN_PASSWORD_LENGTH = 8

export const LoginForm = () => {
  const { register, handleSubmit, control } = useForm<FormValues>()

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  console.log(errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: emailRegex,
            message: 'Invalid email',
          },
        })}
        label={'email'}
      />
      <TextField
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `Password must be a last ${MIN_PASSWORD_LENGTH} characters`,
          },
        })}
        label={'password'}
      />
      <Checkbox
        checked={value}
        onValueChange={onChange}
        {...register('rememberMe')}
        label={'remember me'}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
