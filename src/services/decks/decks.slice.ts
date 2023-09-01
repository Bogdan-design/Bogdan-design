import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: '',
}

export const decksSlice = createSlice({
  name: 'decksSlice',
  initialState,
  reducers: {
    setItemPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})
