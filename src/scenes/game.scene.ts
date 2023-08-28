import {network, MessageType} from "../net/network";
import {CONTROLS} from "../controls";
import PhaserLogo from "../actors/phaserLogo";
import Vector2 = Phaser.Math.Vector2;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
        // Use this update handler to update game state coming from websocket
        network.onUpdate((data) => {

        })
    }

    create() {
        CONTROLS.setVersion(`Phaser v${Phaser.VERSION}`)
        this.input.keyboard.on('keydown', (evt) => {
            if ('d' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'RIGHT', state: true});
            if ('s' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'DOWN', state: true});
            if ('a' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'LEFT', state: true});
            if ('w' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'UP', state: true});
        });
        this.input.keyboard.on('keyup', (evt) => {
            if ('d' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'RIGHT', state: false});
            if ('s' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'DOWN', state: false});
            if ('a' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'LEFT', state: false});
            if ('w' === evt.key)
                network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'UP', state: false});
        });

        this.input.on('pointermove', (evt) => {
            const evtPoint = new Vector2(evt.worldX, evt.worldY);
            network.send(MessageType.PLAYER_MOUSE_MOVE, {evtPoint})
        });
        this.input.on('pointerdown', (evt) => {
            network.send(MessageType.PLAYER_MOUSE_DOWN, {key: 'left', target: new Vector2(evt.worldX, evt.worldY)})
        });

        new PhaserLogo(this, this.cameras.main.width / 2, 0)

        // display the Phaser.VERSION
        this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#000000',
                fontSize: '24px'
            })
            .setOrigin(1, 0)
    }

    update() {
        CONTROLS.setFps(Math.trunc(this.sys.game.loop.actualFps));
    }
}
