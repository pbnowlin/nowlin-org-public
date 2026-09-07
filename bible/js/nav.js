//********************************************************************
// nav.js compliments nearly every page on the BLB-CD by providing the
// fundamental functions used to navigate the pages.  It is severly
// advised that nav.js be included just after basepath.js and before
// any other .js included file.
//********************************************************************


// Mostly used in the Header js included files, but can used
// anywhere to get defaults initialized to some value.
function setDefault(defVar, value) {
	try {
		if(eval(defVar) > 0) {
//  I'm changin this to return docwidth regardless of comparison to value
				return eval(defVar);
			if(eval(defVar) > value) {
				return eval(defVar);
			} else {
				return value;
			}
		}
	} catch(e) {
		return value;
	}
}

// Find and set the an item in a select input type to selected
// selectDefault(this.form, 'someText');
// Best way to use this is right after the </form> tag of which the select input type is used
// inside a <script></script> tag pair
function selectDefault(selectField, text) {
  for (i=0; i<selectField.options.length; i++) {
    if (selectField.options[i].value == text.toString()) {
		  selectField.selectedIndex = i;
		  break;
		}
  }
}


// Some windows need to adjust the Right main cell after an image loads
function resizeRightCell(width) {
	workingObj = document.getElementById("mainRightTD");
	workingObj.style.width=width;
}

function cidToShortName(cid) {
	var i = 0;
	cid = parseInt(cid, 10);
	if(cid == '' || cid == 0) return null;
	for(i=66;i>=1;i--)
		if(BookChapters[BookOrder[i]] < cid)
			return BookOrder[i];
	return null;
}

function cidToChapter(shortName, cid) {
	var i = 0;
	cid = parseInt(cid, 10);
	if(cid == '' || cid == 0) return 0;
	return cid - BookChapters[shortName];
	return 0;
}

// Expected parameters
// book:	short name of book
// chapt:	non-padded chapter number
// verse:	non-padded verse to display

// Optional parameters
// multiVerse(book, chapt, start-verse[-<end-verse>|<',next-verse'>, <',next-verse'>, ...])
// examples:
// multiVerse('Gen',6,1,7);		<= Gen 6:1,7
// multiVerse('Gen',1,3,7 );		<= Gen 6:1,3,7
// multiVerse('Gen',6,'1-');		<= Gen 6:1-22  allows full chapter selecting - Preferred: saves one character
// multiVerse('Gen',6,'all');		<= Gen 6:1-22  allows full chapter selecting
// multiVerse('Gen',6,'5-17');	<= Gen 6:5-17  allows verse spans from x to z
// multiVerse('Gen',6,'12-');		<= Gen 6:12-22 allows verse spans from x to the end of chapt
// All that is being done is building a comma delimited list for Verse.js to process.

function mV(book, chapt, verse) {
	var i, j, tempVerse;
	book = bookLookup(book);
  link = basePath + '/kjv/'+book+"/V_"+chapt+'.html?Verse=';
  for (i=2;i<mV.arguments.length;i++) {
  	tempVerse = mV.arguments[i];
  	if(tempVerse.toString().toLowerCase() == 'all') tempVerse = '1-'+getVerseCount(book+pad(chapt));
  	if(tempVerse.toString().search(/^\d+-$/) >= 0) tempVerse += getVerseCount(book+pad(chapt));
  	verse = parseInt(tempVerse.toString().split('-')[0], 10);
  	if(tempVerse.toString().split('-')[1]) {
  		endVerse = parseInt(tempVerse.toString().split('-')[1], 10)
			for(j=verse;j<=endVerse;j++) link += j+",";
		} else {
  		link += verse+",";
  	}
  }
// previous version replaced by above
//changes multiVerse to mV throughout saves 8 characters with each call
//function multiVerse(book, chapt, verse) {
//	var i, j, tempVerse;
//	book = bookLookup(book);
//  link = basePath + '/kjv/'+book+"/V_"+chapt+'.html?Verse=';
//  for (i=2;i<multiVerse.arguments.length;i++) {
//  	tempVerse = multiVerse.arguments[i];
//  	if(tempVerse.toString().toLowerCase() == 'all') tempVerse = '1-'+getVerseCount(book+pad(chapt));
//  	if(tempVerse.toString().search(/^\d+-$/) >= 0) tempVerse += getVerseCount(book+pad(chapt));
//  	verse = parseInt(tempVerse.toString().split('-')[0], 10);
//  	if(tempVerse.toString().split('-')[1]) {
//  		endVerse = parseInt(tempVerse.toString().split('-')[1], 10)
//			for(j=verse;j<=endVerse;j++) link += j+",";
//		} else {
//  		link += verse+",";
//  	}
// }

link = link.replace(/,$/, '');
kjvWindow=window.open(link,'kjvWindow','scrollbars=yes,resizable=yes,width=510,height=250');
window.setTimeout("kjvWindow.focus()",500);
 return false;
}

// General cookie manuveres
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);

  if (endstr == -1)
  endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;

  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
    return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function SetCookie (name, value) {
  var exp = new Date();
  var argv = SetCookie.arguments;
  var argc = SetCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = (argc > 3) ? argv[3] : null;
  var domain = (argc > 4) ? argv[4] : null;
  var secure = (argc > 5) ? argv[5] : false;

  exp.setTime (exp.getTime() + (expires*86400000));	// Every whole unit is one day
  document.cookie = name + "=" + escape (value) +
  ((expires == null) ? "" : ("; expires=" + exp.toGMTString())) +
  ((path == null) ? "" : ("; path=" + path)) +
  ((domain == null) ? "" : ("; domain=" + domain)) +
  ((secure == true) ? "; secure" : "");
  return value;
}

