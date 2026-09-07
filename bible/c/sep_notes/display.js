var Title = new String(window.location);
Title = Title.split("?")[1];
document.write("<html><head>" +
"<title>Blue Letter Bible - Septuagint Notes</TITLE>" +
"<link REL=\"stylesheet\" href=\"../../css/simple.css\" type=\"text/css\">" +
"</head>" +
"<body bgcolor=FFFFFF link=324395 vlink=324395 alink=324395 topmargin=8 leftmargin=8>" +
"   <table width=450 cellspacing=0 cellpadding=0 border=0 align=center>" +
"   <tr>" +
"   <td bgcolor=000000 align=left valign=top>" +
"     <table width=450 cellspacing=1 cellpadding=2 border=0 bgcolor=000000>" +
"     <tr>" +
"     <td bgcolor=#324395 align=center valign=top>" +
"       <font size=3 color=#FFFFFF><b>Septuagint Notes</b>" +
" 	 </td></tr>" +
"	 <tr>" +
"	 <td bgcolor=#0069b3 align=center valign=top>" +
"	   <font size=2 color=#FFFFFF><b>Bible Study Notes Relating the Hebrew to the Septuagint</b>" +
"	 </td>" +
"	 </tr>" +
"	 <tr>" +
"	 <td bgcolor=#FFFFFF align=left valign=top>" +
"	   <table cellspacing=18>" +
"	   <tr>" +
"	   <td>" +
"	 	 <font size=2>"+sep_notesArray[Title]+"</font>" +
"	   </td>" +
"	   </tr>" +
"	   </table>" +
"	 </td>" +
"	 </tr>" +
"	 </table>" +
"   </td>" +
"   </tr>" +
"   </table>" +
"</body></html>");

window.setTimeout("window.focus()",500);
