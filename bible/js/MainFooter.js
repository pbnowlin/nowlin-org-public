//********************************************************************
//  MainFooter.js is used to close up the document page and adjust the
//  left nav menu.
//
//  I want to target all non-local anchors to the super parent if
//	the doc gets opened in a pop-up.
//********************************************************************

// I think this went bye bye, but I fear removing it today  -Dan 2005-05-18
// Dan testing if he can get all anchors as stated above.
// The current document is with-in a pop-up window
if(noLeftNav[window.name]) {
	var searcher = new RegExp('index.html#', 'i');
	var wohho = document.body.getElementsByTagName("A");
	var	i = 0, aLength = wohho.length;
	for(i=0; i<aLength; i++)
		if(wohho[i].href.search(searcher) >= 0 || wohho[i].href.search(localFile) >= 0 || wohho[i].href.search("http://") >= 0) { ; }
		else {

			wohho[i].href = "javascript:Mommy('"+wohho[i].href+"');";
	}

	function Mommy(link) {
		try {
			wopener = window.opener;
			while (wopener.opener) {
				wopener = wopener.opener;
			}
			wopener.location = link;
			window.setTimeout("wopener.focus()",500);
		 } catch(e) {
			newWindow=window.open(link, 'newWindow');
			window.setTimeout("newWindow.focus()",500);
		 }
		return;
	}
} else {

//  Adjust the left nav section color to red to demonstrate which group we are currently under
	if(menuArray[topicDir[0]]) {
		imageName = 'img' + menuArray[topicDir[0]];
	  document[imageName].src = document[imageName].src.toString().replace('A.gif', 'C.gif');
	}

	preloadLeftNavImages();
}

// Secondary citations for specific authors
JC_Cite = '<p><strong>Copyright Notice</strong><br />Copyrighted by Jon Courson. Used by Permission.</p>';
CS_Cite = '<p><strong>Copyright Notice</strong><br />Copyrighted by The Word For Today. Used by Permission.</p>';
CM_Cite = '<p><strong>Copyright Notice</strong><br />Copyrighted by Koinonia House. Used by Permission.</p>';

dedicationCitation = '';

if (topicDir[0] == 'Comm') {
	if(topicDir[1] == 'jon_courson') dedicationCitation = JC_Cite;
	if(topicDir[1] == 'chuck_smith') dedicationCitation = CS_Cite;
	if(topicDir[1] == 'chuck_missler') dedicationCitation = CM_Cite;
}

//Citation at the end of every page
CITATION = '<div class="cite2">'+dedicationCitation+'<p class="cite"><strong>Cite the BLB CD:</strong><br /><em>The Blue Letter Bible CD</em>. CD-ROM, version '+CDVERSION+'. Blue Letter Bible, ' +RELEASEDATE+'.</p><p><strong>CONTENT DISCLAIMER</strong><br /><br />The Blue Letter Bible ministry and the BLB Institute hold to the historical, conservative Christian faith, which includes a firm belief in the inerrancy of Scripture. Since the text and audio content provided by BLB represent a range of evangelical traditions, all of the ideas and principles conveyed in the resource materials are not necessarily affirmed, in total, by this ministry.</div>';

document.write(CITATION +
'	<div style="background-image:url(\'./gifs/clearpixel.gif\');height:700px;width:0px;"></div>'+
'</TD>'+
'</TR>'+
'</TABLE>'+
'</DIV>'+
'<div id="hiddenWindow" class="floaty">'+
'<!--[if lte IE 6.5]><iframe></iframe><![endif]-->'+
'</div>'+
'</BODY>'+
'</HTML>'
);

//This helps fix the named anchors in the page since we mangle the href base with basepath.js
adjustAnchors();
self.focus();
