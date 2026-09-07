//********************************************************************
// Very simple tense page builder.  The data is in ./t/index.html
//********************************************************************

document.write(
'  <TABLE WIDTH="480" CELLSPACING="0" CELLPADDING="0" BORDER="0">'+
'  <TR><TD BGCOLOR="000000" ALIGN="left" VALIGN="top">'+
'    <TABLE WIDTH="100%" CELLSPACING="1" CELLPADDING="2" BORDER="0" BGCOLOR="000000">'+
'    <TR><TD BGCOLOR="#324395" ALIGN="center" VALIGN="top">'+
'      <FONT COLOR="ffffff"><B>Tense/Stem Info for ' + tNum + '</B>'+
'    </TD></TR>'+
'    <TR><TD BGCOLOR="#FFFFFF" ALIGN="left" VALIGN="top">'+
'      <TABLE CELLSPACING="10"><TR><TD>'+
'        <FONT SIZE="2">'+ tNum + ' ' + tenseDef[tNum] +
'			</TD></TR></TABLE>'+
'		</TD></TR></TABLE>'+
'	</TD></TR></TABLE>'
);
