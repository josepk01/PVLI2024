export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setGravityY(300);

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update() {
        this.body.setVelocityX(0);

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);
        }

        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-330);
        }
    }
}
