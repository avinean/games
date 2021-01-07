import starterInstance from './Starter';
import GraphicsHelper from './utils/GraphicsHelper';
import sceneManager from './managers/SceneManager';
import { StoreInterface } from './models/StoreInterface';
import Store from './Store';
import {ComponentInterface} from './models/ComponentInterface';

class Component<T> implements ComponentInterface {
    readonly _starter;
    readonly _graphicsHelper;
    readonly _sceneManager;
    readonly _store: StoreInterface;
    readonly model: T;
    _container;



    constructor() {
        this._store = Store;
        this._starter = starterInstance;
        this._sceneManager = sceneManager;
        this._container = this.graphicsHelper.createContainer({});
        this._container.setParent(this.starter.app.stage);

        this.init();

        this.starter.on('onResize', data => {
            if (!this._container.visible) return;
            this.onResize(data);
        });

        this.starter.ticker.add(() => {
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

    get store() {
        return this._store;
    }
}

export default Component;
