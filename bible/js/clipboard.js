    var IE = window.external &&
        (navigator.platform == "Win32" ||
        window.ScriptEngine && ScriptEngine().indexOf("InScript") + 1);
    var FF = navigator.userAgent.toLowerCase().indexOf("firefox") + 1 ? true : false;
    var OP = window.opera && window.print;
    var NS = window.netscape && !OP;

    function co(f, e, b, o, t) {
        if (window.clipboardData || NS) {
            if (IE && !FF) {
                if (!window.clipboardData.setData("Text", f)) {
                    alert("Text was not copied to clipboard!");
                    return false;
                }
            } else {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    if (confirm("Your current Internet Security settings do not allow data copying to clipboard. Do you want to learn more about enabling data copying to clipboard in your browser?")) {
                        location.href = "./help/javascript-clipboard.html";
                    } else {
                        alert("Text was not copied to clipboard!");
                    }
                    return false;
                }
                try {
                    e = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
                } catch (e) {
                    return false;
                }
                try {
                    b = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
                } catch (e) {
                    return false;
                }
                b.addDataFlavor("text/unicode");
                o = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString);
                o.data = f;
                b.setTransferData("text/unicode", o, f.length * 2);
                try {
                    t = Components.interfaces.nsIClipboard;
                } catch (e) {
                    return false;
                }
                e.setData(b, null, t.kGlobalClipboard);
            }
        } else {
            if (OP) {
                oc(f);
            } else {
                alert("Your browser doesn't support copy to clipboard feature.");
            }
            return false;
        }
        return false;
    }

    function oc(f, e) {
        if (window.clipboardData ||
            navigator.mimeTypes['application/x-shockwave-flash']) {
            e = document.createElement("div");
            document.body.appendChild(e);
            e.innerHTML = "<embed src='./js/clipboard.swf' FlashVars='clipboard=" + escape(f) + "' width='0' height='0' type='application/x-shockwave-flash'></embed>";
        } else {
            alert("Text was not copied to clipboard!");
        }
        return false;
    }



var selectTimer = 0;
function selectThisVerse(childObj) {
	tmpFunc = function() { makeSingleSelection(childObj); };
	if(selectTimer == 0) selectTimer = setTimeout("tmpFunc()", 300);
	return false;
}

function makeSingleSelection(childObj) {
	var verse = parseInt(childObj.name.replace(/copyThisVerse_/, ''), 10);
	if(copyStruct[--verse] == 1) {
		childObj.src =copyOff.src;
		copyStruct[verse] = 0;
	} else {
		childObj.src = copyOn.src;
		copyStruct[verse] = 1;
	}
	selectTimer = 0;
	return false;
}

function selectAllVerses() {
	var csLength = copyStruct.length;
	var i = 0, iSum = 0;
	var onOff = 'On';

	if(selectTimer > 0) {
		clearTimeout(selectTimer);
		selectTimer = 0;
	}

	for(i=0;i<csLength;i++) iSum += copyStruct[i];
	if(iSum == csLength) { iSum = 0; onOff = 'Off';
	}	else { iSum = 1; onOff = 'On'; }

// We can pass an Off/On option as well
	if(arguments.length > 0)
		if(arguments[0] == 'Off') {
			iSum = 0;
			onOff = 'Off';
		} else if(arguments[0] == 'On') {
			iSum = 1;
			onOff = 'On';
		}
	for(i=1;i<=csLength;i++) {
		copyStruct[i-1] = iSum;
//		document.getElementById("CtoC").src = eval('copy'+onOff+'.src');
		theObj = document.getElementsByName('copyThisVerse_'+i)[0];
		theObj.src = eval('copy'+onOff+'.src');
	}
	return false;
}

function copySelectedVerses() {
	var csLength = copyStruct.length;
	var i = 0;
	var f = "";
	var CtoCimg = document.getElementById('CtoC');

	shrinkInterval = setInterval("shrinkCopyOptions()", 1);
	for(i=1;i<=csLength;i++) {
		if(copyStruct[i-1] > 0) {
			var theImg = document.getElementsByName('copyThisVerse_'+i)[0];
			var theObj = theImg.parentNode.parentNode.parentNode;
			CtoCimg.src ='./gifs/copyClipSelDown.gif';
			theImg.src ='./gifs/copyChkboxDown.gif';
			theText = theObj.innerHTML;
			theText = stripHTML(theText);
			theText = cleanupText(theText);
			theText = applyOptions(theText);
			f += theText + '\n\n';
		}
	}
	co(f);
	setTimeout('resetCopyImgs()', 500);
	return false;
}

