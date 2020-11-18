import starter from './Starter';
import SceneManager from '../managers/SceneManager';
import MainScene from '../scenes/MainScene';
import IntroScene from '../scenes/IntroScene';

class Game {
    constructor() {
        starter.initiated.then(() => {
            this.mainScene = new MainScene();
            this.introScene = new IntroScene();

            SceneManager.registerScene('main', this.mainScene);
            SceneManager.registerScene('intro', this.introScene);

            SceneManager.showScene('main');
            starter.resize();
        });
    }
}

export default Game;
