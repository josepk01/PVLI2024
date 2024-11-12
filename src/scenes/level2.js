export class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    create() {
        this.add.text(300, 200, 'Nivel 2', { fontSize: '32px', fill: '#FFF' });

        this.add.text(300, 500, 'Volver a Selección de Nivel', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('mainlevels'));
    }
}