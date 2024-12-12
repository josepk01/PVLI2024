export default class SubEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, Sprite, player) {
        super(scene, x, y, Sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setGravityY(300);

        this.setScale(2.25);
        this.health = 1; // Vida inicial del sub-enemigo
        this.facingDirection = 'left';

        this.setFlipX(true);
        this.isDead = false;

        this.adjustHitbox();

        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;

        // Asignar referencia al jugador
        this.player = player;
    }

    update(time) {
        if (!this.isDead && this.player) {
            const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

            if (distanceToPlayer > 30) {
                // Moverse hacia el jugador en el eje X
                const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);
                this.setVelocityX(Math.cos(angleToPlayer) * 100); // Solo eje X para movimiento horizontal
            } else {
                // Detenerse y dañar al jugador si está cerca
                this.setVelocity(0, 0);
                if (!this.lastDamageTime || time > this.lastDamageTime + 1000) {
                    this.player.takeDamage(); // Método para reducir la vida del jugador
                    this.lastDamageTime = time;
                }
            }

            // Determinar la dirección del sprite
            this.setFlipX(this.body.velocity.x < 0);
        }
    }

    adjustHitbox() {
        this.body.setSize(32, 32); // Ajustar dimensiones del hitbox
        this.body.setOffset(0, 0); // Cambiar desplazamiento
    }
}
