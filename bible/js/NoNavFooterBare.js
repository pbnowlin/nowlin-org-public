//********************************************************************
// Generic close the page kind of footer for pages that have no leftnav.
//********************************************************************

//Closing every page at the end of every page
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