import * as PIXI from "pixi.js";
import starter from "../engine/Starter";
import GraphicsHelper from "../utils/GraphicsHelper";
import i18n from "../settings/i18n";
import Resizable from "../engine/Resizable";
import SceneManager from './SceneManager';
import appSettings from '../settings/appSettings';
import PIXISound from 'pixi-sound';
import { TweenMax, Bounce } from 'gsap';

class IntroScene extends Resizable {
    constructor() {
        super();

        this._container = null;
        this._substrate = null;
        this._textTop = null;
        this._textBottom = null;

        this._initScene();
        this.hide();
    }

    onResize(data) {
        const { w, h } = data;

        // landscape
        if (w >= h) {
            this._textTop.y = h / 2 - 150;
            this._textBottom.y = h / 2 + 110;
        } else {
            this._textTop.y = h / 2 - 200;
            this._textBottom.y = h / 2 + 100;
        }

        this._textTop.x = w / 2;
        this._textBottom.x = w / 2;

        this._substrate.width = w;
        this._substrate.height = h;
    }

    _drawSubstrate() {}

    drawText(settings) {
        const sourceTxt = 'input your text';
        const {
 text = sourceTxt, x = 0, y = 0, style 
} = settings;

        const txt = new PIXI.Text(text, style);
        txt.x = x;
        txt.y = y;
        txt.anchor.set(0.5);
        return txt;
    }

    _initScene() {
        const { innerWidth: w, innerHeight: h } = window;

        const textStyles = {
            fontFamily: 'roboto-v20-latin-900italic',
            fill: 'blue',
            fontSize: 100,
            fontWeight: 900,
        };

        this._container = GraphicsHelper.createContainer({});
        this._container.setParent(starter.app.stage);

        this._substrate = GraphicsHelper.createColorContainer({
            width: w,
            height: h,
            color: appSettings.colors.introSceneBg,
            onClick: _ => {
                PIXISound.play('bolt');

                this.hide();
                SceneManager.showScene('main');
            },
        });

        this._substrate.setParent(this._container);

        this._textTop = GraphicsHelper.drawText({
            x: w / 2,
            y: h / 2,
            text: i18n.introScene_1,
            style: textStyles,
        });
        this._textTop.setParent(this._container);

        TweenMax.to(this._textTop, 0.5, {
            'repeat': Infinity,
            yoyo: true,
            ease: Bounce.easeInOut,

            y: this._textTop.y - 50,
        });

        this._textBottom = GraphicsHelper.drawText({
            x: w / 2,
            y: h / 2 + 220,
            text: i18n.introScene_2,
            style: textStyles,
        });
        this._textBottom.setParent(this._container);
    }

    show() {
        this._container.alpha = 1;
        this._substrate.visible = true;
        this._substrate.interactive = true;
    }

    hide() {
        this._container.alpha = 0;
        this._substrate.visible = false;
        this._substrate.interactive = false;
    }

    destroy() {}
}

export default IntroScene;
