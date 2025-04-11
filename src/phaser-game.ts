import Phaser from 'phaser'
import BootstrapScene from "./scenes/bootstrap.scene";
import GameScene from "./scenes/game.scene";

const config:Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  parent: 'game-root',
  canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
  width: window.innerWidth ,
  height: window.innerHeight - 10,
  scene: [BootstrapScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x:0, y: 400 }
    }
  }
}


const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export default phaserGame
