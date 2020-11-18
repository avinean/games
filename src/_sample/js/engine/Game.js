import starter from "./Starter";
import SceneManager from "../scenes/SceneManager";
import IntroScene from "../scenes/IntroScene";
import MainScene from "../scenes/MainScene";
import OutroScene from "../scenes/OutroScene";

class Game {
    constructor() {
        starter.initiated.then(() => {
            this.introScene = new IntroScene();
            this.mainScene = new MainScene();
            this.outroScene = new OutroScene();

            SceneManager.registerScene(`intro`, this.introScene);
            SceneManager.registerScene(`main`, this.mainScene);
            SceneManager.registerScene(`outro`, this.outroScene);

            SceneManager.showScene(`intro`);
            
            starter.resize();
        });
    }
}

export default Game;
