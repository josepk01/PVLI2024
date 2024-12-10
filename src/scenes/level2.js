import Player from '../entities/player.js';
import Boss2 from '../entities/Bosses/boss2.js';
import gameData from '../gameData.js';
import HUD from './Hud.js';
export class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }

    create() {
        this.timer = 0; // Inicializar el temporizador en cero
    
        // Obtener dimensiones actuales de la pantalla
        const { width, height } = this.sys.game.scale.gameSize;
    
        // Agregar la imagen de fondo y escalarla para que se ajuste a la pantalla
        const background = this.add.image(0, 0, 'fondo__temp_level1').setOrigin(0.5, 0.5);
        background.setDisplaySize(width, height);
        background.x = width / 2;
        background.y = height / 2;
    
        // Título del Nivel 1
        this.add.text(300, 100, 'Nivel 2', { fontSize: '32px', fill: '#FFF' });
    
        // Botón para volver a selección de nivel en la parte inferior derecha de la pantalla
        this.add.text(width - 150, height - 50, 'Volver a Selección de Nivel', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(1, 1)
            .on('pointerdown', () => this.scene.start('mainlevels'));
    
        // Crear HUD
        this.hud = new HUD(this);
        // Suelo
        const groundY = height - 50; // Ajusta según la altura de tu suelo
    
        // Añadir el jugador justo encima del suelo
        this.player = new Player(this, 400, groundY - 50); // Ajusta el `y` para estar justo encima del suelo
        this.add.existing(this.player);
    
        // Añadir el Boss justo encima del suelo
        this.boss = new Boss2(this, 800, groundY - 50); // Ajusta el `y` para estar justo encima del suelo
        this.add.existing(this.boss);
    
        // Añadir colisiones entre el jugador y el boss
        this.physics.add.collider(this.player, this.boss);
    
        // Configurar la superposición entre las balas del jugador y el boss
        this.physics.add.overlap(this.player.bullets, this.boss, this.bossHit, null, this);
    
        // Crear el texto del temporizador en la parte superior central de la pantalla
        this.timerText = this.add.text(width / 2, 10, 'Tiempo: 0', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5, 0);

        // Escuchar el evento de muerte del Boss
        this.boss.on('bossDead', () => {
        const score = Math.max(0, Math.floor(1000 / this.timer));
        this.saveScore(score);
        });
    }

    update(time, delta) {
        // Actualizar al jugador
        this.player.update(time);
        // Verificar que player y boss existan antes de actualizar el HUD
        if (this.player && this.boss) {
            this.hud.update(this.player, this.boss);
        }    
        // Actualizar al boss
        if (this.boss) {
            this.boss.update(time, this.player);
        }

        // Actualizar el temporizador
        this.timer += delta / 1000; // delta está en milisegundos, por lo que convertimos a segundos
        this.timerText.setText('Tiempo: ' + Math.floor(this.timer)); // Mostrar solo los segundos enteros
    }

    bossHit(boss, bullet ) {
        if (boss instanceof Boss2) {
            bullet.destroy(); // Destruir la bala
            boss.takeDamage(); // El boss toma daño
        }
    }
    

    playerHit(player, bullet) {
        if (player instanceof Player) {
            bullet.destroy(); // Destruir la bala
            player.takeDamage(); // El jugador toma daño
            console.log(player.health);
            if (player.health <= 0) {
                // Si el jugador muere, la puntuación es 0
                this.saveScore(0);
            }
        }
    }

    saveScore(score) {
        // Utilizar el nombre de la escena actual para identificar el nivel
        const levelKey = this.scene.key;
    
        // Cargar puntuaciones previas del nivel actual
        let highScores = JSON.parse(localStorage.getItem(`highScores_${levelKey}`)) || [];
    
        // Añadir la nueva puntuación
        highScores.push(score);
    
        // Ordenar las puntuaciones de mayor a menor y quedarnos solo con las 5 mejores
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);
    
        // Guardar las puntuaciones actualizadas en localStorage
        localStorage.setItem(`highScores_${levelKey}`, JSON.stringify(highScores));
    
        // Calcular el dinero obtenido basado en la puntuación
        let moneyEarned = Math.max(10, Math.floor(score / 10));
        gameData.playerMoney += moneyEarned;
    
        // Guardar el nuevo monto de dinero en localStorage
        localStorage.setItem('playerMoney', gameData.playerMoney);
    
        // Registrar en la consola para confirmar el dinero añadido
        console.log(`Puntuación del nivel: ${score}. Dinero ganado: ${moneyEarned}. Dinero total: ${gameData.playerMoney}`);
    
        // Cambiar de escena
        this.scene.start('mainlevels');
    }
    
}
    