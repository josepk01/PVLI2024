export default class SubEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y,Sprite) {
        super(scene, x, y, Sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setGravityY(300);

        this.setScale(2.25);
        this.health = 1; // Cambiar vida a 5
        this.facingDirection = 'left';

        this.setFlipX(true);
        this.isDead = false;

        this.adjustHitbox();

        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;

        this.specialAttackThresholds = { jump: false, bullets: false };
    }
    update(time, player) {

        // Movimiento y ataques regulares
        if(!this.isDead && !this.isPlayingHurtAnimation)
        {

            if (Math.abs(player.x - this.x) <= 10) {
                this.setVelocityX(0);
            } else if (player.x < this.x) {
                this.setVelocityX(-100);
                if (this.facingDirection !== 'left') {
                    this.setFlipX(true);
                    this.facingDirection = 'left';
                }
            } else if (player.x > this.x) {
                this.setVelocityX(100);
                if (this.facingDirection !== 'right') {
                    this.setFlipX(false);
                    this.facingDirection = 'right';
                }
            }
        }
    }
    adjustHitbox() {
        this.body.setSize(32, 32); // Ajustar dimensiones del hitbox
        this.body.setOffset(0, 0); // Cambiar desplazamiento
    }
}