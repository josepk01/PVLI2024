export class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }


    create() {
        console.log('titulos');

        // Obtener dimensiones de la pantalla
        const { width, height } = this.sys.game.scale.gameSize;

        // Agregar la imagen de fondo y escalarla para que se ajuste a la pantalla
        const background = this.add.image(0, 0, 'title_bg').setOrigin(0.5, 0.5);
        background.setDisplaySize(width, height); // Ajustar el tamaño de la imagen al tamaño de la pantalla

        // Centramos la imagen en pantalla
        background.x = width / 2;
        background.y = height / 2;

        // Botón "Iniciar Juego"
        const startButton = this.add.text(width / 2 - 50, height / 2 + 100, 'Iniciar Juego', { fontSize: '32px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('mainlevels'));

        // Botón "Opciones"
        const optionsButton = this.add.text(width / 2 - 50, height / 2 + 150, 'Opciones', { fontSize: '32px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('optionsmenu'));
    }
}
