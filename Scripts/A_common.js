var menuEvent;
var linemapS = false;

var is_touch_device = function() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}

if(is_touch_device()==true) {
	menuEvent = "touchstart";
} else {
	menuEvent = "click";
}

var goMain = function() {
	location.href = "/";
}

function pop(pPage,Opt) {
 popUpWin = window.open(pPage,'',Opt);
 }