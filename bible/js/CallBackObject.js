var Yoffset = 0;
var Xoffset = 0;

function startCallback(link, method, data, ev, x, y, width, bustcache) {
  if(bustcache) link = link + '?event.time=' + new Date().getTime();		// to be used only with GET requests
  if(document.getElementById('hiddenWindow').style.visibility == 'visible') document.getElementById('hiddenWindow').style.visibility = 'hidden';
  if(width) document.getElementById('hiddenWindow').style.width = width+'px';
  var mousePos = mouseCoords(ev);
  if(x) Xoffset = mousePos.x + x;
  if(y) Yoffset = mousePos.y + y;
  var theMethod = method;
  var thePage = link;
  var theData = data;

  Cbo.DoCallBack(theMethod, thePage, theData);
  return false;
}

function Cbo_Complete(responseText, responseXML) {
  hiddenobject = document.getElementById('hiddenWindow');
  showHelp(hiddenobject);
  responseText += '<!--[if lte IE 6.5]><iframe><\/iframe><![endif]-->';
  hiddenobject.innerHTML = responseText;
}

function showHelp(hiddenobject) {
  hiddenobject.style.visibility='visible';
  hiddenobject.style.left	=	Xoffset;
  hiddenobject.style.top	=	Yoffset;
}


function Cbo_Error(status, statusText, responseText) {
//  alert(responseText);
}

function hideKey(obj) {
	if(!obj) obj = document.getElementById('hiddenWindow');
	obj.style.visibility = 'hidden';
}

function CallBackObject() {
  this.XmlHttp = this.GetHttpObject();
}

CallBackObject.prototype.GetHttpObject = function() {
  var xmlhttp;

 /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/

  if (!xmlhttp && typeof XMLHttpRequest != 'undefined'){
    try {
      xmlhttp = new XMLHttpRequest();
      xmlhttp.isNS = true;
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}

CallBackObject.prototype.DoCallBack = function(theMethod, thePage, theData) {
  if( this.XmlHttp ) {
    if( this.XmlHttp.readyState == 4 || this.XmlHttp.readyState == 0 ) {
      var oThis = this;
      this.XmlHttp.open(theMethod, thePage, true);
      this.XmlHttp.onreadystatechange = function() { oThis.ReadyStateChange(); };
      if(theMethod == 'GET') {
        this.XmlHttp.send(null);
      } else {
        this.XmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.XmlHttp.send(theData);
      }
    }
  }
}

CallBackObject.prototype.AbortCallBack = function() {
	if (this.XmlHttp && this.XmlHttp.readyState > 0 && this.XmlHttp.readyState < 4)
		if(this.XmlHttp.isNS)	return true;
		else this.XmlHttp.abort();
	else return false;
}

CallBackObject.prototype.OnLoading = function() {
  // Loading
}

CallBackObject.prototype.OnLoaded = function() {
  // Loaded
}

CallBackObject.prototype.OnInteractive = function() {
  // Interactive
}

CallBackObject.prototype.OnComplete = function(responseText, responseXml) {
  // Complete
}

CallBackObject.prototype.OnAbort = function() {
  // Abort
}

CallBackObject.prototype.OnError = function(status, statusText, responseText) {
  // Error
}

CallBackObject.prototype.ReadyStateChange = function() {
  if(this.XmlHttp.readyState == 1) {
    this.OnLoading();
  } else if(this.XmlHttp.readyState == 2) {
    this.OnLoaded();
  } else if(this.XmlHttp.readyState == 3) {
    this.OnInteractive();
  } else if(this.XmlHttp.readyState == 4) {
try { if(this.XmlHttp.status) ; }
catch(e) { return; }
    if(this.XmlHttp.status == 0)
      this.OnComplete(this.XmlHttp.responseText, this.XmlHttp.responseXML);
    else
      this.OnError(this.XmlHttp.status, this.XmlHttp.statusText, this.XmlHttp.responseText);
  }
}


var Cbo = new CallBackObject();
Cbo.OnComplete = Cbo_Complete;
Cbo.OnError    = Cbo_Error;