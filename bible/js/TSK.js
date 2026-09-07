//********************************************************************
// TSK.js works on the T_ files intermixed with the KJV Bible files.
// TSK.js performs macro substituion on the concordance and writes
// out the result to the document.  Everything else is handled by the
// concordance page. Each page contains an array named stringArray[]
// where each entry is a verse the the specific book/T_chapter file.
//
// The citation gadget at the bottom of this will need tuned when we
// figure out what exactly we are going to do for citations.
//********************************************************************


var Book,Chapter,Verse;
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1]
if(Title) {
	Title = Title.split('#')[0];
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "Verse":
				Verse = tempItem[1];
				break;
		}
	}
}
if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if(!Verse) Verse=1;

paddedChapter = pad(Chapter);

//Strings to replace
CP_String = '</DIV></DIV></DIV><DIV CLASS="main-left">' +
						'<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" WIDTH="100%">'+
						'<TR STYLE="font-size:105%;font-weight:bold">'+
						'	<TD WIDTH="160" CLASS="ff">Phrase of Scripture</TD>'+
						' <TD WIDTH="10">&nbsp;</TD> <TD>Correlating Passages</TD>'+
						'	<TD style="text-align:right;"><span style="display:none;"><a href=""><img src="./gifs/tskHelp.gif" alt="" border="0" /></a></span></TD>'+
						'</TR> <TR>'+
						'	<TD COLSPAN="4" CLASS="break"><IMG SRC="./gifs/clearpixel.gif" BORDER="0" HEIGHT="3" WIDTH="1"><BR></TD></TR>'+
						'<TR VALIGN="top"><TD CLASS="ff"><a name="';
NB_String = '</a></nobr>; <nobr><a href="'+localBase+'#" onClick="return V(\'';
NR_String = '</a></nobr>,<nobr><a href="'+localBase+'#" onClick="return V(\'';
SH_String = '" class="SrptH">';
PS_String = '"></a><span class="pos">';
FF_String = '</span></TD><TD CLASS="ff">&nbsp;</TD><TD COLSPAN="2" CLASS="ff"><nobr><a href="'+localBase+'#" onClick="return V(\'';
EF_String = '</span></TD><TD CLASS="ef">&nbsp;</TD><TD COLSPAN="2" CLASS="ef"><nobr><a href="'+localBase+'#" onClick="return V(\'';
EE_String = '</span></TD><TD CLASS="ff">&nbsp;</TD><TD COLSPAN="2" CLASS="ff">';
FE_String = '</span></TD><TD CLASS="ef">&nbsp;</TD><TD COLSPAN="2" CLASS="ef">';
GG_String = '</TD></TR><TR VALIGN="top"><TD CLASS="ff"><a name="';
GH_String = '</TD></TR><TR VALIGN="top"><TD CLASS="ef"><a name="';
BT_String = '</a></nobr></TD></TR><TR VALIGN="top"><TD CLASS="ef"><a name="';
BT_String = '</a></nobr></TD></TR><TR VALIGN="top"><TD CLASS="ef"><a name="';
EN_String = '</a></nobr></TD></TR>';
AN_String = '</a></nobr>';
NA_String = '<nobr><a href="'+localBase+'#" onClick="return V(\'';
PN_String = '<a href="'+localBase+'?'+cgi_vars+'#';




//Substitue common strings for the abbriviations
stringArray[Verse] = stringArray[Verse].replace(/__CP/g, CP_String);
stringArray[Verse] = stringArray[Verse].replace(/__NB/g, NB_String);
stringArray[Verse] = stringArray[Verse].replace(/__NR/g, NR_String);
stringArray[Verse] = stringArray[Verse].replace(/__SH/g, SH_String);
stringArray[Verse] = stringArray[Verse].replace(/__PS/g, PS_String);
stringArray[Verse] = stringArray[Verse].replace(/__FF/g, FF_String);
stringArray[Verse] = stringArray[Verse].replace(/__EF/g, EF_String);
stringArray[Verse] = stringArray[Verse].replace(/__EE/g, EE_String);
stringArray[Verse] = stringArray[Verse].replace(/__FE/g, FE_String);
stringArray[Verse] = stringArray[Verse].replace(/__GG/g, GG_String);
stringArray[Verse] = stringArray[Verse].replace(/__GH/g, GH_String);
stringArray[Verse] = stringArray[Verse].replace(/__NA/g, NA_String);
stringArray[Verse] = stringArray[Verse].replace(/__AN/g, AN_String);
stringArray[Verse] = stringArray[Verse].replace(/__BT/g, BT_String);
stringArray[Verse] = stringArray[Verse].replace(/__EN/g, EN_String);
stringArray[Verse] = stringArray[Verse].replace(/__PN/g, PN_String);

months = new Array(12)
months[1] = "Jan";
months[2] = "Feb";
months[3] = "Mar";
months[4] = "Apr";
months[5] = "May";
months[6] = "Jun";
months[7] = "Jul";
months[8] = "Aug";
months[9] = "Sep";
months[10] = "Oct";
months[11] = "Nov";
months[12] = "Dec";
today = new Date();
month = months[today.getMonth() + 1];
date = today.getDate()
year=today.getYear();
if (year < 2000)
year = year + 1900;

//Once the substitutions are done, show it to the customers

document.write(
'<link rel="stylesheet" href="./css/tsk.css" type="text/css">'+
'<table width="475" border="0" cellpadding="0" cellspacing="0" align=center><tr><td bgcolor="#ffffff">'+
'  <DIV ID="MainTop" CLASS="head">Treasury of Scripture Knowledge</DIV>'+
'  <DIV CLASS="desc-just" STYLE="background-image:url(\'../gifs/hbr_bkgNEW.jpg\');">'+
'    <DIV CLASS="pad2020">'+
'      <DIV CLASS="main-left" STYLE="background-color:#ffffff;border-width:1px;padding:5px;">'+
'        <a href="#" onClick="return M(\''+Book+'\','+paddedChapter+','+Verse+');">'+Book+' '+Chapter+':'+Verse+'</a> &mdash; '
);

document.write(stringArray[Verse]);

document.write(
'	  </TABLE>'+
'	  </DIV>'+
'		<div class="return"><a href="#top">Return to top</a></div>'+
'</td></tr></table>' +
'<table width="475" border="1" cellpadding="4" cellspacing="0" align=Center>'+
'<tr><td bgcolor=efefef><font size=2><b><br>Cite the BLB CD:</b><br><br><i>The Blue Letter Bible CD.</i> CD-ROM, version ' +CDVERSION+ '. Blue Letter Bible, '+RELEASEDATE+'.<br><br><strong>CONTENT DISCLAIMER</strong><br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.<br><br></td></tr>' +
'</table>'
);
