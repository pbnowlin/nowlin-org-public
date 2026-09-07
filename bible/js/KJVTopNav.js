//********************************************************************
// KJVTopNav prepares all the variables used to build the top navigation,
// bottom navigation, and button links used in the KJV Bible pages.
// Along with variable preparation, it also builds the top navigation.
//
//********************************************************************

var Buttons = [];
var InLineText = [];
var Text = [];

var Books = [];
Books[1] = "Gen";
Books[2] = "Exd";
Books[3] = "Lev";
Books[4] = "Num";
Books[5] = "Deu";
Books[6] = "Jos";
Books[7] = "Jdg";
Books[8] = "Rth";
Books[9] = "1Sa";
Books[10] = "2Sa";
Books[11] = "1Ki";
Books[12] = "2Ki";
Books[13] = "1Ch";
Books[14] = "2Ch";
Books[15] = "Ezr";
Books[16] = "Neh";
Books[17] = "Est";
Books[18] = "Job";
Books[19] = "Psa";
Books[20] = "Pro";
Books[21] = "Ecc";
Books[22] = "Sgs";
Books[23] = "Isa";
Books[24] = "Jer";
Books[25] = "Lam";
Books[26] = "Eze";
Books[27] = "Dan";
Books[28] = "Hsa";
Books[29] = "Joe";
Books[30] = "Amo";
Books[31] = "Oba";
Books[32] = "Jon";
Books[33] = "Mic";
Books[34] = "Nah";
Books[35] = "Hab";
Books[36] = "Zep";
Books[37] = "Hag";
Books[38] = "Zec";
Books[39] = "Mal";
Books[40] = "Mat";
Books[41] = "Mar";
Books[42] = "Luk";
Books[43] = "Jhn";
Books[44] = "Act";
Books[45] = "Rom";
Books[46] = "1Cr";
Books[47] = "2Cr";
Books[48] = "Gal";
Books[49] = "Eph";
Books[50] = "Phl";
Books[51] = "Col";
Books[52] = "1Th";
Books[53] = "2Th";
Books[54] = "1Ti";
Books[55] = "2Ti";
Books[56] = "Tts";
Books[57] = "Phm";
Books[58] = "Hbr";
Books[59] = "Jam";
Books[60] = "1Pe";
Books[61] = "2Pe";
Books[62] = "1Jo";
Books[63] = "2Jo";
Books[64] = "3Jo";
Books[65] = "Jud";
Books[66] = "Rev";

FullBooks = [];
FullBooks['Gen'] = 'Genesis';
FullBooks['Exd'] = 'Exodus';
FullBooks['Lev'] = 'Leviticus';
FullBooks['Num'] = 'Numbers';
FullBooks['Deu'] = 'Deuteronomy';
FullBooks['Jos'] = 'Joshua';
FullBooks['Jdg'] = 'Judges';
FullBooks['Rth'] = 'Ruth';
FullBooks['1Sa'] = '1 Samuel';
FullBooks['2Sa'] = '2 Samuel';
FullBooks['1Ki'] = '1 Kings';
FullBooks['2Ki'] = '2 Kings';
FullBooks['1Ch'] = '1 Chronicles';
FullBooks['2Ch'] = '2 Chronicles';
FullBooks['Ezr'] = 'Ezra';
FullBooks['Neh'] = 'Nehemiah';
FullBooks['Est'] = 'Esther';
FullBooks['Job'] = 'Job';
FullBooks['Psa'] = 'Psalm';
FullBooks['Pro'] = 'Proverbs';
FullBooks['Ecc'] = 'Ecclesiastes';
FullBooks['Sgs'] = 'Song of Songs';
FullBooks['Isa'] = 'Isaiah';
FullBooks['Jer'] = 'Jeremiah';
FullBooks['Lam'] = 'Lamentations';
FullBooks['Eze'] = 'Ezekiel';
FullBooks['Dan'] = 'Daniel';
FullBooks['Hsa'] = 'Hosea';
FullBooks['Joe'] = 'Joel';
FullBooks['Amo'] = 'Amos';
FullBooks['Oba'] = 'Obadiah';
FullBooks['Jon'] = 'Jonah';
FullBooks['Mic'] = 'Micah';
FullBooks['Nah'] = 'Nahum';
FullBooks['Hab'] = 'Habakkuk';
FullBooks['Zep'] = 'Zephaniah';
FullBooks['Hag'] = 'Haggai';
FullBooks['Zec'] = 'Zechariah';
FullBooks['Mal'] = 'Malachi';
FullBooks['Mat'] = 'Matthew';
FullBooks['Mar'] = 'Mark';
FullBooks['Luk'] = 'Luke';
FullBooks['Jhn'] = 'John';
FullBooks['Act'] = 'Acts';
FullBooks['Rom'] = 'Romans';
FullBooks['1Cr'] = '1 Corinthians';
FullBooks['2Cr'] = '2 Corinthians';
FullBooks['Gal'] = 'Galatians';
FullBooks['Eph'] = 'Ephesians';
FullBooks['Phl'] = 'Philippians';
FullBooks['Col'] = 'Colossians';
FullBooks['1Th'] = '1 Thessalonians';
FullBooks['2Th'] = '2 Thessalonians';
FullBooks['1Ti'] = '1 Timothy';
FullBooks['2Ti'] = '2 Timothy';
FullBooks['Tts'] = 'Titus';
FullBooks['Phm'] = 'Philemon';
FullBooks['Hbr'] = 'Hebrews';
FullBooks['Jam'] = 'James';
FullBooks['1Pe'] = '1 Peter';
FullBooks['2Pe'] = '2 Peter';
FullBooks['1Jo'] = '1 John';
FullBooks['2Jo'] = '2 John';
FullBooks['3Jo'] = '3 John';
FullBooks['Jud'] = 'Jude';
FullBooks['Rev'] = 'Revelation';

