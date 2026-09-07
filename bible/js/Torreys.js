//********************************************************************
// Control file for the 'Torrey's New Topical Textbook' files located in './d/torreys/'.
//
// Torreys.js builds the simple table to display the dictionary contents
// of the specified Torrey dictionary entry, 'torreysItem' url variable,
// passed from the 'Detailed Word Search' by the script function doDictLookup()
// defined in './js/nav.js'.
//********************************************************************

var Book,Chapter,Verse,torreysItem;
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
			case "torreysItem":
				torreysItem = tempItem[1];
				break;
		}
	}
}
if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if(!Verse) Verse=1;
if(!torreysItem) torreysItem=findTorreysItem();

paddedChapter = pad(Chapter);

// Function definitions

function findTorreysItem() {
	var torreysItem = new String();
	for (torreysItem in torreysArray) return torreysItem.split('-')[0];
}

vLength=torreysArray[torreysItem+"-0"];
dot=0;

document.write(
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center><tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\">" +
"<tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Torrey's New Topical Textbook<b></FONT></td></tr>" +
"<tr><td colspan=\"4\" align = \"center\" BGCOLOR=\"0069b3\"><FONT COLOR=\"#FFFFFF\"><b>"+torreysArray[torreysItem+"-1"]+":</b>"
);
for(Torrey=2;Torrey<=vLength;Torrey++){
  switch (torreysArray[torreysItem+"-"+Torrey].charAt(0)) {
    case "-" :
	  if(Torrey > 2 || dot){document.write("</dl>"); dot=0;}
	  document.write("</td></tr><tr><td colspan=\"4\" BGCOLOR=\"efefef\"><FONT size=2><b>"+torreysArray[torreysItem+"-"+Torrey].substring(2)+"</b></td></tr><tr><td colspan=\"4\" BGCOLOR=\"ffffff\"><FONT size=2><dl>");
      break;
	case "@" :
	  if(dot){
	    document.write("<DT>&#164; "+torreysArray[torreysItem+"-"+Torrey].substring(1)+"</LI>");
	  }else{
		document.write("<DD><DL><DT>&#164; "+torreysArray[torreysItem+"-"+Torrey].substring(1)+"</LI>");
		dot=1;
	  }
	  break;
	case "." :
	  if(dot){document.write("</dl>"); dot=0;}
	  document.write("<DT>&#167; "+torreysArray[torreysItem+"-"+Torrey].substring(2)+" ");
	  break;
	case "#" :
	  document.write("<DD><LI type=\"disc\">"+torreysArray[torreysItem+"-"+Torrey].substring(2)+"</li>");
	  break;
	default:
	  document.write(torreysArray[torreysItem+"-"+Torrey]+" ");
  }
}
document.write(
"</dl></td></tr><tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Torrey's New Topical Textbook<b></FONT></td></tr>" +
"</table></td></tr>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center>" +
"<tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\"><tr><td bgcolor=efefef><font size=2><strong>Cite the BLB CD:</strong><br><br><em>The Blue Letter Bible CD</em>. CD-ROM, version "+CDVERSION+". Blue Letter Bible, "+RELEASEDATE+".</td></tr>"+
"</table>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\"><tr><td bgcolor=efefef><font size=2><strong>CONTENT DISCLAIMER</strong><br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.</td></tr>"
);
