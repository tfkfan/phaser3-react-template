import {ReactControls, ValueSetter, WidgetControl} from "./react-controls";

interface GameDebugControls extends WidgetControl {
    setVersion: ValueSetter<string>
    setFps: ValueSetter<number>
}

const GAME_DEBUG_CONTROL_KEY = "GAME_DEBUG_CONTROL_KEY"

class GameControls extends ReactControls {

    // Create your own register controls method
    public registerGameDebugControls(controls: GameDebugControls) {
        this.register(GAME_DEBUG_CONTROL_KEY, controls)
    }

    // Create your own valueSetter method
    public setFps(fps: number) {
        (this.getControl(GAME_DEBUG_CONTROL_KEY) as GameDebugControls).setFps(fps)
    }

    public setVersion(version: string) {
        (this.getControl(GAME_DEBUG_CONTROL_KEY) as GameDebugControls).setVersion(version)
    }
}

export const CONTROLS: GameControls = new GameControls()
