import Weiwudi from "weiwudi";
import { MaplatMap } from "../map_ex";
import { Coordinate } from "ol/coordinate";
import { Feature, Polygon } from "@turf/turf";
import { Size } from "ol/size";
declare type Constructor<T = {}> = new (...args: any[]) => T;
declare type ViewpointObject = {
    x?: number;
    y?: number;
    latitude?: number;
    longitude?: number;
    mercZoom?: number;
    zoom?: number;
    direction?: number;
    rotation?: number;
};
export declare type ViewpointArray = [Coordinate?, number?, number?];
export declare type CrossCoordinatesArray = [
    Coordinate[],
    Size?
];
export declare function setCustomFunction<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        weiwudi?: Weiwudi | undefined;
        _map?: MaplatMap | undefined;
        homePosition?: Coordinate | undefined;
        mercZoom?: number | undefined;
        pois: any;
        officialTitle: string;
        title: string;
        mapID: string;
        label: string;
        initialWait?: Promise<any> | undefined;
        maxZoom?: number | undefined;
        minZoom?: number | undefined;
        envelope?: Feature<Polygon, import("@turf/helpers").Properties> | undefined;
        centroid?: number[] | undefined;
        insideCheckHistMapCoords(coord: Coordinate): boolean;
        getCacheEnable(): boolean;
        getTileCacheStatsAsync(): Promise<{
            size?: number | undefined;
            count?: number | undefined;
            total?: number | undefined;
            percent?: number | undefined;
        }>;
        getTileCacheSizeAsync(): Promise<number>;
        fetchAllTileCacheAsync(callback: any): Promise<void>;
        cancelTileCacheAsync(): Promise<void>;
        clearTileCacheAsync(): Promise<void>;
        getMap(): MaplatMap | undefined;
        setViewpointRadian(cond: ViewpointObject): void;
        setViewpoint(cond: ViewpointObject): void;
        goHome(): void;
        setGPSMarkerAsync(position: any, ignoreMove?: boolean): Promise<unknown>;
        setGPSMarker(position: any, ignoreMove?: boolean): void;
        mercsFromGPSValue(lnglat: Coordinate, acc: number): number[][];
        rotateMatrix(xys: number[][], theta?: number | undefined): Coordinate[];
        resolvePois(pois?: any): Promise<void>;
        getPoi(id: string): undefined;
        addPoi(data: any, clusterId?: string | undefined): any;
        removePoi(id: string): void;
        clearPoi(clusterId?: string | undefined): void;
        listPoiLayers(hideOnly?: boolean, nonzero?: boolean): any[];
        getPoiLayer(id: string): any;
        addPoiLayer(id: string, data: any): void;
        removePoiLayer(id: string): void;
        merc2XyAsync(merc: Coordinate): Promise<Coordinate>;
        merc2XyAsync_ignoreBackground(merc: Coordinate): Promise<Coordinate | void>;
        xy2MercAsync(xy: Coordinate): Promise<Coordinate>;
        xy2SysCoord(xy: Coordinate): Coordinate;
        sysCoord2Xy(sysCoord: Coordinate): Coordinate;
        viewpoint2MercsAsync(viewpoint?: ViewpointArray | undefined, size?: Size | undefined): Promise<CrossCoordinatesArray>;
        mercs2ViewpointAsync(mercs: CrossCoordinatesArray): Promise<ViewpointArray>;
        mercs2SysCoordsAsync_multiLayer(mercs: CrossCoordinatesArray): Promise<(CrossCoordinatesArray | undefined)[]>;
        merc2SysCoordAsync_ignoreBackground(merc: Coordinate): Promise<Coordinate | void>;
        merc2SysCoordAsync(merc: Coordinate): Promise<Coordinate>;
        sysCoord2MercAsync(sysCoord: Coordinate): Promise<Coordinate>;
        zoom2Radius(size: Size, zoom?: number | undefined): number;
        viewpoint2SysCoords(viewpoint?: ViewpointArray | undefined, size?: Size | undefined): CrossCoordinatesArray;
        mercViewpoint2Mercs(viewpoint?: ViewpointArray | undefined, size?: Size | undefined): CrossCoordinatesArray;
        sysCoords2Viewpoint(sysCoords: CrossCoordinatesArray): ViewpointArray;
        mercs2MercViewpoint(mercs: CrossCoordinatesArray): ViewpointArray;
        sysCoords2Xys(sysCoords: CrossCoordinatesArray): CrossCoordinatesArray;
        xys2SysCoords(xys: CrossCoordinatesArray): CrossCoordinatesArray;
        mercs2XysAsync(mercs: CrossCoordinatesArray): Promise<CrossCoordinatesArray>;
        xys2MercsAsync(xys: CrossCoordinatesArray): Promise<CrossCoordinatesArray>;
    };
} & TBase;
export declare const META_KEYS: string[];
export declare function setCustomInitialize(self: any, options: any): void;
export declare function setupTileLoadFunction(target: any): void;
export {};
