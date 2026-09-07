//********************************************************************
// Generic close the page kind of footer for pages that have no leftnav.
//********************************************************************

//Citation at the end of every page
document.write(
'<table border=0 cellspacing=1 cellpadding=4 width="100%">' +
'<tr><td bgcolor=efefef><font size=2><strong>Cite the BLB CD: </strong><br><br>' +
' <em>The Blue Letter Bible CD</em>. CD-ROM, version '+CDVERSION+'. Blue Letter Bible, '+RELEASEDATE+'.' +
'</td></tr>'+
'<tr><td bgcolor=efefef><font size=2><strong>CONTENT DISCLAIMER</strong>' +
'<br><br>The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, '+
'which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB '+
'represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials '+
'are not necessarily affirmed, in total, by this ministry.</td></tr>' +
'</td></tr>'+
'</table>  '
);
document.write(
'</TD>'+
'</TR>'+
'</TABLE>'+
'</DIV>'+
'</BODY>'+
'</HTML>'
);

//This helps fix the named anchors in the page since we mangle the href base with basepath.js
adjustAnchors();

self.focus();