var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ol/source", "../functions", "@turf/helpers", "@turf/boolean-point-in-polygon", "@turf/line-intersect", "./mixin"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NowMap = void 0;
    var source_1 = require("ol/source");
    var functions_1 = require("../functions");
    var helpers_1 = require("@turf/helpers");
    var boolean_point_in_polygon_1 = __importDefault(require("@turf/boolean-point-in-polygon"));
    var line_intersect_1 = __importDefault(require("@turf/line-intersect"));
    var mixin_1 = require("./mixin");
    var NowMap = (function (_super) {
        __extends(NowMap, _super);
        function NowMap(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, (options = (function () {
                options = functions_1.normalizeArg(options);
                if (!options.imageExtension)
                    options.imageExtension = "jpg";
                if (options.mapID && !options.url && !options.urls) {
                    options.url = options.tms
                        ? "tiles/" + options.mapID + "/{z}/{x}/{-y}." + options.imageExtension
                        : "tiles/" + options.mapID + "/{z}/{x}/{y}." + options.imageExtension;
                }
                return options;
            })())) || this;
            if (options.mapID) {
                _this.mapID = options.mapID;
            }
            mixin_1.setCustomInitialize(_this, options);
            mixin_1.setupTileLoadFunction(_this);
            return _this;
        }
        NowMap.createAsync = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new NowMap(options)];
                });
            });
        };
        NowMap.prototype.insideCheckXy = function (xy) {
            if (!this.envelope)
                return true;
            return boolean_point_in_polygon_1.default(xy, this.envelope);
        };
        NowMap.prototype.insideCheckSysCoord = function (histCoords) {
            return this.insideCheckXy(histCoords);
        };
        NowMap.prototype.modulateXyInside = function (xy) {
            if (!this.centroid)
                return xy;
            var expandLine = helpers_1.lineString([xy, this.centroid]);
            var intersect = line_intersect_1.default(this.envelope, expandLine);
            if (intersect.features.length > 0 && intersect.features[0].geometry) {
                return intersect.features[0].geometry.coordinates;
            }
            else {
                return xy;
            }
        };
        NowMap.prototype.modulateSysCoordInside = function (histCoords) {
            return this.modulateXyInside(histCoords);
        };
        NowMap.prototype.merc2XyAsync = function (merc) {
            return Promise.resolve(merc);
        };
        NowMap.prototype.merc2XyAsync_ignoreBackground = function (merc) {
            return this.merc2XyAsync(merc);
        };
        NowMap.prototype.xy2MercAsync = function (xy) {
            return Promise.resolve(xy);
        };
        NowMap.prototype.xy2SysCoord = function (xy) {
            return xy;
        };
        NowMap.prototype.sysCoord2Xy = function (sysCoord) {
            return sysCoord;
        };
        NowMap.prototype.viewpoint2MercsAsync = function (viewpoint, size) {
            var sysCoords = this.viewpoint2SysCoords(viewpoint, size);
            var xys = this.sysCoords2Xys(sysCoords);
            return this.xys2MercsAsync(xys);
        };
        NowMap.prototype.mercs2ViewpointAsync = function (mercs) {
            var _this = this;
            return this.mercs2XysAsync(mercs).then(function (xys) {
                var sysCoords = _this.xys2SysCoords(xys);
                return _this.sysCoords2Viewpoint(sysCoords);
            });
        };
        NowMap.prototype.mercs2SysCoordsAsync_multiLayer = function (mercs) {
            var _this = this;
            return Promise.all(mercs[0].map(function (merc) { return _this.merc2SysCoordAsync(merc); })).then(function (xys) { return [[xys, mercs[1]]]; });
        };
        return NowMap;
    }(mixin_1.setCustomFunction(source_1.OSM)));
    exports.NowMap = NowMap;
});
//# sourceMappingURL=nowmap.js.map