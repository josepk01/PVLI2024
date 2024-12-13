import LevelP from './levelP.js';
import Boss4 from '../entities/Bosses/boss4.js';

export class Level4 extends LevelP {
    constructor() {
        super('level4');
    }

    create() {
        this.createLevel('fondo__temp_level4', 'Nivel 4', Boss4, this.sys.game.scale.gameSize.width / 2, 0);
    }
}
