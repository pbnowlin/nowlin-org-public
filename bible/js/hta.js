
var ourDOM = YAHOO.util.Dom;
var noClick = false;
var levelAfterNode = null;
var lastLevelId = '';
var clicked = null;
var currentLevel = 0;
var addLevelCallStack = [];
var activeLevels = [];
var bHist = [];

activeLevels[0]=null;activeLevels[1]=null;activeLevels[2]=null;activeLevels[3]=null;activeLevels[4]=null;activeLevels[5]=null;
/*
	onclick() event handler for the <li> anchors
  */
function addLevelInitiator() {
	var currentArgs = [];
	var currentArgsString = '';
	var levelID = '';
	var i = 0;

	if(typeof(arguments[0]) == 'object')
		for(var i=0;i<arguments[0].length;i++) { currentArgs[i] = arguments[0][i]; }
	else
		for(var i=0;i<arguments.length;i++) { currentArgs[i] = arguments[i]; }

	levelID = 'L'+currentArgs.length+'_'+currentArgs[currentArgs.length-1];

	if(levelID == lastLevelId) {
		currentArgs.pop();
		lastLevelId = '';
	} else { lastLevelId = levelID; }
	clicked = levelID;

// When the arglist is empty, navigating to an empty section will break
	currentArgsString = currentArgs.length>0?currentArgs.join('_'):'init';
	ourHistory.navigate("section", currentArgsString);

	return false;
}

/*
	addLevel(cid1 [,cid2, [cid3, [cid4, [cid5]]]])
	cid2 - cid5 are optional and depend only on which indent level triggered the onClick event
	gnhLCaller is a JS Class setup by CF to permit remote calls to our getNestedHTA.cfc
	We establish the Callback Handler and the Error Handler
	By counting the number of passed paramters, we know which remote method to invoke
	By setting 'levelAfterNode', the Callback Handler will know which DOM node to operate upon
  */
function addLevel(argArray) {
	var cL = argArray.length - 1;
	var currentLevelNode = document.getElementById('L'+argArray.length+'_'+argArray[cL]);

// That standard BLB floating window needs to go away, if shown.
	hideKey();

	switch(argArray.length) {
		case 1:
			var cln				=	currentLevelNode;
			if(cln == null) location.replace('./study/hta/hta.html');
			levelAfterNode		=	cln.parentNode;
			currentLevel		=	cL;
			removeNode(activeLevels[currentLevel]);
			addLevelCallbackHandler(hta[argArray.join('_')]);
			break;
		case 2:
			if(currentLevelNode == null) {
				var i = 0;
				var newArgArray = [];
				for(var i=1;i<argArray.length;i++) { newArgArray[i-1] = argArray[i-1]; }
				addLevelCallStack.push(argArray);
				addLevel(newArgArray);
			} else {
				var cln				=	currentLevelNode;
				if(cln == null) location.replace('./hta.cfm');
				levelAfterNode		=	cln.parentNode;
				currentLevel		=	cL;
				removeNode(activeLevels[currentLevel]);
				addLevelCallbackHandler(hta[argArray.join('_')]);
			}
			break;
		case 3:
			if(currentLevelNode == null) {
				var newArgArray = [];
				for(var i=1;i<argArray.length;i++) { newArgArray[i-1] = argArray[i-1]; }
				addLevelCallStack.push(argArray);
				addLevel(newArgArray);
			} else {
				var cln				=	currentLevelNode;
				if(cln == null) location.replace('./hta.cfm');
				levelAfterNode		=	cln.parentNode;
				currentLevel		=	cL;
				removeNode(activeLevels[currentLevel]);
				addLevelCallbackHandler(hta[argArray.join('_')]);
			}
			break;
		case 4:
			if(currentLevelNode == null) {
				var newArgArray = [];
				for(var i=1;i<argArray.length;i++) { newArgArray[i-1] = argArray[i-1]; }
				addLevelCallStack.push(argArray);
				addLevel(newArgArray);
			} else {
				var cln				=	currentLevelNode;
				if(cln == null) location.replace('./hta.cfm');
				levelAfterNode		=	cln.parentNode;
				currentLevel		=	cL;
				removeNode(activeLevels[currentLevel]);
				addLevelCallbackHandler(hta[argArray.join('_')]);
			}
			break;
		case 5:
			if(currentLevelNode == null) {
				var newArgArray = [];
				for(var i=1;i<argArray.length;i++) { newArgArray[i-1] = argArray[i-1]; }
				addLevelCallStack.push(argArray);
				addLevel(newArgArray);
			} else {
				var cln				=	currentLevelNode;
				if(cln == null) location.replace('./hta.cfm');
				levelAfterNode		=	cln.parentNode;
				currentLevel		=	cL;
				removeNode(activeLevels[currentLevel]);
				addLevelCallbackHandler(hta[argArray.join('_')]);
			}
			break;
		case 6:
			if(currentLevelNode == null) {
				var newArgArray = [];
				for(var i=1;i<argArray.length;i++) { newArgArray[i-1] = argArray[i-1]; }
				addLevelCallStack.push(argArray);
				addLevel(newArgArray);
			} else {
				var cln				=	currentLevelNode;
				if(cln == null) location.replace('./hta.cfm');
				levelAfterNode		=	cln.parentNode;
				currentLevel		=	cL;
				removeNode(activeLevels[currentLevel]);
				addLevelCallbackHandler(hta[argArray.join('_')]);
			}
			break;
		default:
			break;
	}

	return false;
}


