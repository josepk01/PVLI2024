import Bullet from '../Balas/Bullet.js';

export default class BossP extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey, animations, health = 10) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2.25);
        this.health = health;
        this.facingDirection = 'left';
        this.isPlayingDead = false;
        this.isDead = false;
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
        this.attackCooldown = 2000;
        this.lastAttackTime = 0;
        this.truedead = false;
        this.isinmortal = false;
        this.first = true;
        this.nocomplete = false;

        this.bullets = scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });

        this.animations = animations;
        this.play(animations.idle);

        this.adjustHitbox();
    }

    update(time, player) {
        if (!this.isDead && !this.isPlayingHurtAnimation) {
            this.moveAndAttack(time, player);
        }
    }

    moveAndAttack(time, player) {
        // Sobrescribir en clases específicas
    }

    chooseRandomAttack(player) {
        // Sobrescribir en clases específicas
    }

    takeDamage() {
        if (this.isinmortal || this.isDead) return;

        this.health -= 1;

        if (this.health <= 0) {
            this.isDead = true;
            this.setVelocity(0, 0);
            this.play(this.animations.death, false);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.emit('bossDead');
                this.destroy();
            });
        } else {
            this.playHurtAnimation();
        }
    }

    playHurtAnimation() {
        if (!this.isDead) {
            this.isPlayingHurtAnimation = true;
            this.setVelocity(0, 0);
            this.setTint(0xff0000);
            this.play(this.animations.hurt, true);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.isPlayingHurtAnimation = false;
                this.clearTint();
            });
        }
    }

    stopAllActions() {
        this.stop();
        this.isPlayingHurtAnimation = false;
        this.isPlayingAttackAnimation = false;
        this.setVelocity(0, 0);
    }

    adjustHitbox() {
        this.body.setSize(50, 70);
        this.body.setOffset(20, 25);
    }
}
