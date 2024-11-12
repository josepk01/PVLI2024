export class MainLevels extends Phaser.Scene {
    constructor() {
        super('mainlevels');
    }

    create() {
        // Get game width and height for dynamic sizing
        const { width, height } = this.sys.game.config;

        // Background colors for each section with proportional sizing
        const levelSelectionRect = this.add.rectangle(width / 4, height / 2, width / 2, height, 0x444444).setOrigin(0.5, 0.5); // Level selection section (left)
        const rankingRect = this.add.rectangle((3 * width) / 4, height / 4, width / 2, height / 2, 0x333333).setOrigin(0.5, 0.5); // Ranking section (right, top)
        const storeRect = this.add.rectangle((3 * width) / 4, (3 * height) / 4, width / 2, height / 2, 0x555555).setOrigin(0.5, 0.5); // Store section (right, bottom)

        // Level selection title centered in the left section
        this.add.text(levelSelectionRect.x, levelSelectionRect.y - levelSelectionRect.height / 2 + 30, 'Mapa de Niveles', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5, 0);

        // Level selection icons (nodes) with corrected positions
        const levelIcon1 = this.add.circle(levelSelectionRect.x - 50, levelSelectionRect.y - 100, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon1.on('pointerdown', () => this.scene.start('level1'));

        const levelIcon2 = this.add.circle(levelSelectionRect.x, levelSelectionRect.y + 50, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon2.on('pointerdown', () => this.scene.start('level2'));

        const levelIcon3 = this.add.circle(levelSelectionRect.x + 100, levelSelectionRect.y - 50, 25, 0x6666ff).setInteractive({ useHandCursor: true });
        levelIcon3.on('pointerdown', () => this.scene.start('level3'));

        // Ranking section title centered in the ranking section
        this.add.text(rankingRect.x, rankingRect.y - rankingRect.height / 2 + 20, 'Ranking de Nivel Seleccionado', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);
        // Placeholder for rank list centered properly in ranking section
        for (let i = 0; i < 5; i++) {
            this.add.text(rankingRect.x, rankingRect.y - rankingRect.height / 2 + 70 + i * 30, `Jugador ${i + 1}: Puntuación`, { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5, 0);
        }

        // Store section title centered in the store section
        this.add.text(storeRect.x, storeRect.y - storeRect.height / 2 + 20, 'Tienda Placeholder', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);

        // Button to access options menu centered in the store section
        const optionsButton = this.add.text(storeRect.x, storeRect.y + storeRect.height / 2 - 40, 'Opciones', { fontSize: '24px', fill: '#FFF' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('optionsmenu'));
    }
}
