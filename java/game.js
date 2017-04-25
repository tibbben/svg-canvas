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
	
		field = document.getElementById('svg-canvas'),  // the blank svg
		ball, court,                                    // svg elements
		
		mousex = 300, mousey = 300,                     // mouse position
		
		speed = 30,                                     // inverse speed
		
		w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	
	function initialize () {
	
		// set the svg viewbox to the viewport height and width
		field.setAttribute("viewbox",'0 0 '+w+' '+h)
		
		// set up the background element
		court = addSVGRect(field,'court',w,h,"#00F",0,"#000", 0, 0);
		
		// add something to animate
		ball = addSVGRect(field,'ball',13,13,"#676",1,"#454", 300, 300);
	}

	// adds a rectangle to the svg element
	function addSVGRect (destSVG, id, width, height, bgcolor, borderwidth, bordercolor, xpos, ypos) {
		var rectNode = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		rectNode.setAttribute("id",id);
		rectNode.setAttribute("width",width);
		rectNode.setAttribute("height",height);
		rectNode.setAttribute("x",xpos);
		rectNode.setAttribute("y",ypos);
		if ( borderwidth > 0 ) {
			rectNode.style = 'fill: ' + bgcolor + '; ' +
		                     'stroke: ' + bordercolor + '; ' +
		                     'stroke-width: ' + borderwidth + '; '
		}
		destSVG.appendChild(rectNode);
		return document.getElementById(id);
	}
	
	// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

	// capture mouse position if moved    
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        mousex = event.pageX 
        mousey = event.pageY 
    }
	
	// this is the animator function
	function iterate () {
		requestAnimFrame ( iterate );
		ball.x.baseVal.value += ((mousex - 8 - (ball.x.baseVal.value) ) / speed);
		ball.y.baseVal.value += ((mousey - 10 - (ball.y.baseVal.value) ) / speed);
		
		// add more action here
		
	}

	// --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//


	game = {
		
		VERSION: VERSION,
		initialize: initialize,
		iterate: iterate
		
	};
	
	return game;
	
}));