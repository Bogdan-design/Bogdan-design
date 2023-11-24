import { ReactElement, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import Clear from '../../../assets/icon/clear'
import Edit from '../../../assets/icon/edit'
import Options from '../../../assets/icon/options'
import Play from '../../../assets/icon/play'
import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  Menu,
  Modal,
  Typography,
} from '../../../component'
import { useDeleteDeck } from '../../../pages/decks/delete.deck'
import { useGetDeckByIdQuery, useUpdateDeckMutation } from '../../../services/decks'
import { ServerError } from '../../../services/decks/type'

import s from './drop.down.menu.module.scss'

const editDeckNameForm = z.object({
  name: z.string().min(3).max(30),
  isPrivate: z.boolean(),
})

type TypeEditDeckNameForm = z.infer<typeof editDeckNameForm>

export const DropDownMenu = ({ id }: { id: string }) => {
  const { data: deck } = useGetDeckByIdQuery(id || '')
  const [updateDeck] = useUpdateDeckMutation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalDeleteDeck, setOpenModalDeleteDeck] = useState<boolean>(false)
  const deleteDeckHandler = useDeleteDeck()
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(editDeckNameForm),
    defaultValues: {
      name: deck ? deck.name : '',
      isPrivate: deck ? deck.isPrivate : true,
    },
  })

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

  const handelEditDeck = (data: TypeEditDeckNameForm) => {
    updateDeck({ id, ...data })
      .unwrap()
      .then(() => {
        setOpenModal(false)
        alert('Name changed')
        toast.success('Name changed')
      })
      .catch(error => {
        const serverError = error.data as ServerError

        toast.error(serverError.message)
        alert(serverError.message)
      })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <Typography variant={'h1'}>{deck?.name}</Typography>
      <Modal
        size={'medium'}
        title={'Change name'}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <form className={s.modalForm} onSubmit={handleSubmit(handelEditDeck)}>
          <ControlledTextField label={'Name pack'} name={'name'} control={control} />
          <ControlledCheckbox label={'Private pack'} control={control} name={'isPrivate'} />
          <div className={s.modalButtonSection}>
            <Button variant={'secondary'} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save change</Button>
          </div>
        </form>
      </Modal>
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
