import Bullet from '../Balas/Bullet.js';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_B_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 3;
        this.facingDirection = 'left';
        this.play('boss_B_idle_animation');
        this.setFlipX(true);

        this.isDead = false;
        this.isPlayingHurtAnimation = false;
        this.attackCooldown = 2000; 
        this.lastAttackTime = 0;

        // Crear grupo para balas del boss
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;
    }

    update(time, player) {
        if (!player || this.isDead || this.isPlayingHurtAnimation) {
            return;
        }

        if (Math.abs(player.x - this.x) <= 10) {
            this.setVelocityX(0);
            this.play('boss_B_idle_animation', true);
        } else if (player.x < this.x) {
            this.setVelocityX(-100);
            this.play('boss_B_run_animation', true);
            if (this.facingDirection !== 'left') {
                this.setFlipX(true);
                this.facingDirection = 'left';
            }
        } else if (player.x > this.x) {
            this.setVelocityX(100);
            this.play('boss_B_run_animation', true);
            if (this.facingDirection !== 'right') {
                this.setFlipX(false);
                this.facingDirection = 'right';
            }
        }

        if (time > this.lastAttackTime + this.attackCooldown) {
            this.chooseRandomAttack(player);
            this.lastAttackTime = time;
        }
    }

    chooseRandomAttack(player) {
        const randomAttack = Phaser.Math.Between(1, 2);
        if (randomAttack === 1) {
            this.attack1(player);
        } else {
            this.attack2(player);
        }
    }

    attack1(player) {
        this.play('boss_B_attack1_animation', true);
        for (let i = -2; i <= 2; i++) {
            let bulletX = player.x + i * 40;
            let bulletY = 0;

            let bullet = this.bullets.get();
            bullet.setTexture('Boss_Bullet');
            if (bullet) {
                bullet.resetBullet(bulletX, bulletY, 0, 300);
            }
        }
    }
    attack2(player) {
        // Reproducir la animación de ataque 2
        this.play('boss_B_attack2_animation', true);
    
        // Posicionar las balas en una línea vertical
        let bulletX = this.x;  // Posición X del Boss
        let bulletVelocityX = player.x > this.x ? 300 : -300;  // Las balas se mueven hacia la posición del jugador
    
        // La bala más baja comienza desde una distancia por debajo de los "pies" del Boss
        let baseBulletY = this.y + this.height / 2 + 40;  // Altura de los "pies" del Boss más una distancia de una bala hacia abajo
    
        // Crear una línea vertical de balas, empezando desde más abajo de los pies hacia arriba
        for (let i = 0; i < 5; i++) {
            let bulletY = baseBulletY - i * 40;  // Espaciado vertical de 40 unidades
    
            // Obtener una bala del grupo o crear una nueva si no hay disponible
            let bullet = this.bullets.get();
            if (bullet) {
                bullet.setTexture('Boss_Bullet');  // Configurar la textura de la bala
                bullet.resetBullet(bulletX, bulletY, bulletVelocityX, 0);  // La bala se mueve horizontalmente hacia el jugador
            }
        }
    }
    
    

    takeDamage() {
        if (this.isDead) return;

        this.health -= 1;

        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            this.play('boss_B_dead_animation', false);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.destroy();
            });
        } else {
            this.isPlayingHurtAnimation = true;
            this.setVelocityX(0);
            this.play('boss_B_hurt_animation');

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_B_hurt_animation') {
                    this.isPlayingHurtAnimation = false;
                }
            });
        }
    }
}
