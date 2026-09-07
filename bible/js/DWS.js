//********************************************************************
// Control file for the 'Detailed Word Search' files located in './a/'.
//
// DWS.js builds the simple table used to display the form select items
// based on the URL variable 'Word' and the 'WordsArray' defined in the
// specific './a/'  page.  Those pages get called from the pages under
// './alpha_tables/' by the script function detailed() defined in
// './js/nav.js'.
//********************************************************************

var Word;
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1]
if(Title) {
	Title = Title.split('#')[0];
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "Word":
				Word = tempItem[1];
				break;
		}
	}
}

if(!Word) Word = findWord();
Word = unescape(Word);

function findWord() {
	var Word = "";
	for (Word in WordsArray) return Word;
}

document.write(
'			<table width="100%" cellspacing=1 cellpadding=2 border=0 bgcolor=000000>' +
'				<tr><td bgcolor=324395 align=center><font size=3 color=ffffff><b>Dictionary Search Results for <em>' + Word + '</em></b></font></td></tr>' +
'				<tr bgcolor=ffffff><td>' +
'					<table cellpadding=5 width="100%">' +
'						<tr><td align=left colspan=2><font size=2>A search was completed through the following dictionaries.  Select an item, click go, and a window  will  open with your selection.</font><br><br>' +
'							<table width="100%">' +
'								<tr valign=top>' +
'									<td align=left><font size=2><img src="./gifs/bluesquare.gif" border=0> Nave\'s Topical (<b>N</b>)<br>' +
'										<img src="./gifs/bluesquare.gif" border=0> Torrey\'s Topical (<b>T</b>)<br>' +
'										<img src="./gifs/bluesquare.gif" border=0> Easton\'s Dictionary (<b>E</b>)</font></td>' +
'									<td align=left><font size=2><img src="./gifs/bluesquare.gif" border=0> Hitchcock\'s Dictionary (<b>H</b>)<br>' +
'										<img src="./gifs/bluesquare.gif" border=0> BLB Subject Guide (<b>S</b>)</font></td>' +
'								</tr>' +
'							</table>' +
'						</td></tr>' +
'						<tr><td colspan=2 align=center valign=middle><font size=2>' +
'							<FORM name="navform"><SELECT NAME="Dict" size="5">' + WordsArray[Word] + '</select>' +
'							<a href="' + Title + '" onClick="return doDictLookup(document.navform.Dict.options[document.navform.Dict.selectedIndex].value);"><IMG border="0" SRC="./gifs/view_dictionary.gif" NAME="Select" hspace=5></a></FORM></font>' +
'						</td></tr>' +
'					</table>' +
'				</td></tr>' +
'			</table>'
);