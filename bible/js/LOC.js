//********************************************************************
// Control file for the commentaries pop-up selector when the L button
// is pressed, or the verse is clicked on from the KJV Bible pages.
// Simple macro substitution is performed so that the files can be size
// minimized.  The files are stored in ./p/Book/Chapter.html form.
// Each file stored an array LOC[] with each element being a
// verse entry.
// LOC = List of Commentaries
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
if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if(!Verse) Verse=1;
paddedChapter = pad(Chapter);

RSB_String = '<OPTION Value="Comm/ray_stedman/adv/adv_';
RSE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ray Stedman Summary of ';
DGB_String = '<OPTION Value="Comm/david_guzik/sg/';
DGE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;David Guzik Study Guide For ';
JC_String = '<OPTION Value="Comm/john_calvin/Calvin_Gen01.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;John Calvin Commentary on Genesis Chap 1 ';
CSB_String = '<OPTION Value="Comm/chuck_smith/sg/';
CSE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chuck Smith Study Guide For ';
CSHS_String = '<OPTION Value="Comm/chuck_smith/sg/spirit.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chuck Smith Study Guide For Holy Spirit ';
MHS_String = '<OPTION Value="">&nbsp;&nbsp;Matthew Henry 1706-1714:';
MHB_String = '<OPTION Value="Comm/mhc/';
MHE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Henry Introduction to ';
MHC_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M Henry Commentary on ';
JFBS_String = '<OPTION Value="">&nbsp;&nbsp;Jamieson, Fausset & Brown 1871:';
JFBB_String = '<OPTION Value="Comm/jfb/';
JFBE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JF & B Commentary on ';
JFBI_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JF & B Introduction to ';
PJCB_String = '<OPTION Value="">&nbsp;&nbsp;Pastor Jon Courson:';
PJCO_String = '<OPTION Value="Comm/jon_courson/';
PJCE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jon Courson ';
JBB_String = '<OPTION Value="Comm/john_brown/';
JBE_String = '.html">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;John Brown Commentary on ';


LOC[Verse] = LOC[Verse].replace(/\$RSB/g, RSB_String);
LOC[Verse] = LOC[Verse].replace(/\$RSE/g, RSE_String);
LOC[Verse] = LOC[Verse].replace(/\$DGB/g, DGB_String);
LOC[Verse] = LOC[Verse].replace(/\$DGE/g, DGE_String);
LOC[Verse] = LOC[Verse].replace(/\$JC/g, JC_String);
LOC[Verse] = LOC[Verse].replace(/\$CSHS/g, CSHS_String);
LOC[Verse] = LOC[Verse].replace(/\$CSB/g, CSB_String);
LOC[Verse] = LOC[Verse].replace(/\$CSE/g, CSE_String);
LOC[Verse] = LOC[Verse].replace(/\$MHB/g, MHB_String);
LOC[Verse] = LOC[Verse].replace(/\$MHE/g, MHE_String);
LOC[Verse] = LOC[Verse].replace(/\$MHS/g, MHS_String);
LOC[Verse] = LOC[Verse].replace(/\$MHC/g, MHC_String);
LOC[Verse] = LOC[Verse].replace(/\$JFBB/g, JFBB_String);
LOC[Verse] = LOC[Verse].replace(/\$JFBE/g, JFBE_String);
LOC[Verse] = LOC[Verse].replace(/\$JFBI/g, JFBI_String);
LOC[Verse] = LOC[Verse].replace(/\$JFBS/g, JFBS_String);
LOC[Verse] = LOC[Verse].replace(/\$PJCB/g, PJCB_String);
LOC[Verse] = LOC[Verse].replace(/\$PJCE/g, PJCE_String);
LOC[Verse] = LOC[Verse].replace(/\$PJCO/g, PJCO_String);
LOC[Verse] = LOC[Verse].replace(/\$JBB/g, JBB_String);
LOC[Verse] = LOC[Verse].replace(/\$JBE/g, JBE_String);
//LOC[Verse] = LOC[Verse].replace(/\$/g, );

document.write(
'<table>'+
'<tr><td colspan="3" valign="top" align=left>'+
'<FORM name="navform">'+
'<TABLE><TR><TD>'+
'<SELECT NAME="Comm"><OPTION Value="">TEXT COMMENTARIES:'+ LOC[Verse] +
'</SELECT></TD>'+
'<TD><a href="'+Title+'" onClick="return doCommLookup(document.navform.Comm.options[document.navform.Comm.selectedIndex].value);"><IMG border="0" SRC="./gifs/view_commentary.gif" NAME="Select"></a></TD>'+
'</TR></TABLE></FORM>'+
'</td></tr>'+
'</table>'
);