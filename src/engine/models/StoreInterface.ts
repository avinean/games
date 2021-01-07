import { Observable } from 'rxjs';

export interface StoreInterface {
    registerStore(storeSectionName: string): StoreInterface;

    set(storeSectionName: string, storeSection): StoreInterface;

    get(storeSectionName: string): Observable<any>;

    warning(msg: string, value?: any): void;
}
