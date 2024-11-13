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

        this.isAttacking = false;
        this.attackCooldown = 100; // Cooldown de 0.1 segundos (100 ms)
        this.lastAttackTime = 0;
        this.scene = scene;
        this.facingDirection = 'right'; // Dirección predeterminada hacia la derecha
        this.isJumping = false; // Saber si el jugador está saltando

        // Crear grupo para balas del jugador
        this.bullets = scene.physics.add.group({
            allowGravity: false, // Las balas no se ven afectadas por la gravedad
        });
    }

    update(time) {
        this.body.setVelocityX(0);

        // Movimiento a la izquierda
        if (this.cursors.left.isDown || this.keys.left.isDown) {
            this.body.setVelocityX(-160);
            this.anims.play('player_move_left_temp', true);
            this.facingDirection = 'left';
            this.setFlipX(true); // Girar sprite del jugador a la izquierda
            this.isJumping = false;
        }
        // Movimiento a la derecha
        else if (this.cursors.right.isDown || this.keys.right.isDown) {
            this.body.setVelocityX(160);
            this.anims.play('player_move_right_temp', true);
            this.facingDirection = 'right';
            this.setFlipX(false); // Volver a girar a la derecha
            this.isJumping = false;
        }
        // En reposo (sin movimiento)
        else {
            this.anims.play('player_idle_temp', true);
        }

        // Salto
        if ((this.cursors.up.isDown || this.keys.up.isDown) && this.body.onFloor()) {
            this.body.setVelocityY(-660); // Mayor fuerza en el salto
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
        // Reproducir animación de ataque
        this.anims.play('player_attack_temp', true);

        // Crear sprite de bala
        let bulletX = this.x;
        let bulletY = this.y;
        let bulletVelocityX = 0;
        let bulletVelocityY = 0;

        // Determinar la dirección de la bala
        if (this.isJumping) {
            bulletY -= 20; // Ajustar la posición de la bala ligeramente sobre el jugador
            bulletVelocityY = -600; // La bala se dirige hacia arriba
        } else {
            bulletX = this.facingDirection === 'right' ? this.x + 20 : this.x - 20;
            bulletVelocityX = this.facingDirection === 'right' ? 600 : -600; // Ajustar la velocidad de la bala
        }

        // Añadir la bala al grupo
        const bullet = this.bullets.create(bulletX, bulletY, 'Player_Bullet');
        bullet.body.allowGravity = false;

        // Establecer velocidad de la bala
        bullet.setVelocity(bulletVelocityX, bulletVelocityY);

        // Configurar la duración de la bala (destruir después de salir de la pantalla)
        bullet.setCollideWorldBounds(true);
        bullet.on('worldbounds', () => {
            bullet.destroy();
        });

        // Añadir colisión entre la bala y el boss
        this.scene.physics.add.overlap(bullet, this.scene.boss, this.scene.bossHit, null, this.scene);
    }
}