//********************************************************************
// MainHeader.js is used to include the leftnav, get required CSS files
// included and prepare the leftnav image which works hand in hand with
// MainFooter.js for establishing the links related to the leftnav image.
//********************************************************************


// Constants that may be defined in the calling document to affect attributes used in here.
//*****************************************************************************************
// Right table cell width; this can be predefined in any doc that includes MainHeader.js

docWidth = setDefault('docWidth', 480);

// Fix the window.opener issue that new browsers
// break because of Cross Site Scripting attacks -Dan
if(window.name != '__BLB') {
	window.name='__BLB';
	__BLB=window.open(document.location, '__BLB');
}

// Window names for which we don't want to display the background image and leftnav
//*****************************************************************************************
var noLeftNav = new Array();
noLeftNav["CommWndw"] = 1;

// The array item points to either the first level directory or the root level file
// You can establish which css you may want to include.
//*****************************************************************************************

var IEcssArray = [];
IEcssArray["hta"] = "./css/hta_ie.css";

var cssArray = [];
cssArray["study"] = "./css/study.css";
cssArray["hta"] = "./css/hta.css";
cssArray["p"] = "./css/p.css";
cssArray["kjv"] = "./css/kjv.css";
cssArray["commentary"] = "./css/commentary.css";
cssArray["Comm"] = "./css/commentary.css";
cssArray["sn"] = "./css/SmithSermonNotes.css";

var menuArray = [];
//  Files?
menuArray["index.html"]		= 0;
menuArray["s.html"]		= 2;
menuArray["search1.html"]	= 2;
menuArray["c.html"]		= 3;
menuArray["d.html"]		= 7;
menuArray["a.html"]		= 4;
menuArray["i.html"]		= 6;
menuArray["f.html"]		= 10;
menuArray["k.html"]		= 9;
menuArray["h.html"]		= 8;
menuArray["e.html"]		= 5;
menuArray["m.html"]		= 11;
menuArray["l.html"]		= 12;
menuArray["contribution.html"]	= 14;

//  Directories?
menuArray["alpha_tables"]	= 2;
menuArray["audio_video"]	= 4;
menuArray["Comm"]		= 3;
menuArray["commentary"]		= 3;
menuArray["devotions"]		= 7;
menuArray["faq"]		= 8;
menuArray["help"]		= 8;
menuArray["gifs"]		= 6;
menuArray["kjv"]		= 0;
menuArray["images"]		= 6;
menuArray["study"]		= 5;

var browserName=navigator.userAgent;
var browserVer=parseInt(navigator.appVersion, 10);

if(browserName.search(/Netscape/) >=0) {browserName="Netscape";}
else if(browserName.search(/MSIE/) >=0) {browserName="Internet Explorer";}
else if(browserName.search(/Safari/) >=0) {browserName="Safari";}
else if(browserName.search(/Firefox/) >=0) {browserName="Firefox";}



if (navigator.appName=="Konqueror" && browserVer>=2)
  version="Kong";
else if (navigator.appName=="Mozilla" && browserVer>=1)
  version="Moz";
else if (browserName=="Firefox")
  version="FOX";
else if (browserName=="Safari")
  version="Safari";
else if (browserName=="Netscape" && browserVer>4)
  version="N6";
else if (navigator.appName=="Opera" && browserVer>=6)
  version="OP";
else if (navigator.appName=="Microsoft Internet Explorer" && browserVer>=4)
  version="IE";

document.write('<link rel="stylesheet" href="./css/standard.css" type="text/css">');

if (version=="IE")
  document.write('<link rel="stylesheet" href="./css/ie_hack.css" type="text/css">');
else if (browserName=="Safari")
  document.write('<link rel="stylesheet" href="./css/safari_hack.css" type="text/css">');
else if (version=="N6")
  document.write('<link rel="stylesheet" href="./css/net_hack.css" type="text/css">');

if(cssArray[topicDir[0]])
	document.write('<link rel="stylesheet" href="'+cssArray[topicDir[0]]+'" type="text/css">');
if(cssArray[topicDir[1]])
	document.write('<link rel="stylesheet" href="'+cssArray[topicDir[1]]+'" type="text/css">');
if(cssArray[topicDir[2]])
	document.write('<link rel="stylesheet" href="'+cssArray[topicDir[2]]+'" type="text/css">');


