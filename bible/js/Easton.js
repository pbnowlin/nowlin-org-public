//********************************************************************
// Control file for the 'Easton's Bible Dictionary' files located in './d/easton/'.
//
// Easton.js builds the simple table to display the dictionary contents
// of the specified Easton dictionary entry, 'eastonItem' url variable,
// passed from the 'Detailed Word Search' by the script function doDictLookup()
// defined in './js/nav.js'.
//********************************************************************

var Book,Chapter,Verse,eastonItem,eastonWord;
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
			case "eastonItem":
				eastonItem = tempItem[1];
				break;
		}
	}
}
if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if(!Verse) Verse=1;
if(!eastonItem) eastonItem=findEeastonItem();
paddedChapter = pad(Chapter);

// Function definitions

function findEeastonItem() {
	var eastonItem = new String();
	for (eastonItem in eastonArray) return eastonItem;
}

eastonWord = eastonArray[eastonItem].split(":")[0].split(">")[1];
document.write(
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center><tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"10\" width=\"100%\">" +
"<tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Easton\'s Bible Dictionary<b></FONT></td></tr>" +
"<tr><td colspan=\"4\" align =\"center\" BGCOLOR=\"0069b3\"><FONT COLOR=\"#FFFFFF\"><b>"+ eastonWord +"</b>" +
"<tr><td colspan=\"4\" align =\"justify\" BGCOLOR=\"FFFFFF\"><FONT COLOR=\"#000000\">"+ eastonArray[eastonItem] +"<br><br>"
);

document.write(
"</dl></td></tr><tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Easton\'s Bible Dictionary<b></FONT></td></tr>" +
"</table></td></tr>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center>" +
"<tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\"><tr><td bgcolor=efefef><font size=2><b>Cite the BLB CD:</b><br><br><i>The Blue Letter Bible CD.</i> CD-ROM, version " +CDVERSION+ ". Blue Letter Bible, "+RELEASEDATE+".<br><br><strong>CONTENT DISCLAIMER</strong><br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.</td></tr>"
);
