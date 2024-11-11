export default class Animations extends Phaser.Scene {
    constructor() {
        super({ key: 'Animations', active: true });
    }

    preload() {
        // -- Sonido
            //this.load.audio('background_music', 'assets/sounds/background_music.mp3');
            //this.load.audio('hit_sound', 'assets/sounds/hit_sound.mp3');
        
        // -- Imágenes
            // this.load.image('player_idle', 'assets/images/player_idle.png');
            // this.load.spritesheet('player_run', 'assets/images/player_run.png', { frameWidth: 32, frameHeight: 32 });
            // this.load.spritesheet('boss_attack', 'assets/images/boss_attack.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // Crear animaciones centralizadas aquí

        // -- Animaciones del Jugador
        this.anims.create({
            key: 'player_idle',
            frames: [{ key: 'player_idle' }],
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'player_run',
            frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        // -- Animaciones de los Jefes
        this.anims.create({
            key: 'boss_attack',
            frames: this.anims.generateFrameNumbers('boss_attack', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1,
        });

        // Iniciar la escena de título
        this.scene.start('TitleScreen');
    }
}
