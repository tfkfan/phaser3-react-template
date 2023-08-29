export enum MessageType {
    UPDATE = 200,
    PLAYER_KEY_DOWN = 201,
    PLAYER_MOUSE_DOWN = 202,
    PLAYER_MOUSE_MOVE = 203
}
export type OnMessageHandler = (eventData: any) => void;


class Network {
    private socket: any;
    private events: Map<number, OnMessageHandler> = new Map<number, OnMessageHandler>()

    constructor() {
        if (!window.WebSocket) {
            // @ts-ignore
            window.WebSocket = window.MozWebSocket;
        }
        if (window.WebSocket) {
            this.socket = new WebSocket("ws://localhost:8085/websocket");
        } else {
            alert("Your browser does not support Web Socket.");
        }

        this.socket.addEventListener('open', (event) => {
            console.log("Connection established");
        });

        this.socket.addEventListener('error', (event) => {
            console.log(event.message);
        });

        this.socket.addEventListener('close', (event) => {
            console.log("Web Socket closed");
        });

        this.socket.addEventListener('message', (evt) => {
            const eventData = JSON.parse(evt.data);
            if(this.events.has(eventData.type))
                this.events.get(eventData.type).call(this,eventData.data);
        });
    }

    public on(type:number, handler:OnMessageHandler){
        this.events.set(type, handler);
    }

    public send(type: number, data: any = null) {
        if (this.socket.readyState !== WebSocket.OPEN) {
            console.log("Socket is not ready");
            return;
        }

        this.socket.send(this.createEvent(type, data));
    }

    private createEvent = (eventType: number, payload: any = null) => {
        const obj: any = {
            type: eventType,
            data: null
        };
        if (payload) {
            obj.data = payload
        }
        return JSON.stringify(obj);
    }
}

export const network = new Network();
