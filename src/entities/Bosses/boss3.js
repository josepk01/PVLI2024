import Bullet from '../Balas/Bullet.js';
import SubEnemy from '../SubEnemy/SubEnemy.js';

export default class Boss3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_M_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 5; // Cambiar vida a 5
        this.facingDirection = 'left';
        this.play('Boss_M_Idle_animation');
        this.setFlipX(true);
        this.isPlayingDead = false;
        this.isDead = false;
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
        this.attackCooldown = 2000; 
        this.SattackCooldown = 7000; 
        this.lastAttackTime = 0;
        this.truedead = false;
        this.adjustHitbox();
        this.isinmortal =false;
        this.nocomplete = false;
        // Crear grupo para balas del boss
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        this.sub_enemy = scene.physics.add.group({
            classType: SubEnemy,
            runChildUpdate: true,
        });
        // Guardar dimensiones del escenario
        this.screenHeight = scene.scale.height;
        this.screenWidth = scene.scale.width;

        this.specialAttackThresholds = { jump: false, bullets: false };
    }

    update(time, player) {
        if (!this.isDead && !this.isPlayingHurtAnimation) {
            // Calcular la distancia al jugador
            const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    
            if (distanceToPlayer >= 300) {
                // Si está lejos del jugador, moverse hacia él
                const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
                this.setVelocity(Math.cos(angleToPlayer) * 100, Math.sin(angleToPlayer) * 100);

            } else if(distanceToPlayer <= 250)
            {
                // Si está demasiado cerca del jugador, moverse en dirección contraria
                const angleAway = Phaser.Math.Angle.Between(player.x, player.y, this.x, this.y);
                this.setVelocity(Math.cos(angleAway) * 100, Math.sin(angleAway) * 100);
            }
    
            // Asegurarse de que no salga del mundo
            this.x = Phaser.Math.Clamp(this.x, 0, this.screenWidth);
            this.y = Phaser.Math.Clamp(this.y, 0, this.screenHeight);
    
            // Determinar la dirección del sprite
            if (this.body.velocity.x < 0) {
                this.setFlipX(true);
                this.facingDirection = 'left';
            } else if (this.body.velocity.x > 0) {
                this.setFlipX(false);
                this.facingDirection = 'right';
            }
    
            // Animación Idle mientras se mueve
            this.play('Boss_M_Idle_animation', true);
    
            // Ataque
            if (time > this.lastAttackTime + this.attackCooldown && !this.nocomplete) {
                this.chooseRandomAttack(player);
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
                if (anim.key === 'Boss_M_Idle_animation') {
                    this.isPlayingHurtAnimation = false;
                    this.clearTint();
                }
            });
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'Boss_M_Dead_anim') {
                    this.emit('bossDead'); // Emitir un evento para manejar la muerte del boss
                    this.destroy();
                }
            });
        }
    }
    
        chooseRandomAttack(player) {
        if (Math.abs(player.x - this.x) > 80) {
            this.attack1(player); // Distancia para lanzar balas
        } else {
            this.multispawn(player); // Ataque cuerpo a cuerpo
        }
    }
    attack1(player) {
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
        this.play('Boss_M_attack1', true);
        this.isPlayingDead =false;

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
  
    multispawn(player) {
        this.isPlayingAttackAnimation = true;
        this.setVelocityX(0);
        this.play('Boss_M_Attack2', true);
    
        const subEnemyTypes = ['Boss_M_Summon_a'];
  
        // Generar un nuevo enemigo
        const subEnemy = this.sub_enemy.get(this.x + Phaser.Math.Between(-50, 50), this.y, subEnemyTypes, player);
        if (subEnemy) {
            subEnemy.setTexture(subEnemyTypes);
            subEnemy.setActive(true).setVisible(true);
            subEnemy.body.setCollideWorldBounds(true);
            subEnemy.body.allowGravity = false; // Sin gravedad
        }
    
        this.nocomplete = false;
    }
    
    takeDamage() {
        if (this.isinmortal || this.isDead) return;
    
        this.health -= 1;
    
        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocity(0, 0);
            this.play('Boss_M_Dead_anim', false);
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
        this.body.setSize(30, 70); // Ajustar dimensiones del hitbox
        this.body.setOffset(40, 25); // Cambiar desplazamiento
    }
}
