import starter from '../engine/Starter';
import GraphicsHelper from '../utils/GraphicsHelper';
import Resizable from '../engine/Resizable';
import {Container, Sprite} from 'pixi.js';
import {BackgroundEnums} from '../models/enums/BackgroundEnums';
import {ElementsEnum} from '../models/enums/ElementsEnum';
import {DirectionsEnum} from '../models/enums/DirectionsEnum';
import Button from '../components/Button';
import {ButtonTypesEnum} from '../models/enums/ButtonTypesEnum';
import SceneManager from '../managers/SceneManager';
import {ScenesEnum} from '../models/enums/ScenesEnum';

class PlayScene extends Resizable {
    private _container: Container;
    private _background: Sprite;
    // _playButton: Button;
    private _rocket: Sprite;
    private _rocketConfig = {
        name: ElementsEnum.Rocket,
        anchor: 0.5,
        width: 75,
        height: 150
    };
    private _rocketPosition = null;
    private _rocketDirection  = DirectionsEnum.Top;

    private _arrowLeft;
    private _arrowRight;
    private _arrowTop;
    private _arrowBottom;

    // TODO, move data to other location.
    private _POSITION_INFO = {
        components: {
            counterOffsetX: 170,
            counterOffsetY: 70
        }
    };

    constructor() {
        super();
        this._init();
    }

    onResize(): void {
        const { width, height } = starter.app.screen;
        const { counterOffsetX, counterOffsetY } = this._POSITION_INFO.components;

        this._background.position.set(width / 2, height / 2);
        this._rocket.position.set(this._rocketPosition.x, this._rocketPosition.y);

        this._arrowLeft.container.position.set(128, 128);
        this._arrowRight.container.position.set(256, 128);
        this._arrowTop.container.position.set(384, 128);
        this._arrowBottom.container.position.set(512, 128)
    }

    show(): void {
        this._restartGame();
        this._container.visible = true;
    }

    hide(): void {
        this._container.visible = false;
    }

    _init(): void {
        const { width, height } = starter.app.screen;

        this._container = GraphicsHelper.createContainer({});
        this._container.setParent(starter.app.stage);

        this._background = GraphicsHelper.createSprite({
            name: BackgroundEnums.MainSceneBackground,
            anchor: 0.5,
        });
        this._container.addChild(this._background);

        this._arrowTop = new Button({
           type: ButtonTypesEnum.ArrowTop,
           parent: this._container,
           cb: () => {
               this._changingDirection(DirectionsEnum.Top);
           }
        });

        this._arrowRight = new Button({
            type: ButtonTypesEnum.ArrowRight,
            parent: this._container,
            cb: () => {
                this._changingDirection(DirectionsEnum.Right);
            }
        });

        this._arrowBottom = new Button({
            type: ButtonTypesEnum.ArrowBottom,
            parent: this._container,
            cb: () => {
                this._changingDirection(DirectionsEnum.Bottom);
            }
        });

        this._arrowLeft = new Button({
            type: ButtonTypesEnum.ArrowLeft,
            parent: this._container,
            cb: () => {
                this._changingDirection(DirectionsEnum.Left);
            }
        });


        this._rocket = GraphicsHelper.createSprite(this._rocketConfig);
        this._rocketPosition = {
            x: width / 2,
            y: height / 2,
        };
        this._container.addChild(this._rocket);

        starter.ticker.add(() => {
            if (!this._container.visible) return;
           this._moveRocket();
        });

    }

    _restartGame() {
        const { width, height } = starter.app.screen;
        this._rocketPosition = {
            x: width / 2,
            y: height / 2,
        };
        this._rocket.position.set(this._rocketPosition.x, this._rocketPosition.y);
    }

    _changingDirection(dir) {
        this._rocketDirection = dir;
    }

    _moveRocket(): void {
        this._checkBorders();

        switch (this._rocketDirection) {
            case DirectionsEnum.Top:
                this._rocketPosition.y--;
                this._rocket.angle = 0;
                break;
            case DirectionsEnum.Right:
                this._rocketPosition.x++;
                this._rocket.angle = 90;
                break;
            case DirectionsEnum.Bottom:
                this._rocketPosition.y++;
                this._rocket.angle = 180;
                break;
            case DirectionsEnum.Left:
                this._rocketPosition.x--;
                this._rocket.angle = 270;
                break;
        }

        this._rocket.position.set(this._rocketPosition.x, this._rocketPosition.y);
    }

    _checkBorders() {
        const { width, height } = starter.app.screen;
        const { width: rWidth, height: rHeight } = this._rocketConfig;
        const { x, y } = this._rocketPosition;
        const rocketRadius = Math.max(rWidth, rHeight) / 2;

        if (
            (x - rocketRadius) < 0 ||
            (x + rocketRadius) > width ||
            (y - rocketRadius) < 0 ||
            (y + rocketRadius) > height
        ) {
            SceneManager.showScene(ScenesEnum.GameOver);
        }

    }
}

export default PlayScene;
