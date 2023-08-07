import { useController, UseControllerProps } from 'react-hook-form'

import { Checkbox } from '../../checkbox'
import { LoginFormSchema } from '../../component/auth'

type Props = UseControllerProps<LoginFormSchema> &
  Omit<CheckboxProps, 'checked' | 'onValueChange' | 'id'>

export const ControlledCheckbox = ({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...checkboxProps
}: Props) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return <Checkbox checked={value} onValueChange={onChange} {...checkboxProps} />
}
