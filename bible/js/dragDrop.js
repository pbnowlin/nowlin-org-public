// To Use:
// <script src="http://www.sowingcircle.org/scripts/dragDrop.js"  type="text/javascript"></script>
// Put this in a <script> block and add makeDraggable lines for each element you want to allow dragging for.
//
//window.onload = function(){
//  makeDraggable(document.getElementById('hiddenWindow'));
//}

Number.prototype.NaN0=function(){return isNaN(this)?0:this;}

document.onmousemove = mouseMove;
document.onmouseup   = mouseUp;
var dragObject  = null;
var mouseOffset = null;

function getMouseOffset(target, ev){
	ev = ev || window.event;

	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth, 10)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth, 10)).NaN0():0);
		e     = e.offsetParent;
	}


	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth, 10)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth, 10)).NaN0():0);

	return {x:left, y:top};

}

function mouseCoords(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

function mouseMove(ev){
  ev           = ev || window.event;
  var target   = ev.target || ev.srcElement;
  var mousePos = mouseCoords(ev);

  if(dragObject){
    dragObject.style.top      = mousePos.y - mouseOffset.y;
    dragObject.style.left     = mousePos.x - mouseOffset.x;
    return false;
  }
}

function mouseUp(){
  dragObject = null;
}

function makeMeDraggable(item){
	if(!item) return;
	item.onmousedown = function(ev){
		dragObject  = this;
		mouseOffset = getMouseOffset(this, ev);
		return false;
	}
}

function makeOtherDraggable(hotSpot, objToMove){
	if(!hotSpot) return;
	hotSpot.onmousedown = function(ev){
		dragObject  = objToMove;
		mouseOffset = getMouseOffset(objToMove, ev);
		return false;
	}
}
