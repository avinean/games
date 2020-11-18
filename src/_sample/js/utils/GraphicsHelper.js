import * as PIXI from "pixi.js";
import { IMAGES } from "../../base64/images";

export default class GraphicsHelper {
    static createContainer(settings = {}) {
        const { x = 0, y = 0, width = 0, height = 0 } = settings;

        const container = new PIXI.Container();
        container.x = x;
        container.y = y;
        container.width = width;
        container.height = height;

        return container;
    }

    static createColorContainer(settings = {}) {
        const {
            x = 0,
            y = 0,
            width = 0,
            height = 0,
            color,
            onClick,
            alpha = 1,
        } = settings;

        const container = new PIXI.Container();

        // move container to screen center
        container.x = x;
        container.y = y;
        container.alpha = alpha;
        container.width = width;
        container.height = height;

        const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

        sprite.width = width;
        sprite.height = height;
        sprite.tint = color;
        sprite.setParent(container);

        if (onClick) {
            container.buttonMode = true;
            container.interactive = true;
            container.on("pointerdown", onClick);
        }

        return container;
    }

    static createSprite(settings) {
        const { name, x = 0, y = 0, onClick, alpha = 1 } = settings;

        const base64source = IMAGES[name];
        const texture = PIXI.Texture.fromLoader(base64source);
        const sprite = new PIXI.Sprite(texture);

        sprite.x = x;
        sprite.y = y;
        sprite.alpha = alpha;

        if (onClick) {
            sprite.buttonMode = true;
            sprite.interactive = true;
            sprite.on("pointerdown", onClick);
        }

        return sprite;
    }

    static drawText(settings) {
        const sourceTxt = `input your text`;
        const { text = sourceTxt, x = 0, y = 0, style } = settings;

        const txt = new PIXI.Text(text, style);
        txt.x = x;
        txt.y = y;
        txt.anchor.set(0.5);
        return txt;
    }

    static drawGraphics(settings) {
        const {
            color = 0x000000,
            x = 0,
            y = 0,
            width = 20,
            height = 20,
            rounded = 0,
            onClick,
        } = settings;

        const graphics = new PIXI.Graphics();

        graphics.beginFill(color);
        graphics.drawRoundedRect(x, y, width, height, rounded); //TODO Nine splice
        graphics.endFill();

        if (onClick) {
            graphics.buttonMode = true;
            graphics.interactive = true;
            graphics.on("pointerdown", onClick);
        }

        return graphics;
    }
}
