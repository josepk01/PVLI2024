import Player from '../entities/player.js';
import Enemy from '../entities/enemy.js';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }

    preload() {
        this.load.image('background', 'assets/images/level1_background.png');
    }

    create() {
        this.add.image(400, 300, 'background');

        // Crear jugador y usar animación `player_run`
        this.player = new Player(this, 100, 500);
        this.player.play('player_run');

        // Crear enemigo de ejemplo
        this.enemy = new Enemy(this, 600, 500);
        this.enemy.play('boss_attack');

        this.scene.launch('HUD');
    }
}
