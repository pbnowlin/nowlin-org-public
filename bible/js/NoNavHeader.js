//********************************************************************
// NoNavHeader.js is used for pop-up pages that you don't want a leftnav
// on and to have the background image blank to a white color.
//********************************************************************

// Constants that may be defined in the calling document to affect attributes used in here.
//*****************************************************************************************
// Right table cell width; this can be predefined in any doc that includes MainHeader.js

docWidth = setDefault('docWidth', 480);

// The array item points to either the first level directory or the root level file
// You can establish which left nav gif to use and which css you may want to include
//*****************************************************************************************

var cssArray = new Array();
cssArray["study"] = "./css/study.css";
cssArray["p"] = "./css/p.css";
cssArray["kjv"] = "./css/kjv.css";
cssArray["c"] = "./css/conc_style.css";
cssArray["commentary"] = "./css/commentary.css";
cssArray["Comm"] = "./css/commentary.css";
cssArray["d"] = "./css/dictionaries.css";


document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');

var browserName=navigator.appName;
var browserVer=parseInt(navigator.appVersion, 10);

if(browserName.search(/Netscape/) >=0) {browserName="Netscape";}
else if(browserName.search(/MSIE/) >=0) {browserName="Internet Explorer";}
else if(browserName.search(/Safari/) >=0) {browserName="Netscape";}

if (navigator.appName=="Konqueror" && browserVer>=2)
  version="Kong";
else if (navigator.appName=="Mozilla" && browserVer>=1)
  version="Moz";
else if (navigator.appName=="Netscape" && browserVer>4)
  version="N6";
else if (navigator.appName=="Opera" && browserVer>=6)
  version="OP";
else if (navigator.appName=="Microsoft Internet Explorer" && browserVer>=4)
  version="IE";
else
  version="N4";

if (version=="IE")
  document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');
else if (version=="N6")
  document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');
else if (version=="Moz")
  document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');
else if (version=="OP")
  document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');
else if (version=="Kong")
  document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');
else
  document.write('<link rel="stylesheet" href="./css/notstandard.css" type="text/css">');

if (version=="IE")
  document.write('<link rel="stylesheet" href="./css/ie_hack.css" type="text/css">');
else if (version=="N6")
  document.write('<link rel="stylesheet" href="./css/net_hack.css" type="text/css">');

if(cssArray[topicDir[0]])
	document.write('<link rel="stylesheet" href="'+cssArray[topicDir[0]]+'" type="text/css">');