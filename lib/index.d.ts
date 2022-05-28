import CustomEvent from "./customevent";
import { Logger } from "./logger";
import { createElement } from "./functions";
import EventTarget from "ol/events/Target";
import { MaplatMap } from "./map_ex";
import { HistMap } from "./source/histmap";
import { NowMap } from "./source/nowmap";
import { ViewpointArray } from "./source/mixin";
import { Coordinate } from "ol/coordinate";
interface AppData {
    sources: string[];
    lang?: string;
    pois?: any;
    homePosition?: Coordinate;
    defaultZoom?: number;
    zoomRestriction?: boolean;
    minZoom?: number;
    maxZoom?: number;
    appName?: string;
    fakeGps?: Coordinate;
    fakeRadius?: number;
    noRotate?: boolean;
    poiTemplate?: string;
    poiStyle?: string;
    iconTemplate?: string;
    startFrom?: string;
    controls?: any[];
}
declare type PositionSet = {
    x: number;
    y: number;
    zoom: number;
    rotation: number;
};
interface Restore {
    mapID?: string;
    backgroundID?: string;
    position?: PositionSet;
    transparency?: number;
    hideMarker?: number;
    hideLayer?: string;
}
export declare class MaplatApp extends EventTarget {
    appid: string;
    translateUI: boolean;
    noRotate: boolean;
    initialRestore: Restore;
    mapboxgl: any;
    mapDiv: string;
    restoreSession: boolean;
    enableCache: false;
    stateBuffer: Restore;
    mobileMapMoveBuffer?: ViewpointArray;
    overlay: boolean;
    waitReady: Promise<void>;
    changeMapSeq?: Promise<void>;
    i18n?: any;
    t?: any;
    lang: string;
    appData?: AppData;
    appLang: string;
    backMap?: MaplatMap;
    mercSrc?: NowMap;
    mercBuffer: any;
    timer: any;
    appName: any;
    cacheHash: any;
    currentPosition: any;
    startFrom?: string | undefined;
    from?: NowMap | HistMap;
    vectors: any;
    mapDivDocument: HTMLElement | null;
    mapObject: any;
    mapboxMap: any;
    pois: any;
    poiTemplate?: string;
    poiStyle?: string;
    iconTemplate?: string;
    logger: Logger;
    icon?: string;
    selectedIcon?: string;
    __backMapMoving: boolean;
    __selectedMarker: any;
    __init: boolean;
    __redrawMarkerBlock: boolean;
    __redrawMarkerThrottle: (NowMap | HistMap)[];
    __transparency: any;
    lastClickEvent: any;
    constructor(appOption: any);
    settingLoader(setting: any): Promise<any>;
    i18nLoader(): Promise<unknown>;
    sourcesLoader(mapReturnValue: any): Promise<unknown[]>;
    handleSetting(setting: any, appOption: any): Promise<void>;
    handleI18n(i18nObj: any, appOption: any): Promise<void>;
    prepareMap(appOption: any): {
        homePos: Coordinate | undefined;
        defZoom: number | undefined;
        zoomRestriction: boolean | undefined;
        mercMinZoom: number | undefined;
        mercMaxZoom: number | undefined;
    };
    handlePois(pois: any, mapReturnValue: any): Promise<void>;
    handleSources(sources: any): void;
    setInitialMap(cache: (HistMap | NowMap)[]): Promise<void>;
    setMapClick(): void;
    setPointerEvents(): void;
    setMapOnOff(): void;
    setMouseCursor(): void;
    setBackMapBehavior(): void;
    raiseChangeViewpoint(): void;
    currentMapInfo(): any;
    mapInfo(mapID: string): any;
    setMarker(data: any): Promise<void>;
    resetMarker(): void;
    setLine(data: any): void;
    setVector(data: any): void;
    resetLine(): void;
    resetVector(): void;
    redrawMarkers(source?: HistMap | NowMap | undefined): void;
    selectMarker(id: any): void;
    unselectMarker(): void;
    getMarker(id: any): any;
    updateMarker(id: any, data: any, overwrite: any): void;
    addMarker(data: any, clusterId: any): any;
    removeMarker(id: any): void;
    clearMarker(clusterId: any): void;
    showAllMarkers(): void;
    hideAllMarkers(): void;
    dispatchPoiNumber(): void;
    listPoiLayers(hideOnly?: boolean, nonzero?: boolean): any[];
    showPoiLayer(id: any): void;
    hidePoiLayer(id: any): void;
    getPoiLayer(id: any): any;
    addPoiLayer(id: any, data: any): void;
    removePoiLayer(id: any): void;
    addLine(data: any): void;
    addVector(data: any): void;
    clearLine(): void;
    clearVector(): void;
    setGPSMarker(position: any): void;
    changeMap(mapID: string, restore?: Restore): Promise<void>;
    requestUpdateState(data: Restore): void;
    setTransparency(percentage: any): void;
    getTransparency(): any;
    setViewpoint(cond: any): void;
    getMapMeta(mapID: any): any;
    getMapCacheEnable(mapID: string): boolean;
    getMapTileCacheStatsAsync(mapID: string): Promise<{
        size?: number | undefined;
        count?: number | undefined;
        total?: number | undefined;
        percent?: number | undefined;
    }>;
    getMapTileCacheSizeAsync(mapID: string): Promise<any>;
    clearMapTileCacheAsync(mapID: string): Promise<void>;
    fetchAllMapTileCacheAsync(mapID: string, callback: any): Promise<void>;
    cancelMapTileCacheAsync(mapID: string): Promise<void>;
    convertParametersFromCurrent(to: any, callback: any): void;
    translate(dataFragment?: Record<string, string> | string): string | undefined;
    remove(): void;
}
export { createElement };
export { CustomEvent };
