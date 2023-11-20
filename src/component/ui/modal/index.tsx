import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import Close from '../../../assets/icon/close'
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
    titleBox: s.titleBox,
    closeButton: s.closeButton,
  }

  return (
    <section className={classNames.module} onClick={() => setOpenModal(false)}>
      <Card className={classNames.content} onClick={event => event.stopPropagation()}>
        <div className={classNames.titleBox}>
          {title && <Typography variant={'h2'}>{title}</Typography>}
          <button className={classNames.closeButton} onClick={() => setOpenModal(false)}>
            <Close />
          </button>
        </div>
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
