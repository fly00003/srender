export default function Circle(opts){
    opts=opts || {};
    this.shape=opts.shape || { cx : 0, cy : 0, r : 20}
    this.__dirty=true;
    this.__sr=null
   
}
Circle.prototype={
     /** 用于测试的拖拽事件*/
     
     checkMouse: function (mouse)
     {
        var shape=this.shape; 
        var dx = mouse.x - shape.cx;
        var dy = mouse.y - shape.cy;
         var distance = Math.sqrt(dx * dx + dy * dy);
         if (distance < shape.r) {
             return true;
         } else {
             return false;
         }
     },
     
     /* */
     dirty: function () {
       // this.__dirty = true;


       // this.__sr && this.__sr.refresh();
    },
    buildPath: function (ctx, shape) {
        var shape=this.shape;
        
   
    //ctx.moveTo(shape.cx + shape.r, shape.cy);
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
     
    }
}