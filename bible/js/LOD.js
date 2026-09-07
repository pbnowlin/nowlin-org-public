//********************************************************************
// Control file for the dictionaries pop-up selector when the D button
// is pressed.
// Simple macro substitution is performed so that the files can be size
// minimized.  The files are stored in ./d/Book/Chapter.html form.
// Each file stored an array LOD[] with each element being a
// verse entry.
// LOD = List of Dictionary (items)
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

NAVES_B = "<OPTION Value=\"0\">NAVES DICTIONARY ENTRIES: <OPTION Value=\"NT";
NAVES_O = " <OPTION Value=\"NT";
NAVES_E = "Naves&Entries\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
TORREYS_B = "<OPTION Value=\"0\">TORREYS DICTIONARY ENTRIES: <OPTION Value=\"TT";
TORREYS_O = " <OPTION Value=\"TT";
TORREYS_E = "Torreys&Entries\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
EASTON_B = "<OPTION Value=\"0\">EASTON DICTIONARY ENTRIES: <OPTION Value=\"ET";
EASTON_O = " <OPTION Value=\"ET";
EASTON_E = "Easton&Entries\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
SUBJECT_B = "<OPTION Value=\"0\">SUBJECT GUIDE ENTRIES: <OPTION Value=\"S";
SUBJECT_O = " <OPTION Value=\"S";
SUBJECT_E = "Subject&Guide\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
VINES_B = "<OPTION Value=\"0\">VINES DICTIONARY ENTRIES: <OPTION Value=\"VT";
VINES_O = " <OPTION Value=\"VT";
VINCS_E = "Vines&Entries\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
HITCHCOCK_B = "<OPTION Value=\"0\">HITCHCOCK DICTIONARY ENTRIES: <OPTION Value=\"H";
HITCHCOCK_O = " <OPTION Value=\"H";
HITCHCOCK_E = "Hitchcock&Entries\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";

LOD[Verse] = LOD[Verse].replace(/\$NB/g, NAVES_B);
LOD[Verse] = LOD[Verse].replace(/\$NO/g, NAVES_O);
LOD[Verse] = LOD[Verse].replace(/\$NE/g, NAVES_E);
LOD[Verse] = LOD[Verse].replace(/\$TB/g, TORREYS_B);
LOD[Verse] = LOD[Verse].replace(/\$TO/g, TORREYS_O);
LOD[Verse] = LOD[Verse].replace(/\$TE/g, TORREYS_E);
LOD[Verse] = LOD[Verse].replace(/\$EB/g, EASTON_B);
LOD[Verse] = LOD[Verse].replace(/\$EO/g, EASTON_O);
LOD[Verse] = LOD[Verse].replace(/\$EE/g, EASTON_E);
LOD[Verse] = LOD[Verse].replace(/\$SB/g, SUBJECT_B);
LOD[Verse] = LOD[Verse].replace(/\$SO/g, SUBJECT_O);
LOD[Verse] = LOD[Verse].replace(/\$SE/g, SUBJECT_E);
LOD[Verse] = LOD[Verse].replace(/\$VB/g, VINES_B);
LOD[Verse] = LOD[Verse].replace(/\$VO/g, VINES_O);
LOD[Verse] = LOD[Verse].replace(/\$VE/g, VINCS_E);
LOD[Verse] = LOD[Verse].replace(/\$HB/g, HITCHCOCK_B);
LOD[Verse] = LOD[Verse].replace(/\$HO/g, HITCHCOCK_O);
LOD[Verse] = LOD[Verse].replace(/\$HE/g, HITCHCOCK_E);

document.write(
"<FORM name=\"navform\">" +
"<TABLE><TR><TD>" +
"<SELECT NAME=\"Dict\">" + LOD[Verse] +
"</SELECT></TD>" +
"<TD><a href=\""+Title+"\" onClick=\"return doDictLookup(document.navform.Dict.options[document.navform.Dict.selectedIndex].value);\"><IMG border=\"0\" SRC=\"./gifs/view_dictionary.gif\" NAME=\"Select\"></a></TD>" +
"</TR></TABLE></FORM>"
);