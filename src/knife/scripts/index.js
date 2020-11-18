import starter from './engine/Starter';
import Game from './engine/Game';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    if (container) {
        starter.init().then(() => {
            // eslint-disable-next-line no-unused-vars
            const game = new Game();
        });
    }
});
