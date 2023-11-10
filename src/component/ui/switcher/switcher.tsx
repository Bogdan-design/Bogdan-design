import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './switcher.module.scss'

export type SwitcherProps = {
  children: ReactNode
  variant?: 'active' | 'default'
  className?: string
} & ComponentPropsWithoutRef<'button'>

export const Switcher = (props: SwitcherProps) => {
  const { variant = 'default', className, ...rest } = props

  const Component = 'button'

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
