// Avoid assign to an exported variable, for transforming to cjs.
var methods = {};

export var createCanvas = function () {
    return methods.createCanvas();
};

methods.createCanvas = function () {
    console.log('createdom')
    return document.createElement('canvas');
};

export function getContext() {
    if (!_ctx) {
        // Use util.createCanvas instead of createCanvas
        // because createCanvas may be overwritten in different environment
        _ctx = createCanvas().getContext('2d');
    }
    return _ctx;
}

export function indexOf(array, value) {
    if (array) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
    return -1;
}

export function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type === 'function' || (!!value && type == 'object');
}