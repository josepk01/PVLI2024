import Bullet from '../Balas/Bullet.js';

export default class Boss2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_W_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 14; // Cambiar vida a 5
        this.facingDirection = 'left';
        this.play('boss_W_idle_animation');
        this.setFlipX(true);
        this.isPlayingDead = false;
        this.isDead = false;
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
        this.attackCooldown = 2000; 
        this.lastAttackTime = 2000;
        this.truedead = false;
        this.adjustHitbox();
        this.isinmortal =false;
        this.nocomplete = false;
        this.first = true;
        // Crear grupo para balas del boss
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;

        this.specialAttackThresholds = { jump: false, bullets: false };
    }

    update(time, player) {

        // Movimiento y ataques regulares
        if(!this.isDead && !this.isPlayingHurtAnimation)
        {
            // Realizar salto al 50% de vida
            if (this.health <= 2.5 && this.specialAttackThresholds.jump < 3 && !this.nocomplete) {
                this.specialAttackThresholds.jump++;
                this.jumpToEdge(player);
                this.nocomplete =true;
                this.isinmortal =true;
                return;
            }
            else if (Math.abs(player.x - this.x) <= 10) {
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
            if (!this.nocomplete)
            {
                this.isinmortal =false;
            }
            if (time > this.lastAttackTime + this.attackCooldown && !this.isPlayingHurtAnimation&& !this.nocomplete) {
                if(this.first)
                {
                    this.chooseRandomAttack(player);
                }
                else        
                this.first = true;
                this.lastAttackTime = time;
            }
        }
    }
    chooseRandomAttack(player) {
        if (Math.abs(player.x - this.x) > 80) {
            this.attack1(player); // Distancia para lanzar hachas
        } else {
            this.attack2(player); // Ataque cuerpo a cuerpo
        }
    }
    attack1(player) {
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
        this.play('boss_W_attack1_animation', true);
    
        const offsets = [-50, 0, 50]; // Tres posiciones iniciales diferentes para las hachas
    
        offsets.forEach((offset, index) => {
            this.scene.time.addEvent({
                delay: index * 500, // Retraso de 0.5 segundos entre cada disparo
                callback: () => {
                    const bullet = this.bullets.get(this.x + offset, this.y, 'Hacha'); // Obtener una bala del grupo
                    if (bullet) {
                        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y); // Calcular ángulo hacia el jugador
                        const velocityX = Math.cos(angle) * 300; // Velocidad horizontal
                        const velocityY = Math.sin(angle) * 300; // Velocidad vertical
    
                        bullet.resetBullet(this.x + offset, this.y, velocityX, velocityY,angle); // Restablecer la posición y velocidad de la hacha
 
                    }
                },
            });
        });
    
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }
    attack2(player) {
        this.isPlayingAttackAnimation = true;
        this.play('boss_W_attack2_animation', true);
    
        // Calcular la posición para la hitbox (en las piernas, enfrente del boss)
        const hitboxHeight = this.body.height / 4; // Altura de cada segmento
        const hitboxY = this.y + (hitboxHeight * 1.5); // Posición vertical (en la zona de las piernas)
        const hitboxX = this.facingDirection === 'left' 
            ? this.x - (this.body.width / 2) - 20 // A la izquierda del boss
            : this.x + (this.body.width / 2) + 20; // A la derecha del boss
    
        // Crear una hitbox temporal para el ataque
        const hitbox = this.scene.physics.add.sprite(hitboxX, hitboxY, null).setSize(60, hitboxHeight); // Tamaño ajustable de la hitbox
        hitbox.setVisible(false); // No mostrar la hitbox visualmente
        hitbox.body.allowGravity = false; // Desactivar la gravedad para la hitbox
    
        // Configurar la duración de la hitbox
        this.scene.time.addEvent({
            delay: 500, // Duración de la hitbox en milisegundos
            callback: () => {
                hitbox.destroy(); // Destruir la hitbox después de la duración
            },
        });
    
        // Detectar colisiones entre la hitbox y el jugador
        this.scene.physics.add.overlap(hitbox, player, () => {
            // Si colisiona, aplicar daño y empuje al jugador
            player.knockback(this.facingDirection === 'left' ? -2000 : 2000); // Empujar al jugador
            player.takeDamage(1); // Hacer daño al jugador
        });
    
        // Finalizar el ataque después de la animación
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }
    jumpToEdge(player) {

        this.isPlayingAttackAnimation = true;
        this.setVelocityX(0);
        this.play('boss_W_jump_animation', true);
    
        // Determinar la dirección del salto
        const targetX = player.x < this.x ? 50 : this.screenWidth - 50;
    
        // Ajustar el flip para que mire al jugador
        this.setFlipX(player.x > this.x ? false : true);
    
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Volver a la animación de idle después del salto
                this.play('boss_W_idle_animation', true);
                this.nocomplete =false;
                this.isPlayingAttackAnimation = false;
            }
        });
    }
    takeDamage() {
        if (this.isinmortal) return; // Si ya está muerto, no hacemos nada
    
        this.health -= 1;
        this.hits = (this.hits || 0) + 1; // Incrementar contador de hits al jefe

        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            //this.stopAllActions(); // Detener todas las acciones en curso
            this.play('boss_W_dead_animation', false); // Forzar la animación de muerte
            this.isPlayingDead = true;
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_W_dead_animation') {
                    this.emit('bossDead'); // Emitir un evento para manejar la muerte del boss
                    this.destroy();
                }
            });
        } else {
            if (!this.isDead) {
                this.isPlayingHurtAnimation = true;
                this.setVelocityX(0);
                this.setTint(0xff0000); // Aplicar el filtro rojo
                this.play('boss_W_hurt_animation', true);
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                    if (anim.key === 'boss_W_hurt_animation') {
                        this.isPlayingHurtAnimation = false;
                        this.clearTint();
                    }
                });
            }
        }
    }
    stopAllActions() {
        // Detener cualquier animación en curso
        this.stop();
    
        // Desactivar los estados de ataque y daño
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
    
        // Detener el movimiento del boss
        this.setVelocity(0, 0);
    }
    adjustHitbox() {
        this.body.setSize(50, 70); // Ajustar dimensiones del hitbox
        this.body.setOffset(20, 25); // Cambiar desplazamiento
    }
}
