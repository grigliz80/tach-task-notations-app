import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    header: { status: '', btn_dis: false}
  },
  reducers: {
    setHeader(st, act){
      st.header = {
        status: act.payload.status,
        btn_dis: act.payload.btn_dis,
      }
    }
  }
})

export const uiActions = uiSlice.actions

export default uiSlice
