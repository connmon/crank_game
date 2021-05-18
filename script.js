var crankMultiplier = 1;
var doublePrice = 5;
var idlePrice = 5;
var idleRate = 0;
var count = 0;

(function() {
	var mX, mY, angle, dx, dy,
          //$distance = $('#distance span'),
          $middle  = $('#middle');
          

  function calculateDistance(elem, mouseX, mouseY) {
          dx = (mouseX - (elem.offset().left+(elem.width()/2)))
          dy = (mouseY - (elem.offset().top+(elem.height()/2)))

          return (Math.atan2(dy, dx));

  }


  var flag = 0;
  

  document.getElementById("count").innerText = count;

  

  dragElement(document.getElementById("crank"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

  function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

  function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      angle = calculateDistance($middle, pos3, pos4);
      elmnt.style.top = (window.scrollY + document.querySelector('#middle').getBoundingClientRect().top  + (Math.sin(angle) * 60)) + "px";
      elmnt.style.left = (window.scrollX + document.querySelector('#middle').getBoundingClientRect().left + (Math.cos(angle) * 60)) + "px";
      //document.getElementById("count").innerText = flag;
      if(angle > 0 && angle < 1.57){
      	flag = 1;
      }
      if(angle > 1.57 && angle < 3){
      	if(flag >= 1){
        	flag = 2;
        }else{
        	flag = 0;
        }
      }
      if(angle > -3 && angle < -1.57){
      	if(flag >= 2){
        	flag = 3;
        }else{
        	flag = 0;
        }
      }
      if(angle > -1.57 && angle < 0){
      	if(flag == 3){
        	count = count + crankMultiplier;
        	document.getElementById("count").innerText = count;
      	}
        flag = 0;
      }
      
      
  }

  function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
})();

function idleAdd(){
		if(count >= idlePrice){
    		count = count - idlePrice;
        document.getElementById("count").innerText = count;
        //$idleboost = $('idleboost span');
        idleRate = idleRate + 1;
        idlePrice = idlePrice * 2;
        document.getElementById("idleCost").innerText = idlePrice;
    }
}

function crankDouble(){
		if(count >= doublePrice){
    		count = count - doublePrice;
        document.getElementById("count").innerText = count;
        //$crankboost = $('#crankboost span');
        crankMultiplier = crankMultiplier*2;
        doublePrice = doublePrice * 5;
        document.getElementById("doubleCost").innerText = doublePrice;
    }
}

function refreshData()
{
    count = count + idleRate;
    
    document.getElementById("count").innerText = count;

    setTimeout(refreshData, 1000);
}


refreshData(); // execute function
