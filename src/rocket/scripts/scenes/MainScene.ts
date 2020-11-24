import Component from '@engine/Component';
import Store from '@engine/Store';

import Button from '../components/Button';
import { BackgroundEnums } from '../models/enums/BackgroundEnums';
import { ButtonTypesEnum } from '../models/enums/ButtonTypesEnum';
import { ScenesEnum } from '../models/enums/ScenesEnum';

class MainScene extends Component {
    _background;
    _playButton;

    _time = 0;

    constructor() {
        super();

        let store = {
            test: 123
        };

        Store
            .registerStore('testStore')
            .get('testStore').subscribe((value) => {
                store = value
                console.log(value);
            });
            
        setInterval(() => {
            
            Store.set('testStore', {
                ...store,
                test: store.test + 1
            })
        }, 1000);

    }

    onResize() {
        const { width, height } = this.starter.app.screen;

        const playButton = this._playButton.container;

        //Set background to the center on screen
        this._background.position.set(width / 2, height / 2);

        playButton.position.set(width / 2, height / 2);
    }

    onInit() {
        this._background = this.graphicsHelper.createSprite({
            name: BackgroundEnums.MainSceneBackground,
            anchor: 0.5,
        });
        this._container.addChild(this._background);

        const buttonSceneSettings = {
            parent: this._container,
            type: ButtonTypesEnum.PlayButton,
            cb: () => {
                this.sceneManager.showScene(ScenesEnum.Play);
            },
        };

        this._playButton = new Button(buttonSceneSettings);
    }
}

export default MainScene;
