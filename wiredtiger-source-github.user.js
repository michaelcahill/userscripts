// ==UserScript==
// @name         WiredTiger source code github links
// @namespace    https://github.com/wiredtiger
// @version      0.1
// @description  Turns ticket links into github links in WiredTiger docs
// @author       michaelcahill
// @include      http://source.wiredtiger.com/* 
// @grant        none
// ==/UserScript==

var linkTextRE = /#([0-9][0-9]+)\b/g;
var replaceURI = "https://github.com/wiredtiger/wiredtiger/issues/";
var replaceGroup = 1;

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

		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
        
		//create a link and put it in the span
		a = document.createElement('a');
		a.appendChild(document.createTextNode(m[0]));
		a.setAttribute('href', replaceURI + m[replaceGroup]);
		span.appendChild(a);

        //track insertion point
		p = m.index + m[0].length;
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
