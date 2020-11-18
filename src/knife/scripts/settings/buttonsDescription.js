import TWEEN from 'tween.js';
import styles from './styles';

export default {
    1: {
        text: 'change counter state',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1,
                y: 1,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
    
    2: {
        text: 'NEXT SCENE',
        style: styles.buttonsText.play,

        animations: {
            scale: {
                time: 700,
                x: 1.08,
                y: 1.06,
            },

            move: {
                time: 500,
                x: 1200,
                easing: TWEEN.Easing.Back.InOut,
            },
        },
    },
};
