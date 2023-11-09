import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../../checkbox'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...checkboxProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  })

  return <Checkbox {...{ onChange, checked: value, id: name, ...checkboxProps }} />
}
