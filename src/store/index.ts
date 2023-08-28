import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user.store'
import applicationReducer from './application.store'

const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
