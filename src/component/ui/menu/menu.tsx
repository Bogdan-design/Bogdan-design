import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactElement } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { Typography } from '@/component'

import s from './menu.module.scss'

export const Menu = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> & {
    items: { title: string; icon: ReactElement; setFunction: () => void }[]
  }
>(({ children, items, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        asChild
        ref={forwardedRef}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content {...props} className={s.content}>
          <DropdownMenuPrimitive.Arrow className={s.arrow} />
          {items.map((item, i) => {
            return (
              <div key={i} className={s.options}>
                <DropdownMenuPrimitive.Item className={s.item} asChild>
                  <button onClick={item.setFunction}>
                    {item.icon}
                    <Typography variant={'caption'}>{item.title}</Typography>
                  </button>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Separator className={s.separator} />
              </div>
            )
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
})
