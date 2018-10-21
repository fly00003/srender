import guid from './tool/guid';
import * as zrUtil from './tool/util';

import Storage from './Storage';
import Painter from './Painter';
import Handler from './Handler';

export {default as Circle} from './shape/Circle';
var instances = {};



export function init(dom, opts) {
    var sr = new SRender(guid(), dom, opts);
    instances[sr.id] = sr;
    console.log(sr.id)
    return sr;
}

export function dispose(sr) {
    if (sr) {
        sr.dispose();
    }
    else {
        for (var key in instances) {
            if (instances.hasOwnProperty(key)) {
                instances[key].dispose();
            }
        }
        instances = {};
    }

    return this;
}

export function getInstance(id) {
    return instances[id];
}

function delInstance(id) {
    delete instances[id];
}

var SRender = function (id, dom, opts) {

    opts = opts || {};
    
        
    this.dom = dom;
    
        
    this.id = id;
    
    var self = this;
    var storage = new Storage();
    
    var painter = new Painter(dom, storage, opts);
    
    var handler=new Handler(dom, storage, painter);
    this.storage = storage;
    this.painter = painter;
    
    this._needsRefresh;


    

    
     
};
SRender.prototype = {
    
    constructor: SRender,
        
    getId: function () {
        return this.id;
    },
    
        
    add: function (el) {
        this.storage.addRoot(el);
        this._needsRefresh = true;
        //
        this.painter.refresh();
    },
    
        
    remove: function (el) {
        this.storage.delRoot(el);
        this._needsRefresh = true;
        //
        this.painter.refresh();
    },

    refreshImmediately: function () {
       
        this._needsRefresh = false;
        this.painter.refresh();
        this._needsRefresh = false;
    },

    refresh: function() {
        this._needsRefresh = true;
    },
    getWidth: function() {
        return this.painter.getWidth();
    },

    getHeight: function() {
        return this.painter.getHeight();
    },

}    

