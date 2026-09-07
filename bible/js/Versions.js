//********************************************************************
// Versions.js is used to build the versions pop-up when the V button
// is clicked.  The data is stored in ./v/Book/Chapter.html files where
// there is an array for each supported version and the Verse parameter
// is used to choose which array element to use.
//
//********************************************************************

var Book, Chapter, Verse;
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1]
if(Title) {
	Title = Title.split('#')[0];
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "Book":
				Book = tempItem[1];
				break;
			case "Chapter":
				Chapter = tempItem[1];
				break;
			case "Verse":
				Verse = tempItem[1];
				break;
		}
	}
}

if (!Verse) Verse=1;

// THIS STRING WAS REMOVED FROM THE VERSES TO
// MORE CLOSELY REPLICATE THE WEBSITE
// &nbsp;<span style=font-size:10px;>('+ Book +' '+ Chapter +':'+ Verse +' ASV)</span>

document.write(
'<table height="100%">'+
'  <tr><td valign=middle align=center>&nbsp;</td>'+
'    <td valign=top align=left>'+
'      <table width=300px border=0 cellpadding=0 cellspacing=0 align=center><tr><td bgcolor=#000000>'+
'        <table width=100% cellspacing=1 cellpadding=3 border=0 bgcolor=000000><tr>'+
'          <td bgcolor=#324395 align=center style=color:ffffff><b><font color=ffffff>Translations and Versions for '+ Book +' '+ Chapter +':'+ Verse +'</font></b></td>'+
'        </tr></table>'+
'      </td></tr></table>'+
'    </td>'+
'  </tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">KJV</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + kjv[Verse] + '<br><span style=font-size:10px><a href="./versions.html#kjv" target="_copyright">King James Version 1769 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style=""width:68px ;height=21px;>CSB</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + csb[Verse] + '<br><span style=font-size:10px><a href="./versions.html#csb" target="_copyright">Christan Standard Bible &#169; 2009 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">RSV</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + rsv[Verse] + '<br><span style=font-size:10px><a href="./versions.html#rsv" target="_copyright">Revised Standard Version &#169; 1947, 1952 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">ASV</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + asv[Verse] + '<br><span style=font-size:10px><a href="./versions.html#asv" target="_copyright">American Standard Version 1901 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">YNG</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + yng[Verse] + '<br><span style=font-size:10px><a href="./versions.html#yng" target="_copyright">Robert Young Literal Translation 1862, 1887, 1898 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">DBY</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + dby[Verse] + '<br><span style=font-size:10px><a href="./versions.html#dby" target="_copyright">J.N.Darby Translation 1890 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">WEB</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + web[Verse] + '<br><span style=font-size:10px><a href="./versions.html#web" target="_copyright">Noah Webster Version 1833 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">HNV</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + hnv[Verse] + '<br><span style=font-size:10px><a href="./versions.html#hnv" target="_copyright">Hebrew Names Version 2000 Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#0069B3; color:white; border:1px inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">VUL</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"> ' + vul[Verse] + '<br><span style=font-size:10px><a href="./versions.html#vul" target="_copyright">Jerome\'s Latin Vulgate 405 A.D. Info</a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#00000; color:white; border:0 inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">&nbsp;</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"><span style=font-size:10px><a href="./versions.html" target="_copyright">Information on Bible Versions </a></span></td></tr></table></td></tr>'+
'  <tr><td style="background-color:#00000; color:white; border:0 inset; padding:5px; text-align:center; vertical-align: middle;"><span width="68" height="21" style="width:68px; height=21px;">&nbsp;</span></td>'+
'      <td><table style="width:440px;margin:0px;padding:0px;border:1px #000 solid;background:#efefef;"><tr><td style="padding:5px;"><span style=font-size:10px><strong>Cite the BLB CD: </strong><br><em>The Blue Letter Bible CD</em>. CD-ROM, version '+CDVERSION+'. Blue Letter Bible, '+RELEASEDATE+'.</span></td></tr></table></td></tr>'+
'</table>'
);