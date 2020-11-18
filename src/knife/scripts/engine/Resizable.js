import starter from './Starter';

class Resizable {
    constructor() {
        starter.on('onResize', data => {
            this.onResize(data);
        });
    }

    // eslint-disable-next-line no-unused-vars
    onResize(data) {}
}

export default Resizable;
