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
		ball, p1paddle, p2paddle, court,                // svg elements
		
		p1dy = 0, p2dy = 0,                             // paddle change
		
		mousex = 500, mousey = 300,                     // mouse position
		
		speed = 7, trajectory = -Math.PI*0.9,           // inverse speed (mouse follow)
		                                                // speed and angle (pong)
		
		w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	
	function initialize () {
	
		// set the svg viewbox to the viewport height and width
		field.setAttribute("viewbox",'0 0 '+w+' '+h)
		
		// set up the background element
		court = addSVGRect(field,'court',w,h,"#00F",0,"#000", 0, 0);
		
		// add something to animate
		ball = addSVGRect(field,'ball',13,13,"#676",1,"#454", 300, 300);
		
		p1paddle = addSVGRect(field,'p1paddle',13,40,"#c50",1,"#f00", 13, 300);
		p2paddle = addSVGRect(field,'p2paddle',13,40,"#05c",1,"#00f", w-13-13, 300);
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
			rectNode.setAttribute("style", 'fill: ' + bgcolor + '; ' +
		                     'stroke: ' + bordercolor + '; ' +
		                     'stroke-width: ' + borderwidth + '; ');
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
    
    document.onkeypress = handleKeyPress;
    function handleKeyPress(e) {
    	var keynum;

		if(window.event) { // IE                    
		  keynum = e.keyCode;
		} else if(e.which){ // Netscape/Firefox/Opera                   
		  keynum = e.which;
		}
		
		// paddles move on key presses (left: 'a', 'z'; right: ';', '.')
		switch (keynum) {
			case 97:
				p1dy = -10;
				break;
			case 122:
				p1dy = 10;
				break;
			case 59:
				p2dy = -10;
				break;
			case 46:
				p2dy = 10;
				break;	
		}
		
		console.log(keynum)
    
    }
    
    document.onkeyup = handleKeyUp;
    function handleKeyUp(e) {
    	var keynum;

		if(window.event) { // IE                    
		  keynum = e.keyCode;
		} else if(e.which){ // Netscape/Firefox/Opera                   
		  keynum = e.which;
		}
		
		// paddles stop moving
		switch (keynum) {
			case 65:
			case 90:
				p1dy = 0;
				break;
			case 59:
			case 186:
			case 190:
				p2dy = 0;
				break;	
		}
		
		console.log(keynum)
		console.log(p1paddle.y.baseVal.value)
		console.log(p2paddle.y.baseVal.value)
    
    }
	
	// this is the animator function
	function iterate () {
		var dx = 0, dy = 0;
	
		requestAnimFrame ( iterate );
		
		// ball follows mouse
		/* ball.x.baseVal.value += ((mousex - 8 - (ball.x.baseVal.value) ) / speed);
		ball.y.baseVal.value += ((mousey - 10 - (ball.y.baseVal.value) ) / speed); */
		
		// add more action here
		
		// paddles move on key presses (left: 'a', 'z'; right: ';', '.') 
		if ( p1paddle.y.baseVal.value >= 13 && p1paddle.y.baseVal.value <= (h - 53) ) { 
			p1paddle.y.baseVal.value += p1dy;
		} else if ( p1paddle.y.baseVal.value < 13 && p1dy > 0 ) {
			p1paddle.y.baseVal.value += p1dy;
		} else if ( p1paddle.y.baseVal.value > ( h - 60 ) && p1dy < 0 ) {
			p1paddle.y.baseVal.value += p1dy;
		}
		if ( p2paddle.y.baseVal.value >= 13 && p2paddle.y.baseVal.value <= (h - 53) ) {
			p2paddle.y.baseVal.value += p2dy;
		} else if ( p2paddle.y.baseVal.value < 13 && p2dy > 0 ) {
			p2paddle.y.baseVal.value += p2dy;
		} else if ( p2paddle.y.baseVal.value > ( h - 60 ) && p2dy < 0 ) {
			p2paddle.y.baseVal.value += p2dy;
		}
		
		if (ball.y.baseVal.value > h-26 || ball.y.baseVal.value < 13) {
			trajectory = -trajectory;
		}
		if (ball.x.baseVal.value > w-39 && (ball.y.baseVal.value>(p2paddle.y.baseVal.value-13) && ball.y.baseVal.value<(p2paddle.y.baseVal.value+53))) {
			trajectory = Math.PI - trajectory;
		}
		if (ball.x.baseVal.value < 26 && (ball.y.baseVal.value>(p1paddle.y.baseVal.value-13) && ball.y.baseVal.value<(p1paddle.y.baseVal.value+53))) {
			trajectory = Math.PI - trajectory;
		}
		/* if (ball.x.baseVal.value < 26 || ball.x.baseVal.value > w-26) {
			console.log (ball.y.baseVal.value + ' : ' + p1paddle.y.baseVal.value);
			trajectory = Math.PI - trajectory;
		} */
		
		// ball follows trajectory and bounces if it hits anything
		dx = Math.cos(trajectory) * speed;
		dy = Math.sin(trajectory) * speed;
		ball.x.baseVal.value += dx;
		ball.y.baseVal.value += dy;
		
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