if (version=="IE") {
	if(IEcssArray[topicDir[0]])
		document.write('<link rel="stylesheet" href="'+IEcssArray[topicDir[0]]+'" type="text/css">');
	if(IEcssArray[topicDir[1]])
		document.write('<link rel="stylesheet" href="'+IEcssArray[topicDir[1]]+'" type="text/css">');
	if(IEcssArray[topicDir[2]])
		document.write('<link rel="stylesheet" href="'+IEcssArray[topicDir[2]]+'" type="text/css">');
}

// Testing by Dan to see if we can manage the leftnav for the Comm's when they get opened in a pop-up

if(noLeftNav[window.name]) {
	document.write('<STYLE> body{background-image:url();} </STYLE>');
}

document.write(
	'<TITLE>Blue Letter Bible</TITLE>'+
	'<style>'+
	'#yui-history-iframe {'+
	'	position:absolute;'+
	'	top:0; left:0;'+
	'	width:1px; height:1px;'+
	'	visibility:hidden;'+
	'}'+
	'</style>'+
	'</HEAD>'+
	'<body bgcolor="#ffffff" topmargin="8" leftmargin="8">'+
	'<iframe id="yui-history-iframe" src="./yui-blank.html"></iframe>'+
	'<input id="yui-history-field" type="hidden">'+
	'<A NAME="top"></A>'
);

if(noLeftNav[window.name]) {
	document.write(
		'<DIV ALIGN="CENTER">'+
		'<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0">'+
		'<TR>'
	);
} else {
	document.write(
		'<div align="left">' +
		'<table border="0" cellpadding="0" cellspacing="0">' +
		'<tr>' +
		'<td valign="top" align="left">' +
		'<div style="width:121px;" class="menu_tablecell">'
	);

	document.write(
		'<a href="./index.html"><img src="./gifs/blb_menu/m_head4A.gif" onMouseOver="imgTurnOn(\'img1\');" onMouseOut="imgTurnOff(\'img1\');" alt="Home" border="0" /></a><br />' +
		'<a href="./index.html"><img src="./gifs/blb_menu/m_head2A.gif" id="img1" name="img1" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Home" border="0" /></a><br />' +
		'<a href="./s.html"><img src="./gifs/blb_menu/seaA.gif" id="img2" name="img2" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Search" border="0" /></a><br />' +
		'<a href="./c.html"><img src="./gifs/blb_menu/comA.gif" id="img3" name="img3" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Commentaries" border="0" /></a><br />' +
		'<a href="./a.html"><img src="./gifs/blb_menu/audA.gif" id="img4" name="img4" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Audio and Video" border="0" /></a><br />' +
		'<a href="./study/index.html"><img src="./gifs/blb_menu/stuA.gif" id="img5" name="img5" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Study Tools" border="0" /></a><br />' +
		'<a href="./i.html"><img src="./gifs/blb_menu/imaA.gif" id="img6" name="img6" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Images and Maps" border="0" /></a><br />' +
		'<a href="./d.html"><img src="./gifs/blb_menu/devA.gif" id="img7" name="img7" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Devotionals" border="0" /></a><br />' +
		'<a href="./h.html"><img src="./gifs/blb_menu/helA.gif" id="img8" name="img8" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Help and FAQs" border="0" /></a><br />' +
		'<a href="./k.html"><img src="./gifs/blb_menu/knoA.gif" id="img9" name="img9"  onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);"alt="Know God" border="0" /></a><br />' +
		'<a href="./f.html"><img src="./gifs/blb_menu/freA.gif" id="img10" name="img10" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Free Web Tools" border="0" /></a><br />' +
		'<a href="./m.html"><img src="./gifs/blb_menu/aboA.gif" id="img11" name="img11" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="About the BLB" border="0" /></a><br />' +
		'<a href="./contribution.html"><img src="./gifs/blb_menu/conA.gif" id="img14" name="img14" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Contribute" border="0" /></a><br />' +
		'<a href="./l.html"><img src="./gifs/blb_menu/othCDA.gif" id="img12" name="img12" onMouseOver="imgTurnOn(this.name);" onMouseOut="imgTurnOff(this.name);" alt="Other Links" border="0" /></a><br />' +
		'</div>'+
		'</td>'
	);
}

document.write(
	'<td valign="TOP" ID="mainRightTD" align="LEFT" width='+docWidth+'">'+
  '<div class="notice" style="color:#ff0000">' +
  '  <a href="https://www.blb.org"></a>' +
  '</div>'
);
