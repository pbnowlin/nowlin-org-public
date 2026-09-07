//********************************************************************
// Control file for the 'Strong's Concordance' files located in './c/'.
//
// Conc.js performs macro substituion on the concordance and writes
// out the result to the document.  Everything else is handled by the 
// concordance page. Each page in the ./c/ dir contains an array named
// HTMLString[] where each entry is a verse the the specific book/chapter file.
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
//Common strings which create a template like environment for every
//concordence table

// opening div for the entire page just before the top of the upper scroll for new testament concs
HGB_String = '<div class="theConc">' +
'<div align="center" class="concHead">Lexicon / Concordance for ' + Book + ' ' + Chapter + ':' + Verse + '</div>' +
'<div class="scroll1_out" align="center"><a href="#" onClick="return Info_Nav(\'info_greek.html\');"><img src="./gifs/scrolls/scroll_top_tr_new.gif" border="0"></a><br>';

// opening table for the conc table which contains the words and Strong's info for new testament concs
HGE_String = '<br><img src="./gifs/scrolls/scroll_bot_new.gif" border="0"><br></div>' +
'<table cellspacing="0" cellpadding="0" style="margin-bottom:-1px;" width=480>' +
'	<tr>' +
'		<td align="center" bgcolor="#000000">' +
'			<table cellspacing="1" cellpadding="2" width=480>' +
'				<tr><td bgcolor="dedede" colspan="2" class="concef" width=300><b>English</b></td>' +
'					<td bgcolor="dedede" class="concef" width=80><b>Strong\'s</b></td>' +
'					<td bgcolor="dedede" class="concef"><b>Greek (Root form)</b></td>' +
'					<td bgcolor="dedede" class="concef"><b>Tense</b></td></tr>' +
'				<tr><td bgcolor="dedede" class="concef" colspan="3" align="center">(Click on any item below for Concordance)</td>' +
'					<td bgcolor="dedede" class="concef">&nbsp;</td><td bgcolor="dedede" class="concef">(Click)</td></tr>';

// opening div for the entire page just before the top of the upper scroll for old testament concs
HBB_String = '<div class="theConc">' +
'<div align="center" class="concHead">Lexicon / Concordance for ' + Book + ' ' + Chapter + ':' + Verse + '</div>' +
'<div class="scroll1_out" align="center"><a href="#" onClick="return Info_Nav(\'info_hebrew.html\');"><img src="./gifs/scrolls/scroll_top_hebrew_new.gif" border="0"></a><br>';

// opening table for the conc table which contains the words and Strong's info for old testament concs
HBE_String = '<br><img src="./gifs/scrolls/scroll_bot_new.gif" border="0"><br></div>' +
'<table align="center" cellspacing="0" cellpadding="0" style="margin-bottom:-1px;" width="480">' +
'	<tr>' +
'		<td align="center" bgcolor="#000000">' +
'			<table cellspacing="1" cellpadding="2" width=532>' +
'				<tr><td bgcolor="dedede" colspan="2" class="concef" width=180><b>English</b></td>' +
'					<td bgcolor="dedede" class="concef" width=80><b>Strong\'s</b></td>' +
'					<td bgcolor="dedede" class="concef"><b>Greek (Root form)</b></td>' +
'					<td bgcolor="dedede" class="concef"><b>Tense</b></td></tr>' +
'				<tr><td bgcolor="dedede" class="concef" colspan="3" align="center">(Click on any item below for Concordance)</td>' +
'					<td bgcolor="dedede" class="concef">&nbsp;</td><td bgcolor="dedede" class="concef">(Click)</td></tr>';

// The row of padding images for multi-line scrolls
HBG_String = "<img src=./bg/h1b.gif width=1 height=28><br><img src=./bg/h1b.gif width=1 height=28><img src=./bg/1_by_28.gif ";

// Simple image tag replacers
BGS_String = '<img align=absmiddle src=./bg/';
BG_String = '.gif><img align=absmiddle src=./bg/';

// First cell in the row.  This cell contains the English word.
TB_String = '<tr><td bgcolor="ffffff" class="concff" colspan=2>';

// This doctors up the word so it can be searched.
RB_String = '<a href="#" onClick="return W_Nav(\'';
KE_String = '\')">';

// Second cell in the row. This cell contains the Strong's number.
PB_String = '</a></b></td><td bgcolor=ffffff class="concff"><a href="#" onClick="return S_Nav(\'';

// This doctors up the Strong's number so it can be searched.
KB_String = '</a> <a href="#" onClick=\"return W_Nav(\'';
JE_String = '\')"><b>[';

// Third cell in the row. This cell contains the Greek or Hebrew word.
DE_String = '</b></A></td><td bgcolor=ffffff class="concff"><font size=-1><img align="absmiddle" src=./bg/';

