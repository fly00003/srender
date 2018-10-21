import requestAnimationFrame from './animation/requestAnimationFrame'

var Handler=function(root,storage,painter){

    this.root = root;
    this.storage = storage;
    this.painter = painter;

    /*全局监听*/
    var mouse={x:0, y: 0};
    painter.cnv.addEventListener("mousemove", function (e) {
        var x, y;
        var e = e || window.event;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= painter.cnv.offsetLeft;
        y -= painter.cnv.offsetTop;

        mouse.x = x;
        mouse.y = y;
       
    }, false);
    /* */
    //传到painter

     /** */
     var dx=0,dy=0;
     var oldX,oldY;
     var isMouseDown=false;
     var list = storage.getDisplayList(true);
     var count=0
     var el=null
    // var dom=this.tempLayer.dom;
    console.log(painter.cnv)
     painter.cnv.addEventListener("mousedown",function(){
         
         for(var _el of list){
             
             if(_el.checkMouse(mouse)){
                 count++
                 el=_el
                console.log("mouwn")

                 isMouseDown = true;
                
                 break;
             }
         
                 }
                  //鼠标按下小球时，将当前鼠标位置赋值给oldX和oldY
               //   oldX = el.shape.cx;
              //    oldY = el.shape.cy;
                  dx = mouse.x - el.shape.cx;
                  dy = mouse.y - el.shape.cy;
                  //监听函数后面跟括号（）调用出现的问题
               document.addEventListener("mousemove", onMouseMove, false);
                
                document.addEventListener("mouseup", onMouseUp, false);
 
     },false)
  //   painter.cnv.addEventListener("mousemove", onMouseMove(), false);
     function onMouseMove() {
         //鼠标移动时，更新小球坐标
       //  console.log("move")
        if(el!=null){
         
         console.log("_move")
         el.shape.cx = mouse.x - dx;
         el.shape.cy = mouse.y - dy;
         console.log(el.shape.cx,el.shape.cy)
         el.__dirty=true}
        
         
     }
     function onMouseUp() {
         //鼠标松开时，isMouseDown设置为false
         el=null
         isMouseDown = false;
         document.removeEventListener("mouseup", onMouseUp, false);
         document.removeEventListener("mousemove", onMouseMove, false);
     } 

     function step(){
         
         if(isMouseDown){
           // requestAnimationFrame(step)
            painter.refresh(true)
     }
     //requestAnimationFrame(step)
    }
    setInterval(step,16)
     /** */

}
export default Handler;