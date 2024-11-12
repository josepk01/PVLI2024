import { Animations } from './scenes/animations.js';
import {TitleScreen} from './scenes/titlescreen.js';
import {MainLevels} from './scenes/mainlevels.js';
import { Level1 } from './scenes/level1.js';
import { Level2 } from './scenes/level2.js';
import { Level3 } from './scenes/level3.js';
import { OptionsMenu } from './scenes/optionsmenu.js';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: "game-container",
    scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Animations, TitleScreen, MainLevels, Level1, Level2, Level3]
};

const game = new Phaser.Game(config);