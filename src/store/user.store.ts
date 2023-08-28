import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setCurrentPage} from "./application.store";
import {Page} from "../config/constants";
import game from "../phaser-game";
import BootstrapScene from "../scenes/bootstrap.scene";

interface User {
    userName: string;
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        userName: '',
    },
    reducers: {
        internalSetUser(state, action: PayloadAction<User>) {
            state.userName = action.payload.userName
            state.loggedIn = true
        },
    },
})

const {
    internalSetUser,
} = userSlice.actions;

export const login = (userName: string) => (dispatch) => dispatch(setLogged({userName}))

export const setLogged = (user: User) => (dispatch) => {
    dispatch(internalSetUser(user))
    dispatch(setCurrentPage(Page.GAME))

    const bootstrap = game.scene.keys.bootstrap as BootstrapScene
    bootstrap.launchGame()
}

export default userSlice.reducer
