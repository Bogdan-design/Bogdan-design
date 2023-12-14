import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from '../../pages/cards/cards.module.scss'

import { Button, ControlledTextField, Modal } from '@/component'
import { useGetCardQuery, useUpdateCardMutation } from '@/services/cards/cards'
import { ServerError } from '@/services/decks/type'

export type NewDeckType = z.infer<typeof newDeckSchema>

const newDeckSchema = z.object({
  question: z.string().min(3).max(30),
  answer: z.string().min(3).max(30),
})

export const EditCard = ({
  cardId,
  openModal,
  setOpenModal,
}: {
  cardId: string
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}) => {
  const [editCard] = useUpdateCardMutation()
  const { data: card } = useGetCardQuery(cardId || '')

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      question: card ? card.question : '',
      answer: card ? card.question : '',
    },
  })

  function onHandelEdit(data: NewDeckType) {
    editCard({ cardId, ...data })
      .unwrap()
      .then(() => {
        setOpenModal(false)
        toast.success('You card is created!')
        alert('You card is created!')
      })
      .catch(error => {
        const serverError = error.data as ServerError

        toast.error(serverError.message)

        alert(serverError.message)
      })
  }

  return (
    <Modal size={'medium'} title={'Edit Card'} openModal={openModal} setOpenModal={setOpenModal}>
      <form className={s.modalForm} onSubmit={handleSubmit(onHandelEdit)}>
        <ControlledTextField label={'Question'} name={'question'} control={control} />
        <ControlledTextField label={'Answer'} name={'answer'} control={control} />
        <div className={s.modalButtonSection}>
          <Button variant={'secondary'} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  )
}
