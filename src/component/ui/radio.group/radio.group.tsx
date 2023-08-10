import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import Radio from '../../../assets/icon/radio'

import s from './radio.group.module.scss'

export type RadioGroupProps = {
  value?: string
  label?: string
  id?: string
  className?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
  required?: boolean
}

export const RadioRadix: FC<RadioGroupProps> = ({
  value,
  id,
  disabled,
  required,
  onValueChange,
  className,
  defaultValue,
}) => {
  const classNames = {
    container: clsx(s.container, className),
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    indicator: s.indicator,
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonWrapper}>
        <RadioGroup.Root
          defaultValue={defaultValue}
          aria-label="View density"
          className={classNames.root}
          disabled={disabled}
          onValueChange={onValueChange}
          required={required}
          id={id}
        >
          <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
            {value && (
              <RadioGroup.Indicator>
                <Radio />
              </RadioGroup.Indicator>
            )}
          </RadioGroup.Item>
        </RadioGroup.Root>
      </div>
      {value}
    </div>
  )
}
