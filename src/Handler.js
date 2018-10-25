import requestAnimationFrame from './animation/requestAnimationFrame'
import Group from './Group';

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
     
     var breakObject={flag:false};
     var el=null
    // var dom=this.tempLayer.dom;
   
     painter.cnv.addEventListener("mousedown",function(){
        dx=dy=0;
        var list = storage.getDisplayList(true);
        var length = storage._displayListLen;
        function simpleCheck(element){
            if(element.checkMouse(mouse)){
              element.trigger=true;
              //  el=_el
               console.log("mouwn")

                isMouseDown = true;
                dx = mouse.x - element.shape.cx;
                dy = mouse.y - element.shape.cy;

                 //监听函数后面跟括号（）调用出现的问题
              document.addEventListener("mousemove", onMouseMove, false);
              
              document.addEventListener("mouseup", onMouseUp, false);
              breakObject.flag=true;
            }
            else {breakObject.flag=false;}
        }
        outer:
        for (var i = 0; i < length; i++) {
            el = list[i];
            if(el instanceof Group){
              el.traverse2(simpleCheck,null,breakObject)
              if(breakObject.flag){break outer;}
            }
            else{
                simpleCheck(el);
                
                if(breakObject.flag){break outer;}
            }
         
        }
                  //鼠标按下小球时，将当前鼠标位置赋值给oldX和oldY
               //   oldX = el.shape.cx;
              //    oldY = el.shape.cy;
                  
                 
 
     },false)
 
     
     function onMouseMove() {
         //鼠标移动时，更新小球坐标
       //  console.log("move")
       
       var change={x:0,y:0} 
         function simpleMove(element){
             if(element.trigger){ 
               
                let preX=element.shape.cx;
                let preY=element.shape.cy
                element.shape.cx = mouse.x - dx;
                element.shape.cy = mouse.y - dy;
                change.x=element.shape.cx-preX;
                change.y=element.shape.cy-preY
              //  
            }
            else{
                element.shape.cx =element.shape.cx +change.x;
                element.shape.cy =element.shape.cy + change.y;
            }
                
             console.log("_move")
            
             console.log(element.shape.cx,element.shape.cy)
             element.__dirty=true
         }
       if(el instanceof Group){
            el.traverse(simpleMove,null)
       }
        if(el!=null&&!(el instanceof Group)){
         
            simpleMove(el)
         }
        
         
     }
     function onMouseUp() {
         //鼠标松开时，isMouseDown设置为false
         function simpleFlag(element){
            element.trigger=false;
         }
        dx=dy=0;
        if(el instanceof Group){ el.traverse(simpleFlag,null)}
        else el.trigger=false
         el=null
         isMouseDown = false;
         document.removeEventListener("mouseup", onMouseUp, false);
         document.removeEventListener("mousemove", onMouseMove, false);
     } 

     function step(){
      //  requestAnimationFrame(step)
         if(isMouseDown){
            
            painter.refresh(true)
     }
     //requestAnimationFrame(step)
    }
    setInterval(step,7)
 // requestAnimationFrame(step)
     /** */

}
export default Handler;