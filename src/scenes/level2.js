import LevelP from './levelP.js';
import Boss2 from '../entities/Bosses/boss2.js';

export class Level2 extends LevelP {
    constructor() {
        super('level2');
    }

    create() {
        this.createLevel('fondo__temp_level2', 'Nivel 2', Boss2, 800, this.sys.game.scale.gameSize.height - 100);
    }
}
