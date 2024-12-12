export default class SubEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, Sprite, player) {
        super(scene, x, y, Sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.allowGravity = false; // No afecta la gravedad

        this.setScale(2.25);
        this.health = 1; // Vida inicial del sub-enemigo
        this.facingDirection = 'left';
        this.isDead = false;

        this.adjustHitbox();

        // Guardar referencia al jugador
        this.player = player;

        // Animación inicial de spawn
        this.play('Summon_Appear');
        this.isSpawning = true; // Indicador de animación de spawn en curso

        // Finalizar animación de spawn
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isSpawning = false; // Animación de spawn completada
            this.play('Summon_Idle', true); // Cambiar a animación de movimiento
        });
    }

    update(time) {
        if (!this.isDead && this.player && !this.isSpawning) {
            const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

            if (distanceToPlayer > 30) {
                // Moverse hacia el jugador en ambas direcciones (4 direcciones)
                const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);
                this.setVelocity(Math.cos(angleToPlayer) * 100, Math.sin(angleToPlayer) * 100);
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
