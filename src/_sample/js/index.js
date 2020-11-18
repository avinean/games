  
// import "@styles";
import starter from "./engine/Starter";
import Game from "./engine/Game.js";
import { preloader } from './Preloader.ts';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".content");
    if (container) {
    starter.init().then(() => {
        preloader.on('resourcesLoaded', () => {
            new Game();
        });
    });
    }
});