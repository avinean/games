import starter from '../engine/Starter';
import GraphicsHelper from '../utils/GraphicsHelper';
import Resizable from '../engine/Resizable';
import Logo from '../components/Logo';
import TWEEN from 'tween.js';

class IntroScene extends Resizable {
    constructor() {
        super();
        this._container = null;
        this._playButton = null;
        this._chest = null;

        this._init();
    }

    onResize() {
        const { width, height } = starter.app.screen;
        const logo = this._logo.container;

        logo.position.set(width / 2, height * 0.1); // 0.1 = 10% in percent progress
        this._chest.position.set(width / 2, height * 0.7);
    }

    show() {
        this._container.visible = true;
        this._logo.show();
    }

    hide() {
        this._container.visible = false;
    }

    _init() {
        this._container = GraphicsHelper.createContainer({});
        this._container.setParent(starter.app.stage);

        this._chest = GraphicsHelper.createSprite({
            name: 'chest',
            onClick: () => {
                this._shakeChest();
            }
        });
        this._chest.setParent(this._container);

        this._logo = new Logo(this._container);
    }

    _shakeChest() {
        new TWEEN.Tween(this._chest.pivot)
            .to({ y: [10, -10, 15, -5, 8, -8] }, 500)
            .easing(TWEEN.Easing.Back.InOut)
            .start();
    }
}

export default IntroScene;
