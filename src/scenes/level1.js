import Player from '../entities/player.js';
import Boss from '../entities/Bosses/boss.js';

export class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
        this.timer = 0; // Inicializar el temporizador en cero
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

        // Configurar la superposición entre las balas del jugador y el boss
        this.physics.add.overlap(this.player.bullets, this.boss, this.bossHit, null, this);

        // Configurar la superposición entre las balas del boss y el jugador
        this.physics.add.overlap(this.boss.bullets, this.player, this.playerHit, null, this);

        // Crear el texto del temporizador en la parte superior central de la pantalla
        this.timerText = this.add.text(width / 2, 10, 'Tiempo: 0', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);
    }

    update(time, delta) {
        // Actualizar al jugador
        this.player.update(time);

        // Actualizar al boss
        if (this.boss) {
            this.boss.update(time, this.player);
        }

        // Actualizar el temporizador
        this.timer += delta / 1000; // delta está en milisegundos, por lo que convertimos a segundos
        this.timerText.setText('Tiempo: ' + Math.floor(this.timer)); // Mostrar solo los segundos enteros
    }

    bossHit(bullet, boss) {
        if (boss instanceof Boss) {
            bullet.destroy(); // Destruir la bala
            boss.takeDamage(); // El boss toma daño
    
            if (boss.health <= 0) {
                // Calcular la puntuación al vencer al boss
                const score = Math.max(0, Math.floor(1000 / this.timer));
                this.saveScore(score);
            }
        }
    }
    

    playerHit(player, bullet) {
        if (player instanceof Player) {
            bullet.destroy(); // Destruir la bala
            player.takeDamage(); // El jugador toma daño

            if (player.health <= 0) {
                // Si el jugador muere, la puntuación es 0
                this.saveScore(0);
            }
        }
    }

    saveScore(score) {
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        
        // Añadir la nueva puntuación
        highScores.push(score);

        // Ordenar las puntuaciones de mayor a menor y quedarnos solo con las 5 mejores
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);

        // Guardar las puntuaciones actualizadas en localStorage
        localStorage.setItem('highScores', JSON.stringify(highScores));
        // Cambiar de escena
        this.scene.start('mainlevels');
    }
}
    