export class MainLevels extends Phaser.Scene {
    constructor() {
        super('mainlevels');
    }

    create() {
        // Llamamos a la función para establecer los elementos iniciales y para que se ajuste al redimensionar
        this.setupUI();
        this.scale.on('resize', this.setupUI, this);
    }

    setupUI() {
        // Limpiar todos los elementos previos para evitar duplicados en redimensionado
        this.children.removeAll();

        // Obtener dimensiones actuales de la pantalla
        const { width, height } = this.sys.game.scale.gameSize;

        // Crear fondo para cada sección con posiciones y tamaños relativos
        const levelSelectionRect = this.add.rectangle(width * 0.25, height * 0.5, width * 0.5, height, 0x444444).setOrigin(0.5);
        const rankingRect = this.add.rectangle(width * 0.75, height * 0.25, width * 0.5, height * 0.5, 0x333333).setOrigin(0.5);
        const storeRect = this.add.rectangle(width * 0.75, height * 0.75, width * 0.5, height * 0.5, 0x555555).setOrigin(0.5);

        // Título del mapa de niveles
        this.add.text(width * 0.25, height * 0.1, 'Mapa de Niveles', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Crear iconos de nivel con posiciones relativas
        const levelIcon1 = this.add.circle(width * 0.2, height * 0.4, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon1.on('pointerdown', () => this.scene.start('level1'));

        const levelIcon2 = this.add.circle(width * 0.25, height * 0.5, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon2.on('pointerdown', () => this.scene.start('level2'));

        const levelIcon3 = this.add.circle(width * 0.3, height * 0.6, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon3.on('pointerdown', () => this.scene.start('level3'));

        // Título de la sección de ranking
        this.add.text(width * 0.75, height * 0.05, 'Ranking', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Lista de jugadores en la sección de ranking
        for (let i = 0; i < 5; i++) {
            this.add.text(width * 0.75, height * 0.1 + i * 30, `Jugador ${i + 1}: Puntuación`, { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5);
        }

        // Título de la tienda
        this.add.text(width * 0.75, height * 0.55, 'Tienda', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Botón de opciones, centrado en la sección de tienda
        const optionsButton = this.add.text(width * 0.75, height * 0.9, 'Opciones', { fontSize: '24px', fill: '#FFF' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('optionsmenu'));
    }
}