Chapters = [];
Chapters[1] = "050";
Chapters[2] = "040";
Chapters[3] = "027";
Chapters[4] = "036";
Chapters[5] = "034";
Chapters[6] = "024";
Chapters[7] = "021";
Chapters[8] = "004";
Chapters[9] = "031";
Chapters[10] = "024";
Chapters[11] = "022";
Chapters[12] = "025";
Chapters[13] = "029";
Chapters[14] = "036";
Chapters[15] = "010";
Chapters[16] = "013";
Chapters[17] = "010";
Chapters[18] = "042";
Chapters[19] = "150";
Chapters[20] = "031";
Chapters[21] = "012";
Chapters[22] = "008";
Chapters[23] = "066";
Chapters[24] = "052";
Chapters[25] = "005";
Chapters[26] = "048";
Chapters[27] = "012";
Chapters[28] = "014";
Chapters[29] = "003";
Chapters[30] = "009";
Chapters[31] = "001";
Chapters[32] = "004";
Chapters[33] = "007";
Chapters[34] = "003";
Chapters[35] = "003";
Chapters[36] = "003";
Chapters[37] = "002";
Chapters[38] = "014";
Chapters[39] = "004";
Chapters[40] = "028";
Chapters[41] = "016";
Chapters[42] = "024";
Chapters[43] = "021";
Chapters[44] = "028";
Chapters[45] = "016";
Chapters[46] = "016";
Chapters[47] = "013";
Chapters[48] = "006";
Chapters[49] = "006";
Chapters[50] = "004";
Chapters[51] = "004";
Chapters[52] = "005";
Chapters[53] = "003";
Chapters[54] = "006";
Chapters[55] = "004";
Chapters[56] = "003";
Chapters[57] = "001";
Chapters[58] = "013";
Chapters[59] = "005";
Chapters[60] = "005";
Chapters[61] = "003";
Chapters[62] = "005";
Chapters[63] = "001";
Chapters[64] = "001";
Chapters[65] = "001";
Chapters[66] = "022";

var Bracketed = [];
Bracketed ["Rom 16"] = 1;
Bracketed ["1Cr 16"] = 1;
Bracketed ["2Cr 13"] = 1;
Bracketed ["Gal 6"] = 1;
Bracketed ["Eph 6"] = 1;
Bracketed ["Phl 4"] = 1;
Bracketed ["Col 4"] = 1;
Bracketed ["1Th 5"] = 1;
Bracketed ["2Th 3"] = 1;
Bracketed ["1Ti 6"] = 1;
Bracketed ["2Ti 4"] = 1;
Bracketed ["Tts 3"] = 1;
Bracketed ["Phm 1"] = 1;
Bracketed ["Hbr 13"] = 1;


var Book,Chapter,Verse, ShortName, BibleID;
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1];
if(Title) {
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "book":
				Book = tempItem[1];
				break;
			case "chapter":
				Chapter = parseInt(tempItem[1]);
				break;
			case "verse":
				Verse = parseInt(tempItem[1]);
				break;
		}
	}
}

