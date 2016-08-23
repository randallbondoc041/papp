/*
 * ajax.js - an extension that handles all communications between the server and the client platform
 *
 * JSLint Valid (http://www.jslint.com/)
 *
 */
/*jslint plusplus: true, evil: true */
/*global jQuery:true */
(function () {
	"use strict";
	/*
		AJAXP
		This is the primitive ajax function that will be used by the other functions
	*/
	function ajaxp(oSettings) {
		var sUrl = my_platform.config('url.server.base'),
			oData = {};
		// Basic settings validation
		if (oSettings && oSettings !== 'undefined') {
			// Check if the data property is specified, and use that
			if (oSettings.data && oSettings.data !== 'undefined' && typeof (oSettings.data) === 'object') {
				oData = oSettings.data;
			}
			if (oSettings.url && oSettings.url.length > 0) {
				sUrl = oSettings.url;
			}
			oData.csrf_token_name = $.cookie('csrf_cookie_name');
			$.ajax({
				// type: "GET",
				url: sUrl,
				async: false,
				contentType: "application/json",
				dataType: 'jsonp',
				data: oData,
				// If an error callback has been defined, do that
				error: function (e) {
					// Basic error catching and delegation
					if (oSettings && oSettings !== 'undefined' && oSettings.error && oSettings.error !== 'undefined' && typeof (oSettings.error) === 'function') {
						oSettings.error(e.message);
					}
				},
				// If a success callback has been defined, do that
				success: function (oData) {
					// Basic success catching and delegation
					if (oSettings && oSettings !== 'undefined' && oSettings.success && oSettings.success !== 'undefined' && typeof (oSettings.success) === 'function') {
						oSettings.success(oData);
					}
				}
			});
		}
	}
	/*
		AJAX
		This is the primitive ajax function that will be used by the other functions
	*/
	function ajax(oSettings) {
		var sUrl = my_platform.config('url.server.base'),
			oData = {},
            uiLoader = $("#loader"),
			sDataType = '';
			uiLoader.stop(true, true);
		// Basic settings validation
		if (oSettings && oSettings !== 'undefined') {
			// Check if the data property is specified, and use that
			if (oSettings.data && oSettings.data !== 'undefined' && typeof (oSettings.data) === 'object') {
				oData = oSettings.data;
			}
			if (oSettings.url && oSettings.url.length > 0) {
				sUrl = oSettings.url;
			}
			oData.csrf_token_name = $.cookie('csrf_cookie_name');
			$.ajax({
				type: "POST",
				url: sUrl,
				data: oData,
				dataType: 'text',
				beforeSend: function(xhr, opts) {
					if (oSettings && typeof (oSettings.beforeSend) === 'function') {
						oSettings.beforeSend(xhr, opts);
					}
                    uiLoader.css('top','0');
                    uiLoader.animate({ top: "60"},500);
				},
				// If an error callback has been defined, do that
				error: function (e) {
					// Basic error catching and delegation
					if (oSettings && oSettings !== 'undefined' && oSettings.error && oSettings.error !== 'undefined' && typeof (oSettings.error) === 'function') {
						oSettings.error(e.message);
					}
                    uiLoader.animate({ top: "0"},500);
				},
				// If a success callback has been defined, do that
				success: function (sData) {
					// Basic success catching and delegation
					if (oSettings && typeof (oSettings.success) === 'function') {
						oSettings.success(sData);
					}
				},
				complete: function() {
					if (oSettings && typeof (oSettings.complete) === 'function') {
						oSettings.complete();
					}
					uiLoader.animate({ top: "0"},500);
				}
			});
		}
	}
	// Extend the original platform class and add AJAX-related functionality
	CPlatform.prototype.ajax = {
		/*
			RUN
			Run is a server request that allows our platform to push data to or pull data from the server. This is one of the
			available configurations for the AJAX request. 
		*/
		run : function (oSettings) {
			var oConfig = {
				'data' : oSettings.data,
				'url': oSettings.url,
                'async': typeof oSettings.async === 'undefined',
				'success' : function(sData) {
					if (typeof (oSettings.success) != 'undefined' && typeof(oSettings.success) == 'function') {
						oSettings.success(sData);
					}
				},
				'error' : function(sData){
					var oData = {
						status: false,
						message: 'Unable to contact server.'
					}
					if (typeof (oSettings.failure) === 'function') {
						oSettings.failure(oData);
					}
				},
				'beforeSend' : function(xhr, opts) {
					if (typeof (oSettings.beforeSend) != 'undefined' && typeof(oSettings.beforeSend) == 'function') {
						oSettings.beforeSend(xhr, opts);
					}
				},
				'complete' : function() {
					if (typeof (oSettings.complete) != 'undefined' && typeof(oSettings.complete) == 'function') {
						oSettings.complete();
					}
				}
			};
			
			if(oSettings.jsonp){
				return ajaxp(oConfig);
			} else {
				return ajax(oConfig);
			}
		}
	};
}());