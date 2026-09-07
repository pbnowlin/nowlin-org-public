//********************************************************************
// Control file for the 'Nave's Topical Bible' files located in './d/naves/'.
//
// Naves.js builds the simple table to display the dictionary contents
// of the specified Nave dictionary entry, 'navesItem' url variable,
// passed from the 'Detailed Word Search' by the script function doDictLookup()
// defined in './js/nav.js'.
//********************************************************************

var Book,Chapter,Verse,navesItem;
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
			case "navesItem":
				navesItem = tempItem[1];
				break;
		}
	}
}
if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if(!Verse) Verse=1;
if(!navesItem) navesItem=findNavesItem();
paddedChapter = pad(Chapter);

// Function definitions

function findNavesItem() {
	var navesItem = new String();
	for (navesItem in navesArray) return navesItem.split('-')[0];
}

vLength=navesArray[navesItem+"-0"];
dot=0;

document.write(
"<script src=\"./js/NoNavHeader.js\"  type=\"text/javascript\"></script>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center><tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\">" +
"<tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"#324395\"><FONT COLOR=\"#FFFFFF\"><b>Nave's Topical Bible<b></FONT></td></tr>" +
"<tr><td colspan=\"4\" align = \"center\" BGCOLOR=\"#0069b3\"><font color=\"#ffffff\"><b>"+navesArray[navesItem+"-1"]+":</b>"
);
for(Nave=2;Nave<=vLength;Nave++){
  switch (navesArray[navesItem+"-"+Nave].charAt(0)) {
    case "-" :
	  if(Nave > 2 || dot){document.write("</dl>"); dot=0;}
	  document.write('</td></tr><tr id="' + navesArray[navesItem+"-"+Nave].substring(1).replace(/ |,/g, '').toLowerCase() + '"><td colspan="4" BGCOLOR="efefef"><font size="2"><b>'+ navesArray[navesItem+"-1"] + ": " +navesArray[navesItem+"-"+Nave].substring(1)+"</b></td></tr><tr><td colspan=\"4\" bgcolor=ffffff><font size=2><dl>");
      break;
	case "@" :
	  if(dot){
	    document.write("<DT>&#164; "+navesArray[navesItem+"-"+Nave].substring(1)+" ");
	  }else{
		document.write("<DD><DL><DT>&#164; "+navesArray[navesItem+"-"+Nave].substring(1)+" ");
		dot=1;
	  }
	  break;
	case "." :
	  if(dot){document.write("</dl>"); dot=0;}
	  document.write("<DT>&#167; "+navesArray[navesItem+"-"+Nave].substring(1)+" ");
	  break;
	case "#" :
	  document.write("<DD><LI type=\"disc\">"+navesArray[navesItem+"-"+Nave].substring(1)+"</li>");
	  break;
	default:
	  document.write(" " + navesArray[navesItem+"-"+Nave]+" ");
  }
}
document.write("</dl></td></tr><tr><td colspan=\"4\" align=\"center\" BGCOLOR=\"324395\"><FONT COLOR=\"#FFFFFF\"><b>Nave's Topical Bible<b></FONT></td></tr>" +
"</table></td></tr>" +
"<table width=480 border=0 cellpadding=0 cellspacing=0 align=center>" +
"<tr><td bgcolor=#000000>" +
"<table border=\"0\" cellspacing=\"1\" cellpadding=\"4\" width=\"100%\"><tr><td bgcolor=efefef><font size=2><b>Cite the BLB CD:</b><br><br><i>The Blue Letter Bible CD.</i> CD-ROM, version " +CDVERSION+ ". Blue Letter Bible, "+RELEASEDATE+".<br><br><strong>CONTENT DISCLAIMER</strong><br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.</td></tr>"
);
