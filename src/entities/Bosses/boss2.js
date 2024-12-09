import Bullet from '../Balas/Bullet.js';

export default class Boss2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_W_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 5; // Cambiar vida a 5
        this.facingDirection = 'left';
        this.play('boss_W_idle_animation');
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
        if (!player || this.isDead || this.isPlayingHurtAnimation) {
            return;
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
            this.play('boss_W_idle_animation', true);
        } else if (player.x < this.x) {
            this.setVelocityX(-100);
            this.play('boss_W_run_animation', true);
            if (this.facingDirection !== 'left') {
                this.setFlipX(true);
                this.facingDirection = 'left';
            }
        } else if (player.x > this.x) {
            this.setVelocityX(100);
            this.play('boss_W_run_animation', true);
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
        this.play('boss_W_attack1_animation', true);
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
        this.play('boss_W_attack2_animation', true);

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
        this.play('boss_W_jump_animation', true);

        const targetX = player.x < this.x ? 50 : this.screenWidth - 50;
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.play('boss_W_idle_animation', true);
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

        this.play('boss_W_run_attack_animation', true);
    }

    takeDamage() {
        if (this.isDead) return;
    
        this.health -= 1;
    
        // Incrementar el contador de ataques recibidos
        if (!this.hits) this.hits = 0;
        this.hits += 1;
    
        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            this.play('boss_W_dead_animation', false);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.destroy();
            });
        } else {
            this.isPlayingHurtAnimation = true;
            this.setVelocityX(0);
            this.play('boss_W_hurt_animation');
    
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_W_hurt_animation') {
                    this.isPlayingHurtAnimation = false;
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
