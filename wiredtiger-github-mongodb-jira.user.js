// ==UserScript==
// @name         WiredTiger github -> MongoDB JIRA links
// @namespace    https://github.com/wiredtiger
// @version      0.1
// @description  Turns mentions of JIRA tickets into links
// @author       michaelcahill
// @include      https://github.com/wiredtiger/* 
// @grant        none
// ==/UserScript==

var linkTextRE = /\b[A-Z]+-[0-9]+\b/g;
var replaceURI = "https://jira.mongodb.org/browse/";

function linkifyTextNode(node) {
	var i, l, m;
	var txt = node.textContent;
	var span = null;
	var p = 0;
	while (m = linkTextRE.exec(txt)) {
		if (!span) {
			// Create a span to hold the new text with links in it.
			span = document.createElement('span');
		}

		//get the link text
		l = m[0];
		var lLen = l.length;
        
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
        
		//create a link and put it in the span
		a = document.createElement('a');
		a.appendChild(document.createTextNode(l));
		a.setAttribute('href', replaceURI + l);
		span.appendChild(a);
		//track insertion point
		p = m.index+lLen;
	}
	if (span) {
		//take the text after the last link
		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
		//replace the original text with the new span
		try {
			node.parentNode.replaceChild(span, node);
		} catch (e) {
			console.error(e);
			console.log(node);
		}
	}
}

textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < textNodes.snapshotLength; i++) { 
    var node = textNodes.snapshotItem(i);
    linkifyTextNode(node);
}
