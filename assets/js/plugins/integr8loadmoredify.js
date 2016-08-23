/**
 * LoadMoreDify v 0.1
 *
 * Will detect any element on max scroll
 *
 * @author: Lorenz P
 *
 *  Changelog:
 *      v 0.1 - initial release
 */

 //TODO: Add feature to handle ajax here, accept template, offset, function to do on each result,
 //TODO: Add feature for directions, example max left,top,right scroll
 //TODO: Add trigger button

(function ($) {
    'use strict';

    /**
     * Configurations
     *
     * @param {Function} fnCallBack     Function to run on detection of max bottom scroll
     *
     */

    $.fn.loadmoredify = function (fnCallBack) {
        var uiThis = $(this);
        uiThis.bind('scroll', function () {
            if (uiThis.scrollTop() + uiThis.innerHeight() >= uiThis[0].scrollHeight) {
                if (typeof(fnCallBack) == 'function') {
                    fnCallBack();
                }
            }
        });
    }
})(jQuery);

/**
 * $('.scrollbar-div').loadmoredify(function(){
 *      do something;
 * });
 * */