export class OptionsMenu extends Phaser.Scene {
    constructor() {
        super('optionsmenu');
    }

    create() {
        this.add.text(300, 100, 'Opciones', { fontSize: '32px', fill: '#FFF' });

        // Volume control placeholder
        this.add.text(300, 200, 'Control de Volumen (placeholder)', { fontSize: '24px', fill: '#FFF' });

        // Back to previous scene
        this.add.text(300, 500, 'Volver', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.scene.stop().resume(this.previousSceneKey));
    }

    init(data) {
        this.previousSceneKey = data.previousSceneKey || 'titlescreen';
    }
}