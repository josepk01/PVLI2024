export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocityX, velocityY) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        if(texture ==='Boss_G_Proy')
            this.play('Boss_G_Proy', true)
        // Asegurarse de que la bala no tenga gravedad
        this.body.allowGravity = false;

        // Aplicar la velocidad inicial a la bala
        this.setVelocity(velocityX, velocityY);

        // Habilitar colisiones con los límites del mundo y destruir si se sale del mundo
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.scene.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
            }
        });
    }

    resetBullet(x, y, velocityX, velocityY) {
        // Restablecer la posición y velocidad de la bala para reutilizarla
        this.body.reset(x, y);
        this.body.allowGravity = false;  // Asegurar que la gravedad esté desactivada
        this.setVelocity(velocityX, velocityY);  // Asignar la nueva velocidad
        this.setActive(true);
        this.setVisible(true);
    }
}
