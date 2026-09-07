//  I have not checked yet, but this document should be dead.
//  first check for any occurences of its use in all BLB pages.

function M(link) {
	try {
	  wopener = window.opener;
  	while (wopener.opener) {
	    wopener = wopener.opener;
	  }
	  link = '../' + link + '.html'
	  wopener.location = link;
	  window.setTimeout("wopener.focus()",500);
	 } catch(e) {
		newWindow=window.open(link, 'newWindow');
	  window.setTimeout("newWindow.focus()",500);
	 }
  return false;
}

function V(link) {
  Book = link.split("/")[0];
  Chapt = link.split("/")[1];
  Verse = link.split("/")[2];
  link = basePath + './kjv/'+Book+"/V_"+Chapt+'.html?Verse='+Verse;
  kjvWindow=window.open(link,'Kjv','scrollbars=yes,resizable=yes,width=510,height=250');
  window.setTimeout("kjvWindow.focus()",500);
  return false;
}

function T_Nav(tenseNum, newWindow) {
  XLocation = 160;
  YLocation = 390;
  link = basePath + "/t/index.html?tNum=" + tenseNum
  if (newWindow) {
    TnsWindow=window.open(link,'Tns','scrollbars=yes,resizable=yes,width=520,height=300,screenX='+XLocation+',screenY='+YLocation+',left='+XLocation+',top='+YLocation);
	TnsWindow.focus();
  } else {
    Tns2Window=window.open(link,'Tns2','scrollbars=yes,resizable=yes,width=520,height=300,screenX='+XLocation+',screenY='+YLocation+',left='+XLocation+',top='+YLocation);
    window.setTimeout("Tns2Window.focus()",500);
  }
  return false;
}
