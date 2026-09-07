//********************************************************************
// Control file for the 'Thematic Subject Guide' files located in './d/subject/'.
//
// TSG.js builds the simple table to display the dictionary contents
// of the specified TSG page determined by the 'Detailed Word Search'
// by the script function doDictLookup() defined in './js/nav.js'.
// Each TSG page contains what it needs in an array named subjectArray[];
//********************************************************************

//Extract the Thematic Subject from the HTML page name
Page = topicDir[topicDir.length-1].split('.')[0];
Page = Page.replace(/__/g, ', ');
Page = Page.replace(/_s_/g, "'s ");
Page = Page.replace(/_/g, ' ');

document.write(
"<br>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center><tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\">" +
"<tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"#324395\"><FONT COLOR=\"#FFFFFF\"><b>Thematic Subject Guide<b></FONT></td></tr>" +
"<tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"#0069b3\"><font color=\"#ffffff\"><b>"+Page+":</b></td></tr>"
);

var rowArray = new Array();
var entryString = new String();

for(i=0;i<subjectArray.length;i++) {
  document.write('<tr><td colspan=4 bgcolor=ffffff><font size=2>');
  rowArray = subjectArray[i].split(",");
  for(j=0;j<rowArray.length;j++) {
    book = rowArray[j].substr(0,3);
	chapter = rowArray[j].substr(4, rowArray[j].indexOf(":") - 4);
	verseRange = rowArray[j].substr(rowArray[j].indexOf(":") + 1);
	if(rowArray[j].indexOf("-")+1) {verse = rowArray[j].substr(rowArray[j].indexOf(":") + 1, rowArray[j].indexOf("-") - rowArray[j].indexOf(":") - 1);}
	else{verse = verseRange;}
  document.write('<a href="#" onClick="return  mV(\''+book+'\', '+chapter+', '+verse+');">'+book+' '+chapter+':'+verseRange+'</a>');
	if(rowArray.length - 1 > j){document.write(', ');}
  }
  document.write("</td></tr>");
}

document.write("</dl></td></tr><tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Thematic Subject Guide<b></FONT></td></tr>" +
"</table></td></tr>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center>" +
"<tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\"><tr><td bgcolor=efefef><font size=2><b>Cite the BLB CD:</b><br><br><i>The Blue Letter Bible CD.</i> CD-ROM, version " +CDVERSION+ ". Blue Letter Bible, "+RELEASEDATE+".<br><br><b>Copyright Statement</b><br><br>Some or all materials on this page are copyright, and may not be used without the permission of the copyright holder, or under other provisions of the copyright law.<br><br><strong>CONTENT DISCLAIMER</strong><br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.</td></tr>" +
'</table>'
);
