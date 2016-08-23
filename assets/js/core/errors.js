/**
 * Removes or Creates error
 *
 * NOTE: Only glyphicon icons will work with this
 * @author EricN
 *
 * @global
 * @example Simple structure to use this.
 *
 *   <div class="relative">
 *       <textarea></textarea>
 *       <span class="glyphicon glyphicon-exclamation-sign hide form-control-feedback"></span>
 *   </div>
 *
 *   Basic Requirements:
 *      Parent should have class .relative
 *      Children of the parent should have class: .glyphicon, .hide, .form-control-feedback, .glyphicon-exclamation-sign
 */
(function () {
    "use strict";

    /**
     * Function that will compute the left location of the error icon
     *
     * @param {Object} uiParent
     * @param {String} sId
     *
     * @returns {Number}
     */
    function fnComputeErrorLocation(uiParent, sId) {
        // Check if object is a jQuery object
        if( ! uiParent instanceof jQuery){
            return;
        }

        var uiField = uiParent.find(sId),
            numFieldPosLeft = uiField.position().left,
            numFieldWidth = uiField.outerWidth(),
            numIconWidth = uiField.siblings('span.glyphicon').width();

        return (numFieldPosLeft + numFieldWidth) - numIconWidth;
    }

    CPlatform.prototype.errors = {

        /**
         * Function that will create an error with the specified id
         *
         * @param {Object} uiParent  - Parent of the input field
         * @param {String} sSelector - Id of the input
         * @param {String} sMessage  - Error message of the error
         */
        create_message: function (uiParent, sSelector, sMessage) {
            // Check if object is a jQuery object
            if( ! uiParent instanceof jQuery){
                return;
            }

            uiParent.find(sSelector)
                .addClass('error-input')
                .attr('title', sMessage)
                .siblings('span.glyphicon')
                .css('left', fnComputeErrorLocation(uiParent, sSelector))
                .attr('title', sMessage)
                .removeClass('hide');

            uiParent.find(sSelector)
                .siblings('.glyphicon.glyphicon-exclamation-sign')
                .attr('data-original-title', sMessage);
        },

        /**
         * Function that will remove an error with the specified id
         *
         * @param {object} uiParent  - Parent of the input field
         * @param {string} sSelector - Selectors. id (#id) etc...
         */
        remove_message: function (uiParent, sSelector) {
            // Check if object is a jQuery object
            if( ! uiParent instanceof jQuery){
                return;
            }

            uiParent.find(sSelector)
                .removeClass('error-input')
                .attr('title', '')
                .siblings('span.glyphicon')
                .attr('title', '')
                .addClass('hide');
        },

        /**
         * Function that will remove all errors in a form
         *
         * @param {object} uiParent - Parent of the input field
         */
        remove_all_messages: function (uiParent) {
            // Check if object is a jQuery object
            if( ! uiParent instanceof jQuery){
                return;
            }

            var cThis = this;
            uiParent.find('input, textarea').not('[type=hidden]').each(function () {
                cThis.remove_message(uiParent, '#'+this.id);
            });

            cThis.remove_message(uiParent, '#'+uiParent.find('select').attr('id'));
        }
    }
}());