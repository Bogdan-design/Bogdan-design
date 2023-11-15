import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import { Card, Typography } from '../../../component'

import s from './modal.module.scss'

type ModalSize = 'small' | 'medium' | 'large'

type ModalProps = {
  className?: string
  size?: ModalSize
  title?: string
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
} & ComponentProps<'div'>

export const Modal: FC<ModalProps> = ({
  openModal,
  setOpenModal,
  children,
  title,
  className,
  size,
}) => {
  const classNames = {
    module: clsx(s.module, openModal && s.active),
    content: clsx(s.content, openModal && s.activeContent, className, size && getSize(size)),
    contentBox: s.contentBox,
  }

  return (
    <section className={classNames.module} onClick={() => setOpenModal(false)}>
      <Card className={classNames.content} onClick={event => event.stopPropagation()}>
        {title && <Typography variant={'h2'}>{title}</Typography>}
        {children}
      </Card>
    </section>
  )
}

const getSize = (size: ModalSize) => {
  if (size === 'large') return s.large
  if (size === 'medium') return s.medium
  if (size === 'small') return s.small
}
