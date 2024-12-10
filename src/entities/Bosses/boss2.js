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
        this.isPlayingAttackAnimation = false;
        this.attackCooldown = 2000; 
        this.lastAttackTime = 0;

        this.specialAttackThresholds = { jump: 0 };
        this.hatches = scene.physics.add.group();

        this.adjustHitbox();

        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;
    }

    update(time, player) {
        if (!player || this.isDead || this.isPlayingHurtAnimation || this.isPlayingAttackAnimation) {
            return; // No realizar acciones si el jefe está herido, atacando o muerto
        }

        // Realizar salto al 50% de vida
        if (this.health <= 2.5 && this.specialAttackThresholds.jump < 3) {
            this.specialAttackThresholds.jump++;
            this.jumpToEdge(player);
            return;
        }

        // Realizar ataque especial al 25% de vida
        if (this.health <= 1.25 && !this.specialAttackThresholds.special) {
            this.specialAttackThresholds.special = true;
            this.specialAttack(player);
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
        if (Math.abs(player.x - this.x) < 300) {
            this.attack1(player); // Distancia para lanzar hachas
        } else {
            this.attack2(player); // Ataque cuerpo a cuerpo
        }
    }

    attack1(player) {
        this.isPlayingAttackAnimation = true;
        this.play('boss_W_attack1_animation', true);

        const directions = [-200, 0, 200]; // Tres direcciones de las hachas
        directions.forEach((offset) => {
            const hatchet = this.hatches.get(this.x, this.y, 'Hacha');
            if (hatchet) {
                const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x + offset, player.y);
                const velocityX = Math.cos(angle) * 300;
                const velocityY = Math.sin(angle) * 300;

                hatchet.setVelocity(velocityX, velocityY);
                this.scene.tweens.add({
                    targets: hatchet,
                    angle: 360,
                    duration: 500,
                    repeat: -1,
                });
            }
        });

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }

    attack2(player) {
        this.isPlayingAttackAnimation = true;
        this.play('boss_W_attack2_animation', true);

        if (Math.abs(player.x - this.x) <= 50) {
            player.setVelocityX(this.x < player.x ? 200 : -200); // Empujar al jugador
            player.takeDamage(1); // Hacer daño al jugador
        }

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }

    jumpToEdge(player) {
        this.isPlayingAttackAnimation = true;
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
                this.isPlayingAttackAnimation = false;
            }
        });
    }

    specialAttack(player) {
        this.isPlayingAttackAnimation = true;
        this.play('boss_W_run_attack_animation', true);

        for (let i = 0; i < 3; i++) {
            const hatchet = this.hatches.get(this.x, this.y, 'Hacha');
            if (hatchet) {
                const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
                const velocityX = Math.cos(angle) * 300;
                const velocityY = Math.sin(angle) * 300;

                hatchet.setVelocity(velocityX, velocityY);
                this.scene.tweens.add({
                    targets: hatchet,
                    angle: 360,
                    duration: 500,
                    repeat: -1,
                    yoyo: true,
                    onYoyo: () => {
                        hatchet.destroy(); // Destruir el hacha cuando regrese al boss
                    },
                });
            }
        }

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }

    takeDamage() {
        if (this.isDead) return;

        this.health -= 1;

        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            this.play('boss_W_dead_animation', false);

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_W_dead_animation') {
                    this.emit('bossDead');
                    this.destroy();
                }
            });
        } else {
            this.isPlayingHurtAnimation = true;
            this.setVelocityX(0);
            this.setTint(0xff0000); // Filtro rojo durante animación de daño
            this.play('boss_W_hurt_animation');

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_W_hurt_animation') {
                    this.isPlayingHurtAnimation = false;
                    this.clearTint();
                }
            });
        }
    }

    adjustHitbox() {
        this.body.setSize(50, 70); // Ajustar dimensiones del hitbox
        this.body.setOffset(20, 25); // Cambiar desplazamiento
    }
}
