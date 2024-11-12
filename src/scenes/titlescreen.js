export class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }

    preload() {
        this.load.image('title_bg', './assets/images/Menu_Img.png');
    }

    create() {
        console.log('titulos');
        this.add.image(400, 300, 'title_bg');
        const startButton = this.add.text(300, 400, 'Iniciar Juego', { fontSize: '32px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('mainlevels'));

        const optionsButton = this.add.text(300, 450, 'Opciones', { fontSize: '32px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('optionsmenu'));
    }
}