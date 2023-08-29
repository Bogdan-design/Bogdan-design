import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../../ui/typography'

import s from './select.module.scss'

type SelectProps = {
  label?: string
  options?: string[]
  className?: string
  defaultValue?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'select'>

export const Select: FC<SelectProps> = ({
  options,
  disabled,
  className,
  defaultValue,
  label,
  ...rest
}) => {
  const classNames = {
    root: clsx(s.root, className),
    select: s.select,
    label: clsx(disabled ? s.disabled : s.label),
    options: s.option,
  }

  return (
    <div className={classNames.root}>
      {label && (
        <Typography variant="body2" as="label" className={classNames.label}>
          {label}
        </Typography>
      )}
      <Typography
        as={'select'}
        disabled={disabled}
        className={classNames.select}
        defaultValue={defaultValue}
        {...rest}
      >
        {options?.map(option => (
          <Typography as={'option'} className={classNames.options} key={option}>
            {option}
          </Typography>
        ))}
      </Typography>
    </div>
  )
}
