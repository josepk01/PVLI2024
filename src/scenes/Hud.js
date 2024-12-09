export default class HUD {
    constructor(scene) {
        this.scene = scene;

        // Crear barra de vida del jugador (roja)
        this.healthBarBackground = this.scene.add.rectangle(20, 20, 200, 20, 0x000000).setOrigin(0, 0);
        this.healthBar = this.scene.add.rectangle(20, 20, 200, 20, 0xff0000).setOrigin(0, 0);

        // Crear barra especial (vacía inicialmente, azul al llenarse)
        this.chargeBarBackground = this.scene.add.rectangle(20, 50, 200, 10, 0x000000).setOrigin(0, 0);
        this.chargeBar = this.scene.add.rectangle(20, 50, 0, 10, 0x0000ff).setOrigin(0, 0);

        // Asegurar que el HUD permanece fijo en pantalla
        this.healthBarBackground.setScrollFactor(0);
        this.healthBar.setScrollFactor(0);
        this.chargeBarBackground.setScrollFactor(0);
        this.chargeBar.setScrollFactor(0);

    }

    update(player, boss) {
        if (!player || !boss) return;

        // Actualizar barra de vida del jugador (roja)
        const playerHealthPercentage = Math.max(player.health / player.maxHealth, 0);
        this.healthBar.width = 200 * playerHealthPercentage;

        // Actualizar barra especial del boss (azul, llena con 3 ataques)
        if (!boss.hits) boss.hits = 0; // Asegurarse de que la propiedad `hits` existe
        const bossChargePercentage = Math.min(boss.hits / 3, 1); // Basar el progreso en `boss.hits`
        this.chargeBar.width = 200 * bossChargePercentage;
    }
}
