import starter from '../engine/Starter';
import GraphicsHelper from '../utils/GraphicsHelper';
import Resizable from '../engine/Resizable';
import SceneManager from '../managers/SceneManager';
import {
    Sprite, Container, Graphics, Circle, TextStyle, Text, Texture,
} from 'pixi.js';
import Button from '../components/Button';
import {BackgroundEnums} from '../models/enums/BackgroundEnums';
import {ButtonTypesEnum} from '../models/enums/ButtonTypesEnum';
import {ScenesEnum} from '../models/enums/ScenesEnum';

class MainScene extends Resizable {
    _container: Container;
    _background: Sprite;
    _playButton: Button;

    // TODO, move data to other location.
    _POSITION_INFO = {
        components: {
            counterOffsetX: 170,
            counterOffsetY: 70
        }
    };

    _time = 0;

    constructor() {
        super();
        this._init();
    }

    onResize() {
        const { width, height } = starter.app.screen;
        const { counterOffsetX, counterOffsetY } = this._POSITION_INFO.components;

        const playButton = this._playButton.container;

        //Set background to the center on screen
        this._background.position.set(width / 2, height / 2);

        playButton.position.set(width / 2, height / 2);
    }

    show() {
        this._container.visible = true;
    }

    hide() {
        this._container.visible = false;
    }

    _init() {
        this._container = GraphicsHelper.createContainer({});
        this._container.setParent(starter.app.stage);

        this._background = GraphicsHelper.createSprite({
            name: BackgroundEnums.MainSceneBackground,
            anchor: 0.5,
        });
        this._container.addChild(this._background);

        const buttonSceneSettings = {
            parent: this._container,
            type: ButtonTypesEnum.PlayButton,
            cb: () => {
                SceneManager.showScene(ScenesEnum.Play);
            },
        };

        this._playButton = new Button(buttonSceneSettings);
    }
}

export default MainScene;
