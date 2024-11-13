import Player from '../entities/player.js'; 
import Boss from '../entities/Bosses/boss1.js';  

export class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }

    create() {
        // Obtener dimensiones actuales de la pantalla
        const { width, height } = this.sys.game.scale.gameSize;
        
        // Agregar la imagen de fondo y escalarla para que se ajuste a la pantalla
        const background = this.add.image(0, 0, 'fondo__temp_level1').setOrigin(0.5, 0.5);
        background.setDisplaySize(width, height);
        background.x = width / 2;
        background.y = height / 2;

        // Título del Nivel 1
        this.add.text(300, 100, 'Nivel 1', { fontSize: '32px', fill: '#FFF' });

        // Botón para volver a selección de nivel en la parte inferior derecha de la pantalla
        this.add.text(width - 150, height - 50, 'Volver a Selección de Nivel', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(1, 1)
            .on('pointerdown', () => this.scene.start('mainlevels'));

        // Añadir el jugador
        this.player = new Player(this, 400, 300);
        this.add.existing(this.player);

        // Añadir el Boss
        this.boss = new Boss(this, 800, 300);
        this.add.existing(this.boss);

        // Añadir colisiones entre el jugador y el boss
        this.physics.add.collider(this.player, this.boss);

        // Configurar la superposición entre las balas y el boss
        this.physics.add.overlap(this.player.bullets, this.boss, this.bossHit, null, this);
    }

    update(time) {
        // Actualizar al jugador
        this.player.update(time);
        
        // Actualizar al boss
        if (this.boss) {
            this.boss.update(time, this.player);
        }
    }

    bossHit(bullet, boss) {
        if (boss instanceof Boss) {
            bullet.destroy(); // Destruir la bala
            boss.takeDamage(); // El boss toma daño
        }
    }
}
