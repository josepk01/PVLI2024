import Bullet from '../Balas/Bullet.js';

export default class Boss4 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'boss_G_idle_animation');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 5; // Cambiar vida a 5
        this.facingDirection = 'left';
        this.play('boss_G_idle_animation');
        this.setFlipX(true);
        this.isPlayingDead = false;
        this.isDead = false;
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
        this.attackCooldown = 2000;
        this.SattackCooldown = 7000;
        this.lastAttackTime = 2000;
        this.truedead = false;
        this.adjustHitbox();
        this.isinmortal = false;
        this.first = true;
        // Crear grupo para balas del boss
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Guardar dimensiones del escenario
        this.screenWidth = scene.scale.width;

        this.specialAttackThresholds = { laser: false };
    }

    update(time, player) {
        if (!this.isDead && !this.isPlayingHurtAnimation) {
            // Movimiento en el eje X (parte superior de la pantalla)
            const targetX = Phaser.Math.Clamp(player.x, 0, this.screenWidth - this.width);
            const distanceX = Math.abs(targetX - this.x);

            // Si está dentro del margen de 50 píxeles, detener el movimiento
            if (distanceX <= 50) {
                this.setVelocityX(0);
            } else {
                this.setVelocityX(targetX > this.x ? 100 : -100);
            }

            // Determinar la dirección del sprite
            if (this.body.velocity.x < 0) {
                this.setFlipX(true);
                this.facingDirection = 'left';
            } else if (this.body.velocity.x > 0) {
                this.setFlipX(false);
                this.facingDirection = 'right';
            }
            // Ataques
            if (time > this.lastAttackTime + this.attackCooldown && !this.isPlayingHurtAnimation&& !this.nocomplete) {
                if(this.first)
                {
                    this.chooseRandomAttack(player);
                }
                else        
                this.first = true;
                this.lastAttackTime = time;
            }
        } else if (this.isPlayingHurtAnimation) {
            // Si está en animación de daño, quitar el tinte rojo después de 0.5 segundos
            if (!this.hurtTimer) {
                this.hurtTimer = time;
            }
            if (time > this.hurtTimer + 500) {
                this.clearTint();
                this.isPlayingHurtAnimation = false;
                this.hurtTimer = null;
            }
        } else {
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_G_death_animation') {
                    this.emit('bossDead'); // Emitir un evento para manejar la muerte del boss
                    this.destroy();
                }
            });
        }
    }

    chooseRandomAttack(player) {
        if (Phaser.Math.Between(0, 1) === 0) {
            this.attack1(player);
        } else {
            this.laserAttack(player);
        }
    }

    attack1(player) {
        this.isPlayingAttackAnimation = true;
        this.play('boss_G_attack_animation', true);
        const bullet = this.bullets.get(this.x , this.y, 'Boss_G_Proy'); // Obtener una bala del grupo
        if (bullet) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y); // Calcular ángulo hacia el jugador
            const velocityX = Math.cos(angle) * 300; // Velocidad horizontal
            const velocityY = Math.sin(angle) * 300; // Velocidad vertical

            bullet.resetBullet(this.x, this.y, velocityX, velocityY); // Restablecer la posición y velocidad de la hacha

        }
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }

    laserAttack(player) {
        this.isPlayingAttackAnimation = true;
        this.setVelocityX(0);
        this.play('boss_G_special_attack_animation', true);
    
        // Crear el láser
        const laser = this.scene.add.sprite(this.x, this.y, 'Boss_G_Laser'); // Iniciar en la posición del boss
        laser.setOrigin(0, 0); // Comenzar desde la parte superior
        laser.setScale(3, 1); // Escalar globalmente si es necesario
        laser.angle = 90; // Rotar 90 grados a la derecha
    
        // Aplicar la animación del láser
        laser.play('boss_G_laser_animation');
    
        // Habilitar física para el láser
        this.scene.physics.world.enable(laser);
        laser.body.allowGravity = false;
    
        // Ajustar el tamaño y posición inicial de la hitbox
        laser.body.setSize(0, 0); // Inicialmente sin hitbox
    
        // Configurar daño al jugador
        let hasDamaged = false; // Evitar múltiples daños en una colisión
        this.scene.physics.add.overlap(laser, player, () => {
            if (!hasDamaged) {
                player.takeDamage();
                hasDamaged = true; // Asegurar daño único
            }
        });
    
        // Cambiar la hitbox en función del frame actual
        laser.on('animationupdate', (animation, frame) => {
            if (frame.index >= 8) {
                // Ajustar la hitbox a partir del frame 8
                const laserLength = this.scene.scale.height; // Longitud completa del láser
                laser.body.setSize(15, laserLength); // Ajustar tamaño de la hitbox
                laser.body.setOffset(-20, 0); // Ajustar posición
            } else {
                // Eliminar la hitbox antes del frame 8
                laser.body.setSize(0, 0);
            }
        });
    
        // Añadir efecto visual (desvanecer)
        this.scene.tweens.add({
            targets: laser,
            alpha: { start: 1, to: 0 },
            duration: 2000, // Duración del láser
            onComplete: () => {
                laser.destroy(); // Eliminar el sprite después del tween
            },
        });
    
        // Restablecer el estado del boss al finalizar la animación
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }
    
    
    takeDamage() {
        if (this.isinmortal || this.isDead) return;

        this.health -= 1;
        this.hits = (this.hits || 0) + 1;
        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocity(0, 0);
            this.play('boss_G_death_animation', false);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.emit('bossDead');
                this.destroy();
            });
        } else {
            if (!this.isDead) {
                this.isPlayingHurtAnimation = true;
                this.setVelocity(0, 0);
                this.setTint(0xff0000);
            }
        }
    }

    adjustHitbox() {
        this.body.setSize(50, 70); // Ajustar dimensiones del hitbox
        this.body.setOffset(40, 25); // Cambiar desplazamiento
    }
}
