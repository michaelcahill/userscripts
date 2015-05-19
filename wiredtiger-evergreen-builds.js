// ==UserScript==
// @name         Check WT builds by default
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://evergreen.mongodb.com/patch/*
// @grant        none
// ==/UserScript==

checkboxNodes = document.evaluate("//label[text()[contains(., '_WT')]]/input[@type='checkbox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < checkboxNodes.snapshotLength; i++) {
    var node = checkboxNodes.snapshotItem(i);
    node.checked = true;
}