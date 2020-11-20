import starter from './Starter';
import SceneManager from '../managers/SceneManager';
import MainScene from '../scenes/MainScene.ts';
import PlayScene from '../scenes/PlayScene.ts';
import GameOverScene from '../scenes/GameOverScene.ts';
import {ScenesEnum} from '../models/enums/ScenesEnum';

class Game {
    private mainScene;
    private playScene;
    private gameOverScene;

    constructor() {
        starter.initiated.then(() => {
            this.mainScene = new MainScene();
            this.playScene = new PlayScene();
            this.gameOverScene = new GameOverScene();

            SceneManager.registerScene(ScenesEnum.Main, this.mainScene);
            SceneManager.registerScene(ScenesEnum.Play, this.playScene);
            SceneManager.registerScene(ScenesEnum.GameOver, this.gameOverScene);

            SceneManager.showScene(ScenesEnum.Main);
            starter.resize();
        });
    }
}

export default Game;
