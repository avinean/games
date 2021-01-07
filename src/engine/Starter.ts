import * as PIXI from 'pixi.js';
import TWEEN from 'tween.js';
import Emitter from 'component-emitter';
import { AppSize } from './models/GameConfigInterface';

class Starter {
    app = null;
    _init = {
        initPromise: new Promise(() => {}),
        setInitiated: null,
    };
    size: AppSize = null;
    _ticker: any;
    emit: any;

    constructor() {
        this._init.initPromise = new Promise(resolve => {
            this._init.setInitiated = resolve;
        });

        this.size = {
            width: 960,
            height: 960,
        };

        new Emitter(this);
    }

    init(container = document.body) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // TODO: maybe remove view
        const view = document.querySelector('content');

        this.app = new PIXI.Application({
            width,
            height,
            transparent: true,
            view: view as any,
        });
        container.appendChild(this.app.view);

        this._ticker = new PIXI.Ticker();
        this._ticker.start();
        this._ticker.add(() => {
            this.emit('onTick');
            TWEEN.update();
        });

        window.onresize = () => {
            this.resize();
        };

        this._init.setInitiated();
        this.resize();

        return this._init.initPromise;
    }

    resize() {
        const { width, height } = this.size;
        const { innerWidth: currW, innerHeight: currH } = window;

        const isLandscape = currW > currH;

        document.body.style.width = `${currW}px`;
        document.body.style.height = `${currH}px`;

        this.app.view.style.width = `${currW}px`;
        this.app.view.style.height = `${currH}px`;

        let gw;
        let gh;

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

        this.app.renderer.resize(gw, gh);

        this.emit('onResize', {
            w: gw,
            h: gh,
            isLandscape,
        });
    }

    get initiated() {
        return this._init.initPromise;
    }

    get ticker() {
        return this._ticker;
    }
}

export default new Starter();
