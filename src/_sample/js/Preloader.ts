
const webFontLoader = require('webfontloader');

import { Loader } from 'pixi.js';
import { AUDIO } from '../base64/audio';
import { IMAGES } from "../base64/images";
import { CUSTOM_FONTS_NAMES } from "../fonts/custom_fonts_names";

import sound from 'pixi-sound';

export class Preloader extends Loader {
    private loadedResources = {
        fonts: false,
        images: false,
        audio: false
    };

    webFontConfig: { custom: { families: string[]; }; google: { families: string[]; }; active: (error: any) => void; };

    constructor() {
        super();

        this.webFontConfig = {
            custom: {
                families: CUSTOM_FONTS_NAMES
            },
          
            google: {
                families: ['Ultra']
            },
    
            active: (error) => {
                if (error) {
                    console.error(error);
                }
    
                this.onFontsReady();
            }
        }

        this.loadResources();
    }

    private static base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    private onFontsReady() {
        this.loadedResources.fonts = true;
        this.onResourceTypeIsLoaded();
    }

    private onAudioReady() {
        this.loadedResources.audio = true;
        this.onResourceTypeIsLoaded();
    }

    private loadResources() {
        // Images
        for (const key in IMAGES) {
            this.add(key, IMAGES[key]);
        }

        this.load((loader, resources) => {
            this.loadedResources.images = true;
            this.onResourceTypeIsLoaded();
        });
      
        // Audio
        let audiosLeft = Object.keys(AUDIO).length;

        if (!audiosLeft) {
            this.onAudioReady();
        }

        for (const key in AUDIO) {
            sound.Sound.from({
                source: Preloader.base64ToArrayBuffer(AUDIO[key]),
                preload: true,
                loaded: (err, soundValue) => {
                    audiosLeft--;

                    sound.add(key, soundValue);

                    if (!audiosLeft) {
                        this.onAudioReady();
                    }
                }
            });
        }

        // Fonts
        if (this.webFontConfig.custom.families.length || this.webFontConfig.google.families.length) {
            webFontLoader.load(this.webFontConfig);
        } else {
            this.onFontsReady();
        }
    }

    private onResourceTypeIsLoaded() {
        for (let r in this.loadedResources) {
            if (!this.loadedResources[r]) {
                return;
            }
        }

        // When all resources are loaded
        console.log('ResourcesReady');
        this.emit('resourcesLoaded');
    }
}

export const preloader = new Preloader();