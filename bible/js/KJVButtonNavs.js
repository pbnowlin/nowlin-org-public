document.write('<script type="text/javascript" src="./h/'+ShortName+'.js"><\/script>');

/////////////////////////////////////////
//	DNav: building the drop down from a
//	D button click
//
/////////////////////////////////////////
function DNav(Book, Chapter, Verse) {

	var workingTRobj = document.getElementById("dropDownTR"+Verse);
	var workingTDobj = document.getElementById("dropDownTD"+Verse);
	BibleID += Verse;
	for(i=1;i<=TotalVerses;i++) {
		document.getElementById("dropDownTR"+i).style.display='none';
		document.getElementById("dropDownTD"+i).innerHTML='';
	}

// Build the initial form beginning
	innerHTML_Text = '<FORM NAME="D_Submitter" ACTION="" METHOD="GET" onSubmit="return doDictLookup(document.D_Submitter.Dict.options[document.D_Submitter.Dict.selectedIndex].value);" target="_PWnd">' +
		'<TABLE><TR><TD><SELECT class=select_D_button NAME="Dict">';

	var LOD_Length = LOD.length;
	var LODList = [];
	var i = 0;

// Build any Nave's that go with the currently selected verse
// 	var naves_innerHTML_Text = '';
// 	for(i=0;i<LOD_Length;i++) {
// 		LODList = LOD[i].split("~");
// 		if(LODList[0] == 'naves' && LODList[5] == Verse)
// 			naves_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '#' + LODList[7] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
// 		if(LODList[0] != 'naves') break;
// 	}
// 	if(naves_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">NAVES DICTIONARY ENTRIES: ' + naves_innerHTML_Text;

// Build any Nave's that go with the currently selected verse LODList[7] is the anchor value
	var naves_innerHTML_Text = '';
	for(i=0;i<LOD_Length;i++) {
		LODList = LOD[i].split("~");
		if(LODList[0] == 'naves' && LODList[5] == Verse)
			naves_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '#' + LODList[7] + '#' + prepAnchor(LODList[2]) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
		if(LODList[0] != 'naves') break;
	}
	if(naves_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">NAVES DICTIONARY ENTRIES: ' + naves_innerHTML_Text;



// Build any Torrey's that go with the currently selected verse
	var torrey_innerHTML_Text = '';
	for(;i<LOD_Length;i++) {
		LODList = LOD[i].split("~");
		if(LODList[0] == 'torreys' && LODList[5] == Verse)
			torrey_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '#' + LODList[7] + '#' + prepAnchor(LODList[2]) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
		if(LODList[0] != 'torreys') break;
	}
	if(torrey_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">TORREYS DICTIONARY ENTRIES: ' + torrey_innerHTML_Text;


// Build any Easton's that go with the currently selected verse
	var easton_innerHTML_Text = '';
	for(;i<LOD_Length;i++) {
		LODList = LOD[i].split("~");
		if(LODList[0] == 'easton' && LODList[5] == Verse)
			easton_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '#' + LODList[7] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
		if(LODList[0] != 'easton') break;
	}
	if(easton_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">EASTON DICTIONARY ENTRIES: ' + easton_innerHTML_Text;


// Build any TSG's that go with the currently selected verse
	var subject_innerHTML_Text = '';
	for(;i<LOD_Length;i++) {
		LODList = LOD[i].split("~");
		if(LODList[0] == 'subject' && LODList[5] == Verse)
			subject_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
		if(LODList[0] != 'subject') break;
	}
	if(subject_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">SUBJECT DICTIONARY ENTRIES: ' + subject_innerHTML_Text;


// Build any Hitchcock's that go with the currently selected verse
	var hitchcock_innerHTML_Text = '';
	for(;i<LOD_Length;i++) {
		LODList = LOD[i].split("~");
		if(LODList[0] == 'hitchcock' && LODList[5] == Verse)
			hitchcock_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LODList[6] + '#' + LODList[7] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[1] + ' ' + LODList[2] + ' ' + LODList[3]+ ' ' + LODList[4];
		if(LODList[0] != 'hitchcock') break;
	}
	if(hitchcock_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">HITCHCOCK DICTIONARY ENTRIES: ' + hitchcock_innerHTML_Text;


// Build any Hitchcock Roswell's that go with the currently selected verse
	var hta_innerHTML_Text = '';
	var htaLength = htaBible.length;
//	'5_38_343|1|1|Creation - God Created the Universe';
	for(i=0;i<htaLength;i++) {
		LODList = htaBible[i].split("|");
		if(LODList[1] == Chapter && LODList[2] == Verse)
			hta_innerHTML_Text += '<OPTION class="ddOption3" Value="R' + LODList[0] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LODList[3];
	}
	if(hta_innerHTML_Text != '') innerHTML_Text += '<OPTION class="ddOption3" Value= "0">HITCHCOCK\'S TOPICAL ANALYSIS: ' + hta_innerHTML_Text;


// Close the form
	innerHTML_Text += '</SELECT></TD>' +
		'<TD><INPUT TYPE="image" border="0" SRC="./gifs/view_dictionary.gif" NAME="Select"></TD>' +
		'</TR></TABLE></FORM>';

	workingTRobj.style.display = '';
	workingTDobj.innerHTML = innerHTML_Text;
	return true;
}

/////////////////////////////////////////
//	INav: building the drop down from a
//				I button click
//
/////////////////////////////////////////
function LOI_Opener() {
	selObj = document.I_Submitter.Comm.options[document.I_Submitter.Comm.selectedIndex];
	if(selObj.value == 0) {
		alert('Please select avalid item from the list.');
	}else {
//		_PWnd = window.open(basePath + '/' + selObj.value, '_PWnd');
//		_PWnd.focus();
		document.location.href=basePath + '/' + selObj.value;
	}
	return false;
}

function INav(Book, Chapter, Verse) {

	var workingTRobj = document.getElementById("dropDownTR"+Verse);
	var workingTDobj = document.getElementById("dropDownTD"+Verse);
	for(i=1;i<=TotalVerses;i++) {
		document.getElementById("dropDownTR"+i).style.display='none';
		document.getElementById("dropDownTD"+i).innerHTML='';
	}

// Build the initial form beginning
	innerHTML_Text = '<FORM NAME="I_Submitter" ACTION="" METHOD="GET" onSubmit="return LOI_Opener();" target="_PWnd">' +
		'<TABLE><TR><TD><SELECT class=select_I_button NAME="Comm">';

	var sOption1 = '<OPTION Value= "0" Selected>Choose Hymn / Map /Image for '+Book+' '+Chapter+':'+Verse+' - Then Click "Go"';
	var sOption2 = '<OPTION Value= "0" Selected>Choose Hymn for '+Book+' '+Chapter+':'+Verse+' - Then Click "Go"';
	var sOption3 = '<OPTION Value= "0" Selected>Choose Map/Image for '+Book+' '+Chapter+':'+Verse+' - Then Click "Go"';

	var LOI_Length = LOI.length;
	var LOIList = [];

// Build any Hymns that go with the currently selected verse
	var hymn_innerHTML_Text = '';
	for(i=0;i<LOI_Length;i++) {
		LOIList = LOI[i].split("~");
		if(LOIList[0] == 'hymn' && LOIList[1] == Verse)
			hymn_innerHTML_Text += '<OPTION class="ddOption3" Value="hymns/hymns_html/' + LOIList[3] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LOIList[2];
	}

// Build any Images/Maps that go with the currently selected verse
	var images_innerHTML_Text = '';
	for(i=0;i<LOI_Length;i++) {
		LOIList = LOI[i].split("~");
		if(LOIList[0] == 'image' && LOIList[9] == Verse)
			images_innerHTML_Text += '<OPTION class="ddOption3" Value="' + LOIList[10] + '#' + LOIList[11] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + LOIList[1] + ' ' + LOIList[2]+ ': ' + LOIList[3] + ' ' + LOIList[4]+ ' ' + LOIList[5] + ' ' + LOIList[6];
	}

	if(hymn_innerHTML_Text != '' && images_innerHTML_Text != '') {
		innerHTML_Text += sOption1 + '<OPTION class="ddOption1" Value= "0">HYMNS :' + hymn_innerHTML_Text + '<OPTION class="ddOption1" Value= "0">MAPS / IMAGES:' + images_innerHTML_Text;
	}	else if(hymn_innerHTML_Text != '') {
		innerHTML_Text += sOption2 + '<OPTION class="ddOption1" Value= "0">HYMNS :' + hymn_innerHTML_Text;
	}	else {
		innerHTML_Text += sOption3 + '<OPTION class="ddOption1" Value= "0">MAPS / IMAGES:' + images_innerHTML_Text;
	}

// Close the form
	innerHTML_Text += '</SELECT></TD>' +
		'<TD><INPUT TYPE="image" border="0" SRC="./gifs/view_images.gif" NAME="Select"></TD>' +
		'</TR></TABLE></FORM>';

	workingTRobj.style.display = '';
	workingTDobj.innerHTML = innerHTML_Text;
	return true;
}

/////////////////////////////////////////
//	PNav: building the drop down from a
//				L button click, or verse click
//
/////////////////////////////////////////

function LOC_Opener() {
	selObj = document.P_Submitter.Comm.options[document.P_Submitter.Comm.selectedIndex];
	if(selObj.value == 0) {
		alert('Please select a Study Tool or Commentary from the available list.');
	}else {
//		_PWnd = window.open(basePath + selObj.value, '_PWnd');
//		_PWnd.focus();
		document.location.href=basePath + selObj.value;
	}
	return false;
}

// What to do when somebody click the L button of the Verse link
function PNav(Book, Chapter, Verse) {

	var workingTRobj = document.getElementById("dropDownTR"+Verse);
	var workingTDobj = document.getElementById("dropDownTD"+Verse);
	var studyLength  = LOC_Study[Verse].length;
	var textLength   = LOC_Text[Verse].length;
	var study_innerHTML_Text = '';
	var text_innerHTML_Text = '';
	var lastAuthor = '';
	var i = 0;

// Build the initial form beginning
	var innerHTML_Text = '<FORM NAME="P_Submitter" ACTION="" METHOD="GET" onSubmit="return LOC_Opener();" target="_PWnd">' +
		'<TABLE><TR><TD><SELECT class=select_L_button NAME="Comm">' +
		'<option Value= "0" Selected>CLICK HERE, Select then Click "Go"</option>';

	for(i=1;i<=TotalVerses;i++) {
		document.getElementById("dropDownTR"+i).style.display='none';
		document.getElementById("dropDownTD"+i).innerHTML='';
	}

	for(i=0;i<studyLength;i++) {
		var studyItems = LOC_Study[Verse][i].split('~');
		study_innerHTML_Text += '<option class="ddOption3" Value="' + studyItems[0] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + studyItems[1] + '</option>';
	}
	if(study_innerHTML_Text != '')	innerHTML_Text += '<OPTION class="ddOption1" Value= "0">STUDY TOOLS:' + study_innerHTML_Text + '</option>';

	innerHTML_Text += '<option class="ddOption1" Value= "0">TEXT COMMENTARIES:</option>';

	for(i=0;i<textLength;i++) {
		var textItems = LOC_Text[Verse][i].split('~');
		var thisAuthor = textItems[0];
		if(thisAuthor != lastAuthor) text_innerHTML_Text += '<option class="ddOption2" Value="0">&nbsp;&nbsp;' + thisAuthor + '</option>';
		text_innerHTML_Text += '<option class="ddOption3" Value="' + textItems[1] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + textItems[2] + '</option>';
		lastAuthor = thisAuthor;
	}
	innerHTML_Text += text_innerHTML_Text;



// Close the form
	innerHTML_Text += '</SELECT></TD>' +
		'<TD><INPUT TYPE="image" border="0" SRC="./gifs/view_commentary.gif" NAME="Select"></TD>' +
		'</TR></TABLE></FORM>';

	workingTRobj.style.display = '';
	workingTDobj.innerHTML = innerHTML_Text;
	return true;
}
