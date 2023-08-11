import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import { Typography } from '../../ui/typography'

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
    root: s.root,
    buttonWrapper: clsx(s.buttonWrapper),
    indicator: clsx(disabled ? s.indicatorDisabled : s.indicator),
    item: s.item,
    value: clsx(s.value, disabled && s.disabled),
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
          <RadioGroup.Item
            className={classNames.item}
            value={defaultValue ? defaultValue : ''}
            id={id}
          >
            {value && <RadioGroup.Indicator className={classNames.indicator} />}
          </RadioGroup.Item>
        </RadioGroup.Root>
        <Typography className={classNames.value} variant={'body2'}>
          {value}
        </Typography>
      </div>
    </div>
  )
}
