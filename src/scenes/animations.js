// src/scenes/animations.js
export class Animations extends Phaser.Scene {
    constructor() {
        super('animations');
    }

        preload() {
        // Cargar imágenes
        this.load.image('icono', 'assets/images/icons/icono.png');
console.log('entro');
        // Cargar spritesheets con animaciones de 2 frames
        // this.load.spritesheet('abyss_necklace', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyss necklace/SpriteSheet/SpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('abyssal_glass', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal glass/SpriteSheet/SpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('abyssal_lamp', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal lamp/SpriteSheet/SpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('abyssal_mask', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal Mask/SpriteSheet/SpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.spritesheet('abyssal_orb', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal orb/SpriteSheet/SpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        
        // Cargar sonidos
        // this.load.audio('background_music', 'assets/sounds/background_music.mp3');

        // Animaciones para los spritesheets de 2 frames
        // this.anims.create({
        //     key: 'necklace_idle',
        //     frames: this.anims.generateFrameNumbers('abyss_necklace', { start: 0, end: 1 }),
        //     frameRate: 2,
        //     repeat: -1
        // });

    //     this.anims.create({
    //         key: 'glass_idle',
    //         frames: this.anims.generateFrameNumbers('abyssal_glass', { start: 0, end: 1 }),
    //         frameRate: 2,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: 'lamp_idle',
    //         frames: this.anims.generateFrameNumbers('abyssal_lamp', { start: 0, end: 1 }),
    //         frameRate: 2,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: 'mask_idle',
    //         frames: this.anims.generateFrameNumbers('abyssal_mask', { start: 0, end: 1 }),
    //         frameRate: 2,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: 'orb_idle',
    //         frames: this.anims.generateFrameNumbers('abyssal_orb', { start: 0, end: 1 }),
    //         frameRate: 2,
    //         repeat: -1
    //     });
    }

    create() {
        // Define animations here if needed
        this.scene.start('titlescreen');
    }
}