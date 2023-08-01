import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export type TextProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'link1'
    | 'link2'
    | 'error'
  className?: string
}

export const Typography = <T extends ElementType = 'p'>({
  className,
  variant = 'body1',
  as,
  ...rest
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
  const Component = as || 'p'
  const classNames = clsx(s.text, s[variant], className)

  return <Component className={classNames} {...rest} />
}
