import { Subject } from 'rxjs';
import cloneDeep from 'clone-deep';
import { StoreInterface } from './models/StoreInterface';

class Store implements StoreInterface {
    private store = {};

    registerStore(storeSectionName) {
        if (storeSectionName in this.store) {
            this.warning(storeSectionName + ' is already exist in store');
            return;
        }

        const observer = new Subject();
        this.store[storeSectionName] = {
            observer
        };

        // observer.subscribe((value) => {
        //     this.warning(storeSectionName, value)
        // });

        return this;
    }

    set(storeSectionName, storeSection) {
        if (!(storeSectionName in this.store)) {
            this.warning(storeSectionName + ' doesn\'t exist in store');
            return;
        }
        const {
            observer
        } = this.store[storeSectionName];

        observer.next(storeSection);

        return this;
    }

    get(storeSectionName) {
        if (!(storeSectionName in this.store)) {
            this.warning(storeSectionName + ' doesn\'t exist in store');
            return;
        }
        const {
            observer
        } = this.store[storeSectionName];

        return observer;
    }

    warning(msg, value = undefined) {
        console.log(`[${msg}]`, value)
    }
}

export default new Store();
