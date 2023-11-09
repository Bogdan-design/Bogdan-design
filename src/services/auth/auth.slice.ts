import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: { email: '' },
  reducers: {
    setRecoveryEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})
