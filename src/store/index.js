import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui-slice'
import listSlice from './list-slice'

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        list: listSlice.reducer
    }
})

export default store