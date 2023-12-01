import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button, ControlledCheckbox, ControlledTextField, Modal } from '../../../../component'
import { useGetDeckByIdQuery, useUpdateDeckMutation } from '../../../../services/decks'
import { ServerError } from '../../../../services/decks/type'

import s from './edit.deck.module.scss'

const editDeckNameForm = z.object({
  name: z.string().min(3).max(30),
  isPrivate: z.boolean(),
})

type TypeEditDeckNameForm = z.infer<typeof editDeckNameForm>

export const EditDeckModal = ({
  id,
  openModal,
  setOpenModal,
}: {
  id: string
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}) => {
  const [updateDeck] = useUpdateDeckMutation()
  const { data: deck } = useGetDeckByIdQuery(id || '')

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(editDeckNameForm),
    defaultValues: {
      name: deck ? deck.name : '',
      isPrivate: deck ? deck.isPrivate : true,
    },
  })
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
    <Modal size={'medium'} title={'Change name'} openModal={openModal} setOpenModal={setOpenModal}>
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
  )
}
