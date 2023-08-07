import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ControlledCheckbox } from 'src/component/ui/controlled/controlled.checkbox/controlled.checkbox.tsx'
import { z } from 'zod'

import { TextField } from '../../ui'
import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type LoginFormSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} label={'email'} errorMessage={errors.email?.message} />
      {/*{errors.email?.message}*/}
      <TextField
        {...register('password')}
        label={'password'}
        errorMessage={errors.password?.message}
      />
      {/*{errors.password?.message}*/}
      <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
