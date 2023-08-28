import './app.scss';
import React from 'react';
import {useAppSelector} from "./hooks";
import Routes from "./routes";
import game from "./phaser-game"
import BootstrapScene from "./scenes/bootstrap.scene";
window.addEventListener('load', () => {
    const bootstrap = game.scene.keys.bootstrap as BootstrapScene
    bootstrap.launchGame()
})

export const App = () => {
    const page = useAppSelector((state) => state.application.currentPage)
    return (
        <div className="inherit-size">
            {Routes.get(page)}
        </div>
    );
};
export default App;
