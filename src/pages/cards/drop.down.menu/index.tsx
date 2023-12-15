import { ReactElement, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Clear from '@/assets/icon/clear'
import Edit from '@/assets/icon/edit'
import Options from '@/assets/icon/options'
import Play from '@/assets/icon/play'
import { Button, Menu, Modal, Typography } from '@/component'
import { useDeleteDeck } from '@/pages/decks/delete.deck'
import { useGetDeckByIdQuery } from '@/services/decks'
import { EditDeckModal } from './edit.deck'

import s from './drop.down.menu.module.scss'

export const DropDownMenu = ({ id }: { id: string }) => {
  const { data: deck } = useGetDeckByIdQuery(id || '')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalDeleteDeck, setOpenModalDeleteDeck] = useState<boolean>(false)
  const deleteDeckHandler = useDeleteDeck()
  const navigate = useNavigate()

  const learnDeck = () => {
    navigate(`/cards/${id}/learn`)
  }

  const editDeckName = () => {
    setOpenModal(true)
  }

  const openModalDelete = () => {
    setOpenModalDeleteDeck(true)
  }

  const deleteDeck = async () => {
    await deleteDeckHandler(id)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        alert('Something going wrong')
      })
  }

  const contentDropDownMenu: { title: string; icon: ReactElement; setFunction: () => void }[] = [
    {
      title: 'Learn',
      icon: <Play />,
      setFunction: learnDeck,
    },
    {
      title: 'Edit',
      icon: <Edit />,
      setFunction: editDeckName,
    },
    {
      title: 'Delete',
      icon: <Clear />,
      setFunction: openModalDelete,
    },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <Typography variant={'h1'}>{deck?.name}</Typography>
      <EditDeckModal id={id} setOpenModal={setOpenModal} openModal={openModal} />
      <Modal
        size={'medium'}
        title={'Delete Pack'}
        openModal={openModalDeleteDeck}
        setOpenModal={setOpenModalDeleteDeck}
      >
        <Typography variant={'body2'}>
          Do you really want to remove {deck?.name}? All cards will be deleted.
        </Typography>
        <div className={s.modalButtonSection}>
          <Button variant={'secondary'} onClick={() => setOpenModalDeleteDeck(false)}>
            Cancel
          </Button>
          <Button onClick={deleteDeck}>Delete Pack</Button>
        </div>
      </Modal>

      <Menu items={contentDropDownMenu}>
        <button className={s.delete}>
          <Options />
        </button>
      </Menu>
    </div>
  )
}