/*
	addLevelCallbackHandler(msg)
	Actions in this method depend heavily upon what we do inthe remote CFC methods.
	If changes take place here, we must adapt to those changes here.
	If the remote method returns a leading '<div', we should be displaying scripture, else
	we are just adding some more nested <ul>'s
  */
function addLevelCallbackHandler(msg) {
	var patMatch = '';
	var cL = -1;
	var levelNodeToRemove = null;
	var hla = null;

	if(msg.search(/^\{\d+(:\d+)+\}/) < 0) {
		location.replace('./hta.cfm');
		return false;
	}

	patMatch = msg.substr(0, msg.indexOf('}')+1);
	patMatch = patMatch.replace(/[}{]/g, '');
	patMatch = patMatch.split(/:/);
	cL += parseInt(patMatch[0], 10);
	patMatch = 'L'+patMatch.shift()+'_'+patMatch.pop();

	try { if(cL != currentLevel || document.getElementById(patMatch) == null) return false; } catch(e) { return false; }
	msg = msg.replace(/^\{\d+(:\d+)+\}/, '');
	removeFocus();


	if(msg.search(/^<htaDiv/) == 0) {
		var el = document.createElement('li');
		var i = 0;

		msg = msg.replace(/^<htaDiv_(\d)>/, function($1, $2) {
					return htaDiv[parseInt($2, 10)]; }
				);
		msg = msg.replace(/<htaTail>/, htaTail);
// <tr class="a unMarkedRef">246005 

		msg = msg.replace(/<tr class="([^"]+)">(\d+)/g, function($1, $2, $3) {
						var chapterID = parseInt(parseInt($3, 10) / 1000, 10);
						var verse = parseInt($3, 10) - (chapterID*1000);
						var shortName = cidToShortName(chapterID);
						var chapter = cidToChapter(shortName, chapterID);
						var selectedBibleID = GetCookie('htaSelectedBibleID');
						var link = basePath + '/kjv/' + shortName + '/' + shortName+pad(parseInt(chapter, 10)) + '.html#'+verse;
						if ($3 == selectedBibleID) $2 += ' selectedRef';
						return	'<tr class="'+$2+'">\n'+
									'	<td><span class="nowrap"><img src="./gifs/copyChkboxOff.gif"\n'+
									'		class="copyBox" name="copyThisVerse_'+(++i)+'"\n'+
									'		title="Select for Copy; Double click to (de-)select all"\n'+
									'		onClick="return selectThisVerse(this);"\n'+
									'		onDblClick="return selectAllVerses();">\n'+
									' 			<a href="'+link+'">'+shortName+' '+chapter+':'+verse+'</a></span>\n'+
									'	</td><td>'+KJV[$3]+'</td></tr>\n'
					}
				);
		
		DeleteCookie('htaSelectedBibleID');
		el.innerHTML = msg;
		ourDOM.insertAfter(el, levelAfterNode);
		levelNodeToRemove = el;
		ourDOM.replaceClass(levelAfterNode, '', 'focus');
		copyStruct.length = ourDOM.getElementsByClassName('copyBox', 'img', el).length;


		hla = levelAfterNode.childNodes[0];
		lastLevelId = hla.id;
		if(copyStruct.length > 0) setCopyDefaults();
	} else {
		var i = 0;
		msg = msg.replace(/<li>\{([^}]+)\}<\/li>/g, function($1, $2) {
						var pieces = $2.split(/\|/);
						if(parseInt(pieces[0], 10) === 0) return '<li>'+pieces[1]+'<\/li>';
						return	'<li ID="ListLevel'+(pieces[0] = parseInt(pieces[0], 10))+'_'+pieces[pieces[0]]+'"><a href="#" ID="L'+pieces[0]+'_'+pieces[pieces[0]]+'" onClick="return addLevelInitiator('+
									pieces.slice(1, ++pieces[0]).join(',') + ');">'+pieces[pieces[0]]+'. '+pieces[++pieces[0]]+'</a></li>';
					}
				);

		levelAfterNode.innerHTML += msg;
		levelNodeToRemove = ourDOM.getLastChild(levelAfterNode);
		ourDOM.replaceClass(levelNodeToRemove, '', 'focus');
		lastLevelId = levelAfterNode.childNodes[0].id;
		hla = levelNodeToRemove.parentNode.childNodes[0];
	}

	activeLevels[currentLevel] = levelNodeToRemove;

	if (clicked != null) hla = document.getElementById(clicked);

	ourDOM.removeClass(ourDOM.getElementsByClassName('lastClick', 'a', 'parentListContainer'), 'lastClick');
	ourDOM.replaceClass(hla, '', 'lastClick');

	if(addLevelCallStack.length != 0) {
		addLevel(addLevelCallStack.pop());
	} else {
		if(patMatch.search(/^L[12]/) >= 0)
			doScroll(levelAfterNode);
		if(patMatch.search(/^L[3-6]/) >= 0)
			doScroll(levelAfterNode.parentNode.parentNode);
	}

	return false;
}

