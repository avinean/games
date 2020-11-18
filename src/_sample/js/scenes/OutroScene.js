import starter from "../engine/Starter";
import GraphicsHelper from "../utils/GraphicsHelper";
import i18n from "../settings/i18n";
import Resizable from "../engine/Resizable";
import * as PIXI from "pixi.js";
import appSettings from "../settings/appSettings";
import PIXISound from 'pixi-sound';

class OutroScene extends Resizable {
    constructor() {
        super();

        this._container = null;
        this._substrate = null;
        this._textTop = null;
        this._textBottom = null;

        this._init();
        this.hide();
    }

    onResize(data) {
        const { w, h } = data;

        //landscape
        if (w > h) {
            this._textTop.y = h / 2 - 150;
            this._textBottom.y = h / 2 + 110;
        }

        //portrait
        if (w < h) {
            this._textTop.y = h / 2 - 200;
            this._textBottom.y = h / 2 + 100;
        }

        this._textTop.x = w / 2;
        this._textBottom.x = w / 2;

        this._substrate.width = w;
        this._substrate.height = h;
    }


    _init() {
        const { innerWidth: w, innerHeight: h } = window;

        const textStyles = {
            fill: "white",
            fontSize: 100,
            fontWeight: 900,
        };

        this._container = GraphicsHelper.createContainer({});
        this._container.setParent(starter.app.stage);

        this._substrate = GraphicsHelper.createColorContainer({
            width: w,
            height: h,
            color: appSettings.colors.outroSceneBg,
        });

        this._substrate.setParent(this._container);

        this._textTop = GraphicsHelper.drawText({
            x: w / 2,
            y: h / 2,
            text: i18n.outroScene_1,
            style: textStyles,
        });
        this._textTop.setParent(this._container);

        this._textBottom = GraphicsHelper.drawText({
            x: w / 2,
            y: h / 2 + 220,
            text: i18n.outroScene_2,
            style: {
                fill: "white",
                fontSize: 50,
                fontWeight: 900,
            },
        });
        this._textBottom.setParent(this._container);
    }

    show() {
        this._container.alpha = 1;
        this._substrate.visible = true;
        this._substrate.interactive = true;

        PIXISound.play('gameplay_last_loop', {
            loop: true
        });
    }

    hide() {
        this._container.alpha = 0;
        this._substrate.visible = false;
        this._substrate.interactive = false;
    }
}

export default OutroScene;
