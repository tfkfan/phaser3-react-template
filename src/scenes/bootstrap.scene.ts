export default class BootstrapScene extends Phaser.Scene {
    // private progressBar: Phaser.GameObjects.DOMElement;
    private width: number;
    private height: number;
    private preloadComplete = false


    constructor() {
        super('bootstrap')
    }

    preload() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.load.image('phaser-logo', 'assets/phaser-logo.png')

        this.preloadComplete = true
    }

    launchGame() {
        if (!this.preloadComplete) return
        // this.network.webRTC?.checkPreviousPermission()
        this.scene.launch('game', {})
    }

}