function resetCopyImgs() {
	var csLength = copyStruct.length;
	var CtoCimg = document.getElementById('CtoC');
	for(i=1;i<=csLength;i++) {
		if(copyStruct[i-1] > 0) {
			var theImg = document.getElementsByName('copyThisVerse_'+i)[0].src ='./gifs/copyChkboxOn.gif';
		}
	}
//	copyStruct = [];
	CtoCimg.src ='./gifs/copyClipSel.gif';
}

function cleanupText(f) {
	f = f.replace(/\[fn\]/gm, '');
	f = f.replace(/^[ \t]*/gm, '');
	f = f.replace(/[ \t]*$/gm, '');
	f = f.replace(/[ \t]+/g, ' ');
	f = f.replace(/^(\n)*/gm, '');
	f = f.replace(/(\n)*$/gm, '');
	f = f.replace(/(\n)+/g, '\n');
	return f;
}

function stripHTML(f) {
	f = f.replace(/(\r)+/g, '\n');
	f = f.replace(/(\n)+/g, ' ');
	f = f.replace(/(<br[^>]*>\s*)+/gi, '\n');
	f = f.replace(String.fromCharCode(182), '');
	f = f.replace(/(\&nbsp; *)+/gi, ' ');
	f = f.replace(/<sup[^>]*>/gi, '[');
	f = f.replace(/<\/sup>/gi, ']');
	return f.replace(/<\/?[a-z]+[^>]*>/gi, '');
}

function applyOptions(f) {
	var refOption = parseInt(GetCookie('radio0'), 10);
	var delimOption = parseInt(GetCookie('radio1'), 10);
	var theAbbrev = parseInt(GetCookie('abbrev'), 10);
	var theQuoted = parseInt(GetCookie('quoted'), 10);
	var theBook = f.substr(0, f.indexOf(' ', 0));
	var theChapter = f.substr(theBook.length+1, f.indexOf(' ', theBook.length+1)-(theBook.length+1));
	var theReference = theBook + ' ' + theChapter;
	var theText = f.substr(theReference.length+1);

	if(theQuoted == 1) theText = '"'+theText+'"';
	if(refOption != 3) {
		if(theAbbrev == 0) {
			 theReference = BookNames[theBook] + ' ' + theChapter;
			if(language == 2) theReference = SpanishBookNames[theBook] + ' ' + theChapter;
		}
		theReference += ' '+ translation.toUpperCase();
		switch(delimOption) {
			case 1:
				theReference = '[' + theReference + ']';
				break;
			case 2:
				theReference = '{' + theReference + '}';
				break;
			case 3:
				theReference = '(' + theReference + ')';
				break;
		}
	}
	switch(refOption) {
		case 0:
			return theReference + ' - ' + theText;
			break;
		case 1:
			return theText + ' - ' + theReference;
			break;
		case 2:
			return theReference + '\n' + theText + '\n';
			break;
		case 3:
			return theText;
			break;
	}
}

heightOne = 0;
maxHeight = 154;
delimValue = 0;
refValue = 0;
shrinkInterval = null;
shrinkTimer = null;
cookieExpiration = 300;

