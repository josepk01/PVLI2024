import TitleScreen from './scenes/titlescreen.js';
import Level1 from './scenes/level1.js';
import HUD from './scenes/hud.js';
import Animations from './scenes/animations.js';

let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene: [Animations, TitleScreen, Level1, HUD],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

let game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
