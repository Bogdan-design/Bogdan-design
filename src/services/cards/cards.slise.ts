import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  currentPage: 1,
  itemsPerPage: 10,
}

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
  },
})
