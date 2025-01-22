import Bullet from './Balas/Bullet.js';
import gameData from '../gameData.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Player1I_idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.play('Player1I_idle');
        this.setCollideWorldBounds(true);
        this.setGravityY(300);
        this.isknockback = false;
        this.specialDuration = 5000;
        this.cursors = scene.input.keyboard.createCursorKeys(); // Para las flechas (dirección de disparo)
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            special: Phaser.Input.Keyboard.KeyCodes.Z
        }); // Para WASD (movimiento)

        this.shootKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.maxHealth = gameData.playerStats.health;
        this.attackCooldown = 100; // Cooldown de 0.1 segundos (100 ms)
        this.lastAttackTime = 0;

        this.scene = scene;
        this.facingDirection = 'right';
        this.isJumping = false;

        // Vidas del jugador
        this.health = 99;//this.maxHealth;

        // Daño del jugador
        this.damage = gameData.playerStats.damage;

        // Crear grupo para balas
        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        this.adjustHitbox();
        // Aplicar habilidades desbloqueadas
        this.unlockAttacks = gameData.playerStats.unlockAttacks;
    }

    update(time, boss, hud) {
        if (!this.isknockback) {
            this.body.setVelocityX(0);
    
            // Ataque (disparo) con SPACE
            if (Phaser.Input.Keyboard.JustDown(this.shootKey) && time > this.lastAttackTime + this.attackCooldown) {
                this.attack(boss);
                this.lastAttackTime = time;
            }
    
            // Movimiento con WASD
            else if (this.keys.left.isDown) {
                this.body.setVelocityX(-200);
                this.anims.play('Player1C_run', true);
                this.facingDirection = 'left';
                this.setFlipX(true);
            } else if (this.keys.right.isDown) {
                this.body.setVelocityX(200);
                this.anims.play('Player1C_run', true);
                this.facingDirection = 'right';
                this.setFlipX(false);
            } else if (this.body.onFloor()) {
                this.anims.play('Player1I_idle', true);
            }
    
            // Salto con W
            if (this.keys.up.isDown && this.body.onFloor()) {
                this.body.setVelocityY(-660);
                this.anims.play('Player1S_jump', true);
                this.isJumping = true;
            }
    
            // Activar ataque especial con Z
            if (Phaser.Input.Keyboard.JustDown(this.keys.special)) {
                this.activateSpecial(boss, hud);
            }
        } else {
            // Manejo de knockback
            if (!this.knockbackStartTime) {
                this.knockbackStartTime = time;
            }
            if (time - this.knockbackStartTime >= 500) {
                this.isknockback = false;
                this.knockbackStartTime = null;
            }
        }
    }
    activateSpecial(boss, hud) {
        // Verificar si la barra especial está llena
        if (boss.hits >= 3) {
            // Verificar si el jugador tiene el objeto abyss_glass comprado
            const hasAbyssGlass = gameData.purchasedItems.some(item => item.type === 'abyss_glass');
    
            if (hasAbyssGlass) {
                // Activar el ataque especial
                this.isSpecialActive = true;
    
                // Reiniciar la barra especial
                boss.hits = 0;
                hud.update(this, boss); // Actualizar el HUD para reflejar los cambios
    
                console.log('Autoapuntado activado con abyss_glass.');
    
                // Hacer que el efecto especial dure por `specialDuration`
                this.scene.time.delayedCall(this.specialDuration, () => {
                    this.isSpecialActive = false; // Desactivar después de 5 segundos
                    console.log('Autoapuntado desactivado.');
                });
            } else {
                console.log('No tienes abyss_glass, no puedes activar el ataque especial.');
            }
        } else {
            console.log('La barra especial no está llena.');
        }
    }
    
    
    attack(boss) {
        let bulletX = this.x;
        let bulletY = this.y;
        let bulletVelocityX = 0;
        let bulletVelocityY = 0;
    
        if (this.cursors.up.isDown) {
            // Disparar hacia arriba
            bulletY -= 20;
            bulletVelocityY = -600;
            this.anims.play('Player1A_attackw', true);
        } else if (this.cursors.down.isDown) {
            // Disparar hacia abajo
            bulletY += 20;
            bulletVelocityY = 600;
            this.anims.play('Player1A_attacks', true);
        } else {
            // Disparar horizontalmente
            bulletX = this.facingDirection === 'right' ? this.x + 20 : this.x - 20;
            bulletVelocityX = this.facingDirection === 'right' ? 600 : -600;
            this.anims.play('Player1A_attackd', true);
    
            // Realizar flip en la animación según la dirección del disparo
            if (this.facingDirection === 'right') {
                this.setFlipX(false); // Sin flip si dispara a la derecha
            } else {
                this.setFlipX(true); // Flip si dispara a la izquierda
            }
        }
    
        // Modificar trayectoria si el ataque especial está activo
        if (this.isSpecialActive && boss) {
            const angleToBoss = Phaser.Math.Angle.Between(this.x, this.y, boss.x, boss.y);
            bulletVelocityX = Math.cos(angleToBoss) * 600;
            bulletVelocityY = Math.sin(angleToBoss) * 600;
        }
    
        let bullet = this.bullets.get();
        if (bullet) {
            bullet.setTexture('Bullet');
            bullet.resetBullet(bulletX, bulletY, bulletVelocityX, bulletVelocityY);
        }
    }
    
    takeDamage() {
        if (this.lastDamageTime && this.scene.time.now - this.lastDamageTime < 750) {
            return; // Si el daño ocurrió hace menos de 0.75 segundos, salir del método
        }
    
        this.lastDamageTime = this.scene.time.now; // Actualizar el tiempo del último daño
    
        this.health -= 1;
        console.log(this.health);
        this.setTint(0xff0000); // Aplicar filtro rojo
    
        // Quitar filtro rojo después de 0.5 segundos
        this.scene.time.delayedCall(500, () => {
            this.clearTint();
        });
    
        if (this.health <= 0) {
            this.scene.scene.start('mainlevels'); // Cambiar de escena si muere
        }
    }
    

    knockback(intensidad) {
        this.body.setVelocityX(intensidad);
        this.isknockback = true;
    }
    adjustHitbox() {
        this.body.setSize(50, 50); // Ajustar dimensiones del hitbox
        this.body.setOffset(0, 0); // Cambiar desplazamiento
    }
}