//Last cell in the row.  This cell contains the tense tag.  These are just variations on that cell.
TE_String = '</font></td><td bgcolor="ffffff" align="center" class="concff">&nbsp;</td></tr>';
TN_String = '</font></td><td bgcolor=ffffff align="center" class="concff"><a href="#" onClick="return T_Nav(\'';
VE_String = '\')"><img border=0 src=./gifs/tense_tag.gif width=32 height=14 ALT="';
QB_String = '"></a></td></tr>';

// This is a row with only an English word and no other info.
PE_String = '</A></b></td><td bgcolor=ffffff class="concff"><nobr>&nbsp;</nobr></td><td bgcolor=ffffff class="concff">&nbsp;</font></td><td bgcolor=ffffff class="concff">&nbsp;</td></tr>';

// Bottom scroll openers for greek or hebrew
WB_String = '</table></td></tr></table><div class="scroll2_out" align="center"><a href="#" onClick="return Info_Nav(\'info_greek.html\');"><IMG src="./gifs/scrolls/scroll_top_wh_new.gif" border="0"></a><br>';
SB_String = '</table></td></tr></table><div class="scroll2_out" align="center"><a href="#" onClick="return Info_Nav(\'info_septuagint.html\');"><IMG src="./gifs/scrolls/scroll_top_septuagint_new.gif" border="0"></a><br>';

// Bottom scroll closer
SE_String = '<br><IMG src="./gifs/scrolls/scroll_bot_new.gif" border="0"><br></div></div>';

// I got lost when I created these, they aren't even used at the moment
DB_String = '</A></b></td><td bgcolor=ffffff class="concff"><A href="#" onClick="return S_Nav(\'';
CB_String = '</A>,</b></td><td bgcolor=ffffff class="concff"><A href="#" onClick="return S_Nav(\'';
HB_String = '</A>;</b></td><td bgcolor=ffffff class="concff"><A href="#" onClick="return S_Nav(\'';
FB_String = '</A>:</b></td><td bgcolor=ffffff class="concff"><A href="#" onClick="return S_Nav(\'';

// Special case when a word isn't given for a strong's number
YB_String = '<tr><td bgcolor=ffffff class="concff" colspan=2><font size=-1><b>(with Strongs #)</b></td><td bgcolor=ffffff class="concff"><A HREF="#" onClick=\"return S_Nav(\'';

//Substitue common strings for the abbreviations
HTMLString[Verse] = HTMLString[Verse].replace(/<a href=[.\/]*septuagint_notes\/([A-Z0-9][A-Za-z][a-z])\/([0-9]+)_s\.html\#([0-9]+) TARGET=_blank>/g, "<a href=\"#\" onClick=\"return do_sep_notes('$1', '$2', '$3');\">");
HTMLString[Verse] = HTMLString[Verse].replace(/HBB/g, HBB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/HBE/g, HBE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/HGB/g, HGB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/HGE/g, HGE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/HBG/g, HBG_String);
HTMLString[Verse] = HTMLString[Verse].replace(/BGS/g, BGS_String);
HTMLString[Verse] = HTMLString[Verse].replace(/WB/g, WB_String);

HTMLString[Verse] = HTMLString[Verse].replace(/SB/g, SB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/SE/g, SE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/TB/g, TB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/TE/g, TE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/PE/g, PE_String);
//Do no match JESUS ie: Mat 1:21.  Put the '[' back after matching it.
//JE_String = '\')"><b>[';
HTMLString[Verse] = HTMLString[Verse].replace(/JE\[/g, JE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/TN/g, TN_String);
HTMLString[Verse] = HTMLString[Verse].replace(/VE/g, VE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/DE/g, DE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/¡/g, BG_String);
HTMLString[Verse] = HTMLString[Verse].replace(/RB/g, RB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/KB/g, KB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/KE/g, KE_String);
HTMLString[Verse] = HTMLString[Verse].replace(/DB/g, DB_String);

HTMLString[Verse] = HTMLString[Verse].replace(/CB/g, CB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/PB/g, PB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/HB/g, HB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/FB/g, FB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/QB/g, QB_String);
HTMLString[Verse] = HTMLString[Verse].replace(/YB/g, YB_String);

HTMLString[Verse] = HTMLString[Verse].replace(/align=absmiddle src=\.\/bg\/h([^s])/g, 'src=./bg/h$1');
HTMLString[Verse] = HTMLString[Verse].replace(/align=absmiddle src=\.\/bg\/g([^s])/g, 'src=./bg/g$1');
HTMLString[Verse] = HTMLString[Verse].replace(/align=absmiddle src=\.\/bg\/([^gh])/g, 'src=./bg/$1');
HTMLString[Verse] = HTMLString[Verse].replace(/align=absmiddle src=\.\/bg\/(hs[^0-9])/g, 'src=./bg/$1');
HTMLString[Verse] = HTMLString[Verse].replace(/align=absmiddle src=\.\/bg\/(gs[^0-9])/g, 'src=./bg/$1');
// Once the substitutions are done, show it to the customers
// Everything else is covered in the c/.../*.html conc files

document.write(HTMLString[Verse]);
