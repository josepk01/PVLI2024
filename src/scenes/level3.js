
import Player from '../entities/player.js';
import Boss3 from '../entities/Bosses/boss3.js';
import gameData from '../gameData.js';
import HUD from './Hud.js';
import SubEnemy from '../entities/SubEnemy/SubEnemy.js';

export class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }

    create() {
        this.timer = 0;
        const { width, height } = this.sys.game.scale.gameSize;

        const background = this.add.image(0, 0, 'fondo__temp_level1').setOrigin(0.5, 0.5);
        background.setDisplaySize(width, height);
        background.x = width / 2;
        background.y = height / 2;

        this.add.text(300, 100, 'Nivel 3', { fontSize: '32px', fill: '#FFF' });

        this.add.text(width - 150, height - 50, 'Volver a Selección de Nivel', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(1, 1)
            .on('pointerdown', () => this.scene.start('mainlevels'));

        this.hud = new HUD(this);
        const groundY = height - 50;

        this.player = new Player(this, 400, groundY - 50);
        this.add.existing(this.player);

        this.boss = new Boss3(this, width/2, 0);
        this.add.existing(this.boss);

        this.physics.add.collider(this.player, this.boss);
        this.physics.add.overlap(this.player.bullets, this.boss, this.bossHit, null, this);
        this.physics.add.overlap(this.boss.bullets, this.player, this.playerHit, null, this);
        this.physics.add.overlap(this.player.bullets, this.boss.sub_enemy, (bullet, subEnemy) => {
            bullet.destroy(); // Destruir la bala
            subEnemy.destroy(); // Destruir el sub-enemigo
        }, null, this);

        this.timerText = this.add.text(width / 2, 10, 'Tiempo: 0', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);

        this.boss.on('bossDead', () => {
            const score = Math.max(0, Math.floor(1000 / this.timer));
            this.saveScore(score);
        });
    }

    update(time, delta) {
        this.player.update(time);
        if (this.player && this.boss) {
            this.hud.update(this.player, this.boss);
        }
        if (this.boss) {
            this.boss.update(time, this.player);
        }

        this.timer += delta / 1000;
        this.timerText.setText('Tiempo: ' + Math.floor(this.timer));
    }

    bossHit(boss, bullet) {
        if (boss instanceof Boss3) {
            bullet.destroy();
            boss.takeDamage();
        }
    }

    playerHit(player, bullet) {
        if (player instanceof Player && bullet.active) {
            bullet.destroy();
            player.takeDamage();
            console.log(player.health);
            if (player.health <= 0) {
                this.saveScore(0);
            }
        }
    }

    saveScore(score) {
        const levelKey = this.scene.key;
        let highScores = JSON.parse(localStorage.getItem(`highScores_${levelKey}`)) || [];

        highScores.push(score);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);

        localStorage.setItem(`highScores_${levelKey}`, JSON.stringify(highScores));

        let moneyEarned = Math.max(10, Math.floor(score / 10));
        gameData.playerMoney += moneyEarned;

        localStorage.setItem('playerMoney', gameData.playerMoney);

        console.log(`Puntuación del nivel: ${score}. Dinero ganado: ${moneyEarned}. Dinero total: ${gameData.playerMoney}`);

        this.scene.start('mainlevels');
    }
}