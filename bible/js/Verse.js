//********************************************************************
// Verse.js works on the V_ files intermixed with the KJV Bible files.
// When one of these files is yanked up by mV();, V_Nav();, or V();
// this helper creates the content inside the popup window.
//********************************************************************

var Chapt, Verse;
var ARGV = new Array();
Title = new String(window.location);
Title = unescape(Title);
Title = Title.split("?")[1]
if(Title) {
	Title = Title.split('#')[0];
  tLength = Title.split("&").length;
	for(tItem=0;tItem<tLength;tItem++) {
	  tempItem = Title.split("&")[tItem].split("=");
		switch(tempItem[0])	{
			case "Verse":
				Verse = tempItem[1];
				break;
		}
	}
}

if(!Verse) Verse='1';
ARGV = Verse.split(",");
Verse = parseInt(ARGV[0], 10);

document.write(
'<table width=100% cellspacing=0 cellpadding=0 border=0>' +
'	<tr><td bgcolor=000000 align=center valign=top>'+
'		<table width=100% cellspacing=1 cellpadding=2 border=0 bgcolor=000000>'+
'			<tr><td bgcolor=324395 align=center valign=top><font color=ffffff><B>King James Version</b></td></tr>'+
'			<tr><td bgcolor=ffffff>' +
'				<table width=100% cellspacing=0 cellpadding=15 border=0>' +
'					<tr><td align=left valign=top>' +
'						<table border=0 cellspacing=5 width=100%>' +
'							<tr><td valign=top width=85><font size=2><B>'+Book+' '+Chapter+':'+Verse+'</B></td><td valign=top><font size=2>'+Content[Verse]+'</td></tr>'
);

for(i=1;i<ARGV.length;i++) {
  New_Verse = parseInt(ARGV[i], 10);
  document.write(
'							<tr><td valign=top><font size=2><B>'+Book+' '+Chapter+':'+New_Verse+'</B></td><td valign=top><font size=2>'+Content[New_Verse]+'</td></tr>');
}

document.write(
'						</table>' +
'					</td></tr>' +
'				</table>' +
'			</td></tr>'+
'			<tr><td bgcolor=efefef align=center><font size=2>Go to Bible for <a href="#" onclick="return M(\''+Book+'\','+Chapter+','+Verse+')">'+Book+' '+Chapter+':'+Verse+'</a></b></td></tr>'+
'		</table>' +
'	</td></tr>' +
'</table>'
);
window.setTimeout("window.focus()",500);