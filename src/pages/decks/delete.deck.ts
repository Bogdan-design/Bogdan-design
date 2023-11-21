import { toast } from 'react-toastify'

import { useDeleteDeckMutation } from '../../services/decks'
import { ServerError } from '../../services/decks/type'

export const useDeleteDeck = () => {
  const [deleteDeck, { error }] = useDeleteDeckMutation()

  const deleteDeckHandler = async (id: string) => {
    await deleteDeck({ id })
    if (error && 'data' in error) {
      const serverError = error.data as ServerError

      if (serverError.statusCode === 403) {
        alert(serverError.message)
        toast.error(serverError.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    } else {
      alert('Deck is deleted')
      toast.success('Deck is successfully deleted!')
    }
  }

  return deleteDeckHandler
}
