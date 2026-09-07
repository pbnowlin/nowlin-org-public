//********************************************************************
// KJVBottomNav.js provides the navigation found at the bottom of the
// KJV Bible pages.  The JavaScript variables found intermixed in here
// are defined in KJVTopNav.js
// 
//********************************************************************
document.write(
'		</table>' +
'  </div>' +
'  <div class="return">' +
'    <a href="' + localBase + '#top">Return to Top</a>' +
'  </div>' +
'			<a name="select"></a><form action="./index.html" name="navform" onSubmit="return Navigate(document.navform);" method="get">' +
'  <div class=bible_nav>' +
'    <a href="./kjv/'+PBook+'"><img' +
'			src="./gifs/book_p9.gif" alt="Prior Book" width=95 height=20 border=0></a><a' +
'			href="./kjv/'+PChapt+'"><img' +
'			src="./gifs/chapter_p9.gif" alt="Prior Chapter" width=95 height=20 border=0></a><input type="image"' +
'			src="./gifs/gotoverse9.gif" ALT="Go To Verse" width=100 height=20 border=0><a' +
'			href="./kjv/'+NChapt+'"><img' +
'			src="./gifs/chapter_n9.gif" alt="Next Chapter" width=95 height=20 border=0></a><a' +
'			href="./kjv/'+NBook+'"><img' +
'			src="./gifs/book_n9.gif" alt="Next Book" width=95 height=20 border=0></a><br />' +
'  </div>' +
'  <div style="margin-top:8px" align="center" class=bible_pulldown>' +
'					<select class=select_bible_pulldown name="book">' +
'						<option selected value="Gen">Genesis </option>' +
'						<option value="Exd">Exodus </option>' +
'						<option value="Lev">Leviticus </option>' +
'						<option value="Num">Numbers </option>' +
'						<option value="Deu">Deuteronomy </option>' +
'						<option value="Jos">Joshua </option>' +
'						<option value="Jdg">Judges </option>' +
'						<option value="Rth">Ruth </option>' +
'						<option value="1Sa">1 Samuel </option>' +
'						<option value="2Sa">2 Samuel </option>' +
'						<option value="1Ki">1 Kings </option>' +
'						<option value="2Ki">2 Kings </option>' +
'						<option value="1Ch">1 Chronicles </option>' +
'						<option value="2Ch">2 Chronicles </option>' +
'						<option value="Ezr">Ezra </option>' +
'						<option value="Neh">Nehemiah </option>' +
'						<option value="Est">Esther </option>' +
'						<option value="Job">Job </option>' +
'						<option value="Psa">Psalms </option>' +
'						<option value="Pro">Proverbs </option>' +
'						<option value="Ecc">Ecclesiastes </option>' +
'						<option value="Sgs">Song of Songs </option>' +
'						<option value="Isa">Isaiah </option>' +
'						<option value="Jer">Jeremiah </option>' +
'						<option value="Lam">Lamentations </option>' +
'						<option value="Eze">Ezekiel </option>' +
'						<option value="Dan">Daniel </option>' +
'						<option value="Hsa">Hosea </option>' +
'						<option value="Joe">Joel </option>' +
'						<option value="Amo">Amos </option>' +
'						<option value="Oba">Obadiah </option>' +
'						<option value="Jon">Jonah </option>' +
'						<option value="Mic">Micah </option>' +
'						<option value="Nah">Nahum </option>' +
'						<option value="Hab">Habakkuk </option>' +
'						<option value="Zep">Zephaniah </option>' +
'						<option value="Hag">Haggai </option>' +
'						<option value="Zec">Zechariah </option>' +
'						<option value="Mal">Malachi </option>' +
'						<option value="Mat">Matthew </option>' +
'						<option value="Mar">Mark </option>' +
'						<option value="Luk">Luke </option>' +
'						<option value="Jhn">John </option>' +
'						<option value="Act">Acts </option>' +
'						<option value="Rom">Romans </option>' +
'						<option value="1Cr">1 Corinthians </option>' +
'						<option value="2Cr">2 Corinthians </option>' +
'						<option value="Gal">Galatians </option>' +
'						<option value="Eph">Ephesians </option>' +
'						<option value="Phl">Philippians </option>' +
'						<option value="Col">Colossians </option>' +
'						<option value="1Th">1 Thessalonians </option>' +
'						<option value="2Th">2 Thessalonians </option>' +
'						<option value="1Ti">1 Timothy </option>' +
'						<option value="2Ti">2 Timothy </option>' +
'						<option value="Tts">Titus </option>' +
'						<option value="Phm">Philemon </option>' +
'						<option value="Hbr">Hebrews </option>' +
'						<option value="Jam">James </option>' +
'						<option value="1Pe">1 Peter </option>' +
'						<option value="2Pe">2 Peter </option>' +
'						<option value="1Jo">1 John </option>' +
'						<option value="2Jo">2 John </option>' +
'						<option value="3Jo">3 John </option>' +
'						<option value="Jud">Jude </option>' +
'						<option value="Rev">Revelation </option>' +
'					</select> &nbsp;&nbsp;&nbsp;<b><font size=-1>Chap:</font></b>' +
'					<input type="text" size="3" name="chapter" value="1">&nbsp;&nbsp;&nbsp; <b><font size=-1>Verse:</font></b>' +
'					<input type="text" size="3" name="verse" value="1"> ' +
'				</div></form>'
);

var bookName = bookLookup(findBook());
try {
  selectDefault(document.navform.book, bookName);
//  document.navform.chapter.value = findChapter();
  } catch(e) {
}
