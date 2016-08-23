/*
 * events.js - an extension that handles event binding
 *
 * JSLint Valid (http://www.jslint.com/)
 *
 */
/*jslint plusplus: true, evil: true */
/*global jQuery:true */
(function () {
	"use strict";
	/*
		BIND
		This is a function that makes extensive use of the jQuery.on() function to bind events
		to the body, and just waiting for the event to bubble up to it.
	*/
	function bind(oSettings) {
		var object = '',
			event = '',
			bStopPropagation = false,
			bPreventDefault = false,
			fnCallback = {};
		// Basic settings validation
		if (oSettings && oSettings !== 'undefined') {
			// Check if the data property is specified, and use that
			if (oSettings.object && oSettings.object.length > 0 && oSettings.event && oSettings.event.length > 0) {
				object = oSettings.object;
				event = oSettings.event;
				if (oSettings.stop_propagation === true) {
					bStopPropagation = true;
				}
				if (oSettings.prevent_default === true) {
					bPreventDefault = true;
				}
				if (oSettings.callback && typeof(oSettings.callback) === 'function') {
					fnCallback = oSettings.callback;
				}
				$('body').on(event,object,function(e){
					var uiObject = $(e.target);
					if (uiObject.closest(object).length > 0) {
						if (fnCallback && typeof(fnCallback) === 'function') {
							fnCallback();
						}
						if (bPreventDefault){
							e.preventDefault();
						}
						if (bStopPropagation) {
							e.stopPropagation();
						}
					}
				});
			}
		}
	}
	/*
		UNBIND
		This is a function that uses jQuery's .off function to remove an event bound using the .on function.
	*/
	function unbind(oSettings) {
		var object = '',
			event = '';
		// Basic settings validation
		if (oSettings && oSettings !== 'undefined') {
			// Check if the data property is specified, and use that
			if (oSettings.object && oSettings.object.length > 0 && oSettings.event && oSettings.event.length > 0) {
				object = oSettings.object;
				event = oSettings.event;
				$('body').off(event,object);
			}
		}
	}
	// Extend the original platform class and add AJAX-related functionality
	CPlatform.prototype.bind = function (oSettings) {
		bind(oSettings);
	};
	// Extend the original platform class and add AJAX-related functionality
	CPlatform.prototype.unbind = function (oSettings) {
		unbind(oSettings);
	};
	
	// Extend the original platform class and add AJAX-related functionality
	CPlatform.prototype.autoload = {
		start: function(){
			/* check if the startup function has been extended, and run that */
			if (this.startup && typeof(this.startup) === 'function') {
				this.startup();
			}
		}
	};
}());