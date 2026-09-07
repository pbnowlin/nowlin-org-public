//********************************************************************
//
// This code should be included in all files so that they can use
// a very normal looking dot-slash relative path i.e.  ./
// The dot-slash relative path used with the BASE tag generated in this
// script will always work and make production simpler/easier, etc.
//
// When this file is properly included, the programmer/designer/whomever
// can then make all internal links relative to the 'BLB' directory.
// This works for any type of link in the page, anything that has a URI
// i.e. <link rel="stylesheet" href="./css/standard.css" type="text/css">,
// except when used in an included CSS file where the proper relative path
// must then be used.
//
// Synopsis
// <script src="../../../js/basepath.js"  type="text/javascript"></script>
//
// Use the proper number of '../' to find the 'js' directory. After that you can then
// use a single './' before proceeding to describe the absolute path for any other
// link in your document. (Absolute relative to the BLB/ directory)
//
// Other usful javascript variables that get defined here.
// topicDir   => An array containing every directory element after the 'BLB' directory and including the filename as the last element.
// localBase  => The absolute path of the current page, excluding any URL variable and anchor names.
// basePath   => The absolute path up to the main index.html file for the BLB-CD, but not including the filename.
//
//********************************************************************

	var CDVERSION = '2.4b';
	var RELEASEDATE = '01/30/26';

	var topicDir = [];
	var localBase = new String(document.location.href);
//alert('bP:lB:'+localBase);
	var anchor = localBase.split('#')[1];
//alert('bP:a:'+anchor);
	localBase = localBase.split('#')[0];
//alert('bP:lB:'+localBase);
	var cgi_vars = localBase.split('?')[1];
//alert('bP:cv:'+cgi_vars);
	localBase = localBase.split('?')[0];
//alert('bP:lB:'+localBase);
	var basePath = localBase.replace(/(.)(BLB)\1.*$/, "$1$2");
//alert('bP:bP:'+basePath);
	var localFile = localBase.replace(basePath+'/', '');
//alert('bP:lF:'+localFile);
	topicDir = localBase.replace(/(.*?)(.)(BLB)\2(.*$)/, "$4").split('/');
//alert('bP:tD:'+topicDir);
	document.write('<base href="'+basePath+'/index.html">');
