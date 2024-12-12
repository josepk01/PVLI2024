import Bullet from '../Balas/Bullet.js';
import SubEnemy from '../SubEnemy/SubEnemy.js';

export default class Boss3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_B_Idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = 5; // Cambiar vida a 5
        this.facingDirection = 'left';
        this.play('boss_B_idle_animation');
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

        // Movimiento y ataques regulares
        if(!this.isDead && !this.isPlayingHurtAnimation)
        {
            // Realizar salto al 50% de vida
            if (this.specialAttackThresholds.jump < 10 && !this.nocomplete) {
                this.specialAttackThresholds.jump++;
                this.nocomplete =true;
                this.isinmortal =true;
                this.multispawn(player);
                return;
            }
            else if (Math.abs(player.x - this.x) <= 10) {
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
            if (!this.nocomplete)
            {
                this.isinmortal =false;
            }
            if (time > this.lastAttackTime + this.attackCooldown && !this.isPlayingHurtAnimation&& !this.nocomplete) {
                this.chooseRandomAttack(player);
                this.lastAttackTime = time;
            }
            if(time > this.lastAttackTime + this.SattackCooldown)
            {
                this.specialAttackThresholds.jump = 0;
            }
        }
    }
    chooseRandomAttack(player) {
        if (Math.abs(player.x - this.x) > 80) {
            this.attack1(player); // Distancia para lanzar balas
        } else {
            this.attack2(player); // Ataque cuerpo a cuerpo
        }
    }
    attack1(player) {
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
        this.play('boss_B_attack1_animation', true);
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
    attack2(player) {
        this.isPlayingAttackAnimation = true; // Indicar que está atacando
        this.play('boss_B_attack2_animation', true);
        this.isPlayingDead =false;

        const offsets = [-50, 0, 50]; // Tres posiciones iniciales diferentes para las hachas
    
        offsets.forEach((offset, index) => {
            this.scene.time.addEvent({
                delay: index * 500, // Retraso de 0.5 segundos entre cada disparo
                callback: () => {
                    const bullets = this.bullets.get(this.x + offset, this.y, 'Boss_Bullet'); // Obtener una bala del grupo
                    if (bullets) {
                        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y); // Calcular ángulo hacia el jugador
                        const velocityX = Math.cos(angle) * 300; // Velocidad horizontal
                        const velocityY = Math.sin(angle) * 300; // Velocidad vertical
    
                        bullets.resetBullet(this.x + offset, this.y, velocityX, velocityY); // Restablecer la posición y velocidad de la hacha
                        bullets.setRotation(angle); // Ajustar la rotación hacia el jugador
                        this.scene.tweens.add({
                            targets: bullets,
                            angle: 360, // Efecto de giro
                            duration: 500,
                            repeat: -1,
                        });
                    }
                },
            });
        });
    
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }    
    multispawn(player) {

        this.isPlayingAttackAnimation = true;
        this.setVelocityX(0);
        this.play('boss_B_jump_animation', true);
        this.aux = Math.random(0,3)
        this.sprite = null;
        if(0)
        {
            this.sprite = 'Sub_enemy1';
        }
        else if(1)
        {
            this.sprite = 'Sub_enemy2';
        }
        else if(2)
        {
            this.sprite = 'Sub_enemy3';
        }
        else if(3)
        {
            this.sprite = 'Sub_enemy4';
        }


        //const subEnemy = this.sub_enemy.get(this.x+ Math.random(-50,50), this.y, this.sprite);
        let sub_enemy = this.sub_enemy.get(this.x+ Math.random(-50,50), this.y, this.sprite);
        sub_enemy.setTexture(this.sprite);
        this.nocomplete = false;
        if (sub_enemy) {
            //sub_enemy.resetBullet(sub_enemy, bulletY, 0, 300);
        }
        
    }
    takeDamage() {
        if (this.isinmortal) return; // Si ya está muerto, no hacemos nada
    
        this.health -= 1;
        this.hits = (this.hits || 0) + 1; // Incrementar contador de hits al jefe

        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocityX(0);
            this.play('boss_B_dead_animation', false); // Forzar la animación de muerte
            this.isPlayingDead = true;
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                if (anim.key === 'boss_B_dead_animation') {
                    this.emit('bossDead'); // Emitir un evento para manejar la muerte del boss
                    this.destroy();
                }
            });
        } else {
            if (!this.isDead) {
                this.isPlayingHurtAnimation = true;
                this.setVelocityX(0);
                this.setTint(0xff0000); // Aplicar el filtro rojo
                this.play('boss_B_hurt_animation', true);
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
                    if (anim.key === 'boss_B_hurt_animation') {
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
        this.body.setSize(200, 70); // Ajustar dimensiones del hitbox
        this.body.setOffset(20, 25); // Cambiar desplazamiento
    }
}
