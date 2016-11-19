"use strict";

var card = document.querySelector(".card");

var tiles = ["dark", "", "dark", "", "dark", "",,, "dark"];

card.childNodes.forEach(function (child, i) {
	if (child.style && !child.className.match("main")) {
		child.className += " " + tiles.shift();
		tileFlow(child, i);
	}
});

function tileFlow(node, time) {
	var tilesContract = setTimeout(function () {
		contract(node);
	}, time * 100);
	var tilesExpand = setTimeout(function () {
		expand(node);
	}, time * 100 + 1000);
	var repeatTileFlow = setTimeout(function () {
		tileFlow(node, time);
	}, time * 100 + 2000);
	console.log(tilesContract);
}

var contract = function contract(node) {
	node.className = node.className.replace(" expand", " contract");
	node.className += " contract";
};

var expand = function expand(node) {
	node.className = node.className.replace(" contract", " expand");
};
