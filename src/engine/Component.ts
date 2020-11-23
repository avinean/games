import starterInstance from './Starter';
import GraphicsHelper from './utils/GraphicsHelper';
import sceneManager from './managers/SceneManager';

class Component {
    readonly _starter;
    readonly _graphicsHelper;
    readonly _sceneManager;
    _container;

    constructor() {
        this._starter = starterInstance;
        this._sceneManager = sceneManager;
        this._container = this.graphicsHelper.createContainer({});
        this._container.setParent(this.starter.app.stage);

        this.init();

        this.starter.on('onResize', data => {
            if (!this._container.visible) return;
            this.onResize(data);
        });

        this.starter.on('onTick', () => {
            if (!this._container.visible) return;
            this.onTick();
        });
    }

    //methods
    init() {
        this.onInit();
        this.onResize(null);
    }

    show() {
        this._container.visible = true;
        this.onShow();
    }

    hide() {
        this._container.visible = false;
        this.onHide();
    }

    // events
    onInit() {}

    onResize(data) {}

    onShow() {}

    onHide() {}

    onTick() {}

    // utils
    get starter() {
        return this._starter;
    }

    get graphicsHelper() {
        return GraphicsHelper;
    }

    get sceneManager() {
        return this._sceneManager;
    }
}

export default Component;
