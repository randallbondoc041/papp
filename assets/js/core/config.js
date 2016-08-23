/*
 * config.js - all configuration variables are initialized here
 *
 * JSLint Valid (http://www.jslint.com/)
 *
 */
/*jslint plusplus: true, evil: true */
/*global jQuery:true */
my_platform.config({
    /*
     URL
     This section contains all the URLs that are used in the server requests. The url configuration
     is grouped by modules for easier lookup.
     */
    /*
     URL - Authentication Module
     The authentication module deals with the centralized user login system.
     */
    'url.main.auth'        : 'http://localhost/Ci Template/auth',
    'url.main.logout'       : 'http://localhost/Ci Template/logout',
    //'url.auth.authenticate' 		: 'http://localhost/cr8v_erp/index.php/api/authenticate/',
    /* Authentication via iFrame - This was just an experimental hack and we're no longer using this */
    //'url.auth.authenticate_iframe' 	: 'http://localhost/cr8v_erp/index.php/api/authenticate_iframe/',
    /*
     URL - Server Module
     The server module url list is a collection of urls related to the application itself.
     */

    'url.server.base'       : 'http://localhost/Ci Template/',

    //'url.server.login' 				: 'http://localhost/cr8v_erp/index.php/api/login',
    //'url.server.ui' 				: 'http://localhost/cr8v_erp/index.php/api/ui',
    /*
     SESSION TIMEOUT - the lifespan of the session in seconds
     Default - 14400 (4 hours)
     Use 0 to make the session expire as soon as the browser is closed.
     */
    'session.timeout'       : 14400,
    'icon.spinner'          : 'fa fa-spinner fa-spin fa-lg'
});