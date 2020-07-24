
// Async initializer 6: Load pois setting
export async function nodesLoader(nodes) {
    if (typeof nodes == 'string') {
        return new Promise(((resolve, reject) => {
            const url = nodes.match(/\//) ? nodes : `pois/${nodes}`;

            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('GET', url, true);
            xhr.responseType = 'json';

            xhr.onload = function(e) { // eslint-disable-line no-unused-vars
                if (this.status == 200 || this.status == 0) { // 0 for UIWebView
                    try {
                        let resp = this.response;
                        if (typeof resp != 'object') resp = JSON.parse(resp);
                        resolve(resp);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject('Fail to load poi json');
                }
            };
            xhr.send();
        }));
    } else {
        return nodes;
    }
}

//pois: Process layers
export async function normalizeLayers(layers, options) {
    // Resolve url cases
    layers = await nodesLoader(layers);

    //In case "layers" is array
    if (Array.isArray(layers)) {
        layers = await Promise.all(layers.map(async (x) => await nodesLoader(x)));
        //In case of array of FeatureCollection
        if (layers.length > 0 && layers[0].type === 'FeatureCollection') {
            layers = layers.reduce((prev, layer, index) => {
                let key = layer.id || (layer.properties && layer.properties.id);
                if (!key) {
                    if (index === 0) key = 'main';
                    else throw 'POI layers include bad key setting';
                }
                prev[key] = normalizeLayer(layer, key, options);
                return prev;
            }, {});
        //In case old type single layer spec
        } else {
            layers = {
                main: normalizeLayer(layers, 'main', options)
            };
        }
    // In case of single FeatureCollection
    } else if (layers.type === 'FeatureCollection') {
        const key = layers.id || (layers.properties && layers.properties.id) || 'main';
        layers = {[key]: normalizeLayer(layers, key, options)};
    // In case current non-geojson layers spec
    } else {
        Object.keys(layers).map(key => {
            layers[key] = normalizeLayer(layers[key], key, options);
        });
    }

    // Add main layer if not exists
    if (!layers['main']) {
        layers['main'] = normalizeLayer([], 'main', options);
    }
    Object.keys(layers).map((key) => {
        addIdToPoi(layers, key, options);
    });

    return layers;
}

//pois: Process layers
export function normalizeLayer(layer, key, options) {
    //In case "layer" is array (Old spec)
    if (Array.isArray(layer)) {
        layer = {
            namespace_id: `${options.namespace ? `${options.namespace}#` : ''}${key}`,
            name: key === 'main' ? options.name : key,
            pois: layer.map(x => normalizePoi(x))
        };
    //In case "layer" is FeatureCollection
    } else if (layer.type === 'FeatureCollection') {
        const name = layer.name ||
            (layer.properties && layer.properties.name) ||
            (key === 'main' && options.name) || key;
        layer = {
            namespace_id: `${options.namespace ? `${options.namespace}#` : ''}${key}`,
            name: name,
            pois: layer.features.map(x => normalizePoi(x))
        };
    }

    if (!layer.namespace_id) layer.namespace_id = `${options.namespace ? `${options.namespace}#` : ''}${key}`;
    if (!layer.name) layer.name = key === 'main' ? options.name : key;
    if (!layer.pois) layer.pois = [];

    return layer;
}

//pois: Process poi
export function normalizePoi(poi) {
    //In case "poi" is GeoJson(Point)
    if (poi.type === 'Feature') {
        const buffer = Object.assign({}, poi.properties);
        buffer.lnglat = poi.geometry.coordinates;
        if (!buffer.id) buffer.id = poi.id;
        if (!buffer.name) buffer.name = poi.name;
        poi = buffer;
    }
    if (!poi.lnglat) poi.lnglat = [poi.lng || poi.longitude, poi.lat || poi.latitude];
    delete poi.lng;
    delete poi.lat;
    delete poi.longitude;
    delete poi.latitude;
    return poi;
}

// Add id to every pois
export function addIdToPoi(layers, key, options) {
    if (!layers[key]) return;
    const cluster = layers[key];
    const pois = cluster.pois;
    if (!cluster.__nextId) {
        cluster.__nextId = 0;
    }
    pois.map((poi) => {
        if (!poi.id) {
            poi.id = `${key}_${cluster.__nextId}`;
            cluster.__nextId++;
        }
        if (!poi.namespace_id) {
            poi.namespace_id = `${options.namespace ? `${options.namespace}#` : ''}${poi.id}`;
        }
    });
}