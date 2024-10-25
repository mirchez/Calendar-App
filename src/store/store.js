import { configureStore } from "@reduxjs/toolkit";
// import { uiSlice, authSlice, calendarSlice} from './index'
import {authSlice} from './auth/authSlice'
import {calendarSlice} from './calendar/calendarSlice'
import {uiSlice} from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})