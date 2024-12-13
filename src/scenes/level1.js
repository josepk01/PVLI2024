import LevelP from './levelP.js';
import Boss from '../entities/Bosses/boss.js';

export class Level1 extends LevelP {
    constructor() {
        super('level1');
    }

    create() {
        this.createLevel('fondo__temp_level1', 'Nivel 1', Boss, 800, this.sys.game.scale.gameSize.height - 100);
    }
}
