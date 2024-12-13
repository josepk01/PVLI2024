import { Animations } from './scenes/animations.js';
import {TitleScreen} from './scenes/titlescreen.js';
import {MainLevels} from './scenes/mainlevels.js';
import { Level1 } from './scenes/level1.js';
import { Level2 } from './scenes/level2.js';
import { Level3 } from './scenes/level3.js';
import { OptionsMenu } from './scenes/optionsmenu.js';
import { Level4 } from './scenes/level4.js';
const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 800,
    pixelArt: true,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Animations, TitleScreen, MainLevels, Level1, Level2, Level3,Level4]
};

const game = new Phaser.Game(config);
