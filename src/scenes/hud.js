export default class HUD extends Phaser.Scene {
    constructor() {
        super({ key: 'HUD' });
    }

    create() {
        this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', color: '#fff' });
        this.healthText = this.add.text(16, 50, 'Vida: 100', { fontSize: '32px', color: '#fff' });

        this.registry.events.on('changedata', this.updateData, this);
    }

    updateData(parent, key, data) {
        if (key === 'score') {
            this.scoreText.setText('Puntaje: ' + data);
        } else if (key === 'health') {
            this.healthText.setText('Vida: ' + data);
        }
    }
}
