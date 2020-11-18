import GraphicsHelper from '../utils/GraphicsHelper';
import starter from '../engine/Starter';

export default class LifeBar {
    constructor() {

        this._container = null;
        this._numberText = null;

        // TODO: all data from Storage
        this._number = 0;

        this._DATA = {
            // move styles to other location
            styles: {
                counter: {
                    fill: '#2f5f21',
                    fontFamily: 'Comic Sans MS',
                    fontSize: 90,
                    fontWeight: 'bold',
                    letterSpacing: 10,
                    stroke: '#392215',
                    strokeThickness: 5,
                },
            },
        };

        this._init();
    }

    show() {
        this._container.visible = true;
    }

    hide() {
        this._container.visible = false;
    }

    update() {
        this._number += 1;
        this._numberText.text = `x${this._number}`;
    }

    get container() {
        return this._container;
    }

    _init() {
        const { counter } = this._DATA.styles;

        this._container = GraphicsHelper.createContainer({});
        starter.app.stage.addChild(this._container);

        this._numberText = GraphicsHelper.drawText({
            text: `x${this._number}`,
            style: counter,
        });

        this._container.addChild(this._numberText);
    }
}
