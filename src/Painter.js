import Layer from './Layer'; 
import Group from './Group';

function parseInt10(val) {
    return parseInt(val, 10);
}

function createRoot(width, height) {
    var domRoot = document.createElement('div');

    // domRoot.onselectstart = returnFalse; // 避免页面选中
    domRoot.style.cssText = [
        'position:relative',
        'overflow:hidden',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'padding:0',
        'margin:0',
        'border-width:0'
    ].join(';') + ';';

    return domRoot;
}


var Painter = function (root, storage, opts) {
    this.root = root;
    
    var rootStyle = root.style;

    if (rootStyle) {
        rootStyle['-webkit-tap-highlight-color'] = 'transparent';
        rootStyle['-webkit-user-select'] =
        rootStyle['user-select'] =
        rootStyle['-webkit-touch-callout'] = 'none';

        root.innerHTML = '';
    }
    this.storage = storage;

    var layers = this._layers = {};

    var width = rootStyle.width;
    var height = rootStyle.height;
    
    if (opts.width != null) {
        width = opts.width;
    }
    if (opts.height != null) {
        height = opts.height;
    }
    this.dpr = opts.devicePixelRatio || 1;

    /** 
     * 只考虑传入div情况
     */
    root.width = width * this.dpr;
    root.height = height * this.dpr;

    this._width = width;
    this._height = height;
    
    // Create layer if only one given canvas
    // Device can be specified to create a high dpi image.
    var mainLayer = new Layer(root, this, this.dpr);
    mainLayer.__builtin__ = true;
    mainLayer.initContext();
    this.tempLayer=mainLayer;
    root.appendChild(mainLayer.dom);
    this._domRoot = root;
    this.cnv=document.getElementsByTagName("canvas")[0];
    
}

Painter.prototype = {
    
        constructor: Painter,

        getWidth: function () {
            return this._width;
        },
    
        getHeight: function () {
            return this._height;
        },
    
        getType: function () {
            return 'canvas';
        },
    
        getViewportRoot: function () {
            return this._domRoot;
        },
    
        refresh: function (paintAll) {
            
            var list = this.storage.getDisplayList(true);
            var length = this.storage._displayListLen;
            var ctx=this.tempLayer.ctx;
            function simpleDraw(child){
            //    child.trigger=false;
                ctx.beginPath();
              //  ctx.stokeStyle="red"
                child.buildPath(ctx,child.shape)
                ctx.stroke()
            }
          //  console.log(this.cnv)
          if(paintAll){
            this.tempLayer.clear();
            for (var i = 0; i < length; i++) {
                var el = list[i];
                if(el instanceof Group){
                    el.traverse(simpleDraw,null)
                }
                else{
                 //   console.log(el)
                    ctx.beginPath();
                   
                    ctx.stokeStyle="red"
                    el.buildPath(ctx,el.shape)
                    ctx.stroke()
                   // ctx.closePath();//一般在图形定义内部闭合
                 //   ctx.restore();
                
                    
                   }
                   el.__dirty=false
                   

                
               
            } 
          }
           else{
            for (var i = 0; i < length; i++) {
                var el = list[i];
                
            
                if(el.__dirty===true){
                
                   // ctx.save();
                   if(el instanceof Group){
                    el.traverse(simpleDraw,null)
                }else{ctx.beginPath();
                    
                     ctx.stokeStyle="red"
                     el.buildPath(ctx,el.shape)
                     ctx.stroke()
                    // ctx.closePath();//一般在图形定义内部闭合
                  //   ctx.restore();
                }
                    
                
                    el.__dirty=false
                   

                }
               
            } 
        }
            
            return this;
        },     
        _getSize: function (whIdx) {
            var opts = this._opts;
            var wh = ['width', 'height'][whIdx];
            var cwh = ['clientWidth', 'clientHeight'][whIdx];
            var plt = ['paddingLeft', 'paddingTop'][whIdx];
            var prb = ['paddingRight', 'paddingBottom'][whIdx];
    
            if (opts[wh] != null && opts[wh] !== 'auto') {
                return parseFloat(opts[wh]);
            }
    
            var root = this.root;
            // IE8 does not support getComputedStyle, but it use VML.
            var stl = document.defaultView.getComputedStyle(root);
    
            return (
                (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
                - (parseInt10(stl[plt]) || 0)
                - (parseInt10(stl[prb]) || 0)
            ) | 0;
        },
    }    
    export default Painter;