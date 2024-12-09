import Bullet from './Balas/Bullet.js';
import gameData from '../gameData.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setGravityY(300);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.shootKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Añadir teclas WASD para el movimiento
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.maxHealth = gameData.playerStats.health;
        this.attackCooldown = 100; // Cooldown de 0.1 segundos (100 ms)
        this.lastAttackTime = 0;
        this.scene = scene;
        this.facingDirection = 'right';
        this.isJumping = false;

        // Vidas del jugador (usar las del gameData)
        this.health = this.maxHealth;

        // Daño del jugador
        this.damage = gameData.playerStats.damage;

        // Crear grupo para balas del jugador
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Aplicar habilidades desbloqueadas
        this.unlockAttacks = gameData.playerStats.unlockAttacks;
    }

    update(time) {
        this.body.setVelocityX(0);

        // Movimiento a la izquierda
        if (this.cursors.left.isDown || this.keys.left.isDown) {
            this.body.setVelocityX(-200);
            this.anims.play('player_move_left_temp', true);
            this.facingDirection = 'left';
            this.setFlipX(true);
            this.isJumping = false;
        }
        // Movimiento a la derecha
        else if (this.cursors.right.isDown || this.keys.right.isDown) {
            this.body.setVelocityX(200);
            this.anims.play('player_move_right_temp', true);
            this.facingDirection = 'right';
            this.setFlipX(false);
            this.isJumping = false;
        }
        // En reposo (sin movimiento)
        else {
            this.anims.play('player_idle_temp', true);
        }

        // Salto
        if ((this.cursors.up.isDown || this.keys.up.isDown) && this.body.onFloor()) {
            this.body.setVelocityY(-660);
            this.anims.play('player_jump_temp', true);
            this.isJumping = true;
        }

        // Ataque (disparo)
        if (Phaser.Input.Keyboard.JustDown(this.shootKey) && time > this.lastAttackTime + this.attackCooldown) {
            this.attack();
            this.lastAttackTime = time;
        }
    }

    attack() {
        this.anims.play('player_attack_temp', true);

        let bulletX = this.x;
        let bulletY = this.y;
        let bulletVelocityX = 0;
        let bulletVelocityY = 0;

        if (this.isJumping) {
            bulletY -= 20;
            bulletVelocityY = -600;
        } else {
            bulletX = this.facingDirection === 'right' ? this.x + 20 : this.x - 20;
            bulletVelocityX = this.facingDirection === 'right' ? 600 : -600;
        }

        let bullet = this.bullets.get();
        if (bullet) {
            bullet.setTexture('Bullet');
            bullet.resetBullet(bulletX, bulletY, bulletVelocityX, bulletVelocityY);
        }
    }

    takeDamage() {
        this.health -= 1;

        if (this.health <= 0) {
            this.scene.scene.start('mainlevels'); // Cambiar a la escena mainlevels si el jugador muere
        }
    }
}
