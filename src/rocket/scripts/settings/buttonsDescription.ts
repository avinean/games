import TWEEN from 'tween.js';
import styles from './styles';
import { ButtonTypesEnum } from '../models/enums/ButtonTypesEnum';

export default {
    [ButtonTypesEnum.PlayButton]: {
        text: 'Start',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },

    [ButtonTypesEnum.PlayAgainButton]: {
        text: 'Гаймовер. Давай пановай',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },

    [ButtonTypesEnum.ArrowLeft]: {
        text: '',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
    [ButtonTypesEnum.ArrowTop]: {
        text: '',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
    [ButtonTypesEnum.ArrowRight]: {
        text: '',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
    [ButtonTypesEnum.ArrowBottom]: {
        text: '',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.1,
                y: 1.1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
};
