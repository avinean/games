import Component from '../../../../engine/Component';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { BackgroundEnums } from '../../models/enums/BackgroundEnums';
import { ElementsEnum } from '../../models/enums/ElementsEnum';
import { DirectionsEnum } from '../../models/enums/DirectionsEnum';
import Button from '../../components/Button';
import { ButtonTypesEnum } from '../../models/enums/ButtonTypesEnum';
import { ScenesEnum } from '../../models/enums/ScenesEnum';
import {
    MainSceneStoreModel,
    MainSceneStoreName,
} from '../../models/types/MainSceneStoreModel';

class PlaySceneController extends Component<any> {
    _background;
    _rocket;
    _rocketConfig = {
        name: ElementsEnum.Rocket,
        anchor: 0.5,
        width: 75,
        height: 150
    };
    _rocketStep = 3;
    _rocketPosition = null;
    _rocketDirection  = DirectionsEnum.Top;

    _arrowLeft;
    _arrowRight;
    _arrowTop;
    _arrowBottom;
    _moveRocketBind;

    mainSceneStoreModel: MainSceneStoreModel;

    constructor() {
        super();

        /*
        * for instance store looks like next object
        * {
        *   testValue = 0;
        *
        *   tmp: {
        *    playScene: 1
        *   }
        * }
        * */

        // to get whole section use next example
        this.store
            // get section by registration mane
            // section name usually defines in store interface file
            // section registers usually in main.ts
            .get(MainSceneStoreName)
            .subscribe((value) => {
                console.log('play scene', value)
            });

        // to get some exact field from store section
        // can be used .pipe with plunk
        this.store
            .get(MainSceneStoreName)
            .pipe(
                pluck('tmp'),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                console.log('play scene', value)
            });
    }

    onResize(): void {
        const { width, height } = this.starter.app.screen;

        this._background.position.set(width / 2, height / 2);
        this._rocket.position.set(this._rocketPosition.x, this._rocketPosition.y);

        this._arrowLeft.container.position.set(128, 128);
        this._arrowRight.container.position.set(256, 128);
        this._arrowTop.container.position.set(384, 128);
        this._arrowBottom.container.position.set(512, 128)
    }

    onShow(): void {
        this._restartGame();
    }

    onTick(): void {
        this._moveRocket();
    }

    onInit(): void {
        const { width, height } = this.starter.app.screen;

        this._container = this.graphicsHelper.createContainer({});
        this._container.setParent(this.starter.app.stage);

        this._background = this.graphicsHelper.createSprite({
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

        this._rocketConfig = {
            name: ElementsEnum.Rocket,
            anchor: 0.5,
            width: 75,
            height: 150
        };
        this._rocket = this.graphicsHelper.createSprite(this._rocketConfig);
        this._rocketPosition = {
            x: width / 2,
            y: height / 2,
        };
        this._container.addChild(this._rocket);
    }

    _restartGame() {
        const { width, height } = this.starter.app.screen;
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
                this._rocketPosition.y -= this._rocketStep;
                this._rocket.rotation = 0;
                break;
            case DirectionsEnum.Right:
                this._rocketPosition.x += this._rocketStep;
                this._rocket.rotation = Math.PI / 2;
                break;
            case DirectionsEnum.Bottom:
                this._rocketPosition.y += this._rocketStep;
                this._rocket.rotation = Math.PI;
                break;
            case DirectionsEnum.Left:
                this._rocketPosition.x -= this._rocketStep;
                this._rocket.rotation = 3 * Math.PI / 2;
                break;
        }

        this._rocket.position.set(this._rocketPosition.x, this._rocketPosition.y);
    }

    _checkBorders() {
        const { width, height } = this.starter.app.screen;
        const { width: rWidth, height: rHeight } = this._rocketConfig;
        const { x, y } = this._rocketPosition;
        const rocketRadius = Math.max(rWidth, rHeight) / 2;

        if (
            (x - rocketRadius) < 0 ||
            (x + rocketRadius) > width ||
            (y - rocketRadius) < 0 ||
            (y + rocketRadius) > height
        ) {
            this.sceneManager.showScene(ScenesEnum.GameOver);
        }
    }
}

export default PlaySceneController;