function DeleteCookie (name) {
  var exp = new Date();

  exp.setTime (exp.getTime() - 1);

// This cookie is history
  var cval = GetCookie (name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

// Make the parent of all windows go to a KJV Bible page
function M(Book, Chapter, Verse) {
  var link = basePath + '/kjv/' + Book + '/' + Book+pad(parseInt(Chapter, 10)) + '.html#'+Verse;
  var i = 0;

  try {
  	wopener = window.opener;
  	while (wopener.opener) {
	    if(i>10) {
	    	__BLB=window.open(link, '__BLB');
	    	window.setTimeout("__BLB.focus()",500);
	    	return false;
	    }
	    i++;
	    wopener = wopener.opener;
  	}
  	wopener.location = link;
  	window.setTimeout("wopener.focus()",500);
  } catch(e) {
  	newWindow=window.open(link, 'newWindow');
  	window.setTimeout("newWindow.focus()",500);
  }
  return false;
}

function detailed(word) {
  file = basePath + "/a/"+word.substr(0, 2).toLowerCase()+".html?Word="+word;
  detailedWindow=window.open(file,'detailedWindow','scrollbars=yes,resizable=yes,width=520,height=450,screenX=120,screenY=200,left=120,top=200');
  return false;
}

function pad(shortNum) {
  myString = shortNum.toString();
  for(i=myString.length;i<3;i++) {
    myString = "0"+myString;
  }
  return myString;
}

function findBook() {
	var ourLocation = new String(window.location);
	var locationArray = [];
	locationArray = ourLocation.split("\\");
	if(locationArray.length <=1) { locationArray = ourLocation.split("/"); }
	if(locationArray.length <=1) { return 'Gen'; }
	return locationArray[locationArray.length-2];
}

function findChapter() {
	var ourLocation = new String(window.location);
	var locationArray = [];
	locationArray = ourLocation.split("\\");
	if(locationArray.length <=1) { locationArray = ourLocation.split("/"); }
	if(locationArray.length <=1) { return 1; }
	var chapterValue = parseInt(locationArray[locationArray.length-1].split('.')[0].replace(/(^\d)?\D/g, ""), 10);
	return chapterValue>0?chapterValue:1;
}

// From index.html, get me to a KJV Bible page
function Navigate(formObj) {
  var bookindex = formObj.book.selectedIndex;
  var book      = formObj.book.options[bookindex].value;
  var chapter     = formObj.chapter.value;
  var verse     = formObj.verse.value;

// Not all calls to Navigate() use the two following fields
  try {
	  var handref		= formObj.handref.value;
	  var buttonMenu	= parseInt(formObj.buttonMenu.value, 10);
	} catch(e) {
	  var handref		= '';
	  var buttonMenu	= 1;
	}
	if(handref != '' && buttonMenu == 0) return evalHandRef(handref);
	chapterMax = getVerseCount(book)
	chapter = (chapter<chapterMax?chapter:chapterMax);
    paddedChapter = pad(chapter);
	verseMax = getVerseCount(book+paddedChapter)
  if (verse <= 6) { verse = ""; }
  else if(verse < verseMax) { verse = "#" + verse; }
  else { verse = "#" + verseMax; }
  locationString = basePath + "/kjv/" + book + "/" + book + paddedChapter + ".html" + verse;
  document.location.href=locationString;
  return false;
}


function evalHandRef(handref) {
	var v = '';

	handref = handref.toLowerCase();							// make it all lowercase
	handref = handref.replace(/(\D+\s?\d+)\.(\d+.*)/, '$1\:$2');	// replace form John 1.13 to John 1:13
	handref = handref.replace('.', ' ');					// strip out any periods
	handref = handref.replace(/^\s+/, '');				// strip out leading whitespace
	handref = handref.replace(/\s+$/, '');				// strip out trailing whitespace
	handref = handref.replace(/\s+of\s+/, ' ');		// strip out word "of" "Songs of Solomon" = "Songs Solomon"

// Parse the reference into sections
	handref = handref.replace(/([123i]{0,3}\s*[a-z]*)\s*[a-z]*\s*(\d*)\:?(\d*)[^\d+.*]?/, '$1:$2:$3');
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

// Test various book inputs and decipher (such as, is "Isa" = 1 Sam or Isaiah)
	bookIn = bookIn.replace(/^iii/, '3');
	bookIn = bookIn.replace(/^ii/, '2');
	bookIn = bookIn.replace(/^i(\s|[^s]|sam)/, '1$1');

// To limit the number of required abbreviations,
// strip put the spaces between name pieces
	bookIn = bookIn.replace(/ */g, '');

// Test against our approved abbreviations

	if(bookLookup(bookIn)) { Book = bookLookup(bookIn); }
	else { return badRef(); }

	Chapter = (isNaN(chapterIn)?1:chapterIn);
	Verse = (isNaN(verseIn)?1:verseIn);
	paddedChapter = pad(Chapter);

	if(getVerseCount(Book) < Chapter) { return badRef(); }
	if(getVerseCount(Book+paddedChapter) < Verse) { Verse = 1; }

	if(Verse <= 6) v = "top"; // allows navigation bars to show at top of file
	else { v = Verse; }

  locationString = basePath + "/kjv/" + Book + "/" + Book + paddedChapter + ".html#" + v;
  document.location.href=locationString;
	return false;
}

function badRef() {
  locationString = basePath + "/bad_ref.html";
  document.location.href=locationString;
	return false;
}

// Make the parent of all windows go to a specific page
function parentOpener(page) {
	page = page.replace(/^(\.+\/)+/, '/');
	link = basePath + page;
	try {
		wopener = window.opener;
		while (wopener.opener) {
			if(i>10) {
				__BLB=window.open(link, '__BLB');
				window.setTimeout("__BLB.focus()",500);
				return false;
			}
			i++;
			wopener = wopener.opener;
		}
		wopener.location = link;
		window.setTimeout("wopener.focus()",500);
	} catch(e) {
		newWindow=window.open(link, 'newWindow');
		window.setTimeout("newWindow.focus()",500);
	}
  return false;
}

// Single verse pop-up
function V(link) {
  Book = link.split("/")[0];
  Chapt = link.split("/")[1];
  Verse = link.split("/")[2];

// V() becomes obsolete because of multiVerse(), so we ought to forward the request
// and find/change any calls to V().
//  link = basePath + '/kjv/'+Book+"/V_"+Chapt+'.html?Verse='+Verse;
//  kjvWindow=window.open(link,'Kjv','scrollbars=yes,resizable=yes,width=510,height=250');
//  window.setTimeout("kjvWindow.focus()",500);
//  return mV(Book, Chapt, Verse);

  return mV(Book, Chapt, Verse);
}

// Tense pop-up
function T_Nav(tenseNum, newWindow) {
  XLocation = 160;
  YLocation = 390;
  link = basePath + "/t/index.html?tNum=" + tenseNum
  if (newWindow) {
    TnsWindow=window.open(link,'Tns','scrollbars=yes,resizable=yes,width=620,height=300,screenX='+XLocation+',screenY='+YLocation+',left='+XLocation+',top='+YLocation);
		TnsWindow.focus();
  } else {
    Tns2Window=window.open(link,'Tns2','scrollbars=yes,resizable=yes,width=620,height=300,screenX='+XLocation+',screenY='+YLocation+',left='+XLocation+',top='+YLocation);
    window.setTimeout("Tns2Window.focus()",500);
  }
  return false;
}

// Strong's pop-up
function S_Nav(strongs) {
	if(strongs.search(/^0\d/) >=0) {
		link = basePath + '/strongs_hebrew.html?strongs='+strongs+'&page=1';
	}	else if(strongs.search(/^[0-9]/) >=0) {
		link = basePath + '/strongs_greek.html?strongs='+strongs+'&page=1';
	}
  strWindow=window.open(link,'strWindow','scrollbars=yes,resizable=yes,width=650,height=600');
  return false;
}

// Concordence pop-up
function C_Nav(book,chapt,verse) {
  chapter = pad(chapt);
  link = basePath + '/c/' + book+"/"+chapter+".html?Book=" + book + "&Chapter=" + chapt + "&Verse=" + verse;
  concWindow=window.open(link,'Conc','scrollbars=yes,resizable=yes,width=710,height=600,screenX=50,screenY=60,left=50,top=60');
  concWindow.focus();
  return true;
}

// Version pop-up
function V_Nav(book, chapter, verse) {
  paddedChapter = pad(chapter);
  link = basePath + '/v/' + book+"/"+paddedChapter+".html?Book="+book+"&Chapter="+chapter+"&Verse="+verse;
  vrsnWindow=window.open(link,'Vrsn','scrollbars=yes,resizable=yes,width=650,height=700,screenX=0,screenY=120,left=0,top=120');
  vrsnWindow.focus();
  return true;
}

// Word/Phrase Search
function W_Nav(words, strongs) {
	var show_strongs = 'V'
	words = words.replace(/^ +/, "");
	if(strongs) { show_strongs = 'S'; }
	if(words.search(/^\#/) >= 0) {
		words = words.replace(/^\#/, "").split(" ")[0];  // In case there are multiple words; we don't search multiple Strong's numbers//
		if (words.search(/^0\d/) >= 0) {
			action = basePath + '/strongs_hebrew.html?word=' + words + '&show_strongs=' + show_strongs;
		} else {
			action = basePath + '/strongs_greek.html?word=' + words + '&show_strongs=' + show_strongs;
		}
		strWindow = window.open(action,'strWindow','scrollbars=yes,resizable=yes,width=650,height=600');
	} else {
		action = basePath + '/phrase_search.html?word=' + words + '&show_strongs=' + show_strongs;
		wrdWindow = window.open(action,'wrdWindow','scrollbars=yes,resizable=yes,width=650,height=600');
	}
	return false;
}

// TSK pop-up
function T(book,chapt,verse) {
  chapter = pad(chapt);
  link = basePath + "/kjv/"+book+"/T_"+chapter+".html?Verse="+verse;
  tskWindow=window.open(link,'Tsk','scrollbars=yes,resizable=yes,width=650,height=550,screenX=30,screenY=280,left=30,top=280');
  tskWindow.focus();
  return true;
}

function Info_Nav(info) {
  link = basePath + info;
  InfoWindow=window.open(link,'Info','scrollbars=yes,resizable=yes,width=650,height=600');
  InfoWindow.focus();
  return false;
}

function do_sep_notes(book, chap, verse) {
  link = basePath + "/sep_notes/sep_notes.html?"+book+chap+":"+verse;
  SepWindow=window.open(link,'Info','scrollbars=yes,resizable=yes,width=600,height=200');
  SepWindow.focus();
  return false;
}

function imgTurnOn(imageName) {
  if (document.images) {
    document[imageName].src = eval(imageName + "on.src");
  }
}

function imgTurnOff(imageName) {
  if (document.images) {
    document[imageName].src = eval(imageName + "off.src");
  }
}

//Preps String to be used as an anchor
function prepAnchor(title) {
    return title.substring(2).replace(/ |,/g, '').toLowerCase();
}

function doDictLookup(DictItem) {
  var DictArray = new Array();
  DictArray = DictItem.split(",");
  for(i=0;i<DictArray.length;i++) {
		Dict = DictArray[i];
		switch (Dict.charAt(0)) {
			case "N" :
				dir = basePath + "/d/naves/";
				file = Math.floor(parseInt(Dict.substr(2, 7), 10) / 50) * 50;
				if(file >= 1000){prefix = "000";}
				if(file < 1000 && file >= 100){prefix = "0000" ;}
				if(file == 50){prefix = "00000";}
				if(file == 0){prefix = "000000";}
				file = "T" + prefix + file;
				Dict = parseInt(Dict.substr(2, 7), 10);
				if (100 > Dict && Dict > 9){prefix = "00000";}
				Dict = "$$T" + prefix + Dict;
				link = dir + file + ".html?navesItem=" + Dict;
				navesWindow=window.open(link,'naves','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				navesWindow.focus();
				break;

			case "T" :
				dir = basePath + "/d/torreys/";
				file = Math.floor(parseInt(Dict.substr(2, 7), 10) / 50) * 50;
				if(file >= 1000){prefix = "000";}
				if(file < 1000 && file >= 100){prefix = "0000" ;}
				if(file == 50){prefix = "00000";}
				if(file == 0){prefix = "000000";}
				file = "T" + prefix + file;
				Dict = parseInt(Dict.substr(2, 7), 10);
				if (100 > Dict && Dict > 9){prefix = "00000";}
				Dict = "$$T" + prefix + Dict;
				link = dir + file + ".html?torreysItem=" + Dict;
				torreysWindow=window.open(link,'torreys','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				torreysWindow.focus();
				break;

			case "E" :
				dir = basePath + "/d/easton/";
				file = Math.floor(parseInt(Dict.substr(2, 7), 10) / 50) * 50;
				if(file >= 1000){prefix = "000";}
				if(file < 1000 && file >= 100){prefix = "0000" ;}
				if(file == 50){prefix = "00000";}
				if(file == 0){prefix = "000000";}
				file = "t" + prefix + file;
				Dict = parseInt(Dict.substr(2, 7), 10);
				if (100 > Dict && Dict > 9){prefix = "00000";}
				Dict = "$$T" + prefix + Dict;
				link = dir + file + ".html?eastonItem=" + Dict;
				eastonWindow=window.open(link,'easton','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				eastonWindow.focus();
				break;

			case "S" :
				dir = basePath + "/d/subject/";
				file = Dict.substr(1) + ".html";
				link = dir + file;
				subjectWindow=window.open(link,'subject','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				subjectWindow.focus();
				break;

			case "V" :
				dir = basepath + "/d/vines/";
				file = Math.floor(parseInt(Dict.substr(2, 7), 10) / 50) * 50;
				if(file >= 1000){prefix = "000";}
				if(file < 1000 && file >= 100){prefix = "0000";}
				if(file == 50){prefix = "00000";}
				if(file == 0){prefix = "000000";}
				file = "t" + prefix + file;
				Dict = parseInt(Dict.substr(2, 7), 10);
				if (100 > Dict && Dict > 9){prefix = "00000";}
				Dict = "$$T" + prefix + Dict;
				link = dir + file + ".html?" + Dict;
				vinesWindow=window.open(link,'vines','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				 vinesWindow.focus();
				break;

			case "H" :
				dir = basePath + "/d/hitchcock/";
				file = "hitchcock.html";
				word = Dict.substr(1);
				link = dir + file + "?Word=" + word;
				hitchcockWindow=window.open(link,'hitchcock','scrollbars=yes,resizable=yes,width=650,height=550,screenX=40,screenY=250,left=40,top=250');
				hitchcockWindow.focus();
				break;

			case "R" :
				dir = basePath + "/study/hta/";
				file = "hta.html";
				word = Dict.substr(1);
				link = dir + file + "#section=" + BibleID + '@' + word;
				location.href=link;
				break;
		default:
				alert("Please Choose a Dictionary Topic");
		}
	}
  return false;
}

function doImgLookup(Dict) {
  Dict = basePath + Dict;
ImgWindow=window.open(Dict,'ImgWindow','scrollbars=yes,resizable=yes,width=800,height=600,screenX=25,screenY=50,left=25,top=50');
  return false;
}

function doCommLookup(Comm) {
  link  = basePath + '/' + Comm;
  if (Comm){CommWindow=window.open(link,'CommWndw','scrollbars=yes,resizable=yes,width=650,height=550,screenX=100,screenY=150,left=100,top=150');}
  else {alert("Please choose a commentary to view.");}
  return false;
}

function adjustAnchors() {
	var searcher = new RegExp('/BLB/index.html#', 'i');
	var replacer = '/BLB/'+localFile;
	var aIndexer = 0;
	if(cgi_vars) replacer += '?'+cgi_vars;
	replacer += '#';
	var aColection = document.getElementsByTagName('A');
	var aCollLength = aColection.length;
	for(aIndexer=0;aIndexer<aCollLength;aIndexer++)
		aColection[aIndexer].href = aColection[aIndexer].href.replace(searcher, replacer);

}

function preloadAlphaImages() {
	if (document.images) {
		aon = new Image();
		aon.src = "./gifs/new_letters/aa.gif";
		aoff = new Image();
		aoff.src = "./gifs/new_letters/a.gif";
		bon = new Image();
		bon.src = "./gifs/new_letters/ba.gif";
		boff = new Image();
		boff.src = "./gifs/new_letters/b.gif";
		con = new Image();
		con.src = "./gifs/new_letters/ca.gif";
		coff = new Image();
		coff.src = "./gifs/new_letters/c.gif";
		don = new Image();
		don.src = "./gifs/new_letters/da.gif";
		doff = new Image();
		doff.src = "./gifs/new_letters/d.gif";
		eon = new Image();
		eon.src = "./gifs/new_letters/ea.gif";
		eoff = new Image();
		eoff.src = "./gifs/new_letters/e.gif";
		fon = new Image();
		fon.src = "./gifs/new_letters/fa.gif";
		foff = new Image();
		foff.src = "./gifs/new_letters/f.gif";
		gon = new Image();
		gon.src = "./gifs/new_letters/ga.gif";
		goff = new Image();
		goff.src = "./gifs/new_letters/g.gif";
		hon = new Image();
		hon.src = "./gifs/new_letters/ha.gif";
		hoff = new Image();
		hoff.src = "./gifs/new_letters/h.gif";
		ion = new Image();
		ion.src = "./gifs/new_letters/ia.gif";
		ioff = new Image();
		ioff.src = "./gifs/new_letters/i.gif";
		jon = new Image();
		jon.src = "./gifs/new_letters/ja.gif";
		joff = new Image();
		joff.src = "./gifs/new_letters/j.gif";
		kon = new Image();
		kon.src = "./gifs/new_letters/ka.gif";
		koff = new Image();
		koff.src = "./gifs/new_letters/k.gif";
		lon = new Image();
		lon.src = "./gifs/new_letters/la.gif";
		loff = new Image();
		loff.src = "./gifs/new_letters/l.gif";
		mon = new Image();
		mon.src = "./gifs/new_letters/ma.gif";
		moff = new Image();
		moff.src = "./gifs/new_letters/m.gif";
		non = new Image();
		non.src = "./gifs/new_letters/na.gif";
		noff = new Image();
		noff.src = "./gifs/new_letters/n.gif";
		oon = new Image();
		oon.src = "./gifs/new_letters/oa.gif";
		ooff = new Image();
		ooff.src = "./gifs/new_letters/o.gif";
		pon = new Image();
		pon.src = "./gifs/new_letters/pa.gif";
		poff = new Image();
		poff.src = "./gifs/new_letters/p.gif";
		qon = new Image();
		qon.src = "./gifs/new_letters/qa.gif";
		qoff = new Image();
		qoff.src = "./gifs/new_letters/q.gif";
		ron = new Image();
		ron.src = "./gifs/new_letters/ra.gif";
		roff = new Image();
		roff.src = "./gifs/new_letters/r.gif";
		son = new Image();
		son.src = "./gifs/new_letters/sa.gif";
		soff = new Image();
		soff.src = "./gifs/new_letters/s.gif";
		ton = new Image();
		ton.src = "./gifs/new_letters/ta.gif";
		toff = new Image();
		toff.src = "./gifs/new_letters/t.gif";
		uon = new Image();
		uon.src = "./gifs/new_letters/ua.gif";
		uoff = new Image();
		uoff.src = "./gifs/new_letters/u.gif";
		von = new Image();
		von.src = "./gifs/new_letters/va.gif";
		voff = new Image();
		voff.src = "./gifs/new_letters/v.gif";
		won = new Image();
		won.src = "./gifs/new_letters/wa.gif";
		woff = new Image();
		woff.src = "./gifs/new_letters/w.gif";
		yon = new Image();
		yon.src = "./gifs/new_letters/ya.gif";
		yoff = new Image();
		yoff.src = "./gifs/new_letters/y.gif";
		xon = new Image();
		xon.src = "./gifs/new_letters/xz.gif";
		xoff = new Image();
		xoff.src = "./gifs/new_letters/xz.gif";
		zon = new Image();
		zon.src = "./gifs/new_letters/zz.gif";
		zoff = new Image();
		zoff.src = "./gifs/new_letters/zz.gif";
	}
}

function preloadLeftNavImages() {
	if (document.images) {
		bg = new Image();
		bg.src = "./gifs/blb_bg.gif";
		img1on = new Image();
		img1on.src = "./gifs/blb_menu/m_head2D.gif";
		img1off = new Image();
		img1off.src = "./gifs/blb_menu/m_head2A.gif";
		img2on = new Image();
		img2on.src = "./gifs/blb_menu/seaD.gif";
		img2off = new Image();
		img2off.src = document.img2.src;
		img3on = new Image();
		img3on.src = "./gifs/blb_menu/comD.gif";
		img3off = new Image();
		img3off.src = document.img3.src;
		img4on = new Image();
		img4on.src = "./gifs/blb_menu/audD.gif";
		img4off = new Image();
		img4off.src = document.img4.src;
		img5on = new Image();
		img5on.src = "./gifs/blb_menu/stuD.gif";
		img5off = new Image();
		img5off.src = document.img5.src;
		img6on = new Image();
		img6on.src = "./gifs/blb_menu/imaD.gif";
		img6off = new Image();
		img6off.src = document.img6.src;
		img7on = new Image();
		img7on.src = "./gifs/blb_menu/devD.gif";
		img7off = new Image();
		img7off.src = document.img7.src;
		img8on = new Image();
		img8on.src = "./gifs/blb_menu/helD.gif";
		img8off = new Image();
		img8off.src = document.img8.src;
		img9on = new Image();
		img9on.src = "./gifs/blb_menu/knoD.gif";
		img9off = new Image();
		img9off.src = document.img9.src;
		img10on = new Image();
		img10on.src = "./gifs/blb_menu/freD.gif";
		img10off = new Image();
		img10off.src = document.img10.src;
		img11on = new Image();
		img11on.src = "./gifs/blb_menu/aboD.gif";
		img11off = new Image();
		img11off.src = document.img11.src;
		img12on = new Image();
		img12on.src = "./gifs/blb_menu/othCDD.gif";
		img12off = new Image();
		img12off.src = document.img12.src;
		img14on = new Image();
		img14on.src = "./gifs/blb_menu/conD.gif";
		img14off = new Image();
		img14off.src = document.img14.src;
	}
}

function getVerseCount(Book) {

  var verseCount = [];
	verseCount["Gen"] = 50;
	verseCount["Gen001"] = 31;
	verseCount["Gen002"] = 25;
	verseCount["Gen003"] = 24;
	verseCount["Gen004"] = 26;
	verseCount["Gen005"] = 32;
	verseCount["Gen006"] = 22;
	verseCount["Gen007"] = 24;
	verseCount["Gen008"] = 22;
	verseCount["Gen009"] = 29;
	verseCount["Gen010"] = 32;
	verseCount["Gen011"] = 32;
	verseCount["Gen012"] = 20;
	verseCount["Gen013"] = 18;
	verseCount["Gen014"] = 24;
	verseCount["Gen015"] = 21;
	verseCount["Gen016"] = 16;
	verseCount["Gen017"] = 27;
	verseCount["Gen018"] = 33;
	verseCount["Gen019"] = 38;
	verseCount["Gen020"] = 18;
	verseCount["Gen021"] = 34;
	verseCount["Gen022"] = 24;
	verseCount["Gen023"] = 20;
	verseCount["Gen024"] = 67;
	verseCount["Gen025"] = 34;
	verseCount["Gen026"] = 35;
	verseCount["Gen027"] = 46;
	verseCount["Gen028"] = 22;
	verseCount["Gen029"] = 35;
	verseCount["Gen030"] = 43;
	verseCount["Gen031"] = 55;
	verseCount["Gen032"] = 32;
	verseCount["Gen033"] = 20;
	verseCount["Gen034"] = 31;
	verseCount["Gen035"] = 29;
	verseCount["Gen036"] = 43;
	verseCount["Gen037"] = 36;
	verseCount["Gen038"] = 30;
	verseCount["Gen039"] = 23;
	verseCount["Gen040"] = 23;
	verseCount["Gen041"] = 57;
	verseCount["Gen042"] = 38;
	verseCount["Gen043"] = 34;
	verseCount["Gen044"] = 34;
	verseCount["Gen045"] = 28;
	verseCount["Gen046"] = 34;
	verseCount["Gen047"] = 31;
	verseCount["Gen048"] = 22;
	verseCount["Gen049"] = 33;
	verseCount["Gen050"] = 26;
	verseCount["Exd"] = 40;
	verseCount["Exd001"] = 22;
	verseCount["Exd002"] = 25;
	verseCount["Exd003"] = 22;
	verseCount["Exd004"] = 31;
	verseCount["Exd005"] = 23;
	verseCount["Exd006"] = 30;
	verseCount["Exd007"] = 25;
	verseCount["Exd008"] = 32;
	verseCount["Exd009"] = 35;
	verseCount["Exd010"] = 29;
	verseCount["Exd011"] = 10;
	verseCount["Exd012"] = 51;
	verseCount["Exd013"] = 22;
	verseCount["Exd014"] = 31;
	verseCount["Exd015"] = 27;
	verseCount["Exd016"] = 36;
	verseCount["Exd017"] = 16;
	verseCount["Exd018"] = 27;
	verseCount["Exd019"] = 25;
	verseCount["Exd020"] = 26;
	verseCount["Exd021"] = 36;
	verseCount["Exd022"] = 31;
	verseCount["Exd023"] = 33;
	verseCount["Exd024"] = 18;
	verseCount["Exd025"] = 40;
	verseCount["Exd026"] = 37;
	verseCount["Exd027"] = 21;
	verseCount["Exd028"] = 43;
	verseCount["Exd029"] = 46;
	verseCount["Exd030"] = 38;
	verseCount["Exd031"] = 18;
	verseCount["Exd032"] = 35;
	verseCount["Exd033"] = 23;
	verseCount["Exd034"] = 35;
	verseCount["Exd035"] = 35;
	verseCount["Exd036"] = 38;
	verseCount["Exd037"] = 29;
	verseCount["Exd038"] = 31;
	verseCount["Exd039"] = 43;
	verseCount["Exd040"] = 38;
	verseCount["Lev"] = 27;
	verseCount["Lev001"] = 17;
	verseCount["Lev002"] = 16;
	verseCount["Lev003"] = 17;
	verseCount["Lev004"] = 35;
	verseCount["Lev005"] = 19;
	verseCount["Lev006"] = 30;
	verseCount["Lev007"] = 38;
	verseCount["Lev008"] = 36;
	verseCount["Lev009"] = 24;
	verseCount["Lev010"] = 20;
	verseCount["Lev011"] = 47;
	verseCount["Lev012"] = 8;
	verseCount["Lev013"] = 59;
	verseCount["Lev014"] = 57;
	verseCount["Lev015"] = 33;
	verseCount["Lev016"] = 34;
	verseCount["Lev017"] = 16;
	verseCount["Lev018"] = 30;
	verseCount["Lev019"] = 37;
	verseCount["Lev020"] = 27;
	verseCount["Lev021"] = 24;
	verseCount["Lev022"] = 33;
	verseCount["Lev023"] = 44;
	verseCount["Lev024"] = 23;
	verseCount["Lev025"] = 55;
	verseCount["Lev026"] = 46;
	verseCount["Lev027"] = 34;
	verseCount["Num"] = 36;
	verseCount["Num001"] = 54;
	verseCount["Num002"] = 34;
	verseCount["Num003"] = 51;
	verseCount["Num004"] = 49;
	verseCount["Num005"] = 31;
	verseCount["Num006"] = 27;
	verseCount["Num007"] = 89;
	verseCount["Num008"] = 26;
	verseCount["Num009"] = 23;
	verseCount["Num010"] = 36;
	verseCount["Num011"] = 35;
	verseCount["Num012"] = 16;
	verseCount["Num013"] = 33;
	verseCount["Num014"] = 45;
	verseCount["Num015"] = 41;
	verseCount["Num016"] = 50;
	verseCount["Num017"] = 13;
	verseCount["Num018"] = 32;
	verseCount["Num019"] = 22;
	verseCount["Num020"] = 29;
	verseCount["Num021"] = 35;
	verseCount["Num022"] = 41;
	verseCount["Num023"] = 30;
	verseCount["Num024"] = 25;
	verseCount["Num025"] = 18;
	verseCount["Num026"] = 65;
	verseCount["Num027"] = 23;
	verseCount["Num028"] = 31;
	verseCount["Num029"] = 40;
	verseCount["Num030"] = 16;
	verseCount["Num031"] = 54;
	verseCount["Num032"] = 42;
	verseCount["Num033"] = 56;
	verseCount["Num034"] = 29;
	verseCount["Num035"] = 34;
	verseCount["Num036"] = 13;
	verseCount["Deu"] = 34;
	verseCount["Deu001"] = 46;
	verseCount["Deu002"] = 37;
	verseCount["Deu003"] = 29;
	verseCount["Deu004"] = 49;
	verseCount["Deu005"] = 33;
	verseCount["Deu006"] = 25;
	verseCount["Deu007"] = 26;
	verseCount["Deu008"] = 20;
	verseCount["Deu009"] = 29;
	verseCount["Deu010"] = 22;
	verseCount["Deu011"] = 32;
	verseCount["Deu012"] = 32;
	verseCount["Deu013"] = 18;
	verseCount["Deu014"] = 29;
	verseCount["Deu015"] = 23;
	verseCount["Deu016"] = 22;
	verseCount["Deu017"] = 20;
	verseCount["Deu018"] = 22;
	verseCount["Deu019"] = 21;
	verseCount["Deu020"] = 20;
	verseCount["Deu021"] = 23;
	verseCount["Deu022"] = 30;
	verseCount["Deu023"] = 25;
	verseCount["Deu024"] = 22;
	verseCount["Deu025"] = 19;
	verseCount["Deu026"] = 19;
	verseCount["Deu027"] = 26;
	verseCount["Deu028"] = 68;
	verseCount["Deu029"] = 29;
	verseCount["Deu030"] = 20;
	verseCount["Deu031"] = 30;
	verseCount["Deu032"] = 52;
	verseCount["Deu033"] = 29;
	verseCount["Deu034"] = 12;
	verseCount["Jos"] = 24;
	verseCount["Jos001"] = 18;
	verseCount["Jos002"] = 24;
	verseCount["Jos003"] = 17;
	verseCount["Jos004"] = 24;
	verseCount["Jos005"] = 15;
	verseCount["Jos006"] = 27;
	verseCount["Jos007"] = 26;
	verseCount["Jos008"] = 35;
	verseCount["Jos009"] = 27;
	verseCount["Jos010"] = 43;
	verseCount["Jos011"] = 23;
	verseCount["Jos012"] = 24;
	verseCount["Jos013"] = 33;
	verseCount["Jos014"] = 15;
	verseCount["Jos015"] = 63;
	verseCount["Jos016"] = 10;
	verseCount["Jos017"] = 18;
	verseCount["Jos018"] = 28;
	verseCount["Jos019"] = 51;
	verseCount["Jos020"] = 9;
	verseCount["Jos021"] = 45;
	verseCount["Jos022"] = 34;
	verseCount["Jos023"] = 16;
	verseCount["Jos024"] = 33;
	verseCount["Jdg"] = 21;
	verseCount["Jdg001"] = 36;
	verseCount["Jdg002"] = 23;
	verseCount["Jdg003"] = 31;
	verseCount["Jdg004"] = 24;
	verseCount["Jdg005"] = 31;
	verseCount["Jdg006"] = 40;
	verseCount["Jdg007"] = 25;
	verseCount["Jdg008"] = 35;
	verseCount["Jdg009"] = 57;
	verseCount["Jdg010"] = 18;
	verseCount["Jdg011"] = 40;
	verseCount["Jdg012"] = 15;
	verseCount["Jdg013"] = 25;
	verseCount["Jdg014"] = 20;
	verseCount["Jdg015"] = 20;
	verseCount["Jdg016"] = 31;
	verseCount["Jdg017"] = 13;
	verseCount["Jdg018"] = 31;
	verseCount["Jdg019"] = 30;
	verseCount["Jdg020"] = 48;
	verseCount["Jdg021"] = 25;
	verseCount["Rth"] = 4;
	verseCount["Rth001"] = 22;
	verseCount["Rth002"] = 23;
	verseCount["Rth003"] = 18;
	verseCount["Rth004"] = 22;
	verseCount["1Sa"] = 31;
	verseCount["1Sa001"] = 28;
	verseCount["1Sa002"] = 36;
	verseCount["1Sa003"] = 21;
	verseCount["1Sa004"] = 22;
	verseCount["1Sa005"] = 12;
	verseCount["1Sa006"] = 21;
	verseCount["1Sa007"] = 17;
	verseCount["1Sa008"] = 22;
	verseCount["1Sa009"] = 27;
	verseCount["1Sa010"] = 27;
	verseCount["1Sa011"] = 15;
	verseCount["1Sa012"] = 25;
	verseCount["1Sa013"] = 23;
	verseCount["1Sa014"] = 52;
	verseCount["1Sa015"] = 35;
	verseCount["1Sa016"] = 23;
	verseCount["1Sa017"] = 58;
	verseCount["1Sa018"] = 30;
	verseCount["1Sa019"] = 24;
	verseCount["1Sa020"] = 42;
	verseCount["1Sa021"] = 15;
	verseCount["1Sa022"] = 23;
	verseCount["1Sa023"] = 29;
	verseCount["1Sa024"] = 22;
	verseCount["1Sa025"] = 44;
	verseCount["1Sa026"] = 25;
	verseCount["1Sa027"] = 12;
	verseCount["1Sa028"] = 25;
	verseCount["1Sa029"] = 11;
	verseCount["1Sa030"] = 31;
	verseCount["1Sa031"] = 13;
	verseCount["2Sa"] = 24;
	verseCount["2Sa001"] = 27;
	verseCount["2Sa002"] = 32;
	verseCount["2Sa003"] = 39;
	verseCount["2Sa004"] = 12;
	verseCount["2Sa005"] = 25;
	verseCount["2Sa006"] = 23;
	verseCount["2Sa007"] = 29;
	verseCount["2Sa008"] = 18;
	verseCount["2Sa009"] = 13;
	verseCount["2Sa010"] = 19;
	verseCount["2Sa011"] = 27;
	verseCount["2Sa012"] = 31;
	verseCount["2Sa013"] = 39;
	verseCount["2Sa014"] = 33;
	verseCount["2Sa015"] = 37;
	verseCount["2Sa016"] = 23;
	verseCount["2Sa017"] = 29;
	verseCount["2Sa018"] = 33;
	verseCount["2Sa019"] = 43;
	verseCount["2Sa020"] = 26;
	verseCount["2Sa021"] = 22;
	verseCount["2Sa022"] = 51;
	verseCount["2Sa023"] = 39;
	verseCount["2Sa024"] = 25;
	verseCount["1Ki"] = 22;
	verseCount["1Ki001"] = 53;
	verseCount["1Ki002"] = 46;
	verseCount["1Ki003"] = 28;
	verseCount["1Ki004"] = 34;
	verseCount["1Ki005"] = 18;
	verseCount["1Ki006"] = 38;
	verseCount["1Ki007"] = 51;
	verseCount["1Ki008"] = 66;
	verseCount["1Ki009"] = 28;
	verseCount["1Ki010"] = 29;
	verseCount["1Ki011"] = 43;
	verseCount["1Ki012"] = 33;
	verseCount["1Ki013"] = 34;
	verseCount["1Ki014"] = 31;
	verseCount["1Ki015"] = 34;
	verseCount["1Ki016"] = 34;
	verseCount["1Ki017"] = 24;
	verseCount["1Ki018"] = 46;
	verseCount["1Ki019"] = 21;
	verseCount["1Ki020"] = 43;
	verseCount["1Ki021"] = 29;
	verseCount["1Ki022"] = 53;
	verseCount["2Ki"] = 25;
	verseCount["2Ki001"] = 18;
	verseCount["2Ki002"] = 25;
	verseCount["2Ki003"] = 27;
	verseCount["2Ki004"] = 44;
	verseCount["2Ki005"] = 27;
	verseCount["2Ki006"] = 33;
	verseCount["2Ki007"] = 20;
	verseCount["2Ki008"] = 29;
	verseCount["2Ki009"] = 37;
	verseCount["2Ki010"] = 36;
	verseCount["2Ki011"] = 21;
	verseCount["2Ki012"] = 21;
	verseCount["2Ki013"] = 25;
	verseCount["2Ki014"] = 29;
	verseCount["2Ki015"] = 38;
	verseCount["2Ki016"] = 20;
	verseCount["2Ki017"] = 41;
	verseCount["2Ki018"] = 37;
	verseCount["2Ki019"] = 37;
	verseCount["2Ki020"] = 21;
	verseCount["2Ki021"] = 26;
	verseCount["2Ki022"] = 20;
	verseCount["2Ki023"] = 37;
	verseCount["2Ki024"] = 20;
	verseCount["2Ki025"] = 30;
	verseCount["1Ch"] = 29;
	verseCount["1Ch001"] = 54;
	verseCount["1Ch002"] = 55;
	verseCount["1Ch003"] = 24;
	verseCount["1Ch004"] = 43;
	verseCount["1Ch005"] = 26;
	verseCount["1Ch006"] = 81;
	verseCount["1Ch007"] = 40;
	verseCount["1Ch008"] = 40;
	verseCount["1Ch009"] = 44;
	verseCount["1Ch010"] = 14;
	verseCount["1Ch011"] = 47;
	verseCount["1Ch012"] = 40;
	verseCount["1Ch013"] = 14;
	verseCount["1Ch014"] = 17;
	verseCount["1Ch015"] = 29;
	verseCount["1Ch016"] = 43;
	verseCount["1Ch017"] = 27;
	verseCount["1Ch018"] = 17;
	verseCount["1Ch019"] = 19;
	verseCount["1Ch020"] = 8;
	verseCount["1Ch021"] = 30;
	verseCount["1Ch022"] = 19;
	verseCount["1Ch023"] = 32;
	verseCount["1Ch024"] = 31;
	verseCount["1Ch025"] = 31;
	verseCount["1Ch026"] = 32;
	verseCount["1Ch027"] = 34;
	verseCount["1Ch028"] = 21;
	verseCount["1Ch029"] = 30;
	verseCount["2Ch"] = 36;
	verseCount["2Ch001"] = 17;
	verseCount["2Ch002"] = 18;
	verseCount["2Ch003"] = 17;
	verseCount["2Ch004"] = 22;
	verseCount["2Ch005"] = 14;
	verseCount["2Ch006"] = 42;
	verseCount["2Ch007"] = 22;
	verseCount["2Ch008"] = 18;
	verseCount["2Ch009"] = 31;
	verseCount["2Ch010"] = 19;
	verseCount["2Ch011"] = 23;
	verseCount["2Ch012"] = 16;
	verseCount["2Ch013"] = 22;
	verseCount["2Ch014"] = 15;
	verseCount["2Ch015"] = 19;
	verseCount["2Ch016"] = 14;
	verseCount["2Ch017"] = 19;
	verseCount["2Ch018"] = 34;
	verseCount["2Ch019"] = 11;
	verseCount["2Ch020"] = 37;
	verseCount["2Ch021"] = 20;
	verseCount["2Ch022"] = 12;
	verseCount["2Ch023"] = 21;
	verseCount["2Ch024"] = 27;
	verseCount["2Ch025"] = 28;
	verseCount["2Ch026"] = 23;
	verseCount["2Ch027"] = 9;
	verseCount["2Ch028"] = 27;
	verseCount["2Ch029"] = 36;
	verseCount["2Ch030"] = 27;
	verseCount["2Ch031"] = 21;
	verseCount["2Ch032"] = 33;
	verseCount["2Ch033"] = 25;
	verseCount["2Ch034"] = 33;
	verseCount["2Ch035"] = 27;
	verseCount["2Ch036"] = 23;
	verseCount["Ezr"] = 10;
	verseCount["Ezr001"] = 11;
	verseCount["Ezr002"] = 70;
	verseCount["Ezr003"] = 13;
	verseCount["Ezr004"] = 24;
	verseCount["Ezr005"] = 17;
	verseCount["Ezr006"] = 22;
	verseCount["Ezr007"] = 28;
	verseCount["Ezr008"] = 36;
	verseCount["Ezr009"] = 15;
	verseCount["Ezr010"] = 44;
	verseCount["Neh"] = 13;
	verseCount["Neh001"] = 11;
	verseCount["Neh002"] = 20;
	verseCount["Neh003"] = 32;
	verseCount["Neh004"] = 23;
	verseCount["Neh005"] = 19;
	verseCount["Neh006"] = 19;
	verseCount["Neh007"] = 73;
	verseCount["Neh008"] = 18;
	verseCount["Neh009"] = 38;
	verseCount["Neh010"] = 39;
	verseCount["Neh011"] = 36;
	verseCount["Neh012"] = 47;
	verseCount["Neh013"] = 31;
	verseCount["Est"] = 10;
	verseCount["Est001"] = 22;
	verseCount["Est002"] = 23;
	verseCount["Est003"] = 15;
	verseCount["Est004"] = 17;
	verseCount["Est005"] = 14;
	verseCount["Est006"] = 14;
	verseCount["Est007"] = 10;
	verseCount["Est008"] = 17;
	verseCount["Est009"] = 32;
	verseCount["Est010"] = 3;
	verseCount["Job"] = 42;
	verseCount["Job001"] = 22;
	verseCount["Job002"] = 13;
	verseCount["Job003"] = 26;
	verseCount["Job004"] = 21;
	verseCount["Job005"] = 27;
	verseCount["Job006"] = 30;
	verseCount["Job007"] = 21;
	verseCount["Job008"] = 22;
	verseCount["Job009"] = 35;
	verseCount["Job010"] = 22;
	verseCount["Job011"] = 20;
	verseCount["Job012"] = 25;
	verseCount["Job013"] = 28;
	verseCount["Job014"] = 22;
	verseCount["Job015"] = 35;
	verseCount["Job016"] = 22;
	verseCount["Job017"] = 16;
	verseCount["Job018"] = 21;
	verseCount["Job019"] = 29;
	verseCount["Job020"] = 29;
	verseCount["Job021"] = 34;
	verseCount["Job022"] = 30;
	verseCount["Job023"] = 17;
	verseCount["Job024"] = 25;
	verseCount["Job025"] = 6;
	verseCount["Job026"] = 14;
	verseCount["Job027"] = 23;
	verseCount["Job028"] = 28;
	verseCount["Job029"] = 25;
	verseCount["Job030"] = 31;
	verseCount["Job031"] = 40;
	verseCount["Job032"] = 22;
	verseCount["Job033"] = 33;
	verseCount["Job034"] = 37;
	verseCount["Job035"] = 16;
	verseCount["Job036"] = 33;
	verseCount["Job037"] = 24;
	verseCount["Job038"] = 41;
	verseCount["Job039"] = 30;
	verseCount["Job040"] = 24;
	verseCount["Job041"] = 34;
	verseCount["Job042"] = 17;
	verseCount["Psa"] = 150;
	verseCount["Psa001"] = 6;
	verseCount["Psa002"] = 12;
	verseCount["Psa003"] = 8;
	verseCount["Psa004"] = 8;
	verseCount["Psa005"] = 12;
	verseCount["Psa006"] = 10;
	verseCount["Psa007"] = 17;
	verseCount["Psa008"] = 9;
	verseCount["Psa009"] = 20;
	verseCount["Psa010"] = 18;
	verseCount["Psa011"] = 7;
	verseCount["Psa012"] = 8;
	verseCount["Psa013"] = 6;
	verseCount["Psa014"] = 7;
	verseCount["Psa015"] = 5;
	verseCount["Psa016"] = 11;
	verseCount["Psa017"] = 15;
	verseCount["Psa018"] = 50;
	verseCount["Psa019"] = 14;
	verseCount["Psa020"] = 9;
	verseCount["Psa021"] = 13;
	verseCount["Psa022"] = 31;
	verseCount["Psa023"] = 6;
	verseCount["Psa024"] = 10;
	verseCount["Psa025"] = 22;
	verseCount["Psa026"] = 12;
	verseCount["Psa027"] = 14;
	verseCount["Psa028"] = 9;
	verseCount["Psa029"] = 11;
	verseCount["Psa030"] = 12;
	verseCount["Psa031"] = 24;
	verseCount["Psa032"] = 11;
	verseCount["Psa033"] = 22;
	verseCount["Psa034"] = 22;
	verseCount["Psa035"] = 28;
	verseCount["Psa036"] = 12;
	verseCount["Psa037"] = 40;
	verseCount["Psa038"] = 22;
	verseCount["Psa039"] = 13;
	verseCount["Psa040"] = 17;
	verseCount["Psa041"] = 13;
	verseCount["Psa042"] = 11;
	verseCount["Psa043"] = 5;
	verseCount["Psa044"] = 26;
	verseCount["Psa045"] = 17;
	verseCount["Psa046"] = 11;
	verseCount["Psa047"] = 9;
	verseCount["Psa048"] = 14;
	verseCount["Psa049"] = 20;
	verseCount["Psa050"] = 23;
	verseCount["Psa051"] = 19;
	verseCount["Psa052"] = 9;
	verseCount["Psa053"] = 6;
	verseCount["Psa054"] = 7;
	verseCount["Psa055"] = 23;
	verseCount["Psa056"] = 13;
	verseCount["Psa057"] = 11;
	verseCount["Psa058"] = 11;
	verseCount["Psa059"] = 17;
	verseCount["Psa060"] = 12;
	verseCount["Psa061"] = 8;
	verseCount["Psa062"] = 12;
	verseCount["Psa063"] = 11;
	verseCount["Psa064"] = 10;
	verseCount["Psa065"] = 13;
	verseCount["Psa066"] = 20;
	verseCount["Psa067"] = 7;
	verseCount["Psa068"] = 35;
	verseCount["Psa069"] = 36;
	verseCount["Psa070"] = 5;
	verseCount["Psa071"] = 24;
	verseCount["Psa072"] = 20;
	verseCount["Psa073"] = 28;
	verseCount["Psa074"] = 23;
	verseCount["Psa075"] = 10;
	verseCount["Psa076"] = 12;
	verseCount["Psa077"] = 20;
	verseCount["Psa078"] = 72;
	verseCount["Psa079"] = 13;
	verseCount["Psa080"] = 19;
	verseCount["Psa081"] = 16;
	verseCount["Psa082"] = 8;
	verseCount["Psa083"] = 18;
	verseCount["Psa084"] = 12;
	verseCount["Psa085"] = 13;
	verseCount["Psa086"] = 17;
	verseCount["Psa087"] = 7;
	verseCount["Psa088"] = 18;
	verseCount["Psa089"] = 52;
	verseCount["Psa090"] = 17;
	verseCount["Psa091"] = 16;
	verseCount["Psa092"] = 15;
	verseCount["Psa093"] = 5;
	verseCount["Psa094"] = 23;
	verseCount["Psa095"] = 11;
	verseCount["Psa096"] = 13;
	verseCount["Psa097"] = 12;
	verseCount["Psa098"] = 9;
	verseCount["Psa099"] = 9;
	verseCount["Psa100"] = 5;
	verseCount["Psa101"] = 8;
	verseCount["Psa102"] = 28;
	verseCount["Psa103"] = 22;
	verseCount["Psa104"] = 35;
	verseCount["Psa105"] = 45;
	verseCount["Psa106"] = 48;
	verseCount["Psa107"] = 43;
	verseCount["Psa108"] = 13;
	verseCount["Psa109"] = 31;
	verseCount["Psa110"] = 7;
	verseCount["Psa111"] = 10;
	verseCount["Psa112"] = 10;
	verseCount["Psa113"] = 9;
	verseCount["Psa114"] = 8;
	verseCount["Psa115"] = 18;
	verseCount["Psa116"] = 19;
	verseCount["Psa117"] = 2;
	verseCount["Psa118"] = 29;
	verseCount["Psa119"] = 176;
	verseCount["Psa120"] = 7;
	verseCount["Psa121"] = 8;
	verseCount["Psa122"] = 9;
	verseCount["Psa123"] = 4;
	verseCount["Psa124"] = 8;
	verseCount["Psa125"] = 5;
	verseCount["Psa126"] = 6;
	verseCount["Psa127"] = 5;
	verseCount["Psa128"] = 6;
	verseCount["Psa129"] = 8;
	verseCount["Psa130"] = 8;
	verseCount["Psa131"] = 3;
	verseCount["Psa132"] = 18;
	verseCount["Psa133"] = 3;
	verseCount["Psa134"] = 3;
	verseCount["Psa135"] = 21;
	verseCount["Psa136"] = 26;
	verseCount["Psa137"] = 9;
	verseCount["Psa138"] = 8;
	verseCount["Psa139"] = 24;
	verseCount["Psa140"] = 13;
	verseCount["Psa141"] = 10;
	verseCount["Psa142"] = 7;
	verseCount["Psa143"] = 12;
	verseCount["Psa144"] = 15;
	verseCount["Psa145"] = 21;
	verseCount["Psa146"] = 10;
	verseCount["Psa147"] = 20;
	verseCount["Psa148"] = 14;
	verseCount["Psa149"] = 9;
	verseCount["Psa150"] = 6;
	verseCount["Pro"] = 31;
	verseCount["Pro001"] = 33;
	verseCount["Pro002"] = 22;
	verseCount["Pro003"] = 35;
	verseCount["Pro004"] = 27;
	verseCount["Pro005"] = 23;
	verseCount["Pro006"] = 35;
	verseCount["Pro007"] = 27;
	verseCount["Pro008"] = 36;
	verseCount["Pro009"] = 18;
	verseCount["Pro010"] = 32;
	verseCount["Pro011"] = 31;
	verseCount["Pro012"] = 28;
	verseCount["Pro013"] = 25;
	verseCount["Pro014"] = 35;
	verseCount["Pro015"] = 33;
	verseCount["Pro016"] = 33;
	verseCount["Pro017"] = 28;
	verseCount["Pro018"] = 24;
	verseCount["Pro019"] = 29;
	verseCount["Pro020"] = 30;
	verseCount["Pro021"] = 31;
	verseCount["Pro022"] = 29;
	verseCount["Pro023"] = 35;
	verseCount["Pro024"] = 34;
	verseCount["Pro025"] = 28;
	verseCount["Pro026"] = 28;
	verseCount["Pro027"] = 27;
	verseCount["Pro028"] = 28;
	verseCount["Pro029"] = 27;
	verseCount["Pro030"] = 33;
	verseCount["Pro031"] = 31;
	verseCount["Ecc"] = 12;
	verseCount["Ecc001"] = 18;
	verseCount["Ecc002"] = 26;
	verseCount["Ecc003"] = 22;
	verseCount["Ecc004"] = 16;
	verseCount["Ecc005"] = 20;
	verseCount["Ecc006"] = 12;
	verseCount["Ecc007"] = 29;
	verseCount["Ecc008"] = 17;
	verseCount["Ecc009"] = 18;
	verseCount["Ecc010"] = 20;
	verseCount["Ecc011"] = 10;
	verseCount["Ecc012"] = 14;
	verseCount["Sgs"] = 8;
	verseCount["Sgs001"] = 17;
	verseCount["Sgs002"] = 17;
	verseCount["Sgs003"] = 11;
	verseCount["Sgs004"] = 16;
	verseCount["Sgs005"] = 16;
	verseCount["Sgs006"] = 13;
	verseCount["Sgs007"] = 13;
	verseCount["Sgs008"] = 14;
	verseCount["Isa"] = 66;
	verseCount["Isa001"] = 31;
	verseCount["Isa002"] = 22;
	verseCount["Isa003"] = 26;
	verseCount["Isa004"] = 6;
	verseCount["Isa005"] = 30;
	verseCount["Isa006"] = 13;
	verseCount["Isa007"] = 25;
	verseCount["Isa008"] = 22;
	verseCount["Isa009"] = 21;
	verseCount["Isa010"] = 34;
	verseCount["Isa011"] = 16;
	verseCount["Isa012"] = 6;
	verseCount["Isa013"] = 22;
	verseCount["Isa014"] = 32;
	verseCount["Isa015"] = 9;
	verseCount["Isa016"] = 14;
	verseCount["Isa017"] = 14;
	verseCount["Isa018"] = 7;
	verseCount["Isa019"] = 25;
	verseCount["Isa020"] = 6;
	verseCount["Isa021"] = 17;
	verseCount["Isa022"] = 25;
	verseCount["Isa023"] = 18;
	verseCount["Isa024"] = 23;
	verseCount["Isa025"] = 12;
	verseCount["Isa026"] = 21;
	verseCount["Isa027"] = 13;
	verseCount["Isa028"] = 29;
	verseCount["Isa029"] = 24;
	verseCount["Isa030"] = 33;
	verseCount["Isa031"] = 9;
	verseCount["Isa032"] = 20;
	verseCount["Isa033"] = 24;
	verseCount["Isa034"] = 17;
	verseCount["Isa035"] = 10;
	verseCount["Isa036"] = 22;
	verseCount["Isa037"] = 38;
	verseCount["Isa038"] = 22;
	verseCount["Isa039"] = 8;
	verseCount["Isa040"] = 31;
	verseCount["Isa041"] = 29;
	verseCount["Isa042"] = 25;
	verseCount["Isa043"] = 28;
	verseCount["Isa044"] = 28;
	verseCount["Isa045"] = 25;
	verseCount["Isa046"] = 13;
	verseCount["Isa047"] = 15;
	verseCount["Isa048"] = 22;
	verseCount["Isa049"] = 26;
	verseCount["Isa050"] = 11;
	verseCount["Isa051"] = 23;
	verseCount["Isa052"] = 15;
	verseCount["Isa053"] = 12;
	verseCount["Isa054"] = 17;
	verseCount["Isa055"] = 13;
	verseCount["Isa056"] = 12;
	verseCount["Isa057"] = 21;
	verseCount["Isa058"] = 14;
	verseCount["Isa059"] = 21;
	verseCount["Isa060"] = 22;
	verseCount["Isa061"] = 11;
	verseCount["Isa062"] = 12;
	verseCount["Isa063"] = 19;
	verseCount["Isa064"] = 12;
	verseCount["Isa065"] = 25;
	verseCount["Isa066"] = 24;
	verseCount["Jer"] = 52;
	verseCount["Jer001"] = 19;
	verseCount["Jer002"] = 37;
	verseCount["Jer003"] = 25;
	verseCount["Jer004"] = 31;
	verseCount["Jer005"] = 31;
	verseCount["Jer006"] = 30;
	verseCount["Jer007"] = 34;
	verseCount["Jer008"] = 22;
	verseCount["Jer009"] = 26;
	verseCount["Jer010"] = 25;
	verseCount["Jer011"] = 23;
	verseCount["Jer012"] = 17;
	verseCount["Jer013"] = 27;
	verseCount["Jer014"] = 22;
	verseCount["Jer015"] = 21;
	verseCount["Jer016"] = 21;
	verseCount["Jer017"] = 27;
	verseCount["Jer018"] = 23;
	verseCount["Jer019"] = 15;
	verseCount["Jer020"] = 18;
	verseCount["Jer021"] = 14;
	verseCount["Jer022"] = 30;
	verseCount["Jer023"] = 40;
	verseCount["Jer024"] = 10;
	verseCount["Jer025"] = 38;
	verseCount["Jer026"] = 24;
	verseCount["Jer027"] = 22;
	verseCount["Jer028"] = 17;
	verseCount["Jer029"] = 32;
	verseCount["Jer030"] = 24;
	verseCount["Jer031"] = 40;
	verseCount["Jer032"] = 44;
	verseCount["Jer033"] = 26;
	verseCount["Jer034"] = 22;
	verseCount["Jer035"] = 19;
	verseCount["Jer036"] = 32;
	verseCount["Jer037"] = 21;
	verseCount["Jer038"] = 28;
	verseCount["Jer039"] = 18;
	verseCount["Jer040"] = 16;
	verseCount["Jer041"] = 18;
	verseCount["Jer042"] = 22;
	verseCount["Jer043"] = 13;
	verseCount["Jer044"] = 30;
	verseCount["Jer045"] = 5;
	verseCount["Jer046"] = 28;
	verseCount["Jer047"] = 7;
	verseCount["Jer048"] = 47;
	verseCount["Jer049"] = 39;
	verseCount["Jer050"] = 46;
	verseCount["Jer051"] = 64;
	verseCount["Jer052"] = 34;
	verseCount["Lam"] = 5;
	verseCount["Lam001"] = 22;
	verseCount["Lam002"] = 22;
	verseCount["Lam003"] = 66;
	verseCount["Lam004"] = 22;
	verseCount["Lam005"] = 22;
	verseCount["Eze"] = 48;
	verseCount["Eze001"] = 28;
	verseCount["Eze002"] = 10;
	verseCount["Eze003"] = 27;
	verseCount["Eze004"] = 17;
	verseCount["Eze005"] = 17;
	verseCount["Eze006"] = 14;
	verseCount["Eze007"] = 27;
	verseCount["Eze008"] = 18;
	verseCount["Eze009"] = 11;
	verseCount["Eze010"] = 22;
	verseCount["Eze011"] = 25;
	verseCount["Eze012"] = 28;
	verseCount["Eze013"] = 23;
	verseCount["Eze014"] = 23;
	verseCount["Eze015"] = 8;
	verseCount["Eze016"] = 63;
	verseCount["Eze017"] = 24;
	verseCount["Eze018"] = 32;
	verseCount["Eze019"] = 14;
	verseCount["Eze020"] = 49;
	verseCount["Eze021"] = 32;
	verseCount["Eze022"] = 31;
	verseCount["Eze023"] = 49;
	verseCount["Eze024"] = 27;
	verseCount["Eze025"] = 17;
	verseCount["Eze026"] = 21;
	verseCount["Eze027"] = 36;
	verseCount["Eze028"] = 26;
	verseCount["Eze029"] = 21;
	verseCount["Eze030"] = 26;
	verseCount["Eze031"] = 18;
	verseCount["Eze032"] = 32;
	verseCount["Eze033"] = 33;
	verseCount["Eze034"] = 31;
	verseCount["Eze035"] = 15;
	verseCount["Eze036"] = 38;
	verseCount["Eze037"] = 28;
	verseCount["Eze038"] = 23;
	verseCount["Eze039"] = 29;
	verseCount["Eze040"] = 49;
	verseCount["Eze041"] = 26;
	verseCount["Eze042"] = 20;
	verseCount["Eze043"] = 27;
	verseCount["Eze044"] = 31;
	verseCount["Eze045"] = 25;
	verseCount["Eze046"] = 24;
	verseCount["Eze047"] = 23;
	verseCount["Eze048"] = 35;
	verseCount["Dan"] = 12;
	verseCount["Dan001"] = 21;
	verseCount["Dan002"] = 49;
	verseCount["Dan003"] = 30;
	verseCount["Dan004"] = 37;
	verseCount["Dan005"] = 31;
	verseCount["Dan006"] = 28;
	verseCount["Dan007"] = 28;
	verseCount["Dan008"] = 27;
	verseCount["Dan009"] = 27;
	verseCount["Dan010"] = 21;
	verseCount["Dan011"] = 45;
	verseCount["Dan012"] = 13;
	verseCount["Hsa"] = 14;
	verseCount["Hsa001"] = 11;
	verseCount["Hsa002"] = 23;
	verseCount["Hsa003"] = 5;
	verseCount["Hsa004"] = 19;
	verseCount["Hsa005"] = 15;
	verseCount["Hsa006"] = 11;
	verseCount["Hsa007"] = 16;
	verseCount["Hsa008"] = 14;
	verseCount["Hsa009"] = 17;
	verseCount["Hsa010"] = 15;
	verseCount["Hsa011"] = 12;
	verseCount["Hsa012"] = 14;
	verseCount["Hsa013"] = 16;
	verseCount["Hsa014"] = 9;
	verseCount["Joe"] = 3;
	verseCount["Joe001"] = 20;
	verseCount["Joe002"] = 32;
	verseCount["Joe003"] = 21;
	verseCount["Amo"] = 9;
	verseCount["Amo001"] = 15;
	verseCount["Amo002"] = 16;
	verseCount["Amo003"] = 15;
	verseCount["Amo004"] = 13;
	verseCount["Amo005"] = 27;
	verseCount["Amo006"] = 14;
	verseCount["Amo007"] = 17;
	verseCount["Amo008"] = 14;
	verseCount["Amo009"] = 15;
	verseCount["Oba"] = 1;
	verseCount["Oba001"] = 21;
	verseCount["Jon"] = 4;
	verseCount["Jon001"] = 17;
	verseCount["Jon002"] = 10;
	verseCount["Jon003"] = 10;
	verseCount["Jon004"] = 11;
	verseCount["Mic"] = 7;
	verseCount["Mic001"] = 16;
	verseCount["Mic002"] = 13;
	verseCount["Mic003"] = 12;
	verseCount["Mic004"] = 13;
	verseCount["Mic005"] = 15;
	verseCount["Mic006"] = 16;
	verseCount["Mic007"] = 20;
	verseCount["Nah"] = 3;
	verseCount["Nah001"] = 15;
	verseCount["Nah002"] = 13;
	verseCount["Nah003"] = 19;
	verseCount["Hab"] = 3;
	verseCount["Hab001"] = 17;
	verseCount["Hab002"] = 20;
	verseCount["Hab003"] = 19;
	verseCount["Zep"] = 3;
	verseCount["Zep001"] = 18;
	verseCount["Zep002"] = 15;
	verseCount["Zep003"] = 20;
	verseCount["Hag"] = 2;
	verseCount["Hag001"] = 15;
	verseCount["Hag002"] = 23;
	verseCount["Zec"] = 14;
	verseCount["Zec001"] = 21;
	verseCount["Zec002"] = 13;
	verseCount["Zec003"] = 10;
	verseCount["Zec004"] = 14;
	verseCount["Zec005"] = 11;
	verseCount["Zec006"] = 15;
	verseCount["Zec007"] = 14;
	verseCount["Zec008"] = 23;
	verseCount["Zec009"] = 17;
	verseCount["Zec010"] = 12;
	verseCount["Zec011"] = 17;
	verseCount["Zec012"] = 14;
	verseCount["Zec013"] = 9;
	verseCount["Zec014"] = 21;
	verseCount["Mal"] = 4;
	verseCount["Mal001"] = 14;
	verseCount["Mal002"] = 17;
	verseCount["Mal003"] = 18;
	verseCount["Mal004"] = 6;
	verseCount["Mat"] = 28;
	verseCount["Mat001"] = 25;
	verseCount["Mat002"] = 23;
	verseCount["Mat003"] = 17;
	verseCount["Mat004"] = 25;
	verseCount["Mat005"] = 48;
	verseCount["Mat006"] = 34;
	verseCount["Mat007"] = 29;
	verseCount["Mat008"] = 34;
	verseCount["Mat009"] = 38;
	verseCount["Mat010"] = 42;
	verseCount["Mat011"] = 30;
	verseCount["Mat012"] = 50;
	verseCount["Mat013"] = 58;
	verseCount["Mat014"] = 36;
	verseCount["Mat015"] = 39;
	verseCount["Mat016"] = 28;
	verseCount["Mat017"] = 27;
	verseCount["Mat018"] = 35;
	verseCount["Mat019"] = 30;
	verseCount["Mat020"] = 34;
	verseCount["Mat021"] = 46;
	verseCount["Mat022"] = 46;
	verseCount["Mat023"] = 39;
	verseCount["Mat024"] = 51;
	verseCount["Mat025"] = 46;
	verseCount["Mat026"] = 75;
	verseCount["Mat027"] = 66;
	verseCount["Mat028"] = 20;
	verseCount["Mar"] = 16;
	verseCount["Mar001"] = 45;
	verseCount["Mar002"] = 28;
	verseCount["Mar003"] = 35;
	verseCount["Mar004"] = 41;
	verseCount["Mar005"] = 43;
	verseCount["Mar006"] = 56;
	verseCount["Mar007"] = 37;
	verseCount["Mar008"] = 38;
	verseCount["Mar009"] = 50;
	verseCount["Mar010"] = 52;
	verseCount["Mar011"] = 33;
	verseCount["Mar012"] = 44;
	verseCount["Mar013"] = 37;
	verseCount["Mar014"] = 72;
	verseCount["Mar015"] = 47;
	verseCount["Mar016"] = 20;
	verseCount["Luk"] = 24;
	verseCount["Luk001"] = 80;
	verseCount["Luk002"] = 52;
	verseCount["Luk003"] = 38;
	verseCount["Luk004"] = 44;
	verseCount["Luk005"] = 39;
	verseCount["Luk006"] = 49;
	verseCount["Luk007"] = 50;
	verseCount["Luk008"] = 56;
	verseCount["Luk009"] = 62;
	verseCount["Luk010"] = 42;
	verseCount["Luk011"] = 54;
	verseCount["Luk012"] = 59;
	verseCount["Luk013"] = 35;
	verseCount["Luk014"] = 35;
	verseCount["Luk015"] = 32;
	verseCount["Luk016"] = 31;
	verseCount["Luk017"] = 37;
	verseCount["Luk018"] = 43;
	verseCount["Luk019"] = 48;
	verseCount["Luk020"] = 47;
	verseCount["Luk021"] = 38;
	verseCount["Luk022"] = 71;
	verseCount["Luk023"] = 56;
	verseCount["Luk024"] = 53;
	verseCount["Jhn"] = 21;
	verseCount["Jhn001"] = 51;
	verseCount["Jhn002"] = 25;
	verseCount["Jhn003"] = 36;
	verseCount["Jhn004"] = 54;
	verseCount["Jhn005"] = 47;
	verseCount["Jhn006"] = 71;
	verseCount["Jhn007"] = 53;
	verseCount["Jhn008"] = 59;
	verseCount["Jhn009"] = 41;
	verseCount["Jhn010"] = 42;
	verseCount["Jhn011"] = 57;
	verseCount["Jhn012"] = 50;
	verseCount["Jhn013"] = 38;
	verseCount["Jhn014"] = 31;
	verseCount["Jhn015"] = 27;
	verseCount["Jhn016"] = 33;
	verseCount["Jhn017"] = 26;
	verseCount["Jhn018"] = 40;
	verseCount["Jhn019"] = 42;
	verseCount["Jhn020"] = 31;
	verseCount["Jhn021"] = 25;
	verseCount["Act"] = 28;
	verseCount["Act001"] = 26;
	verseCount["Act002"] = 47;
	verseCount["Act003"] = 26;
	verseCount["Act004"] = 37;
	verseCount["Act005"] = 42;
	verseCount["Act006"] = 15;
	verseCount["Act007"] = 60;
	verseCount["Act008"] = 40;
	verseCount["Act009"] = 43;
	verseCount["Act010"] = 48;
	verseCount["Act011"] = 30;
	verseCount["Act012"] = 25;
	verseCount["Act013"] = 52;
	verseCount["Act014"] = 28;
	verseCount["Act015"] = 41;
	verseCount["Act016"] = 40;
	verseCount["Act017"] = 34;
	verseCount["Act018"] = 28;
	verseCount["Act019"] = 41;
	verseCount["Act020"] = 38;
	verseCount["Act021"] = 40;
	verseCount["Act022"] = 30;
	verseCount["Act023"] = 35;
	verseCount["Act024"] = 27;
	verseCount["Act025"] = 27;
	verseCount["Act026"] = 32;
	verseCount["Act027"] = 44;
	verseCount["Act028"] = 31;
	verseCount["Rom"] = 16;
	verseCount["Rom001"] = 32;
	verseCount["Rom002"] = 29;
	verseCount["Rom003"] = 31;
	verseCount["Rom004"] = 25;
	verseCount["Rom005"] = 21;
	verseCount["Rom006"] = 23;
	verseCount["Rom007"] = 25;
	verseCount["Rom008"] = 39;
	verseCount["Rom009"] = 33;
	verseCount["Rom010"] = 21;
	verseCount["Rom011"] = 36;
	verseCount["Rom012"] = 21;
	verseCount["Rom013"] = 14;
	verseCount["Rom014"] = 23;
	verseCount["Rom015"] = 33;
	verseCount["Rom016"] = 27;
	verseCount["1Cr"] = 16;
	verseCount["1Cr001"] = 31;
	verseCount["1Cr002"] = 16;
	verseCount["1Cr003"] = 23;
	verseCount["1Cr004"] = 21;
	verseCount["1Cr005"] = 13;
	verseCount["1Cr006"] = 20;
	verseCount["1Cr007"] = 40;
	verseCount["1Cr008"] = 13;
	verseCount["1Cr009"] = 27;
	verseCount["1Cr010"] = 33;
	verseCount["1Cr011"] = 34;
	verseCount["1Cr012"] = 31;
	verseCount["1Cr013"] = 13;
	verseCount["1Cr014"] = 40;
	verseCount["1Cr015"] = 58;
	verseCount["1Cr016"] = 24;
	verseCount["2Cr"] = 13;
	verseCount["2Cr001"] = 24;
	verseCount["2Cr002"] = 17;
	verseCount["2Cr003"] = 18;
	verseCount["2Cr004"] = 18;
	verseCount["2Cr005"] = 21;
	verseCount["2Cr006"] = 18;
	verseCount["2Cr007"] = 16;
	verseCount["2Cr008"] = 24;
	verseCount["2Cr009"] = 15;
	verseCount["2Cr010"] = 18;
	verseCount["2Cr011"] = 33;
	verseCount["2Cr012"] = 21;
	verseCount["2Cr013"] = 14;
	verseCount["Gal"] = 6;
	verseCount["Gal001"] = 24;
	verseCount["Gal002"] = 21;
	verseCount["Gal003"] = 29;
	verseCount["Gal004"] = 31;
	verseCount["Gal005"] = 26;
	verseCount["Gal006"] = 18;
	verseCount["Eph"] = 6;
	verseCount["Eph001"] = 23;
	verseCount["Eph002"] = 22;
	verseCount["Eph003"] = 21;
	verseCount["Eph004"] = 32;
	verseCount["Eph005"] = 33;
	verseCount["Eph006"] = 24;
	verseCount["Phl"] = 4;
	verseCount["Phl001"] = 30;
	verseCount["Phl002"] = 30;
	verseCount["Phl003"] = 21;
	verseCount["Phl004"] = 23;
	verseCount["Col"] = 4;
	verseCount["Col001"] = 29;
	verseCount["Col002"] = 23;
	verseCount["Col003"] = 25;
	verseCount["Col004"] = 18;
	verseCount["1Th"] = 5;
	verseCount["1Th001"] = 10;
	verseCount["1Th002"] = 20;
	verseCount["1Th003"] = 13;
	verseCount["1Th004"] = 18;
	verseCount["1Th005"] = 28;
	verseCount["2Th"] = 3;
	verseCount["2Th001"] = 12;
	verseCount["2Th002"] = 17;
	verseCount["2Th003"] = 18;
	verseCount["1Ti"] = 6;
	verseCount["1Ti001"] = 20;
	verseCount["1Ti002"] = 15;
	verseCount["1Ti003"] = 16;
	verseCount["1Ti004"] = 16;
	verseCount["1Ti005"] = 25;
	verseCount["1Ti006"] = 21;
	verseCount["2Ti"] = 4;
	verseCount["2Ti001"] = 18;
	verseCount["2Ti002"] = 26;
	verseCount["2Ti003"] = 17;
	verseCount["2Ti004"] = 22;
	verseCount["Tts"] = 3;
	verseCount["Tts001"] = 16;
	verseCount["Tts002"] = 15;
	verseCount["Tts003"] = 15;
	verseCount["Phm"] = 1;
	verseCount["Phm001"] = 25;
	verseCount["Hbr"] = 13;
	verseCount["Hbr001"] = 14;
	verseCount["Hbr002"] = 18;
	verseCount["Hbr003"] = 19;
	verseCount["Hbr004"] = 16;
	verseCount["Hbr005"] = 14;
	verseCount["Hbr006"] = 20;
	verseCount["Hbr007"] = 28;
	verseCount["Hbr008"] = 13;
	verseCount["Hbr009"] = 28;
	verseCount["Hbr010"] = 39;
	verseCount["Hbr011"] = 40;
	verseCount["Hbr012"] = 29;
	verseCount["Hbr013"] = 25;
	verseCount["Jam"] = 5;
	verseCount["Jam001"] = 27;
	verseCount["Jam002"] = 26;
	verseCount["Jam003"] = 18;
	verseCount["Jam004"] = 17;
	verseCount["Jam005"] = 20;
	verseCount["1Pe"] = 5;
	verseCount["1Pe001"] = 25;
	verseCount["1Pe002"] = 25;
	verseCount["1Pe003"] = 22;
	verseCount["1Pe004"] = 19;
	verseCount["1Pe005"] = 14;
	verseCount["2Pe"] = 3;
	verseCount["2Pe001"] = 21;
	verseCount["2Pe002"] = 22;
	verseCount["2Pe003"] = 18;
	verseCount["1Jo"] = 5;
	verseCount["1Jo001"] = 10;
	verseCount["1Jo002"] = 29;
	verseCount["1Jo003"] = 24;
	verseCount["1Jo004"] = 21;
	verseCount["1Jo005"] = 21;
	verseCount["2Jo"] = 1;
	verseCount["2Jo001"] = 13;
	verseCount["3Jo"] = 1;
	verseCount["3Jo001"] = 14;
	verseCount["Jud"] = 1;
	verseCount["Jud001"] = 25;
	verseCount["Rev"] = 22;
	verseCount["Rev001"] = 20;
	verseCount["Rev002"] = 29;
	verseCount["Rev003"] = 22;
	verseCount["Rev004"] = 11;
	verseCount["Rev005"] = 14;
	verseCount["Rev006"] = 17;
	verseCount["Rev007"] = 17;
	verseCount["Rev008"] = 13;
	verseCount["Rev009"] = 21;
	verseCount["Rev010"] = 11;
	verseCount["Rev011"] = 19;
	verseCount["Rev012"] = 17;
	verseCount["Rev013"] = 18;
	verseCount["Rev014"] = 20;
	verseCount["Rev015"] = 8;
	verseCount["Rev016"] = 21;
	verseCount["Rev017"] = 18;
	verseCount["Rev018"] = 24;
	verseCount["Rev019"] = 21;
	verseCount["Rev020"] = 15;
	verseCount["Rev021"] = 27;
	verseCount["Rev022"] = 21;

	try {
		if (verseCount[Book] > 0) return verseCount[Book];
	} catch(e) {
		return undefined;
	}
}

// Given a generic possibility for a Bible book name, returns the 3 letter
// equivilent of the true Bible book name.
function bookLookup(Book) {

	var bookAbbrv = [];

	bookAbbrv["gen"] = 'Gen';
	bookAbbrv["gene"] = 'Gen';
	bookAbbrv["genes"] = 'Gen';
	bookAbbrv["genesi"] = 'Gen';
	bookAbbrv["genesis"] = 'Gen';
	bookAbbrv["gns"] = 'Gen';
	bookAbbrv["ex"] = 'Exd';
	bookAbbrv["exd"] = 'Exd';
	bookAbbrv["exds"] = 'Exd';
	bookAbbrv["exo"] = 'Exd';
	bookAbbrv["exod"] = 'Exd';
	bookAbbrv["exodus"] = 'Exd';
	bookAbbrv["lev"] = 'Lev';
	bookAbbrv["levi"] = 'Lev';
	bookAbbrv["levit"] = 'Lev';
	bookAbbrv["levitic"] = 'Lev';
	bookAbbrv["leviticus"] = 'Lev';
	bookAbbrv["num"] = 'Num';
	bookAbbrv["numb"] = 'Num';
	bookAbbrv["number"] = 'Num';
	bookAbbrv["numbers"] = 'Num';
	bookAbbrv["deu"] = 'Deu';
	bookAbbrv["deut"] = 'Deu';
	bookAbbrv["deuter"] = 'Deu';
	bookAbbrv["deutero"] = 'Deu';
	bookAbbrv["deuteronomy"] = 'Deu';
	bookAbbrv["jos"] = 'Jos';
	bookAbbrv["josh"] = 'Jos';
	bookAbbrv["joshua"] = 'Jos';
	bookAbbrv["jsh"] = 'Jos';
	bookAbbrv["jdg"] = 'Jdg';
	bookAbbrv["jdgs"] = 'Jdg';
	bookAbbrv["judg"] = 'Jdg';
	bookAbbrv["judge"] = 'Jdg';
	bookAbbrv["judges"] = 'Jdg';
	bookAbbrv["rth"] = 'Rth';
	bookAbbrv["rut"] = 'Rth';
	bookAbbrv["ruth"] = 'Rth';
	bookAbbrv["1 sa"] = '1Sa';
	bookAbbrv["1 sam"] = '1Sa';
	bookAbbrv["1 samuel"] = '1Sa';
	bookAbbrv["1sa"] = '1Sa';
	bookAbbrv["1sam"] = '1Sa';
	bookAbbrv["1samuel"] = '1Sa';
	bookAbbrv["2 sa"] = '2Sa';
	bookAbbrv["2 sam"] = '2Sa';
	bookAbbrv["2 samuel"] = '2Sa';
	bookAbbrv["2sa"] = '2Sa';
	bookAbbrv["2sam"] = '2Sa';
	bookAbbrv["2samuel"] = '2Sa';
	bookAbbrv["1 ki"] = '1Ki';
	bookAbbrv["1 kgs"] = '1Ki';
	bookAbbrv["1 king"] = '1Ki';
	bookAbbrv["1 kings"] = '1Ki';
	bookAbbrv["1 kngs"] = '1Ki';
	bookAbbrv["1ki"] = '1Ki';
	bookAbbrv["1kgs"] = '1Ki';
	bookAbbrv["1king"] = '1Ki';
	bookAbbrv["1kings"] = '1Ki';
	bookAbbrv["1kngs"] = '1Ki';
	bookAbbrv["2 ki"] = '2Ki';
	bookAbbrv["2 kgs"] = '2Ki';
	bookAbbrv["2 king"] = '2Ki';
	bookAbbrv["2 kings"] = '2Ki';
	bookAbbrv["2 kngs"] = '2Ki';
	bookAbbrv["2ki"] = '2Ki';
	bookAbbrv["2kgs"] = '2Ki';
	bookAbbrv["2king"] = '2Ki';
	bookAbbrv["2kings"] = '2Ki';
	bookAbbrv["2kngs"] = '2Ki';
	bookAbbrv["1 ch"] = '1Ch';
	bookAbbrv["1 chr"] = '1Ch';
	bookAbbrv["1 chro"] = '1Ch';
	bookAbbrv["1 chron"] = '1Ch';
	bookAbbrv["1 chronicles"] = '1Ch';
	bookAbbrv["1ch"] = '1Ch';
	bookAbbrv["1chr"] = '1Ch';
	bookAbbrv["1chro"] = '1Ch';
	bookAbbrv["1chron"] = '1Ch';
	bookAbbrv["1chronicles"] = '1Ch';
	bookAbbrv["2 ch"] = '2Ch';
	bookAbbrv["2 chr"] = '2Ch';
	bookAbbrv["2 chro"] = '2Ch';
	bookAbbrv["2 chron"] = '2Ch';
	bookAbbrv["2 chronicles"] = '2Ch';
	bookAbbrv["2ch"] = '2Ch';
	bookAbbrv["2chr"] = '2Ch';
	bookAbbrv["2chro"] = '2Ch';
	bookAbbrv["2chron"] = '2Ch';
	bookAbbrv["2chronicles"] = '2Ch';
	bookAbbrv["ezr"] = 'Ezr';
	bookAbbrv["ezra"] = 'Ezr';
	bookAbbrv["neh"] = 'Neh';
	bookAbbrv["nehe"] = 'Neh';
	bookAbbrv["nehem"] = 'Neh';
	bookAbbrv["nehemiah"] = 'Neh';
	bookAbbrv["es"] = 'Est';
	bookAbbrv["est"] = 'Est';
	bookAbbrv["ester"] = 'Est';
	bookAbbrv["esth"] = 'Est';
	bookAbbrv["esther"] = 'Est';
	bookAbbrv["estr"] = 'Est';
	bookAbbrv["jb"] = 'Job';
	bookAbbrv["job"] = 'Job';
	bookAbbrv["ps"] = 'Psa';
	bookAbbrv["psa"] = 'Psa';
	bookAbbrv["psal"] = 'Psa';
	bookAbbrv["psalm"] = 'Psa';
	bookAbbrv["psalms"] = 'Psa';
	bookAbbrv["pss"] = 'Psa';
	bookAbbrv["pr"] = 'Pro';
	bookAbbrv["pro"] = 'Pro';
	bookAbbrv["prv"] = 'Pro';
	bookAbbrv["prov"] = 'Pro';
	bookAbbrv["prvs"] = 'Pro';
	bookAbbrv["proverb"] = 'Pro';
	bookAbbrv["proverbs"] = 'Pro';
	bookAbbrv["ec"] = 'Ecc';
	bookAbbrv["ecc"] = 'Ecc';
	bookAbbrv["ecs"] = 'Ecc';
	bookAbbrv["eccl"] = 'Ecc';
	bookAbbrv["ecls"] = 'Ecc';
	bookAbbrv["eccle"] = 'Ecc';
	bookAbbrv["eccles"] = 'Ecc';
	bookAbbrv["ecclesiastes"] = 'Ecc';
	bookAbbrv["cant"] = 'Sgs';
	bookAbbrv["canticle"] = 'Sgs';
	bookAbbrv["canticle canticles"] = 'Sgs';
	bookAbbrv["canticles"] = 'Sgs';
	bookAbbrv["solomon"] = 'Sgs';
	bookAbbrv["song solomon"] = 'Sgs';
	bookAbbrv["songs solomon"] = 'Sgs';
	bookAbbrv["song songs"] = 'Sgs';
	bookAbbrv["songofsolomon"] = 'Sgs';
	bookAbbrv["song of solomon"] = 'Sgs';
	bookAbbrv["so"] = 'Sgs';
	bookAbbrv["sgs"] = 'Sgs';
	bookAbbrv["sng"] = 'Sgs';
	bookAbbrv["son"] = 'Sgs';
	bookAbbrv["sos"] = 'Sgs';
	bookAbbrv["song"] = 'Sgs';
	bookAbbrv["sngs"] = 'Sgs';
	bookAbbrv["songs"] = 'Sgs';
	bookAbbrv["is"] = 'Isa';
	bookAbbrv["isa"] = 'Isa';
	bookAbbrv["isai"] = 'Isa';
	bookAbbrv["isaia"] = 'Isa';
	bookAbbrv["isaiah"] = 'Isa';
	bookAbbrv["ish"] = 'Isa';
	bookAbbrv["je"] = 'Jer';
	bookAbbrv["jr"] = 'Jer';
	bookAbbrv["jer"] = 'Jer';
	bookAbbrv["jere"] = 'Jer';
	bookAbbrv["jerem"] = 'Jer';
	bookAbbrv["jeremiah"] = 'Jer';
	bookAbbrv["la"] = 'Lam';
	bookAbbrv["lam"] = 'Lam';
	bookAbbrv["lame"] = 'Lam';
	bookAbbrv["lamen"] = 'Lam';
	bookAbbrv["lament"] = 'Lam';
	bookAbbrv["lamentation"] = 'Lam';
	bookAbbrv["lamentations"] = 'Lam';
	bookAbbrv["eze"] = 'Eze';
	bookAbbrv["ezek"] = 'Eze';
	bookAbbrv["ezekiel"] = 'Eze';
	bookAbbrv["da"] = 'Dan';
	bookAbbrv["dan"] = 'Dan';
	bookAbbrv["dnl"] = 'Dan';
	bookAbbrv["dani"] = 'Dan';
	bookAbbrv["daniel"] = 'Dan';
	bookAbbrv["ho"] = 'Hsa';
	bookAbbrv["hos"] = 'Hsa';
	bookAbbrv["hsa"] = 'Hsa';
	bookAbbrv["hose"] = 'Hsa';
	bookAbbrv["hosea"] = 'Hsa';
	bookAbbrv["jl"] = 'Joe';
	bookAbbrv["joe"] = 'Joe';
	bookAbbrv["joel"] = 'Joe';
	bookAbbrv["am"] = 'Amo';
	bookAbbrv["amo"] = 'Amo';
	bookAbbrv["amos"] = 'Amo';
	bookAbbrv["ams"] = 'Amo';
	bookAbbrv["ob"] = 'Oba';
	bookAbbrv["oba"] = 'Oba';
	bookAbbrv["obad"] = 'Oba';
	bookAbbrv["obadiah"] = 'Oba';
	bookAbbrv["obd"] = 'Oba';
	bookAbbrv["jon"] = 'Jon';
	bookAbbrv["jona"] = 'Jon';
	bookAbbrv["jonah"] = 'Jon';
	bookAbbrv["mch"] = 'Mic';
	bookAbbrv["mi"] = 'Mic';
	bookAbbrv["mic"] = 'Mic';
	bookAbbrv["mica"] = 'Mic';
	bookAbbrv["micah"] = 'Mic';
	bookAbbrv["na"] = 'Nah';
	bookAbbrv["nah"] = 'Nah';
	bookAbbrv["nahu"] = 'Nah';
	bookAbbrv["nahum"] = 'Nah';
	bookAbbrv["hab"] = 'Hab';
	bookAbbrv["haba"] = 'Hab';
	bookAbbrv["habak"] = 'Hab';
	bookAbbrv["habakk"] = 'Hab';
	bookAbbrv["habakkuk"] = 'Hab';
	bookAbbrv["hbk"] = 'Hab';
	bookAbbrv["zep"] = 'Zep';
	bookAbbrv["zeph"] = 'Zep';
	bookAbbrv["zepha"] = 'Zep';
	bookAbbrv["zephan"] = 'Zep';
	bookAbbrv["zephaniah"] = 'Zep';
	bookAbbrv["zp"] = 'Zep';
	bookAbbrv["zph"] = 'Zep';
	bookAbbrv["hag"] = 'Hag';
	bookAbbrv["hagai"] = 'Hag';
	bookAbbrv["hagg"] = 'Hag';
	bookAbbrv["haggai"] = 'Hag';
	bookAbbrv["hga"] = 'Hag';
	bookAbbrv["zc"] = 'Zec';
	bookAbbrv["zec"] = 'Zec';
	bookAbbrv["zech"] = 'Zec';
	bookAbbrv["zecha"] = 'Zec';
	bookAbbrv["zechar"] = 'Zec';
	bookAbbrv["zechariah"] = 'Zec';
	bookAbbrv["mal"] = 'Mal';
	bookAbbrv["mala"] = 'Mal';
	bookAbbrv["malac"] = 'Mal';
	bookAbbrv["malach"] = 'Mal';
	bookAbbrv["malachi"] = 'Mal';
	bookAbbrv["malichi"] = 'Mal';
	bookAbbrv["mlc"] = 'Mal';
	bookAbbrv["mlci"] = 'Mal';
	bookAbbrv["mat"] = 'Mat';
	bookAbbrv["mathew"] = 'Mat';
	bookAbbrv["matt"] = 'Mat';
	bookAbbrv["matth"] = 'Mat';
	bookAbbrv["matthe"] = 'Mat';
	bookAbbrv["matthew"] = 'Mat';
	bookAbbrv["mt"] = 'Mat';
	bookAbbrv["mth"] = 'Mat';
	bookAbbrv["mtthw"] = 'Mat';
	bookAbbrv["mtw"] = 'Mat';
	bookAbbrv["mar"] = 'Mar';
	bookAbbrv["marc"] = 'Mar';
	bookAbbrv["mark"] = 'Mar';
	bookAbbrv["mk"] = 'Mar';
	bookAbbrv["mrk"] = 'Mar';
	bookAbbrv["lk"] = 'Luk';
	bookAbbrv["lke"] = 'Luk';
	bookAbbrv["luk"] = 'Luk';
	bookAbbrv["luke"] = 'Luk';
	bookAbbrv["jhn"] = 'Jhn';
	bookAbbrv["jn"] = 'Jhn';
	bookAbbrv["joh"] = 'Jhn';
	bookAbbrv["john"] = 'Jhn';
	bookAbbrv["ac"] = 'Act';
	bookAbbrv["act"] = 'Act';
	bookAbbrv["acts"] = 'Act';
	bookAbbrv["rms"] = 'Rom';
	bookAbbrv["ro"] = 'Rom';
	bookAbbrv["rom"] = 'Rom';
	bookAbbrv["roma"] = 'Rom';
	bookAbbrv["roman"] = 'Rom';
	bookAbbrv["romans"] = 'Rom';
	bookAbbrv["1 co"] = '1Cr';
	bookAbbrv["1 cr"] = '1Cr';
	bookAbbrv["1 cor"] = '1Cr';
	bookAbbrv["1 cori"] = '1Cr';
	bookAbbrv["1 corint"] = '1Cr';
	bookAbbrv["1 corinth"] = '1Cr';
	bookAbbrv["1 corinthian"] = '1Cr';
	bookAbbrv["1 corinthians"] = '1Cr';
	bookAbbrv["1co"] = '1Cr';
	bookAbbrv["1cr"] = '1Cr';
	bookAbbrv["1cor"] = '1Cr';
	bookAbbrv["1cori"] = '1Cr';
	bookAbbrv["1corint"] = '1Cr';
	bookAbbrv["1corinth"] = '1Cr';
	bookAbbrv["1corinthian"] = '1Cr';
	bookAbbrv["1corinthians"] = '1Cr';
	bookAbbrv["2 co"] = '2Cr';
	bookAbbrv["2 cr"] = '2Cr';
	bookAbbrv["2 cor"] = '2Cr';
	bookAbbrv["2 cori"] = '2Cr';
	bookAbbrv["2 corint"] = '2Cr';
	bookAbbrv["2 corinth"] = '2Cr';
	bookAbbrv["2 corinthian"] = '2Cr';
	bookAbbrv["2 corinthians"] = '2Cr';
	bookAbbrv["2co"] = '2Cr';
	bookAbbrv["2cr"] = '2Cr';
	bookAbbrv["2cor"] = '2Cr';
	bookAbbrv["2cori"] = '2Cr';
	bookAbbrv["2corint"] = '2Cr';
	bookAbbrv["2corinth"] = '2Cr';
	bookAbbrv["2corinthian"] = '2Cr';
	bookAbbrv["2corinthians"] = '2Cr';
	bookAbbrv["gal"] = 'Gal';
	bookAbbrv["gala"] = 'Gal';
	bookAbbrv["galat"] = 'Gal';
	bookAbbrv["galati"] = 'Gal';
	bookAbbrv["galatians"] = 'Gal';
	bookAbbrv["galations"] = 'Gal';
	bookAbbrv["gals"] = 'Gal';
	bookAbbrv["glts"] = 'Gal';
	bookAbbrv["ep"] = 'Eph';
	bookAbbrv["eph"] = 'Eph';
	bookAbbrv["ephes"] = 'Eph';
	bookAbbrv["ephesi"] = 'Eph';
	bookAbbrv["ephesian"] = 'Eph';
	bookAbbrv["ephesians"] = 'Eph';
	bookAbbrv["ephesions"] = 'Eph';
	bookAbbrv["ephsns"] = 'Eph';
	bookAbbrv["phi"] = 'Phl';
	bookAbbrv["phil"] = 'Phl';
	bookAbbrv["phili"] = 'Phl';
	bookAbbrv["philip"] = 'Phl';
	bookAbbrv["philipians"] = 'Phl';
	bookAbbrv["philipp"] = 'Phl';
	bookAbbrv["philippi"] = 'Phl';
	bookAbbrv["philippians"] = 'Phl';
	bookAbbrv["philipppian"] = 'Phl';
	bookAbbrv["philli"] = 'Phl';
	bookAbbrv["phillip"] = 'Phl';
	bookAbbrv["phillipp"] = 'Phl';
	bookAbbrv["phillippi"] = 'Phl';
	bookAbbrv["phillippian"] = 'Phl';
	bookAbbrv["phillippians"] = 'Phl';
	bookAbbrv["phl"] = 'Phl';
	bookAbbrv["col"] = 'Col';
	bookAbbrv["coll"] = 'Col';
	bookAbbrv["collosians"] = 'Col';
	bookAbbrv["collossians"] = 'Col';
	bookAbbrv["colo"] = 'Col';
	bookAbbrv["colos"] = 'Col';
	bookAbbrv["coloss"] = 'Col';
	bookAbbrv["colossi"] = 'Col';
	bookAbbrv["colossian"] = 'Col';
	bookAbbrv["colossians"] = 'Col';
	bookAbbrv["colossions"] = 'Col';
	bookAbbrv["1 th"] = '1Th';
	bookAbbrv["1 the"] = '1Th';
	bookAbbrv["1 thes"] = '1Th';
	bookAbbrv["1 thess"] = '1Th';
	bookAbbrv["1 thessa"] = '1Th';
	bookAbbrv["1 thessal"] = '1Th';
	bookAbbrv["1 thessalon"] = '1Th';
	bookAbbrv["1 thessalonian"] = '1Th';
	bookAbbrv["1 thessalonians"] = '1Th';
	bookAbbrv["1 ths"] = '1Th';
	bookAbbrv["1th"] = '1Th';
	bookAbbrv["1the"] = '1Th';
	bookAbbrv["1thes"] = '1Th';
	bookAbbrv["1thess"] = '1Th';
	bookAbbrv["1thessa"] = '1Th';
	bookAbbrv["1thessal"] = '1Th';
	bookAbbrv["1thessalon"] = '1Th';
	bookAbbrv["1thessalonian"] = '1Th';
	bookAbbrv["1thessalonians"] = '1Th';
	bookAbbrv["1ths"] = '1Th';
	bookAbbrv["2 th"] = '2Th';
	bookAbbrv["2 the"] = '2Th';
	bookAbbrv["2 thes"] = '2Th';
	bookAbbrv["2 thess"] = '2Th';
	bookAbbrv["2 thessa"] = '2Th';
	bookAbbrv["2 thessal"] = '2Th';
	bookAbbrv["2 thessalon"] = '2Th';
	bookAbbrv["2 thessalonian"] = '2Th';
	bookAbbrv["2 thessalonians"] = '2Th';
	bookAbbrv["2 ths"] = '2Th';
	bookAbbrv["2th"] = '2Th';
	bookAbbrv["2the"] = '2Th';
	bookAbbrv["2thes"] = '2Th';
	bookAbbrv["2thess"] = '2Th';
	bookAbbrv["2thessa"] = '2Th';
	bookAbbrv["2thessal"] = '2Th';
	bookAbbrv["2thessalon"] = '2Th';
	bookAbbrv["2thessalonian"] = '2Th';
	bookAbbrv["2thessalonians"] = '2Th';
	bookAbbrv["2ths"] = '2Th';
	bookAbbrv["1 ti"] = '1Ti';
	bookAbbrv["1 tim"] = '1Ti';
	bookAbbrv["1 timo"] = '1Ti';
	bookAbbrv["1 timothy"] = '1Ti';
	bookAbbrv["1ti"] = '1Ti';
	bookAbbrv["1tim"] = '1Ti';
	bookAbbrv["1timo"] = '1Ti';
	bookAbbrv["1timothy"] = '1Ti';
	bookAbbrv["2 ti"] = '2Ti';
	bookAbbrv["2 tim"] = '2Ti';
	bookAbbrv["2 timo"] = '2Ti';
	bookAbbrv["2 timothy"] = '2Ti';
	bookAbbrv["2ti"] = '2Ti';
	bookAbbrv["2tim"] = '2Ti';
	bookAbbrv["2timo"] = '2Ti';
	bookAbbrv["2timothy"] = '2Ti';
	bookAbbrv["tit"] = 'Tts';
	bookAbbrv["titus"] = 'Tts';
	bookAbbrv["tts"] = 'Tts';
	bookAbbrv["phile"] = 'Phm';
	bookAbbrv["philem"] = 'Phm';
	bookAbbrv["philemon"] = 'Phm';
	bookAbbrv["phm"] = 'Phm';
	bookAbbrv["phn"] = 'Phm';
	bookAbbrv["hbr"] = 'Hbr';
	bookAbbrv["hbrs"] = 'Hbr';
	bookAbbrv["heb"] = 'Hbr';
	bookAbbrv["hebr"] = 'Hbr';
	bookAbbrv["hebres"] = 'Hbr';
	bookAbbrv["hebrew"] = 'Hbr';
	bookAbbrv["hebrews"] = 'Hbr';
	bookAbbrv["ja"] = 'Jam';
	bookAbbrv["jam"] = 'Jam';
	bookAbbrv["jame"] = 'Jam';
	bookAbbrv["james"] = 'Jam';
	bookAbbrv["jms"] = 'Jam';
	bookAbbrv["1 pe"] = '1Pe';
	bookAbbrv["1 pet"] = '1Pe';
	bookAbbrv["1 pete"] = '1Pe';
	bookAbbrv["1 peter"] = '1Pe';
	bookAbbrv["1 pt"] = '1Pe';
	bookAbbrv["1pe"] = '1Pe';
	bookAbbrv["1pet"] = '1Pe';
	bookAbbrv["1pete"] = '1Pe';
	bookAbbrv["1peter"] = '1Pe';
	bookAbbrv["1pt"] = '1Pe';
	bookAbbrv["2 pe"] = '2Pe';
	bookAbbrv["2 pet"] = '2Pe';
	bookAbbrv["2 pete"] = '2Pe';
	bookAbbrv["2 peter"] = '2Pe';
	bookAbbrv["2 pt"] = '2Pe';
	bookAbbrv["2pe"] = '2Pe';
	bookAbbrv["2pet"] = '2Pe';
	bookAbbrv["2pete"] = '2Pe';
	bookAbbrv["2peter"] = '2Pe';
	bookAbbrv["2pt"] = '2Pe';
	bookAbbrv["1 jhn"] = '1Jo';
	bookAbbrv["1 jn"] = '1Jo';
	bookAbbrv["1 jo"] = '1Jo';
	bookAbbrv["1 joh"] = '1Jo';
	bookAbbrv["1 john"] = '1Jo';
	bookAbbrv["1jhn"] = '1Jo';
	bookAbbrv["1jn"] = '1Jo';
	bookAbbrv["1jo"] = '1Jo';
	bookAbbrv["1joh"] = '1Jo';
	bookAbbrv["1john"] = '1Jo';
	bookAbbrv["2 jhn"] = '2Jo';
	bookAbbrv["2 jn"] = '2Jo';
	bookAbbrv["2 jo"] = '2Jo';
	bookAbbrv["2 joh"] = '2Jo';
	bookAbbrv["2 john"] = '2Jo';
	bookAbbrv["2jhn"] = '2Jo';
	bookAbbrv["2jn"] = '2Jo';
	bookAbbrv["2jo"] = '2Jo';
	bookAbbrv["2joh"] = '2Jo';
	bookAbbrv["2john"] = '2Jo';
	bookAbbrv["3 jhn"] = '3Jo';
	bookAbbrv["3 jn"] = '3Jo';
	bookAbbrv["3 jo"] = '3Jo';
	bookAbbrv["3 joh"] = '3Jo';
	bookAbbrv["3 john"] = '3Jo';
	bookAbbrv["3jhn"] = '3Jo';
	bookAbbrv["3jn"] = '3Jo';
	bookAbbrv["3jo"] = '3Jo';
	bookAbbrv["3joh"] = '3Jo';
	bookAbbrv["3john"] = '3Jo';
	bookAbbrv["jde"] = 'Jud';
	bookAbbrv["jud"] = 'Jud';
	bookAbbrv["jude"] = 'Jud';
	bookAbbrv["apo"] = 'Rev';
	bookAbbrv["apoc"] = 'Rev';
	bookAbbrv["apocalypse"] = 'Rev';
	bookAbbrv["apocolypse"] = 'Rev';
	bookAbbrv["rev"] = 'Rev';
	bookAbbrv["reve"] = 'Rev';
	bookAbbrv["revel"] = 'Rev';
	bookAbbrv["revelat"] = 'Rev';
	bookAbbrv["revelation"] = 'Rev';
	bookAbbrv["revelations"] = 'Rev';

	Book = Book.toLowerCase();
	try {
		if(eval('bookAbbrv["' + Book + '"]')) return bookAbbrv[Book];
	}	catch(e) {
		return undefined;
	}
}



// Structure of Short Book Name to Long Book Name
var BookLongName = [];
var BookNames = BookLongName;
	BookLongName["Gen"] = "Genesis";
	BookLongName["Exd"] = "Exodus";
	BookLongName["Lev"] = "Leviticus";
	BookLongName["Num"] = "Numbers";
	BookLongName["Deu"] = "Deuteronomy";
	BookLongName["Jos"] = "Joshua";
	BookLongName["Jdg"] = "Judges";
	BookLongName["Rth"] = "Ruth";
	BookLongName["1Sa"] = "1 Samuel";
	BookLongName["2Sa"] = "2 Samuel";
	BookLongName["1Ki"] = "1 Kings";
	BookLongName["2Ki"] = "2 Kings";
	BookLongName["1Ch"] = "1 Chronicles";
	BookLongName["2Ch"] = "2 Chronicles";
	BookLongName["Ezr"] = "Ezra";
	BookLongName["Neh"] = "Nehemiah";
	BookLongName["Est"] = "Esther";
	BookLongName["Job"] = "Job";
	BookLongName["Psa"] = "Psalms";
	BookLongName["Pro"] = "Proverbs";
	BookLongName["Ecc"] = "Ecclesiastes";
	BookLongName["Sgs"] = "Song of Songs";
	BookLongName["Isa"] = "Isaiah";
	BookLongName["Jer"] = "Jeremiah";
	BookLongName["Lam"] = "Lamentations";
	BookLongName["Eze"] = "Ezekiel";
	BookLongName["Dan"] = "Daniel";
	BookLongName["Hsa"] = "Hosea";
	BookLongName["Joe"] = "Joel";
	BookLongName["Amo"] = "Amos";
	BookLongName["Oba"] = "Obadiah";
	BookLongName["Jon"] = "Jonah";
	BookLongName["Mic"] = "Micah";
	BookLongName["Nah"] = "Nahum";
	BookLongName["Hab"] = "Habakkuk";
	BookLongName["Zep"] = "Zephaniah";
	BookLongName["Hag"] = "Haggai";
	BookLongName["Zec"] = "Zechariah";
	BookLongName["Mal"] = "Malachi";
	BookLongName["Mat"] = "Matthew";
	BookLongName["Mar"] = "Mark";
	BookLongName["Luk"] = "Luke";
	BookLongName["Jhn"] = "John";
	BookLongName["Act"] = "Acts";
	BookLongName["Rom"] = "Romans";
	BookLongName["1Cr"] = "1 Corinthians";
	BookLongName["2Cr"] = "2 Corinthians";
	BookLongName["Gal"] = "Galatians";
	BookLongName["Eph"] = "Ephesians";
	BookLongName["Phl"] = "Philippians";
	BookLongName["Col"] = "Colossians";
	BookLongName["1Th"] = "1 Thessalonians";
	BookLongName["2Th"] = "2 Thessalonians";
	BookLongName["1Ti"] = "1 Timothy";
	BookLongName["2Ti"] = "2 Timothy";
	BookLongName["Tts"] = "Titus";
	BookLongName["Phm"] = "Philemon";
	BookLongName["Hbr"] = "Hebrews";
	BookLongName["Jam"] = "James";
	BookLongName["1Pe"] = "1 Peter";
	BookLongName["2Pe"] = "2 Peter";
	BookLongName["1Jo"] = "1 John";
	BookLongName["2Jo"] = "2 John";
	BookLongName["3Jo"] = "3 John";
	BookLongName["Jud"] = "Jude";
	BookLongName["Rev"] = "Revelation";

var	BookOrder = [];
	BookOrder["1"] = "Gen";
	BookOrder["2"] = "Exd";
	BookOrder["3"] = "Lev";
	BookOrder["4"] = "Num";
	BookOrder["5"] = "Deu";
	BookOrder["6"] = "Jos";
	BookOrder["7"] = "Jdg";
	BookOrder["8"] = "Rth";
	BookOrder["9"] = "1Sa";
	BookOrder["10"] = "2Sa";
	BookOrder["11"] = "1Ki";
	BookOrder["12"] = "2Ki";
	BookOrder["13"] = "1Ch";
	BookOrder["14"] = "2Ch";
	BookOrder["15"] = "Ezr";
	BookOrder["16"] = "Neh";
	BookOrder["17"] = "Est";
	BookOrder["18"] = "Job";
	BookOrder["19"] = "Psa";
	BookOrder["20"] = "Pro";
	BookOrder["21"] = "Ecc";
	BookOrder["22"] = "Sgs";
	BookOrder["23"] = "Isa";
	BookOrder["24"] = "Jer";
	BookOrder["25"] = "Lam";
	BookOrder["26"] = "Eze";
	BookOrder["27"] = "Dan";
	BookOrder["28"] = "Hsa";
	BookOrder["29"] = "Joe";
	BookOrder["30"] = "Amo";
	BookOrder["31"] = "Oba";
	BookOrder["32"] = "Jon";
	BookOrder["33"] = "Mic";
	BookOrder["34"] = "Nah";
	BookOrder["35"] = "Hab";
	BookOrder["36"] = "Zep";
	BookOrder["37"] = "Hag";
	BookOrder["38"] = "Zec";
	BookOrder["39"] = "Mal";
	BookOrder["40"] = "Mat";
	BookOrder["41"] = "Mar";
	BookOrder["42"] = "Luk";
	BookOrder["43"] = "Jhn";
	BookOrder["44"] = "Act";
	BookOrder["45"] = "Rom";
	BookOrder["46"] = "1Cr";
	BookOrder["47"] = "2Cr";
	BookOrder["48"] = "Gal";
	BookOrder["49"] = "Eph";
	BookOrder["50"] = "Phl";
	BookOrder["51"] = "Col";
	BookOrder["52"] = "1Th";
	BookOrder["53"] = "2Th";
	BookOrder["54"] = "1Ti";
	BookOrder["55"] = "2Ti";
	BookOrder["56"] = "Tts";
	BookOrder["57"] = "Phm";
	BookOrder["58"] = "Hbr";
	BookOrder["59"] = "Jam";
	BookOrder["60"] = "1Pe";
	BookOrder["61"] = "2Pe";
	BookOrder["62"] = "1Jo";
	BookOrder["63"] = "2Jo";
	BookOrder["64"] = "3Jo";
	BookOrder["65"] = "Jud";
	BookOrder["66"] = "Rev";

	BookOrder["Gen"] = 1;
	BookOrder["Exd"] = 2;
	BookOrder["Lev"] = 3;
	BookOrder["Num"] = 4;
	BookOrder["Deu"] = 5;
	BookOrder["Jos"] = 6;
	BookOrder["Jdg"] = 7;
	BookOrder["Rth"] = 8;
	BookOrder["1Sa"] = 9;
	BookOrder["2Sa"] = 10;
	BookOrder["1Ki"] = 11;
	BookOrder["2Ki"] = 12;
	BookOrder["1Ch"] = 13;
	BookOrder["2Ch"] = 14;
	BookOrder["Ezr"] = 15;
	BookOrder["Neh"] = 16;
	BookOrder["Est"] = 17;
	BookOrder["Job"] = 18;
	BookOrder["Psa"] = 19;
	BookOrder["Pro"] = 20;
	BookOrder["Ecc"] = 21;
	BookOrder["Sgs"] = 22;
	BookOrder["Isa"] = 23;
	BookOrder["Jer"] = 24;
	BookOrder["Lam"] = 25;
	BookOrder["Eze"] = 26;
	BookOrder["Dan"] = 27;
	BookOrder["Hsa"] = 28;
	BookOrder["Joe"] = 29;
	BookOrder["Amo"] = 30;
	BookOrder["Oba"] = 31;
	BookOrder["Jon"] = 32;
	BookOrder["Mic"] = 33;
	BookOrder["Nah"] = 34;
	BookOrder["Hab"] = 35;
	BookOrder["Zep"] = 36;
	BookOrder["Hag"] = 37;
	BookOrder["Zec"] = 38;
	BookOrder["Mal"] = 39;
	BookOrder["Mat"] = 40;
	BookOrder["Mar"] = 41;
	BookOrder["Luk"] = 42;
	BookOrder["Jhn"] = 43;
	BookOrder["Act"] = 44;
	BookOrder["Rom"] = 45;
	BookOrder["1Cr"] = 46;
	BookOrder["2Cr"] = 47;
	BookOrder["Gal"] = 48;
	BookOrder["Eph"] = 49;
	BookOrder["Phl"] = 50;
	BookOrder["Col"] = 51;
	BookOrder["1Th"] = 52;
	BookOrder["2Th"] = 53;
	BookOrder["1Ti"] = 54;
	BookOrder["2Ti"] = 55;
	BookOrder["Tts"] = 56;
	BookOrder["Phm"] = 57;
	BookOrder["Hbr"] = 58;
	BookOrder["Jam"] = 59;
	BookOrder["1Pe"] = 60;
	BookOrder["2Pe"] = 61;
	BookOrder["1Jo"] = 62;
	BookOrder["2Jo"] = 63;
	BookOrder["3Jo"] = 64;
	BookOrder["Jud"] = 65;
	BookOrder["Rev"] = 66;

// This is the zero based chapter_ID of the first Chapter:Verse of the said book
// Why?  So we can predict the current Chapter_ID of something like Ecc 17:5
// It would be 659+17
var	BookChapters = [];
	BookChapters["Gen"] = 0;
	BookChapters["Exd"] = 50;
	BookChapters["Lev"] = 90;
	BookChapters["Num"] = 117;
	BookChapters["Deu"] = 153;
	BookChapters["Jos"] = 187;
	BookChapters["Jdg"] = 211;
	BookChapters["Rth"] = 232;
	BookChapters["1Sa"] = 236;
	BookChapters["2Sa"] = 267;
	BookChapters["1Ki"] = 291;
	BookChapters["2Ki"] = 313;
	BookChapters["1Ch"] = 338;
	BookChapters["2Ch"] = 367;
	BookChapters["Ezr"] = 403;
	BookChapters["Neh"] = 413;
	BookChapters["Est"] = 426;
	BookChapters["Job"] = 436;
	BookChapters["Psa"] = 478;
	BookChapters["Pro"] = 628;
	BookChapters["Ecc"] = 659;
	BookChapters["Sgs"] = 671;
	BookChapters["Isa"] = 679;
	BookChapters["Jer"] = 745;
	BookChapters["Lam"] = 797;
	BookChapters["Eze"] = 802;
	BookChapters["Dan"] = 850;
	BookChapters["Hsa"] = 862;
	BookChapters["Joe"] = 876;
	BookChapters["Amo"] = 879;
	BookChapters["Oba"] = 888;
	BookChapters["Jon"] = 889;
	BookChapters["Mic"] = 893;
	BookChapters["Nah"] = 900;
	BookChapters["Hab"] = 903;
	BookChapters["Zep"] = 906;
	BookChapters["Hag"] = 909;
	BookChapters["Zec"] = 911;
	BookChapters["Mal"] = 925;
	BookChapters["Mat"] = 929;
	BookChapters["Mar"] = 957;
	BookChapters["Luk"] = 973;
	BookChapters["Jhn"] = 997;
	BookChapters["Act"] = 1018;
	BookChapters["Rom"] = 1046;
	BookChapters["1Cr"] = 1062;
	BookChapters["2Cr"] = 1078;
	BookChapters["Gal"] = 1091;
	BookChapters["Eph"] = 1097;
	BookChapters["Phl"] = 1103;
	BookChapters["Col"] = 1107;
	BookChapters["1Th"] = 1111;
	BookChapters["2Th"] = 1116;
	BookChapters["1Ti"] = 1119;
	BookChapters["2Ti"] = 1125;
	BookChapters["Tts"] = 1129;
	BookChapters["Phm"] = 1132;
	BookChapters["Hbr"] = 1133;
	BookChapters["Jam"] = 1146;
	BookChapters["1Pe"] = 1151;
	BookChapters["2Pe"] = 1156;
	BookChapters["1Jo"] = 1159;
	BookChapters["2Jo"] = 1164;
	BookChapters["3Jo"] = 1165;
	BookChapters["Jud"] = 1166;
	BookChapters["Rev"] = 1167;
