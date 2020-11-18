import starter from '../engine/Starter';
import GraphicsHelper from '../utils/GraphicsHelper';
import Resizable from '../engine/Resizable';
import Counter from '../components/Counter';
import SceneManager from '../managers/SceneManager';
import Button from '../components/Button';

class MainScene extends Resizable {
    constructor() {
        super();
        this._container = null;

        this._background = null;
        this._counter = null;
        this._changeCounterStateButton = null;
        this._nextSceneButton = null;

        // TODO, move data to other location.
        this._POSITION_INFO = {
            components: {
                counterOffsetX: 170,
                counterOffsetY: 70
            }
        };

        this._time = 0;
        this._counterStep = 2;

        this._init();
        this._drawInterface();
    }

    onResize() {
        const { width, height } = starter.app.screen;
        const { counterOffsetX, counterOffsetY } = this._POSITION_INFO.components;

        const counterButton = this._changeCounterStateButton.container;
        const changeSceneButton = this._nextSceneButton.container;

        //Set background to the center on screen
        this._background.position.set(width / 2, height / 2);

        this._counter.container.position.set(width - counterOffsetX, counterOffsetY);

        counterButton.position.set(width / 2, height / 3);
        changeSceneButton.position.set(width / 2, height / 1.5);
    }

    show() {
        // Call this method every time if you show any scene

        // container - box for scene elements or box for many elements
        // Example: the cow consists of many parts, it is more convenient to store it in a container

        this._container.visible = true;
        // TODO: change logic for set method (container)
        this._counter.container.visible = true;
    }

    hide() {
        // Call this method every time if you hide any scene
        this._container.visible = false;
        this._counter.container.visible = false;
    }

    tick() {
        this._time += this._counterStep;

        if (this._time >= 100) {
            this._counter.update();

            this._time = 0;
        }
    }

    _init() {
        this._container = GraphicsHelper.createContainer({});
        // First method for add element to container
        this._container.setParent(starter.app.stage);

        this._background = GraphicsHelper.createSprite({
            name: 'dragon_bg',
            anchor: 0.5,
        });

        // Second method for add element to container
        this._container.addChild(this._background);
      
        const buttonCounterSettings = {
            parent: this._container,
            type: 1,
            cb: () => {
                this._changeCounterState();
            },
        };

        this._changeCounterStateButton = new Button(buttonCounterSettings);

        const buttonSceneSettings = {
            parent: this._container,
            type: 2,
            cb: () => {
                SceneManager.showScene('intro');
            },
        };

        this._nextSceneButton = new Button(buttonSceneSettings);
    }

    _drawInterface() {
        this._counter = new Counter();

        // Update request animation frame on this scene. For animation or move logic
        starter.ticker.add(() => {
            this.tick();
        });
    }

    _changeCounterState() {
        this._counterStep = this._counterStep === 0 ? 2: 0;
    }
}

export default MainScene;