function setCopyDefaults() {
	for(var i=0;i<=3;i++) {
		document.images['ref'+i].src='./gifs/formImg/radio01.gif';
		document.images['ref'+i].onmouseover = function() { this.src='./gifs/formImg/radio01_hov.gif'; };
		document.images['ref'+i].onmouseout  = function() { this.src='./gifs/formImg/radio01.gif'; };
	}

	for(var i=0;i<=3;i++) {
		document.images['delim'+i].src='./gifs/formImg/radio01.gif';
		document.images['delim'+i].onmouseover = function() { this.src='./gifs/formImg/radio01_hov.gif'; };
		document.images['delim'+i].onmouseout  = function() { this.src='./gifs/formImg/radio01.gif'; };
	}

	theRadio0 = GetCookie('radio0');
	theRadio0 = (theRadio0 == null?SetCookie('radio0', 0, cookieExpiration):theRadio0);
	theRadio0 = parseInt(theRadio0, 10);
	document.images['ref'+theRadio0].src='./gifs/formImg/radio01_x.gif';
	document.images['ref'+theRadio0].onmouseover = function() { this.src='./gifs/formImg/radio01_xhov.gif'; };
	document.images['ref'+theRadio0].onmouseout  = function() { this.src='./gifs/formImg/radio01_x.gif'; };

	if(theRadio0 != 3) {
		theRadio1 = GetCookie('radio1');
		theRadio1 = (theRadio1 == null?SetCookie('radio1', 0, cookieExpiration):theRadio1);
		theRadio0 = parseInt(theRadio1, 10);
		document.images['delim'+theRadio1].src='./gifs/formImg/radio01_x.gif';
		document.images['delim'+theRadio1].onmouseover = function() { this.src='./gifs/formImg/radio01_xhov.gif'; };
		document.images['delim'+theRadio1].onmouseout  = function() { this.src='./gifs/formImg/radio01_x.gif'; };
	}

	theAbbrev = GetCookie('abbrev');
	theAbbrev = (theAbbrev == null?SetCookie('abbrev', 1, cookieExpiration):theAbbrev);
	document.images['abbrev'].src='./gifs/formImg/check01'+(theAbbrev>0?'_x':'')+'.gif';
	document.images['abbrev'].onmouseover = function() { this.src='./gifs/formImg/check01_'+(theAbbrev>0?'x':'')+'hov.gif'; };
	document.images['abbrev'].onmouseout  = function() { this.src='./gifs/formImg/check01'+(theAbbrev>0?'_x':'')+'.gif'; };

	theQuoted = GetCookie('quoted');
	theQuoted = (theQuoted == null?SetCookie('quoted', 0, cookieExpiration):theQuoted);
	theRadio0 = parseInt(theQuoted, 10);
	document.images['quoted'].src='./gifs/formImg/check01'+(theQuoted>0?'_x':'')+'.gif';
	document.images['quoted'].onmouseover = function() { this.src='./gifs/formImg/check01_'+(theQuoted>0?'x':'')+'hov.gif'; };
	document.images['quoted'].onmouseout  = function() { this.src='./gifs/formImg/check01'+(theQuoted>0?'_x':'')+'.gif'; };

	theObj = document.getElementById("copyOptions");
	if(theObj) {
		theObj.onmouseout = function() { shrinkTimer = setTimeout("shrinkInterval = setInterval(\"shrinkCopyOptions()\", 1)", 3000); };
		theObj.onmouseover = function() { clearTimeout(shrinkTimer); shrinkTimer = null; };
	}

	theObj = document.getElementById("copyClip");
	if(theObj) {
		theObj.onmouseout = function() { shrinkTimer = setTimeout("shrinkInterval = setInterval(\"shrinkCopyOptions()\", 1)", 3000); };
		theObj.onmouseover = function() { clearTimeout(shrinkTimer); shrinkTimer = null; };
	}
}

function copyToClipboardOptions() {
	if(shrinkTimer != null) {
		clearTimeout(shrinkTimer);
		shrinkTimer = null;
	}
	theObj = document.getElementById("copyOptions");
	theObj.style.display='';
	if(heightOne >= maxHeight) {
		shrinkInterval = setInterval("shrinkCopyOptions()", 1);
	} else {
		shrinkInterval = setInterval("growCopyOptions()", 1);
	}
	return false;
}

function growCopyOptions() {
	theObj = document.getElementById("copyOptions");
	if(heightOne >= maxHeight) { clearInterval(shrinkInterval); clearTimeout(shrinkTimer); shrinkInterval = null; shrinkTimer = null; return; }
	else heightOne += 7;
	theObj.style.height = heightOne;
	theObj.style.display='';
}

function shrinkCopyOptions() {
	theObj = document.getElementById("copyOptions");
	if(heightOne <= 7) { clearInterval(shrinkInterval); clearTimeout(shrinkTimer); theObj.style.display='none'; shrinkInterval = null; shrinkTimer = null; return; }
	else heightOne -= 7;
	theObj.style.height = heightOne;
}

function setClipboardOptions(theObj, theValue) {
	var currentType = theObj.attributes.getNamedItem("imgType").nodeValue;
	switch(currentType) {
		case 'radio0':
			refValue = theValue;
			SetCookie(currentType, theValue, cookieExpiration);
			break;
		case 'radio1':
			delimValue = theValue;
			SetCookie(currentType, theValue, cookieExpiration);
			break;
		case 'abbrev':
			if(GetCookie(currentType) == theValue) {
				SetCookie(currentType, theValue^1, cookieExpiration);
			} else {
				SetCookie(currentType, theValue, cookieExpiration);
			}
			break;
		case 'quoted':
			if(GetCookie(currentType) == theValue) {
				SetCookie(currentType, theValue^1, cookieExpiration);
			} else {
				SetCookie(currentType, theValue, cookieExpiration);
			}
			break;
		default:
			return;
	}
	setCopyDefaults();
	return false;
}

womAdd('bodyClick()');

function bodyClick() {
	document.body.onclick = function() {
		if(shrinkTimer != null)	setTimeout("shrinkInterval = setInterval(\"shrinkCopyOptions()\", 1)", 50);
		return true;
	};
}
