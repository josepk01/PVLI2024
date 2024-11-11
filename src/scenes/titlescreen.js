import TitleScreen from './scenes/titlescreen.js';
import Level1 from './scenes/level1.js';
import HUD from './scenes/hud.js';

let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene: [TitleScreen, Level1, HUD],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};

new Phaser.Game(config);
