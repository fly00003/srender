import * as util from './tool/util';
import Group from './Group';

var Storage = function () { // jshint ignore:line
    this._roots = [];

    this._displayList = [];

    this._displayListLen = 0;
};

Storage.prototype = {
    
        constructor: Storage,
    
        /**
         * @param  {Function} cb
         *
         */
        traverse: function (cb, context) {
            for (var i = 0; i < this._roots.length; i++) {
                this._roots[i].traverse(cb, context);
            }
        },
    
        
        getDisplayList: function (update) {
            if (update) {
                this.updateDisplayList();
            }
            return this._displayList;
        },
    
        updateDisplayList: function () {
            this._displayListLen = 0;
    
            var roots = this._roots;
            var displayList = this._displayList;
            for (var i = 0, len = roots.length; i < len; i++) {
                var el=roots[i]
                this._displayList[this._displayListLen++] = el
            }
           
    
          //  displayList.length = this._displayListLen;
    
           
        },

        addRoot: function (el) {
            if (el.__storage === this) {
                return;
            }

            if (el instanceof Group) {
                el.addChildrenToStorage(this);
            }

            this.addToStorage(el);
            this._roots.push(el);
        },
    
        
        delRoot: function (el) {
            if (el == null) {
                // 不指定el清空
                for (var i = 0; i < this._roots.length; i++) {
                    var root = this._roots[i];
                    if (root instanceof Group) {
                        root.delChildrenFromStorage(this);
                    }
                }
                this._roots = [];
                this._displayList = [];
                this._displayListLen = 0;
    
                return;
            }
    
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i++) {
                    this.delRoot(el[i]);
                }
                return;
            }
    
    
            var idx = util.indexOf(this._roots, el);
            if (idx >= 0) {
                this.delFromStorage(el);
                this._roots.splice(idx, 1);
                if (el instanceof Group) {
                    el.delChildrenFromStorage(this);
                }
            }
        },
    
        addToStorage: function (el) {
            if (el) {
                el.__storage = this;
                el.dirty(false);
            }
            return this;
        },
    
        delFromStorage: function (el) {
            if (el) {
                el.__storage = null;
                //
                el.__dirty=true;
            }
    
            return this;
        },
    
        /**
         * 清空并且释放Storage
         */
        dispose: function () {
            this._renderList =
            this._roots = null;
        },
    
    }     

    export default Storage;