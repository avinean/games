import * as PIXI from "pixi.js";
import appSettings from "../settings/appSettings";
import Emitter from "component-emitter";

class Starter {
    constructor() {
        this.app = null;

        this._init = {};

        this._init.initPromise = new Promise(resolve => {
            this._init.setInitiated = resolve;
        });

        this.size = { ...appSettings.app };

        new Emitter(this);
    }

    init(container = document.body) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        //TODO: maybe remove view
        const view = document.querySelector(`content`);

        this.app = new PIXI.Application({
            width,
            height,
            transparent: true,
            view: view,
        });
        container.appendChild(this.app.view);

        this._ticker = new PIXI.Ticker();
        this._ticker.start();

        window.onresize = () => {
            this.resize();
        };

        this._init.setInitiated();
        this.resize();

        return this._init.initPromise;
    }

    resize() {
        const { width, height } = this.size;
        let { innerWidth: currW, innerHeight: currH } = window;

        let isLandscape = currW > currH;

        document.body.style.width = currW + "px";
        document.body.style.height = currH + "px";

        var gw, gh;

        if (isLandscape) {
            gh = width;
            gw = Math.floor(gh * (currW / currH));

            if (gw < height) {
                gw = height;
                gh = Math.floor(height * (currH / currW));
            }
        } else {
            gh = height;
            gw = Math.floor(gh * (currW / currH));

            if (gw < width) {
                gw = width;
                gh = Math.floor(width * (currH / currW));
            }
        }

        this.app.view.style.width = currW + `px`;
        this.app.view.style.height = currH + `px`;

        this.app.renderer.resize(gw, gh);

        this.emit(`onResize`, {
            w: gw,
            h: gh,
            isLandscape,
        });
    }

    get initiated() {
        return this._init.initPromise;
    }
}

const starter = new Starter();

export default starter;
