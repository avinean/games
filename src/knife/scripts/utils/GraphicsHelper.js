import {
    Sprite, Container, Graphics, Circle, TextStyle, Text, Texture,
} from 'pixi.js';
import { IMAGES } from '@assets/images';

export default class GraphicsHelper {
    static createContainer(settings = {}) {
        const {
            x = 0,
            y = 0,
            width = 0,
            height = 0,
        } = settings;

        const container = new Container();
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

        const container = new Container();

        // move container to screen center
        container.x = x;
        container.y = y;
        container.alpha = alpha;
        container.width = width;
        container.height = height;

        const sprite = new Sprite(Texture.WHITE);

        sprite.width = width;
        sprite.height = height;
        sprite.tint = color;
        sprite.setParent(container);

        if (onClick) {
            container.buttonMode = true;
            container.interactive = true;
            container.on('pointerdown', onClick);
        }

        return container;
    }

    static createSprite(settings) {
        const {
            name,
            x = 0,
            y = 0,
            width,
            height,
            alpha = 1,
            anchor = 0.5,
            interactive,
            onClick,
            onClickOnce,
            parent,
        } = settings;

        const base64source = IMAGES[name];
        const texture = Texture.fromLoader(base64source);
        const sprite = new Sprite(texture);

        sprite.x = x;
        sprite.y = y;
        if (width) {
            sprite.width = width;
        }
        if (height) {
            sprite.height = height;
        }

        sprite.alpha = alpha;

        sprite.anchor.set(anchor);

        if (interactive || onClick || onClickOnce) {
            sprite.interactive = true;
        }

        if (onClick) {
            sprite.buttonMode = true;
            sprite.on('pointerdown', onClick);
        }

        if (onClickOnce) {
            sprite.buttonMode = true;
            sprite.once('pointerdown', onClickOnce);
        }

        if (parent) {
            sprite.setParent(parent);
        }

        return sprite;
    }

    static drawText(settings) {
        const {
            debugName,
            text = '',
            x = 0,
            y = 0,
            anchor = 0.5,
            style,
            parent,
        } = settings;

        const txt = new Text(text, style);
        txt.x = x;
        txt.y = y;
        txt.anchor.set(anchor);

        if (parent) {
            txt.setParent(parent);
        }

        return txt;
    }

    static drawGraphics(settings) {
        const {
            debugName = 'graphics',
            color = 0x000000,
            x = 0,
            y = 0,
            width = 20,
            height = 20,
            rounded = 0,
            onClick,
        } = settings;

        const graphics = new Graphics();

        graphics.beginFill(color);
        graphics.drawRoundedRect(x, y, width, height, rounded);
        graphics.endFill();

        if (onClick) {
            graphics.buttonMode = true;
            graphics.interactive = true;
            graphics.on('pointerdown', onClick);
        }

        return graphics;
    }

}
