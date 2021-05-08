/// <reference path="../../src/types/weiwudi.d.ts" />
import { OSM } from "ol/source";
import { Coordinate } from "ol/coordinate";
import { Size } from "ol/size";
declare const NowMap_base: {
    new (...args: any[]): {
        weiwudi?: import("weiwudi").default | undefined;
        _map?: import("../map_ex").MaplatMap | undefined;
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
        envelope?: import("@turf/helpers").Feature<import("@turf/helpers").Polygon, import("@turf/helpers").Properties> | undefined;
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
        getMap(): import("../map_ex").MaplatMap | undefined;
        setViewpointRadian(cond: {
            x?: number | undefined;
            y?: number | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
            mercZoom?: number | undefined;
            zoom?: number | undefined;
            direction?: number | undefined;
            rotation?: number | undefined;
        }): void;
        setViewpoint(cond: {
            x?: number | undefined;
            y?: number | undefined;
            latitude?: number | undefined;
            longitude?: number | undefined;
            mercZoom?: number | undefined;
            zoom?: number | undefined;
            direction?: number | undefined;
            rotation?: number | undefined;
        }): void;
        goHome(): void;
        setGPSMarkerAsync(position: any, ignoreMove?: boolean): Promise<unknown>;
        setGPSMarker(position: any, ignoreMove?: boolean): void;
        mercsFromGivenMercZoom(center: Coordinate, mercZoom?: number | undefined, direction?: number | undefined): Coordinate[];
        mercsFromGPSValue(lnglat: Coordinate, acc: number): number[][];
        rotateMatrix(xys: number[][], theta?: number | undefined): Coordinate[];
        mercs2MercRotation(xys: Coordinate[]): number;
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
        merc2XyAsync_ignoreBackground(merc: Coordinate): Promise<void | Coordinate>;
        xy2MercAsync(xy: Coordinate): Promise<Coordinate>;
        xy2SysCoord(xy: Coordinate): Coordinate;
        sysCoord2Xy(sysCoord: Coordinate): Coordinate;
        viewPoint2MercsAsync(center?: Coordinate | undefined, zoom?: number | undefined, rotate?: number | undefined, size?: Size | undefined): Promise<Coordinate[]>;
        mercs2ViewPointAsync(mercs: Coordinate[]): Promise<[Coordinate, number, number]>;
        mercs2SysCoordsAsync_multiLayer(mercs: Coordinate[]): Promise<(Coordinate[] | undefined)[]>;
        merc2SysCoordAsync_ignoreBackground(merc: Coordinate): Promise<void | Coordinate>;
        merc2SysCoordAsync(merc: Coordinate): Promise<Coordinate>;
        sysCoord2MercAsync(sysCoord: Coordinate): Promise<Coordinate>;
        zoom2Radius(size: Size, zoom?: number | undefined): number;
        viewPoint2SysCoords(center?: Coordinate | undefined, zoom?: number | undefined, rotate?: number | undefined, size?: Size | undefined): Coordinate[];
        mercViewPoint2Mercs(center?: Coordinate | undefined, zoom?: number | undefined, rotate?: number | undefined, size?: Size | undefined): Coordinate[];
        sysCoords2ViewPoint(sysCoords: Coordinate[]): [Coordinate, number, number];
        mercs2MercViewPoint(mercs: Coordinate[]): [Coordinate, number, number];
        sysCoords2Xys(sysCoords: Coordinate[]): Coordinate[];
        xys2SysCoords(xys: Coordinate[]): Coordinate[];
        mercs2XysAsync(mercs: Coordinate[]): Promise<Coordinate[]>;
        xys2MercsAsync(xys: Coordinate[]): Promise<Coordinate[]>;
    };
} & typeof OSM;
export declare class NowMap extends NowMap_base {
    constructor(options?: any);
    static createAsync(options: any): Promise<NowMap>;
    insideCheckXy(xy: Coordinate): boolean;
    insideCheckHistMapCoords(histCoords: Coordinate): boolean;
    modulateXyInside(xy: any): any;
    modulateHistMapCoordsInside(histCoords: any): any;
    merc2XyAsync(merc: Coordinate): Promise<Coordinate>;
    merc2XyAsync_ignoreBackground(merc: Coordinate): Promise<Coordinate | void>;
    xy2MercAsync(xy: Coordinate): Promise<Coordinate>;
    xy2SysCoord(xy: Coordinate): Coordinate;
    sysCoord2Xy(sysCoord: Coordinate): Coordinate;
    viewPoint2MercsAsync(center?: Coordinate, zoom?: number, rotate?: number, size?: Size): Promise<Coordinate[]>;
    mercs2ViewPointAsync(mercs: Coordinate[]): Promise<[Coordinate, number, number]>;
    mercs2SysCoordsAsync_multiLayer(mercs: Coordinate[]): Promise<(Coordinate[] | undefined)[]>;
}
export {};
