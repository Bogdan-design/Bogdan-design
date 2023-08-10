import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledCheckbox, ControlledTextField } from '../../ui'

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*rhf dev tool*/}
      <DevTool control={control} />
      {/*rhf dev tool*/}
      <ControlledTextField placeholder={'Email'} label={'Email'} name={'email'} control={control} />
      {/*{errors.email?.message}*/}
      <ControlledTextField
        placeholder={'Password'}
        label={'password'}
        name={'password'}
        control={control}
      />
      {/*{errors.password?.message}*/}
      <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
