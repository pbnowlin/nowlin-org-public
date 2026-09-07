//**********************************************
//
// TopNav Comm driver for Chuck Smith
//
//**********************************************

// Parse the reference into sections
	handref = Passage.toLowerCase();
	handref = handref.replace(/([123i]{0,3}\s*[a-z]*)\s*[a-z]*\s*(\d*)\:?(\d*)((-\d+)|(,\d+){0,})?[^\d,-]*/, '$1:$2:$3:$4');
	bookIn = handref.split(':')[0];
	try {
		verseIn = handref.split(':')[2]
		verseIn = parseInt(verseIn, 10);
	} catch(e) {
		verseIn = 1;
	}
	try {
		chapterIn = handref.split(':')[1]
		chapterIn = parseInt(chapterIn, 10);
	} catch(e) {
		chapterIn = 1;
		verseIn = 1;
	}
	try {
		verseOut = handref.split(':')[3]
	} catch(e) {
		verseOut =	verseIn;
	}

// Test various book inputs and decipher (such as, is "Isa" = 1 Sam or Isaiah)
	bookIn = bookIn.replace(/^iii/, '3');
	bookIn = bookIn.replace(/^ii/, '2');
	bookIn = bookIn.replace(/^i(\s|[^s]|sam)/, '1$1');

// To limit the number of required abbreviations,
// strip put the spaces between name pieces
	bookIn = bookIn.replace(/ */g, '');

// Test against our approved abbreviations
	Book = bookLookup(bookIn);

	Chapter = (isNaN(chapterIn)?1:chapterIn);
	Verse = (isNaN(verseIn)?"'all'":verseIn);
	if(Verse == verseOut) { ; }
	else if(verseOut.indexOf('-') == 0) { Verse = "'" + Verse.toString() + verseOut + "'"; }
	else if(verseOut.indexOf(',') >= 0) { Verse = Verse.toString() + verseOut; }

document.write(
'<div class="head">' +
'  Chuck Smith Sermon Notes' +
'</div>' +
'<div class="subhead">' +
'	<a href="#" onClick="return mV(\'' + Book + '\', ' + Chapter + ', ' + Verse + ');">' + Passage + '</a>' +
'</div>' +
'<div class="desc-center">' +
'	<div style="padding:5px;">' +
'    Pastor Chuck Smith<br />' +
'    Calvary Chapel Costa Mesa<br />' +
'    Costa Mesa, California<br />' +
'    <i>Sermon #' + SermonID + '</i>' +
'	</div>' +
'</div>' +
'<div class="main-just">' +
'	<div class="pad2020">'
);