class SceneManager {
    constructor() {
        this._scenes = Object.create(null);
        this._activeScene = null;
    }

    showScene(name, data) {
        const targetScene = this._scenes[name];

        if (!targetScene) {
            console.error(`Scene '${name}' is not found`);
            return;
        }

        if (targetScene === this._activeScene) {
            console.info(`Scene '${name}' is already shown`);
            return;
        }

        if (this._activeScene !== null) {
            this._activeScene.hide();
        }

        targetScene.show(data);
        this._activeScene = targetScene;

        console.info(`scene '${name}' is activated`);
    }

    registerScene(name, scene) {
        if (this._scenes[name]) {
            console.error(`Scene '${name}' has been already registered`);
            return;
        }

        this._scenes[name] = scene;
        scene.hide();
    }
}

export default new SceneManager();
