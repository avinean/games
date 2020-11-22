export interface SceneInterface {
    name: string;
    instance: any;
    isDefault?: boolean;
}

export interface AppSize {
    width: number;
    height: number;
}

export interface AppSettings {
    app: AppSize;
    colors: {
        [key: string]: string;
    };
}

export interface GameConfigInterface {
    scenes: SceneInterface[];
    appSettings: AppSettings;
}
