export default class HUD {
    constructor(scene) {
        this.scene = scene;

        // Crear barra de vida del jugador
        this.healthBarBackground = scene.add.rectangle(20, 20, 200, 20, 0x000000).setOrigin(0, 0);
        this.healthBar = scene.add.rectangle(20, 20, 200, 20, 0xff0000).setOrigin(0, 0);

        // Crear barra de carga para los ataques al jefe
        this.chargeBarBackground = scene.add.rectangle(20, 50, 200, 10, 0x000000).setOrigin(0, 0);
        this.chargeBar = scene.add.rectangle(20, 50, 0, 10, 0x00ff00).setOrigin(0, 0);

        // Mantener HUD en la parte superior de la pantalla
        this.healthBarBackground.setScrollFactor(0);
        this.healthBar.setScrollFactor(0);
        this.chargeBarBackground.setScrollFactor(0);
        this.chargeBar.setScrollFactor(0);
    }

    update(player, boss) {
        // Actualizar la barra de vida del jugador
        const playerHealthPercentage = Math.max(player.health / player.maxHealth, 0);
        this.healthBar.width = 200 * playerHealthPercentage;

        // Actualizar la barra de carga (basado en los ataques al jefe)
        const bossChargePercentage = Math.min((boss.hits || 0) / 3, 1);
        this.chargeBar.width = 200 * bossChargePercentage;
    }
}
