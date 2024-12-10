import Bullet from '../Balas/Bullet.js';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_B_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 5; // Cambiar vida a 5
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
        this.adjustHitbox();
        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;

        this.specialAttackThresholds = { jump: false, bullets: false };
    }

    update(time, player) {
        if (!player || this.isDead || this.isPlayingHurtAnimation || this.isPlayingAttackAnimation) {
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_B_attack1_animation') {
                    this.isPlayingAttackAnimation = false; // Terminar el estado de ataque
                }
                else if (anim.key === 'boss_B_attack2_animation') {
                    this.isPlayingAttackAnimation = false; // Terminar el estado de ataque
                }
            });
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {

            });
            return; // No realizar acciones si el jefe está herido, atacando o muerto
        }
    
        // Realizar salto al 50% de vida
        if (this.health <= 2.5 && !this.specialAttackThresholds.jump) {
            this.specialAttackThresholds.jump = true;
            this.jumpToEdge(player);
            return;
        }
    
        // Realizar ataque especial con balas al 25% de vida
        if (this.health <= 1.25 && !this.specialAttackThresholds.bullets) {
            if (Math.random() <= 0.25) {
                this.specialAttackThresholds.bullets = true;
                this.specialBulletAttack(player);
            }
            return;
        }
    
        // Movimiento y ataques regulares
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
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
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
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
        this.play('boss_B_attack2_animation', true);
    
        let bulletX = this.x;
        let bulletVelocityX = player.x > this.x ? 300 : -300;
    
        let baseBulletY = this.y + this.height / 2 + 40;
    
        for (let i = 0; i < 5; i++) {
            let bulletY = baseBulletY - i * 40;
    
            let bullet = this.bullets.get();
            if (bullet) {
                bullet.setTexture('Boss_Bullet');
                bullet.resetBullet(bulletX, bulletY, bulletVelocityX, 0);
            }
        }
    }

    jumpToEdge(player) {
        this.setVelocityX(0);
        this.play('boss_B_jump_animation', true);

        const targetX = player.x < this.x ? 50 : this.screenWidth - 50;
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.play('boss_B_idle_animation', true);
            }
        });
    }

    specialBulletAttack(player) {
        for (let i = 0; i < 10; i++) {
            let randomX = Phaser.Math.Between(50, this.screenWidth - 50);
            let randomY = Phaser.Math.Between(50, this.screenHeight - 50);

            while (Math.abs(randomX - player.x) < 100 && Math.abs(randomY - player.y) < 100) {
                randomX = Phaser.Math.Between(50, this.screenWidth - 50);
                randomY = Phaser.Math.Between(50, this.screenHeight - 50);
            }

            const bullet = this.bullets.get();
            if (bullet) {
                const angle = Phaser.Math.Angle.Between(randomX, randomY, player.x, player.y);
                const velocityX = Math.cos(angle) * 300;
                const velocityY = Math.sin(angle) * 300;

                bullet.setTexture('Boss_Bullet');
                bullet.resetBullet(randomX, randomY, velocityX, velocityY);
            }
        }

        this.play('boss_B_run_attack_animation', true);
    }

    takeDamage() {
        if (this.isDead) return;
        this.isPlayingAttackAnimation = false;
        this.health -= 1;
        this.hits = (this.hits || 0) + 1; // Incrementar contador de hits al jefe
    
        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            this.play('boss_B_dead_animation', false);
    
            // Escuchar el evento de finalización de la animación de muerte
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_B_dead_animation') {
                    this.emit('bossDead'); // Emitir un evento personalizado
                    this.destroy();
                }
            });
        } else {
            this.isPlayingHurtAnimation = true;
            this.setVelocityX(0);
            this.setTint(0xff0000); // Filtro rojo durante animación de daño
            this.play('boss_B_hurt_animation');
    
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_B_hurt_animation') {
                    this.isPlayingHurtAnimation = false;
                    this.clearTint(); // Quitar filtro rojo
                }
            });
        }
    }
    
    
    adjustHitbox() {
        // Ajustar el tamaño del hitbox del jefe
        this.body.setSize(50, 70); // Cambiar dimensiones
        this.body.setOffset(20, 25); // Cambiar desplazamiento
    }
}