/*
	Remove the 'focus' className
	Call me when you want to remove that pretty yellow border box on your <li> element
  */
function removeFocus() {
	ourDOM.removeClass(ourDOM.getElementsByClassName('focus', 'li', 'parentListContainer'), 'focus');
	ourDOM.removeClass(ourDOM.getElementsByClassName('focus', 'ul', 'parentListContainer'), 'focus');
}

/*
	Remove the given node from the DOM tree
  */
function removeNode(nodeToRemove) {
	if(nodeToRemove != null) {
		if(nodeToRemove.parentNode != null) {
			nodeToRemove.parentNode.removeChild(nodeToRemove);
			activeLevels[currentLevel] = null;
		}
	}
}

function closeHTADiv(nodeToRemove) {
	var currentState = ourHistory.getCurrentState("section");
	var stateArray = [];

	stateArray = currentState.split(/_/);
	clicked = 'L'+stateArray.length+'_'+stateArray[stateArray.length-1];
	stateArray.pop();

	currentArgsString = stateArray.join('_');
	ourHistory.navigate("section", currentArgsString);

//	addLevelInitiator(stateArray);
}

function callOutMarked() {
	var markedImg = document.getElementById('mark2ndRefs').childNodes[1];
	if(markedImg.src.search(/mark2ndRefs02a/) > 0) {
		markedImg.src = './gifs/mark2ndRefs02b.gif';
		ourDOM.replaceClass(ourDOM.getElementsByClassName('unMarkedRef', 'tr', 'htaTable'), 'unMarkedRef', 'markedRef');
	} else{
		markedImg.src = './gifs/mark2ndRefs02a.gif';
		ourDOM.replaceClass(ourDOM.getElementsByClassName('markedRef', 'tr', 'htaTable'), 'markedRef', 'unMarkedRef');
	}
	return false;
}

function doScroll(el) {
	var y = ourDOM.getY(el);
	var top = (document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
	var vpH = ourDOM.getViewportHeight();
	var view = parseInt(vpH + top);
	var topOffset = 0;

	if(top >= y-topOffset) {		// To close to the top?
		smoothScroll(top, y);
	} else if(view*.5 <= y ) {		// To close to the bottom?  Like, within the bottom 50%?
		smoothScroll(top, y);
	}
}

function smoothScroll(startY, stopY) {
	var distance = stopY > startY ? stopY - startY : startY - stopY;

	if(distance < 50) {
		scrollTo(0, stopY); return;
	}
	var speed = Math.round(distance / 40);
	var step = Math.round(distance / 50);
	var leapY = stopY > startY ? startY + step : startY - step;
	var timer = 0;
	if(stopY > startY) {
		for(var i=startY; i<stopY; i+=step ) {
			setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
			leapY += step;
			if (leapY > stopY) leapY = stopY; timer++;
		}
		return;
	}
	for(var i=startY; i>stopY; i-=step ) {
		setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
		leapY -= step;
		if (leapY < stopY) leapY = stopY; timer++;
	}
}


//	Browser AJAX History Manager
var ourHistory = YAHOO.util.History;
var bookmarkedSection = ourHistory.getBookmarkedState("section");
var initSection = bookmarkedSection || "init";


// Update the UI of your module according to the "state" parameter
// state comes in as an underscore delimited list of paramters
// that we need to parse out for addLevel()
function sectionStateChangeHandler(state) {
	var argArray = [];

	if(state.search(/@/) >= 0) {
		var whereTo = basePath+'/study/hta/replacer.html#section='+state.split('@')[1];
		SetCookie('htaSelectedBibleID', state.split('@')[0]);
		window.location.replace(whereTo);
		return;
	}
	if(state == 'init' || state == '') {
		removeNode(activeLevels[currentLevel]);
		doScroll(top);
	} else {
		argArray = state.split(/_/);
		addLevel(argArray);
	}

}

ourHistory.register("section", initSection, sectionStateChangeHandler);

ourHistory.onReady(function () {
	var currentSection = YAHOO.util.History.getCurrentState("section");
	sectionStateChangeHandler(currentSection);
});

ourHistory.initialize("yui-history-field", "yui-history-iframe");


// The body object respects us differrently, fixing up the clipboard.js function
function copySelectedVerses() {
	var csLength = copyStruct.length;
	var i = 0;
	var f = "";
	var CtoCimg = document.getElementById('CtoC');

//	shrinkInterval = setInterval("shrinkCopyOptions()", 1);

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
