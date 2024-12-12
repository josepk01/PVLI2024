// src/scenes/animations.js
export class Animations extends Phaser.Scene {
    constructor() {
        super('animations');
    }

        preload() {
        // Cargar imágenes
        this.load.image('icono', 'assets/images/icons/icono.png');
        this.load.image('trofeo', 'assets/images/trofeos.png');
        //Fondos
        this.load.image('title_bg', './assets/images/Menu_Img.png');
        this.load.image('fondo__temp_level1', 'assets/images/craftpix-771800-free-war-pixel-art-2d-game-backgrounds/War4/War4.png');
        this.load.image('fondo__temp_level2', 'assets/images/craftpix-net-776320-free-pixel-art-fantasy-2d-battlegrounds/Battleground3/Battleground3.png');
        this.load.image('fondo__temp_level3', 'assets/images/craftpix-net-776320-free-pixel-art-fantasy-2d-battlegrounds/Battleground4/Battleground4.png');
        this.load.image('fondo__temp_level4', 'assets/images/Free Pixel Art Forest/Background.png');

        this.load.image('Hacha', 'assets/images/craftpix-net-100504-free-orc-sprite-sheets-pixel-art/Orc_Warrior/hacha.png');
        this.load.image('Menu_map', 'assets/images/Mapa_menu.png');
        
        this.load.image('Sub_enemy1', 'assets/images/craftpix-net-459799-free-low-level-monsters-pixel-icons-32x32/Icon1.png');
        this.load.image('Sub_enemy2', 'assets/images/craftpix-net-459799-free-low-level-monsters-pixel-icons-32x32/Icon2.png');
        this.load.image('Sub_enemy3', 'assets/images/craftpix-net-459799-free-low-level-monsters-pixel-icons-32x32/Icon3.png');
        this.load.image('Sub_enemy4', 'assets/images/craftpix-net-459799-free-low-level-monsters-pixel-icons-32x32/Icon4.png');

        // Cargar el spritesheet completo del cofre
        this.load.spritesheet('chests', 'assets/images/chest_sprite/chestsAll.png', {
            frameWidth: 112,
            frameHeight: 112
        });

        //Players
            //player1
            this.load.spritesheet('Player1A', 'assets/images/players/player1/ataque.png', {
                frameWidth: 42,
                frameHeight: 47
            }); //3
            this.load.spritesheet('Player1C', 'assets/images/players/player1/correr.png', {
                frameWidth: 42,
                frameHeight: 37
            }); //8
            this.load.spritesheet('player1D', 'assets/images/players/player1/danno.png', {
                frameWidth: 42,
                frameHeight: 59
            }); //3
            this.load.spritesheet('Player1I', 'assets/images/players/player1/idle.png', {
                frameWidth: 35,
                frameHeight: 58
            }); //4
            this.load.spritesheet('Player1S', 'assets/images/players/player1/salto.png', {
                frameWidth: 39,
                frameHeight: 58
            }); //4
            //player2
            this.load.spritesheet('Player2A', 'assets/images/players/player2/ataque.png', {
                frameWidth: 43,
                frameHeight: 47
            }); //3
            this.load.spritesheet('Player2C', 'assets/images/players/player2/correr.png', {
                frameWidth: 45,
                frameHeight: 46
            }); //8
            this.load.spritesheet('player2D', 'assets/images/players/player2/danno.png', {
                frameWidth: 42,
                frameHeight: 62
            }); //3
            this.load.spritesheet('Player2I', 'assets/images/players/player2/idle.png', {
                frameWidth: 38,
                frameHeight: 50
            }); //4
            this.load.spritesheet('Player2S', 'assets/images/players/player2/salto.png', {
                frameWidth: 39,
                frameHeight: 56
            }); //4


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

        // Cargar spritesheets con animaciones Boss Muerte
        this.load.spritesheet('Boss_M_Idle', 'assets/images/Undead executioner puppet/Idle.png',  { frameWidth: 100, frameHeight: 100 });//4
        this.load.spritesheet('boss_M_Attack_animation1', 'assets/images/Undead executioner puppet/Attack_1.png',  { frameWidth: 100, frameHeight: 100 });//5
        this.load.spritesheet('boss_M_Attack_animation2', 'assets/images/Undead executioner puppet/Attack_2.png',  { frameWidth: 100, frameHeight: 100 });//6
        this.load.spritesheet('Boss_M_Dead', 'assets/images/Undead executioner puppet/death.png',  { frameWidth: 100, frameHeight: 100 });//18
            //summons
            this.load.spritesheet('Boss_M_Summon_a', 'assets/images/Undead executioner puppet/summonAppear.png',  { frameWidth: 50, frameHeight: 50 });//6
            this.load.spritesheet('Boss_M_Summon_Idle', 'assets/images/Undead executioner puppet/summonIdle.png',  { frameWidth: 50, frameHeight: 50 });//4

        // Cargar spritesheets con animaciones Boss Golem
        this.load.spritesheet('Boss_G_Proy', 'assets/images/Mecha-stone Golem 0.1/arm_projectile_glowing.png',  { frameWidth: 100, frameHeight: 100 });//6
        this.load.spritesheet('Boss_G_Laser', 'assets/images/Mecha-stone Golem 0.1/Laser_sheet.png',  { frameWidth: 300, frameHeight: 100 });//14 columnas
        this.load.spritesheet('boss_G_Attack_animation2', 'assets/images/Mecha-stone Golem 0.1/Character_sheet.png',  { frameWidth: 100, frameHeight: 100 });//9 columnas





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
            repeat: 0
        });
        this.anims.create({
            key: 'boss_B_attack2_animation',
            frames: this.anims.generateFrameNumbers('boss_B_Attack_animation2', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_B_hurt_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Hurt', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_B_jump_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Jump', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_B_run_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Run', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_B_run_attack_animation',
            frames: this.anims.generateFrameNumbers('Boss_B_Run_Attack', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: 1
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
            frames: this.anims.generateFrameNumbers('boss_W_Attack_animation1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_W_attack2_animation',
            frames: this.anims.generateFrameNumbers('boss_W_Attack_animation2', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_W_hurt_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Hurt', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_W_jump_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Jump', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_W_run_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Run', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'boss_W_run_attack_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Run_Attack', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 1
        });
        this.anims.create({
            key: 'boss_W_dead_animation',
            frames: this.anims.generateFrameNumbers('Boss_W_Dead', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });
        //animaciones Boss muerte
        // Animaciones del Boss Muerte
        this.anims.create({
            key: 'Boss_M_Idle_animation',
            frames: this.anims.generateFrameNumbers('Boss_M_Idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1 // Loop infinito
        });

        this.anims.create({
            key: 'Boss_M_Attack1',
            frames: this.anims.generateFrameNumbers('boss_M_Attack_animation1', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: 0 // No se repite
        });

        this.anims.create({
            key: 'Boss_M_Attack2',
            frames: this.anims.generateFrameNumbers('boss_M_Attack_animation2', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: 0 // No se repite
        });

        this.anims.create({
            key: 'Boss_M_Dead_anim',
            frames: this.anims.generateFrameNames('Boss_M_Dead', {start: 0, end: 10 }),
            frameRate: 12,
            repeat: 0
        });
        

        // Animaciones de los Summons
        this.anims.create({
            key: 'Summon_Appear',
            frames: this.anims.generateFrameNumbers('Boss_M_Summon_a', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: 0 // No se repite
        });

        this.anims.create({
            key: 'Summon_Idle',
            frames: this.anims.generateFrameNumbers('Boss_M_Summon_Idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1 // Loop infinito
        });
        // Animaciones del Boss Golem

        // Proyectil
        this.anims.create({
            key: 'boss_G_proyectile_animation',
            frames: this.anims.generateFrameNumbers('Boss_G_Proy', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        // Laser (Cada fila es un frame distinto, 14 filas totales)
        this.anims.create({
            key: 'boss_G_laser_animation',
            frames: this.anims.generateFrameNumbers('Boss_G_Laser', { start: 0, end: 13 }), // Asume 14 filas
            frameRate: 10, // Velocidad de la animación
            repeat: -1, // Repetir mientras el láser esté activo
        });
        

        // Character Sheet Animaciones (9 filas, cada una con su propia animación)
        this.anims.create({
            key: 'boss_G_idle_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'boss_G_damage_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 10, end: 17 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'boss_G_attack_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 20, end: 28 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'boss_G_immortal_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 30, end: 37 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'boss_G_special_attack_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 70, end: 79 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'boss_G_death_animation',
            frames: this.anims.generateFrameNumbers('boss_G_Attack_animation2', { start: 80, end: 83 }),
            frameRate: 5,
            repeat: 0
        });

        
        //animaciones player
            // Animaciones para Player1
            this.anims.create({
                key: 'Player1A_attackd',
                frames: this.anims.generateFrameNumbers('Player1A', { start: 0, end: 0 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player1A_attackw',
                frames: this.anims.generateFrameNumbers('Player1A', { start: 1, end: 1 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player1A_attack_s',
                frames: this.anims.generateFrameNumbers('Player1A', { start: 2, end: 2 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player1C_run',
                frames: this.anims.generateFrameNumbers('Player1C', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'Player1D_damage',
                frames: [{ key: 'player1D', frame: 0 }],
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player1I_idle',
                frames: this.anims.generateFrameNumbers('Player1I', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'Player1S_jump',
                frames: this.anims.generateFrameNumbers('Player1S', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: 0
            });

            // Animaciones para Player2
            this.anims.create({
                key: 'Player2A_attackd',
                frames: this.anims.generateFrameNumbers('Player2A', { start: 0, end: 0 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player2A_attackw',
                frames: this.anims.generateFrameNumbers('Player2A', { start: 1, end: 1 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player2A_attacks',
                frames: this.anims.generateFrameNumbers('Player2A', { start: 2, end: 2 }),
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player2C_run',
                frames: this.anims.generateFrameNumbers('Player2C', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'Player2D_damage',
                frames: [{ key: 'player2D', frame: 0 }],
                frameRate: 5,
                repeat: 0
            });
            this.anims.create({
                key: 'Player2I_idle',
                frames: this.anims.generateFrameNumbers('Player2I', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'Player2S_jump',
                frames: this.anims.generateFrameNumbers('Player2S', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: 0
            });


        // Define animations here if needed
        this.scene.start('titlescreen');
        //this.scene.start('mainlevels');
    }
}