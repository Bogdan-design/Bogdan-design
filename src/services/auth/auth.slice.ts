import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// const initialState = {
//   email: ''
// }

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: { email: '' },
  reducers: {
    setRecoveryEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})
