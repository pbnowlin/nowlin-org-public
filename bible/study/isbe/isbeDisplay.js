var toc;
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1];
if(Title) {
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "toc":
				toc = tempItem[1];
				break;
		}
	}
}

if(!toc) document.location.href='./study/index.html';

listing = [];
listing = isbe[toc].split('`');
isbeTitle = listing[0];
Content = listing[1];
SeeFormat = listing[2];
AuthorID = listing[3];

document.write(
'  <div class="head">'+
'   International Standard Bible Encyclopaedia'+
'  </div>'+
'  <div class="subhead">'+ isbeTitle + '  </div>'+
'  <div class="main-just">'+
'    <div class="pad30">'+ Content
);

if(AuthorID != 1) document.write('<p style="text-align:right;">Written by <a href="./study/isbe/authorContent.html?authorID=' + AuthorID + '">' + Authors[AuthorID] + '</a></p>');
if(SeeFormat != "") document.write('<p>SEE: ' + SeeFormat + '</p>');

document.write('</div>'+
'  </div>'+
' <DIV CLASS="return">'+
'    <A HREF="./study/isbe/index.html">Table of Contents</A>'+
'  </DIV>'
);
