/*!
 * game.js
 * MIT licensed
 *
 * Copyright (C) 2017 the Norris family
 */
(function( root, factory ) {
	if( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( function() {
			root.game = factory();
			return root.game;
		} );
	} else if( typeof exports === 'object' ) {
		// Node. Does not work with strict CommonJS.
		module.exports = factory();
	} else {
		// Browser globals.
		root.game = factory();
	}
}( this, function() {

	'use strict';

	var game;

	// The game.js version
	var VERSION = '1.0.0';
	
	var UA = navigator.userAgent,
	
		court = document.getElementById('game'),
		ball, p1p, p2p,
		
		play, counter = 0;
	
	function initialize () {
		ball = addImageNode(court, 'assets/ball.svg', 'ball', 300, 600);
		p1p = addImageNode(court, 'assets/paddle.svg', 'p1p', 50, 550);
		p2p = addImageNode(court, 'assets/paddle.svg', 'p2p', 550, 550);
		play = window.setInterval(iterate, 100);
	}
	
	function addImageNode (destNode, file, id, ypos, xpos) {
		var imageNode = document.createElement("img");
		imageNode.id = id;
		imageNode.src = file;
		imageNode.style = 'position: absolute; top: ' + ypos + 'px; left: ' + xpos + 'px; animation: nudgeRight 1ms linear;';
		destNode.appendChild(imageNode);
		return document.getElementById(id);
	}
	
	function iterate () {
		ball.style.left = (parseFloat(ball.style.left,10)+4)+'px';
		counter++;
		if (counter>20) { clearInterval(play) }
	}

	// --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//


	game = {
		
		VERSION: VERSION,
		initialize: initialize
		
	};
	
	return game;
	
}));