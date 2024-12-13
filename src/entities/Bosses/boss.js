import BossP from './BossP.js';

export default class Boss extends BossP {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boss_B_Idle', {
            idle: 'boss_B_idle_animation',
            hurt: 'boss_B_hurt_animation',
            death: 'boss_B_dead_animation',
            attack1: 'boss_B_attack1_animation',
            attack2: 'boss_B_attack2_animation',
        }, 10);
    }

    moveAndAttack(time, player) {
        if (Math.abs(player.x - this.x) > 10) {
            this.setVelocityX(player.x < this.x ? -100 : 100);
            this.play('boss_B_run_animation', true);
        } else {
            this.setVelocityX(0);
            this.play(this.animations.idle, true);
        }

        if (time > this.lastAttackTime + this.attackCooldown) {
            this.chooseRandomAttack(player);
            this.lastAttackTime = time;
        }
    }

    chooseRandomAttack(player) {
        if (Math.abs(player.x - this.x) > 80) {
            this.attack1(player);
        } else {
            this.attack2(player);
        }
    }

    attack1(player) {
        this.isPlayingAttackAnimation = true;
        this.play(this.animations.attack1, true);

        for (let i = -2; i <= 2; i++) {
            const bullet = this.bullets.get();
            if (bullet) {
                bullet.setTexture('Boss_Bullet');
                bullet.resetBullet(this.x + i * 40, this.y, 0, 300);
            }
        }

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }

    attack2(player) {
        this.isPlayingAttackAnimation = true;
        this.play(this.animations.attack2, true);

        for (let i = 0; i < 5; i++) {
            const bullet = this.bullets.get();
            if (bullet) {
                bullet.setTexture('Boss_Bullet');
                bullet.resetBullet(this.x, this.y - i * 40, player.x > this.x ? 300 : -300, 0);
            }
        }

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingAttackAnimation = false;
        });
    }
}
