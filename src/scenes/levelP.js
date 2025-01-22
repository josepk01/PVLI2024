import Player from '../entities/player.js';
import HUD from './Hud.js';
import gameData from '../gameData.js';

export default class LevelP extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.timer = 0;
        this.hud = null;
        this.player = null;
        this.boss = null;
        this.timerText = null;
    }

    createLevel(backgroundKey, title, BossClass, bossX, bossY) {
        const { width, height } = this.sys.game.scale.gameSize;

        // Fondo
        const background = this.add.image(0, 0, backgroundKey).setOrigin(0.5, 0.5);
        background.setDisplaySize(width, height);
        background.x = width / 2;
        background.y = height / 2;

        // Título del nivel
        this.add.text(300, 100, title, { fontSize: '32px', fill: '#FFF' });

        // Botón para volver
        this.add.text(width - 150, height - 50, 'Volver a Selección de Nivel', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(1, 1)
            .on('pointerdown', () => this.scene.start('mainlevels'));

        // HUD
        this.hud = new HUD(this);

        // Jugador
        const groundY = height - 50;
        this.player = new Player(this, 400, groundY - 50);
        this.add.existing(this.player);

        // Boss
        this.boss = new BossClass(this, bossX, bossY);
        this.add.existing(this.boss);

        // Colisiones y superposiciones
        //this.physics.add.collider(this.player, this.boss);
        this.physics.add.overlap(this.player, this.boss, this.playerHitBoss, null, this);
        this.physics.add.overlap(this.player.bullets, this.boss, this.bossHit, null, this);
        this.physics.add.overlap(this.boss.bullets, this.player, this.playerHit, null, this);
        if(this.boss.sub_enemy)
        {
            this.physics.add.overlap(this.boss.sub_enemy, this.player.bullets, this.sub_enemyHit, null, this);
        }

        // Temporizador
        this.timerText = this.add.text(width / 2, 10, 'Tiempo: 0', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);

        // Evento de muerte del Boss
        this.boss.on('bossDead', () => {
            const score = Math.max(0, Math.floor(1000 / this.timer));
            this.saveScore(score);
        });
    }

    update(time, delta) {
        this.player.update(time, this.boss, this.hud);
        if (this.player && this.boss) {
            this.hud.update(this.player, this.boss);
        }
        if (this.boss) {
            this.boss.update(time, this.player);
        }

        // Actualizar temporizador
        this.timer += delta / 1000;
        this.timerText.setText('Tiempo: ' + Math.floor(this.timer));
    }

    bossHit(boss, bullet) {
        if (boss.active) {
            bullet.destroy();
            boss.takeDamage();
        }
    }
    sub_enemyHit(sub_enemy, bullet)
     {
        if (sub_enemy.active) {
            bullet.destroy();
            sub_enemy.destroy();
        }
     }

    playerHit(player, bullet) {
        if (player.active && bullet.active) {
            bullet.destroy();
            player.takeDamage();
            if (player.health <= 0) {
                this.saveScore(0);
            }
        }
    }
    
    playerHitBoss(player, boss) {
        if (player.active && boss.active) {
            player.takeDamage();
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

        const moneyEarned = Math.max(10, Math.floor(score / 10));
        gameData.playerMoney += moneyEarned;

        localStorage.setItem('playerMoney', gameData.playerMoney);
        console.log(`Puntuación del nivel: ${score}. Dinero ganado: ${moneyEarned}. Dinero total: ${gameData.playerMoney}`);

        this.scene.start('mainlevels');
    }
}
