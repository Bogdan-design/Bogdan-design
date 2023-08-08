import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import Check from '../../../assets/icon/check'
import { Typography } from '../../ui/typography'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  label?: string
  id?: string
  className?: string
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  position?: 'left'
}
export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onValueChange,
  className,
  id,
  label,
  disabled,
  required,
  position,
}) => {
  const classNames = {
    container: clsx(s.container, className),
    label: clsx(s.label, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    indicator: s.indicator,
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography variant={'body2'} className={classNames.label} as={'label'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              className={classNames.root}
              disabled={disabled}
              onCheckedChange={onValueChange}
              checked={checked}
              required={required}
              defaultChecked
              id={id}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <Check />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
    </div>
  )
}
