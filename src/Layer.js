import * as util from './tool/util';
import {devicePixelRatio} from './config';

function returnFalse() {
    return false;
}

function createDom(id, painter, dpr) {
    
    var newDom = util.createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();
    console.log("newDom")
    
    var newDomStyle = newDom.style;
    if (newDomStyle) {  // In node or some other non-browser environment
        console.log("进入分支")
        newDomStyle.position = 'absolute';
        newDomStyle.border='1px dashed gray';
        newDomStyle.left = 0;
        newDomStyle.top = 0;
        newDomStyle.width = width + 'px';
        newDomStyle.height = height + 'px';
        
        newDom.setAttribute('data-zr-dom-id', id);
    }
    console.log(width)
    console.log(height)
    newDom.width = 1000//width * dpr;
    newDom.height = 800//height * dpr;
    console.log(newDom.width)
    console.log(newDom.height)
   // newDom.cnv=document.getElementsByTagName("canvas")[0];
    return newDom;
}

var Layer = function(id, painter, dpr) {
    var dom;
    dpr = dpr || devicePixelRatio;
    if (typeof id === 'string') {
        dom = createDom(id, painter, dpr);
    }
    // Not using isDom because in node it will return false
    else if (util.isObject(id)) {
        dom = id;
        id = dom.id;
    }
    dom = createDom(id, painter, dpr);
    
    //
    this.id = id;
    this.dom = dom;
    
/*
    var domStyle = dom.style;
    if (domStyle) { // Not in node
        dom.onselectstart = returnFalse; // 避免页面选中
        domStyle['-webkit-user-select'] = 'none';
        domStyle['user-select'] = 'none';
        domStyle['-webkit-touch-callout'] = 'none';
        domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
        domStyle['padding'] = 0;
        domStyle['margin'] = 0;
        domStyle['border-width'] = 0;
    }
*/


    this.painter = painter;

    this.dpr = dpr;
};

Layer.prototype = {
    constructor: Layer,
    
        __dirty: true,
    
        __used: false,
    
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
    
        incremental: false,
    
        getElementCount: function () {
            return this.__endIndex - this.__startIndex;
        },
    
        initContext: function () {
            this.ctx = this.dom.getContext('2d');
            
            this.ctx.dpr = this.dpr;
        },
        clear: function() {
            var dom = this.dom;
            var ctx = this.ctx;
            var width = dom.width;
            var height = dom.height;
            ctx.clearRect(0, 0, width, height);
        }
    
}

export default Layer;