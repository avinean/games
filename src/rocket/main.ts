import Game from '../engine/Game';
import starterInstance from '../engine/Starter';
import { GameConfigInterface } from '../engine/models/GameConfigInterface';
import { ScenesEnum } from './scripts/models/enums/ScenesEnum';

import appSettings from './scripts/settings/appSettings';

import MainSceneController from './scripts/scenes/MainScene/MainSceneController';
import MainSceneStore from './scripts/scenes/MainScene/MainSceneStore';

import PlaySceneController from './scripts/scenes/PlayScene/PlaySceneController';
import GameOverScene from './scripts/scenes/GameOverScene/GameOverSceneController';
import { MainSceneStoreName } from './scripts/models/types/MainSceneStoreModel';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    if (container) {
        starterInstance.init().then(()=> {
            const gameConfig: GameConfigInterface = {
               scenes: [
                   {
                       name: ScenesEnum.Main,
                       instance: MainSceneController,
                       store: {
                           instance: MainSceneStore,
                           name: MainSceneStoreName
                       },
                       isDefault: true,
                   },
                   {
                       name: ScenesEnum.Play,
                       instance: PlaySceneController,
                   },
                   {
                       name: ScenesEnum.GameOver,
                       instance: GameOverScene,
                   },
               ],
               appSettings,
            };
            const game = new Game(gameConfig);
        });
    }
});
