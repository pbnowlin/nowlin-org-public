//********************************************************************
// Control file for the images pop-up selector when the I button is pressed.
// Simple macro substitution is performed so that the files can be size
// minimized.  The files are stored in ./i/Book/Chapter.html form.
// Each file stored an array HTMLString[] with each element being a
// verse entry.
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

if(!Book) Book=findBook();
if(!Chapter) Chapter=findChapter();
if (!Verse) Verse=1;

SP="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
AI="<OPTION Value= \"./images/bible_images/Acts/";
CI="<OPTION Value= \"./images/bible_images/Christ/";
DI="<OPTION Value= \"./images/bible_images/Daniel/";
HI="<OPTION Value= \"./images/bible_images/History/";
JI="<OPTION Value= \"./images/bible_images/Josh_temp/";
KI="<OPTION Value= \"./images/bible_images/Kings/";
MI="<OPTION Value= \"./images/bible_images/Miracles/";
MO="<OPTION Value= \"./images/bible_images/Moses/";
RI="<OPTION Value= \"./images/bible_images/Ruth/";
SI="<OPTION Value= \"./images/bible_images/Samson/";
SO="<OPTION Value= \"./images/bible_images/Song/";
TI="<OPTION Value= \"./images/bible_images/Taylor/";
TO="<OPTION Value= \"./images/bible_images/Temple/";
CM="<OPTION Value= \"./images/maps/Christ/";
JM="<OPTION Value= \"./images/maps/Journeys/";
OM="<OPTION Value= \"./images/maps/Otest/";
PM="<OPTION Value= \"./images/maps/palestine/";
IP="<OPTION Value= \"./images/places/Israel/";
BC="<OPTION Value= \"./images/charts/Bible/bible_template.html";

HTMLString[Verse] = HTMLString[Verse].replace(/\$SP/g, SP);
HTMLString[Verse] = HTMLString[Verse].replace(/\$AI/g, AI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$CI/g, CI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$DI/g, DI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$HI/g, HI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$JI/g, JI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$KI/g, KI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$MI/g, MI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$MO/g, MO);
HTMLString[Verse] = HTMLString[Verse].replace(/\$RI/g, RI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$SI/g, SI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$SO/g, SO);
HTMLString[Verse] = HTMLString[Verse].replace(/\$TI/g, TI);
HTMLString[Verse] = HTMLString[Verse].replace(/\$TO/g, TO);
HTMLString[Verse] = HTMLString[Verse].replace(/\$CM/g, CM);
HTMLString[Verse] = HTMLString[Verse].replace(/\$JM/g, JM);
HTMLString[Verse] = HTMLString[Verse].replace(/\$OM/g, OM);
HTMLString[Verse] = HTMLString[Verse].replace(/\$PM/g, PM);
HTMLString[Verse] = HTMLString[Verse].replace(/\$IP/g, IP);
HTMLString[Verse] = HTMLString[Verse].replace(/\$BC/g, BC);
HTMLString[Verse] = HTMLString[Verse].replace(/ key=.*$/g, '');

document.write(
'<FORM name="navform">' +
'<TABLE><TR><TD>' +
'<SELECT NAME="Dict">' + HTMLString[Verse] +
'</SELECT></TD>' +
'<TD><a href="#" onClick="return doImgLookup(document.navform.Dict.options[document.navform.Dict.selectedIndex].value);"><IMG border=0 SRC="./gifs/view_dictionary.gif" NAME="Select"></a></TD>' +
'</TR></TABLE></FORM>'
);