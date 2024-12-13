import LevelP from './levelP.js';
import Boss3 from '../entities/Bosses/boss3.js';

export class Level3 extends LevelP {
    constructor() {
        super('level3');
    }

    create() {
        this.createLevel('fondo__temp_level3', 'Nivel 3', Boss3, this.sys.game.scale.gameSize.width / 2, 0);
    }
}
