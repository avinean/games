import TWEEN from 'tween.js';
import GraphicsHelper from '../utils/GraphicsHelper';
import styles from '../settings/styles';

export default class Logo {
    constructor(parent) {
        this._parent = parent;

        this._logoContainer = null;
        this._logoTextPartOne = null;
        this._logoTextPartTwo = null;

        this._init();
    }

    _init() {
        const { logo } = styles;

        this._logoContainer = GraphicsHelper.createContainer({});
        this._logoContainer.setParent(this._parent);

        this._logoTextPartOne = GraphicsHelper.drawText({
            text: 'DRAGON',
            style: logo,
        });
        this._logoContainer.addChild(this._logoTextPartOne);

        this._logoTextPartTwo = GraphicsHelper.drawText({
            text: 'BLADE',
            style: logo,
            y: 120,
        });
        this._logoContainer.addChild(this._logoTextPartTwo);
    }

    get container() {
        return this._logoContainer;
    }

    _moveAnimation() {
        this._logoContainer.pivot.y = 600;

        new TWEEN.Tween(this._logoContainer.pivot)
            .to({ x: 0, y: -300 }, 1000)
            .easing(TWEEN.Easing.Back.InOut)
            .start();
    }


    show() {
        this._moveAnimation();
        this._logoContainer.visible = true;
    }

    hide() {
        this._logoContainer.visible = false;
    }

    updatePosition(x, y) {
        this._logoContainer.position.set(x,y);
    }
}
