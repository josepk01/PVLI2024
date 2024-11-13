// src/scenes/animations.js
export class Animations extends Phaser.Scene {
    constructor() {
        super('animations');
    }

        preload() {
        // Cargar imágenes
        this.load.image('icono', 'assets/images/icons/icono.png');
        //Fondos
        this.load.image('title_bg', './assets/images/Menu_Img.png');
        this.load.image('fondo__temp_level1', 'assets/images/craftpix-771800-free-war-pixel-art-2d-game-backgrounds/War4/War4.png');


        //Objetos       
        this.load.image('abyss_necklace', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyss necklace/Abyss necklace5.png', {
            frameWidth: 32,
            frameHeight: 32
        });        
        this.load.image('abyss_glass', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal glass/Abyssal glass20.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_lamp', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal lamp/Abyssal lamp15.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_mask1', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal Mask/Abyssal Mask1.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_mask2', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal Mask/Abyssal Mask17.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_mask3', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal Mask/Abyssal Mask20.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_orb1', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal orb/Abyssal orb2.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('abyss_mask3', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal orb/Abyssal orb20.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        //Balas
        this.load.image('Bullet', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal orb/Abyssal orb13.png');
        this.load.image('Boss_Bullet', 'assets/images/1200 Icons RPG + Recolors - Free version/Abyssal orb/Abyssal orb16.png');

        
        // Cargar spritesheets con animaciones Boss Berserk
        this.load.spritesheet('Boss_B_Idle', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Idle.png',  { frameWidth: 96, frameHeight: 96 });//5
        this.load.spritesheet('boss_B_Attack_animation1', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Attack_1.png',  { frameWidth: 96, frameHeight: 96 });//4
        this.load.spritesheet('boss_B_Attack_animation2', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Attack_2.png',  { frameWidth: 96, frameHeight: 96 });//5
        this.load.spritesheet('Boss_B_Hurt', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Hurt.png',  { frameWidth: 96, frameHeight: 96 });//2
        this.load.spritesheet('Boss_B_Jump', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Jump.png',  { frameWidth: 96, frameHeight: 96 });//5
        this.load.spritesheet('Boss_B_Run', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Run.png',  { frameWidth: 96, frameHeight: 96 });//6
        this.load.spritesheet('Boss_B_Run_Attack', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Run+Attack.png',  { frameWidth: 96, frameHeight: 96 });//5
        this.load.spritesheet('Boss_B_Dead', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Berserk/Dead.png',  { frameWidth: 96, frameHeight: 96 });//4

        // Cargar spritesheets con animaciones Boss Guerrero
        this.load.spritesheet('Boss_W_Idle', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Idle.png',  { frameWidth: 96, frameHeight: 96 });//5
        this.load.spritesheet('boss_W_Attack_animation1', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Attack_1.png',  { frameWidth: 96, frameHeight: 96 });//4
        this.load.spritesheet('boss_W_Attack_animation2', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Attack_3.png',  { frameWidth: 96, frameHeight: 96 });//3
        this.load.spritesheet('Boss_W_Hurt', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Hurt.png',  { frameWidth: 96, frameHeight: 96 });//2
        this.load.spritesheet('Boss_W_Jump', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Jump.png',  { frameWidth: 96, frameHeight: 96 });//8
        this.load.spritesheet('Boss_W_Run', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Run.png',  { frameWidth: 96, frameHeight: 96 });//6
        this.load.spritesheet('Boss_W_Run_Attack', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Run+Attack.png',  { frameWidth: 96, frameHeight: 96 });//4
        this.load.spritesheet('Boss_W_Dead', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/Dead.png',  { frameWidth: 96, frameHeight: 96 });//4






        // Cargar sonidos
        // this.load.audio('background_music', 'assets/sounds/background_music.mp3');

    }

    create() {

        // Definir la animación del Boss Berserk
        this.anims.create({
            key: 'boss_B_idle_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Idle', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_attack1_animation',
            frames: this.anims.generateFrameNumbers('boss_B_Attack_animation1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_attack2_animation',
            frames: this.anims.generateFrameNumbers('boss_B_Attack_animation2', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_hurt_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Hurt', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_jump_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Jump', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_run_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Run', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_run_attack_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Run_Attack', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_B_dead_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Dead', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        // Definir las animaciones del Boss Guerrero
        this.anims.create({
            key: 'boss_W_idle_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Idle', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_attack1_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Attack1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_attack2_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Attack2', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_hurt_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Hurt', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_jump_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Jump', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_run_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Run', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_run_attack_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Run_Attack', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_W_dead_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Dead', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });


        // Define animations here if needed
        this.scene.start('level1');
    }
}