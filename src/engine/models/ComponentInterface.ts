import { StoreInterface } from './StoreInterface';

export interface ComponentInterface {
    readonly _starter: any;
    readonly _graphicsHelper: any;
    readonly _sceneManager: any;
    readonly _store: StoreInterface;
    _container: any;

    //methods
    init(): void;

    show(): void;

    hide(): void;

    // events
    onInit(): void;

    onResize(data): void;

    onShow(): void;

    onHide(): void;

    onTick(): void;

    // utils
    readonly starter: any;

    readonly graphicsHelper: any;

    readonly sceneManager: any;

    readonly store: StoreInterface
}
