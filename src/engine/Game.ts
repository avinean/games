import starterInstance from './Starter';
import sceneManager from './managers/SceneManager';
import { GameConfigInterface} from './models/GameConfigInterface';

class Game {
    private starter;
    private sceneManager;

    constructor({
        scenes,
    }: GameConfigInterface) {
        this.starter = starterInstance;
        this.sceneManager = sceneManager;

        this.starter.initiated.then(() => {
            let defaultScene = scenes[0].name;

            scenes.forEach(({ instance, name, isDefault}) => {
                this.sceneManager.registerScene(
                    name,
                    new instance(),
                );
                if (isDefault) {
                    defaultScene = name;
                }
            });

            this.sceneManager.showScene(defaultScene);
            this.starter.resize();
        });
    }
}

export default Game;