if(!Book) Book = findBook();
if(!Chapter) Chapter = findChapter();
if(!Verse) Verse = 1;

BookIndex = findIndex(Book);
ShortName = Book;

BibleID = (BookChapters[ShortName]+Chapter) * 1000;

if (pad(Chapter) == Chapters[BookIndex]) NChapt = Books[BookIndex + 1]+"/"+Books[BookIndex + 1]+"001.html";
else NChapt = Books[BookIndex]+"/"+Books[BookIndex]+pad(parseInt(Chapter, 10)+1)+".html";

if (pad(Chapter) == "001") PChapt = Books[BookIndex - 1]+"/"+Books[BookIndex - 1]+Chapters[BookIndex - 1]+".html";
else PChapt = Books[BookIndex]+"/"+Books[BookIndex]+pad(parseInt(Chapter, 10)-1)+".html";

if (BookIndex == 66) {
  NBook = Books[1]+"/"+Books[1]+"001.html";
  if (Chapter == Chapters[66]) NChapt = NBook;
}
else NBook = Books[BookIndex + 1]+"/"+Books[BookIndex + 1]+"001.html";

if (BookIndex == 1) {
  PBook = Books[66]+"/"+Books[66]+"001.html";
  if (pad(Chapter) == "001") PChapt = Books[66]+"/"+Books[66]+Chapters[66]+".html";
}
else PBook = Books[BookIndex - 1]+"/"+Books[BookIndex - 1]+"001.html";

document.write(
'	<div class="bible_nav" style="margin-bottom:8px;">' +
'		<a href="./kjv/'+PBook+'"><img' +
'		src="./gifs/book_p9.gif" alt="Prior Book" width=95 height=20 border=0></a><a' +
'		href="./kjv/'+PChapt+'"><img' +
'		src="./gifs/chapter_p9.gif" alt="Prior Chapter" width=95 height=20 border=0></a><a' +
'		href="'+localBase+'#select"><img' +
'		src="./gifs/select_verse9.gif" alt="Select Verse"  width=100 height=20 border=0></a><a' +
'		href="./kjv/'+NChapt+'"><img' +
'		src="./gifs/chapter_n9.gif" alt="Next Chapter" width=95 height=20 border=0></a><a' +
'		href="./kjv/'+NBook+'"><img' +
'		src="./gifs/book_n9.gif" alt="Next Book" width=95 height=20 border=0></a><br />' +
'	</div>' +
'	<div class="head">' +
'		King James Version (KJV)' +
'	</div>' +
'	<div class="subhead">' +
'		' + FullBooks[Book] + (Book == 'Psa'?' ':' - Chapter ') + Chapter +
'	</div>' +
'	<div class="main-left">' +
'	  <table class=table_bible border="0" cellspacing="0" cellpadding="0" style="font-size:125%;">'
);

function findIndex(Book) {
  for(i=1;i<=66;i++) {
    if (Books[i] == Book) return i
  }
  return true;
}

