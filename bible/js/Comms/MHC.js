//**********************************************
//
// TopNav Comm driver for MHC
//
//**********************************************

document.write(
'  <div class="hide">' +
'  <table summary="" border="0" cellspacing="0" cellpadding="0" align="center" width="480">' +
'  <tr>' +
'  <td valign="top" align="center" class="comnav" width="156">' +
'    <a href="./kjv/' + findBook() + '/' + findBook() + pad(findChapter()) + '.html#top">' +
'		<div class="supnav">' +
'      <img src="./gifs/clearpixel.gif" border="0" width="154" height="1" alt="" /><br />' +
'      Return to the<br />Bible' +
'	  </div></a>' +
'  </td>' +
'  <td valign="top" align="left">' +
'    <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><img src="./gifs/clearpixel.gif" border="0" width="3" height="33" alt="" /><br />' +
'  </td>' +
'  <td valign="top" align="center" class="comnav" width="156">' +
'    <a href="./c.html"><div class="supnav">' +
'      <img src="./gifs/clearpixel.gif" border="0" width="154" height="1" alt="" /><br />' +
'      Text Commentary<br />' +
'      Menu' +
'    </div></a>' +
'  </td>' +
'  <td valign="top" align="left">' +
'    <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><img src="./gifs/clearpixel.gif" border="0" width="3" height="33" alt="" /><br />' +
'  </td>' +
'  <td valign="top" align="center" class="comnav" width="156">' +
'<a href="./commentary/mhc/index.html"><div class="supnav">' +
'      <img src="./gifs/clearpixel.gif" border="0" width="154" height="1" alt="" /><br />' +
'      Table of Contents for<br />' +
'     ' + Author +
'    </div></a>' +
'  </td>' +
'  <td valign="top" align="left">' +
'    <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><br />' +
'  </td>' +
'  </tr>' +
'  <tr>' +
'  <td valign="top" align="left" colspan="6">' +
'    <img src="./gifs/nav2/nav3but.gif" border="0" width="480" height="2" alt="" /><br />' +
'    <img src="./gifs/clearpixel.gif" border="0" width="480" height="3" alt="" /><br />' +
'  </td>' +
'  </tr>' +
'  </table>' +
'' +
'  <table summary="" border="0" cellspacing="0" cellpadding="0" align="center" width="480">' +
'  <tr>' +
'  <td valign="top" align="left">' +
'    <table summary ="" border="0" cellspacing="0" cellpadding="0" align="center">' +
'    <tr>' +
'    <td valign="top" align="center" class="comnav" width="116">' +
'      <a href="' + PriorBookURL + '"><div class="subnav">' +
'        <img src="./gifs/clearpixel.gif" border="0" width="114" height="1" alt="" /><br />' +
'        Prior Book<br />' +
'        <span style="font-weight:normal">'+PriorBook + '</span><br />' +
'      </div></a>' +
'    </td>' +
'    <td valign="top" align="left" width="2">' +
'      <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" colspan="2" width="118">' +
'      <img src="./gifs/nav2/nav1but.gif" border="0" width="118" height="2" alt="" /><br />' +
'      <img src="./gifs/clearpixel.gif" border="0" width="118" height="3" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" class="comnav" width="116">' +
'      <a href="' + PriorChapterURL + '"><div class="subnav">' +
'        <img src="./gifs/clearpixel.gif" border="0" width="113" height="1" alt="" /><br />' +
'        Prior Chapter<br />' +
'        <span style="font-weight:normal">' + PriorChapter + '</span><br />' +
'      </div></a>' +
'    </td>' +
'    <td valign="top" align="left" width="2">' +
'      <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" colspan="2" width="118">' +
'      <img src="./gifs/nav2/nav1but.gif" border="0" width="118" height="2" alt="" /><br />' +
'      <img src="./gifs/clearpixel.gif" border="0" width="118" height="3" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    </table>' +
'  </td>' +
'  <td valign="top" align="left">' +
'    <img src="./gifs/clearpixel.gif" border="0" width="3" height="73"alt="" /><img src="./gifs/nav2/masts/' + imageMasthead + '" border="0" width="238" height="73" alt="" /><img src="./gifs/clearpixel.gif" border="0" width="3" height="73" alt="" /><br />' +
'  </td>' +
'  <td valign="top" align="left">' +
'    <table summary="" border="0" cellspacing="0" cellpadding="0" align="center">' +
'    <tr>' +
'    <td valign="top" align="center" class="comnav" width="116">' +
'      <a href="' + NextBookURL + '"><div class="subnav">' +
'        <img src="./gifs/clearpixel.gif" border="0" width="114" height="1" alt="" /><br />' +
'        Next Book<br />' +
'        <span style="font-weight:normal">' + NextBook + '</span>' +
'      </div></a>' +
'    </td>' +
'    <td valign="top" align="left" width="2">' +
'      <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" colspan="2" width="118">' +
'      <img src="./gifs/nav2/nav1but.gif" border="0" width="118" height="2" alt="" /><br />' +
'      <img src="./gifs/clearpixel.gif" border="0" width="118" height="3" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" class="comnav" width="116">' +
'      <a href="' + NextChapterURL + '"><div class="subnav">' +
'        <img src="./gifs/clearpixel.gif" border="0" width="114" height="1" alt="" /><br />' +
'        Next Chapter<br />' +
'        <span style="font-weight:normal">' + NextChapter + '</span>' +
'      </div></a>' +
'    </td>' +
'    <td valign="top" align="left" width="2">' +
'      <img src="./gifs/nav2/int_sup1.gif" border="0" width="2" height="33" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    <tr>' +
'    <td valign="top" align="center" colspan="2" width="118">' +
'      <img src="./gifs/nav2/nav1but.gif" border="0" width="118" height="2" alt="" /><br />' +
'      <img src="./gifs/clearpixel.gif" border="0" width="118" height="3" alt="" /><br />' +
'    </td>' +
'    </tr>' +
'    </table>' +
'  </td>' +
'  </tr>' +
'  </table>' +
'  </div>' +
'  <div class="head">' +
'   '+ Author +
'  </div>' +
'  <div class="subhead">' +
'    ' + Title +
'  </div>' +
'  <div class="main-just">' +
'    <div class="pad2030">'
);
