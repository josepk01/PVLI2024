export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocityX, velocityY) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Asegurarse de que la bala no tenga gravedad
        this.body.allowGravity = false;

        // Aplicar la velocidad inicial a la bala
        this.setVelocity(velocityX, velocityY);

        // Establecer la duración de la bala (destruir después de salir de la pantalla)
        this.setCollideWorldBounds(true);
        this.on('worldbounds', () => {
            this.setActive(false);
            this.setVisible(false);
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