// Builds the KJV Bible content for each chapter page.
// Called after Button, Text, TotalVerse are defined in the page calling us.
function buildKJVPage() {
	var K = "";
	var C = "";
	var L = "";
	var I = "";
	var INOT = '<nobr><a id="INOT" Title="No Images or Hymns Available"><img border="0" SRC="./gifs/i_blank9.gif" vspace="1" hspace="1" ALT="No Images or Hymns Available"></a>';
	var V = "";
	var D = "";
	var DNOT = '<nobr><a id="DNOT" Title="No Dictionary Aids Available"><img border="0" SRC="./gifs/d_blank9.gif" vspace="1" hspace="1" ALT="No Dictionary Aids Available"></a>';
	var P = "";
	var para = new String('<td valign="top" class="parSym">&#182;</td>');
	var paraNOT = new String('<td valign="top" class="parSym"></td>');
	var inlinePara = new String('</tr><tr><td colspan=2 valign=top>&nbsp;</td><td valign=top class=parSym>&#182;</td><td><p class=parMidVerse>');
	var bracketTagline = '<em>The above text, encapsulated by triple brackets, was added to the Textus Receptus at a later date and is not a part of the original autograph.</em>';
	var i=1;

	for(i=1;i<=TotalVerses;i++) {
		K = '<td id="'+i+'" class=td_bible_6_buttons valign="top" width="57" align=left><nobr><a href="' + localBase + '#'+i+'" onClick="return T(Book,Chapter,'+i+');" Title="Treasury of Scripture Knowledge"><img border="0" src="./gifs/k9.gif" ALIGN="bottom" width="17" height="17" vspace="1" hspace="1" ALT="Treasury of Scripture Knowledge"></a>';
		C = '<a href="' + localBase + '#'+i+'" onClick="return C_Nav(Book,Chapter,'+i+')" Title="Concordance and Hebrew/Greek"><img border="0" src="./gifs/c9.gif" ALIGN="bottom" width="17" height="17" vspace="1" hspace="1" ALT="Concordance and Hebrew/Greek"></a>';
		L = '<a href="' + localBase + '#'+i+'" onClick="return PNav(Book,Chapter,'+i+')" Title="List Available Commentaries"><img border="0" src="./gifs/l9.gif" ALIGN="bottom" width="17" height="17" vspace="1" hspace="1" ALT="List Available Commentaries"></a></nobr><br>';
		I = '<nobr><a href="' + localBase + '#'+i+'" onClick="return INav(Book,Chapter,'+i+')" Title="Images / Maps"><img border="0" src="./gifs/i9.gif" ALIGN="top" width="17" height="17" vspace="1" hspace="1" ALT="Images / Maps"></a>';
		IBoth = '<nobr><a href="' + localBase + '#'+i+'" onClick="return INav(Book,Chapter,'+i+')" Title="Hymns / Images / Maps"><img border="0" SRC="./gifs/i_both9.gif" width="17" height="17" vspace="1" hspace="1" ALT="Hymns / Images / Maps"></a>';
		H = '<nobr><a href="' + localBase + '#'+i+'" onClick="return INav(Book,Chapter,'+i+')" Title="Hymns"><img border="0" SRC="./gifs/i_hymns9.gif" width="17" height="17" vspace="1" hspace="1" ALT="Hymns"></a>';
		V = '<a href="' + localBase + '#'+i+'" onClick="return V_Nav(Book,Chapter,'+i+')" Title="Versions / Translations"><img border="0" src="./gifs/v9.gif" ALIGN="top" width="17" height="17" vspace="1" hspace="1" ALT="Versions / Translations"></a>';
		D = '<a href="' + localBase + '#'+i+'" onClick="return DNav(Book,Chapter,'+i+')" Title="Dictionary Aids"><img border="0" src="./gifs/d9.gif" ALIGN="top" width="17" height="17" vspace="1" hspace="1" ALT="Dictionary Aids"></a></nobr><BR></td>';
		P = '<td class=td_bible_verse_heading valign="top" nowrap width="68" align="left"><nobr><b><a href="' + localBase + '#'+i+'" onClick="return PNav(Book,Chapter,'+i+')">'+Book+' '+Chapter+':'+i+'</a></b></nobr></td>';
		document.write('	<tr>');
		document.write(K, C, L);

		if(Buttons[i].search('I,H') > 0) { document.write(IBoth); }
		else if(Buttons[i].search('I') > 0) { document.write(I); }
		else if(Buttons[i].search('H') > 0) { document.write(H); }
		else { document.write(INOT); }

		document.write(V);

		if(Buttons[i].search('D') > 0) { document.write(D); }
		else { document.write(DNOT); }

		document.write(P);

		if(Buttons[i].search('para') > 0) { document.write(para); }
		else { document.write(paraNOT); }

		if(Buttons[i].search('inline') > 0) {
			var j;
			var inlineArray = [];
			inlineArray = InLineText[i].split('^');
			var inlineLength = inlineArray.length;
			for(j=0;j<inlineLength;j++) Text[i] = Text[i].replace(inlineArray[j], inlinePara + inlineArray[j] + '</p>');
		}
		document.write('	<td class=td_bible_text valign="top">'+Text[i]+'</td></tr>');

// This next line draws a non-displaying row for inserting button drop downs
// colspan in the next row is 4 because the CD incluse a paragraph marker the site does not.

		document.write('<tr id="dropDownTR'+i+'" style="display:show;"><td id="dropDownTD'+i+'" colspan="4" valign="top" align=left></td></tr>');
	}

	if(Bracketed[Book + ' ' + Chapter])
		document.write('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>' + bracketTagline + '</td></tr>');
}
