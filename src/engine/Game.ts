import starterInstance from './Starter';
import storeInstance from './Store';
import sceneManager from './managers/SceneManager';
import { GameConfigInterface} from './models/GameConfigInterface';
import { StoreInterface } from './models/StoreInterface';

class Game {
    private readonly starter;
    private readonly sceneManager;
    private readonly store: StoreInterface;

    constructor({
        scenes,
    }: GameConfigInterface) {
        this.starter = starterInstance;
        this.sceneManager = sceneManager;
        this.store = storeInstance;

        this.starter.initiated.then(() => {
            let defaultScene = scenes[0].name;

            scenes.filter(({ store }) => store).forEach(({ store: { name, instance }}) => {
                this.store
                    .registerStore(name)
                    .set(name, new instance());
            });
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
