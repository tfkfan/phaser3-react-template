import {checkExists} from "./utils";
import {
    ReactControls,
    ValueSetter,
    WidgetControl,
    WidgetEvent
} from "./react-controls";

interface GameDebugControls extends WidgetControl {
    setVersion: ValueSetter<string>
    setFps: ValueSetter<number>
}

interface GameDebugEvent extends WidgetEvent {
    fps?: number
    version?: string;
}

const GAME_DEBUG_CONTROL_KEY = "GAME_DEBUG_CONTROL_KEY"

class GameControls extends ReactControls {

    // Create your own register controls method
    public registerGameDebugControls(controls: GameDebugControls) {
        this.register(GAME_DEBUG_CONTROL_KEY, controls, this.onGameDebugEvent)
    }

    private onGameDebugEvent(event:GameDebugEvent, control:GameDebugControls){
        if (checkExists(event.fps))
            control.setFps(event.fps)
        if (checkExists(event.version)) {
            control.setVersion(event.version)
        }
    }

    // Create your own valueSetter method
    public setFps(fps: number) {
        this.processEvent(GAME_DEBUG_CONTROL_KEY, {fps})
            .then(data => {
                this.onGameDebugEvent(data[1],data[0] as GameDebugControls)
            })
    }

    public setVersion(version: string) {
        this.processEvent(GAME_DEBUG_CONTROL_KEY, {version})
            .then(data => {
                this.onGameDebugEvent(data[1],data[0] as GameDebugControls)
            })
    }
}

export const CONTROLS: GameControls = new GameControls()
