export default class Boss1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_B_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25); // Aumentar el tamaño del boss un 50% adicional
        this.health = 3;
        this.facingDirection = 'left'; // Start facing left towards the player
        this.play('boss_B_idle_animation');
        this.setFlipX(true); // Asegurarse de que el Boss empiece mirando a la izquierda (hacia el jugador)
    }

    update(time, player) {
        if (!player) {
            return;
        }

        // Lógica básica para que el boss siga al jugador
        if (player.x < this.x) {
            this.setVelocityX(-100);
            this.play('boss_B_run_animation', true);
            if (this.facingDirection !== 'left') {
                this.setFlipX(true);
                this.facingDirection = 'left';
            }
        } else if (player.x > this.x) {
            this.setVelocityX(100);
            this.play('boss_B_run_animation', true);
            if (this.facingDirection !== 'right') {
                this.setFlipX(false);
                this.facingDirection = 'right';
            }
        } else {
            this.setVelocityX(0);
            this.play('boss_B_idle_animation', true);
        }
    }

    takeDamage() {
        this.health -= 1;

        if (this.health <= 0) {
            this.play('boss_B_dead_animation');
            this.on('animationcomplete', () => {
                this.destroy();
            });
        } else {
            this.play('boss_B_hurt_animation');
        }
    }
}
