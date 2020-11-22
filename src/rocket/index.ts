import Game from '@engine/Game.ts';
import starterInstance from '@engine/Starter.ts';
import { GameConfigInterface } from '@engine/models/GameConfigInterface.ts';
import { ScenesEnum } from '@scripts/models/enums/ScenesEnum.ts';

import appSettings from '@scripts/settings/appSettings.ts';

import MainScene from '@scripts/scenes/MainScene.ts';
import PlayScene from '@scripts/scenes/PlayScene.ts';
import GameOverScene from '@scripts/scenes/GameOverScene.ts';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    if (container) {
        starterInstance.init().then(()=> {
            const gameConfig: GameConfigInterface = {
               scenes: [
                   {
                       name: ScenesEnum.Main,
                       instance: MainScene,
                       isDefault: true,
                   },
                   {
                       name: ScenesEnum.Play,
                       instance: PlayScene,
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
