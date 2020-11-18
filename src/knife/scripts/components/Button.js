import TWEEN from 'tween.js';
import GraphicsHelper from '../utils/GraphicsHelper';
import buttonsDescription from '../settings/buttonsDescription';

export default class Button {
    constructor(settings) {
        this._DATA = settings;

        this._button = null;
        this._buttonText = null;

        this._init();
    }

    _init() {
        const { type, parent, cb } = this._DATA;
        const currentSettings = buttonsDescription[type];
        const { text, style } = currentSettings;

        this._button = GraphicsHelper.createSprite({
            name: 'btn_play',
            x: 10,
            y: 4,
        });
        this._button.anchor.set(0.5);

        if (cb) {
            this._button.buttonMode = true;
            this._button.interactive = true;
            this._button.on('pointerdown', cb);
        }
        this._button.setParent(parent);

        this._buttonText = GraphicsHelper.drawText({
            text,
            style,
            x: 10,
            y: 4,
        });
        this._button.addChild(this._buttonText);

        this._runScaleAnimation();
    }

    _move() {
        const { x, easing, time } = buttonsDescription[this._DATA.type].animations.move;
        this._button.pivot.x = x;

        new TWEEN.Tween(this._button.pivot)
            .to({ x: 0, y: 0 }, time)
            .easing(easing)
            .start();
    }

    _runScaleAnimation() {
        const { x, y, time } = buttonsDescription[this._DATA.type].animations.scale;

        new TWEEN.Tween(this._button.scale)
            .to({ x, y }, time)
            .yoyo(true)
            .repeat(Infinity)
            .start();
    }

    get container() {
        return this._button;
    }

    show() {
        this._move();
    }
}
