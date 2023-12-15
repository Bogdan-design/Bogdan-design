import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { RadioGroupProps, RadioRadix } from '@/component'

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<RadioGroupProps, 'onValueChange'>

export const ControlledRadioGroup = <T extends FieldValues>({ control, ...rest }: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    ...rest,
  })

  return <RadioRadix value={value} onValueChange={onChange} {...rest}></RadioRadix>
}
