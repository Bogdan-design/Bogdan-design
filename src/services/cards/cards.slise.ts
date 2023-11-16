import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState: { name: '' },
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})
