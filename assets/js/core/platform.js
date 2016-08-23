/*
 * platform.js - handles low level platform functions
 *
 * JSLint Valid (http://www.jslint.com/)
 *
 */
/*jslint plusplus: true, evil: true */
/*global jQuery:true */

var oLocalData = {};

function CPlatform() {
    "use strict";
    //var oLocalData = {},
    var iSizeLimit = 9999999;


    var config = {};
    // Assign Config
    // This function performs the adding new config data into the system
    function assign_config(keys, value) {
        var x = 0,
            y,
            path = '',
            configuration = config,
            test = {};
        if (keys && keys.length > 0) {
            // Traverse through each segment and determine if that segment already exists in config
            for (x = 0; x < keys.length; x++) {
                path += '["' + keys[x] + '"]';
                eval('test = config' + path);
                // Otherwise add it as a blank object
                if (typeof(test) == 'undefined') {
                    eval('config' + path + ' = {};');
                }
            }
            eval('config' + path + ' = "' + value + '";');
            return true;
        }
        return false;
    }

    /*
     CONFIG
     Performs config traversal and assignment.
     */
    function configuration(sKey, sValue) {
        var oKeywords = {};
        // Check if the provided key is actually an object
        if (typeof(sKey) === 'object') {
            // It's an object, which could only mean that it's a multiple-assignment
            oKeywords = sKey;
            $.each(oKeywords, function (sKey, sValue) {
                // Explode the key to get the config tree
                var arKey = sKey.split('.'),
                    x = 0,
                    y = 0,
                    configuration,
                    keys = [];
                // Check if the array of keys isn't empty
                if (arKey.length > 0) {
                    for (x = 0; x < arKey.length; x++) {
                        if (arKey[x] && arKey[x].length > 0) {
                            if (y > 0) {
                                if (configuration[arKey[x]]) {
                                    configuration = configuration[arKey[x]];
                                    y++;
                                } else {
                                    configuration = '';
                                }
                            } else {
                                if (config[arKey[x]]) {
                                    configuration = config[arKey[x]];
                                    y++;
                                } else {
                                    configuration = '';
                                }
                            }
                        }
                        keys.push(arKey[x]);
                    }
                } else {
                    // If it is empty, just copy it over
                    configuration = arKey[0];
                }
                // Let's just make sure a value is provided, this means that there's an
                // intention of updating the stored value.
                if (sValue && sValue !== 'undefined' && sValue.length >= 0) {
                    assign_config(keys, sValue);
                }
            });
            // It's not an object, so it's likely a string
        } else {
            if (sKey && sKey.length > 0) {
                // Explode the key to get the config tree
                var arKey = sKey.split('.'),
                    x = 0,
                    y = 0,
                    configuration,
                    keys = [];
                // Check if the array of keys isn't empty
                if (arKey.length > 0) {
                    for (x = 0; x < arKey.length; x++) {
                        if (arKey[x] && arKey[x].length > 0) {
                            if (y > 0) {
                                if (configuration[arKey[x]]) {
                                    configuration = configuration[arKey[x]];
                                    y++;
                                } else {
                                    configuration = '';
                                }
                            } else {
                                if (config[arKey[x]]) {
                                    configuration = config[arKey[x]];
                                    y++;
                                } else {
                                    configuration = '';
                                }
                            }
                        }
                        keys.push(arKey[x]);
                    }
                } else {
                    // If it is empty, just copy it over
                    configuration = arKey[0];
                }
                // Check if a value parameter is provided and not empty
                if (sValue && sValue !== 'undefined' && sValue.length >= 0) {
                    // Then assign it to the specified key
                    assign_config(keys, sValue);
                    // This allows us to pass the node's assigned value as the return value of the function
                    configuration = sValue;
                }
                return configuration;
            }
        }
        return config;
    }

    // System.config allows you to retrieve or set the value of a
    // custom config variable.
    // Usage:
    //    System.config(name) = returns value of "name" config
    //    System.config(name,value) = sets the value of "name" config to "value"

    this.config = function (sKey, sValue) {
        return configuration(sKey, sValue);
    };

    /**
     * @param : { sType(string), qualifiers(object) }
     * @description : el form validation
     * @author : Randall Bondoc
     * @dependency : integr8validation.js
     *
     * */

    this.validate_form = function (uiForm, oFormConfig) {
        if (typeof(uiForm) != 'undefined' && Object.getOwnPropertyNames(oFormConfig).length != 0) {
            uiForm.form_validation(oFormConfig);
        }
        else {
            alert('params error');
        }
    };

    /**
     * @param : { sType(string), oData(object)
     * @description : The function that will be used to add data in the local storage and will also be used to categorize the data entries.
     *   Before adding new data entry, this must check for the limit of the local storage so it can delete the old data before inserting new record
     * @author : Randall Bondoc
     *
     * */

    this.add_to_storage = function (sType, oData) {
        if (sType.length > 0 && typeof(sType) == 'string' && Object.getOwnPropertyNames(oData).length !== 0) {
            var sNewData = JSON.stringify(oData); //length of new data to be added
            var sLocalDataType = JSON.stringify(oLocalData);
            var iNewDataLength = sNewData.length + sLocalDataType.length;
            if (typeof(oLocalData[sType]) == 'undefined') {
                oLocalData[sType] = [];
            }

            if (iNewDataLength < iSizeLimit) {
                oLocalData[sType].push(oData);
            }

            else {
                my_platform.pop(sType); //this will delete index zero of the localstorage stype
                oLocalData[sType].push(oData);

            }

            //console.log(oLocalData[sType]);
        }
        else {
            alert('params error');
        }
    }

    /**
     * @param : { none }
     * @description : The function that will check the limit of the local storage data.
     * @author : Randall Bondoc
     *
     * */

    this.check_limit = function () {
        return iSizeLimit;
    }

    /**
     * @param : { sType(string) }
     * @description : The function that will be used to delete the old data in the specified data type.
     * @author : Randall Bondoc
     *
     * */

    this.pop = function (sType) {
        if (sType.length > 0 && typeof(sType) == 'string' && typeof(oLocalData[sType]) != 'undefined') {
            oLocalData[sType].splice(0, 1);  //delete stype data index 0 array element, first in first out
        }
        else {
            alert('params error');
        }
    }

    /**
     * @param : { sType(string) }
     * @description : The function that will be used to get the record from the local storage based on the given record type and qualifiers.
     * @author : Randall Bondoc
     *
     * */

    this.get_from_storage = function (sType, oQualifiers) {
        if (sType.length > 0 && typeof(sType) != 'undefined') {
            if (typeof(oQualifiers) == 'undefined') //if oQualifiers is not passed
            {
                if(typeof(oLocalData[sType]) != 'undefined')
                {
                    return oLocalData[sType][0];
                }

            }
            else {

                var sFilter = 'oLocalData[sType].filter(function (el) { return ';
                $.each(oQualifiers, function (k, v) {
                    console.log(v);
                    sFilter += 'el["' + v.key + '"] ' + v.operator + ' "' + v.value + '"';
                    if ((k + 1) != oQualifiers.length) {
                        sFilter += ' && ';
                    }
                })
                sFilter += '});';

                var FilteredData = eval(sFilter);
                return FilteredData;
            }
        }
        else {
            alert('params error');
        }
    }

    /**
     * @param : { variable }
     * @description : Function to validate variable
     * @author : Randall Bondoc
     * @return : boolean
     * */

    this.var_check = function(variable, iLength) {
        var bValidity = false;
        var aDataTypes = ['string', 'array', 'object', 'number', 'boolean', 'function'];
        if(typeof(variable) != 'undefined' && typeof(variable) !== undefined)
        {
            if(aDataTypes.indexOf(typeof(variable)) > -1 && variable != null )
            {
                bValidity = true;
            }
        }

        if(typeof(iLength) != 'undefined')
        {
            bValidity = (variable.length > iLength - 1) ? true : false;
        }

        return bValidity;
    }

    /**
     * @param : { sStingJson (string) }
     * @description : Function to SAFELY validate and parse a valid json string and avoid scripts freezing
     * @author : Randall Bondoc
     * @return : boolean
     * */

    this.parse_json =  function(sStringJson) {
        var oJsonObject = {};
        if(typeof(sStringJson) != 'undefined')
        {
            if(sStringJson.length > 0)
            {
                try {
                    oJsonObject = $.parseJSON(sStringJson);
                }
                catch (e) {
                    console.log('failed to parse json string');
                    console.log(e);
                }
            }
        }
        return oJsonObject;
    }

    /**
     * @param : { sStingJson (string) }
     * @description : global configuration of console logs, to be false in live during deployment
     * @author : Randall Bondoc
     * @return : boolean
     * */

    this.log = function (variable) {
        var bDebugMode = true;
        if (typeof(variable) != 'undefined' && bDebugMode == true) {
            console.trace();
            console.log(variable);
        }
    },

    /**
     * populate_data
     * @description Automatic population of Data
     * @param {object} oData
     * @param {object} uiTemplate
     * @param {object} uiContainer
     * @returns {object} None
     * @author : Randall Bondoc
     */

    this.populate_data = function (oData, uiTemplate, uiContainer, fnCallBack) {
        uiTemplate = uiTemplate.clone().removeClass('template');
        for (var key in oData) {
            if (oData.hasOwnProperty(key)) {
                if (typeof(oData[key]) == 'object' && oData[key] != null) {
                    var uiChildContainer = uiTemplate.find('[data-container="' + key + '"]');
                    $.each(oData[key], function (i, oData) {
                        my_platform.populate_data(oData, uiChildContainer.find('.template.' + key), uiChildContainer);
                    });
                } else {
                    uiTemplate.find('[data-label="' + key + '"]').html(oData[key]);
                    uiTemplate.attr('custom-attr-' + key ,oData[key]);
                    uiTemplate.data(key ,oData[key]);
                }
            }
        }

        if(my_platform.var_check(fnCallBack) ){
            fnCallBack();
        }

        uiContainer.append(uiTemplate)
    },

    this.generate_random_keys = function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.arrayColumn = function (inputArray, columnKey, indexKey)
    {
        function isArray(inputValue)
        {
            return Object.prototype.toString.call(inputValue) === '[object Array]';
        }

        if(!isArray(inputArray))
        {
            var newArray = [];
            for(var key in inputArray)
            {
                if(!inputArray.hasOwnProperty(key))
                {
                    continue;
                }
                newArray.push(inputArray[key]);
            }
            inputArray = newArray;
        }
        var isReturnArray = (typeof indexKey === 'undefined' || indexKey === null);
        var outputArray = [];
        var outputObject = {};
        for(var inputIndex = 0; inputIndex < inputArray.length; inputIndex++)
        {
            var inputElement = inputArray[inputIndex];

            var outputElement;
            if(columnKey === null)
            {
                outputElement = inputElement;
            }
            else
            {
                if(isArray(inputElement))
                {
                    if(columnKey < 0 || columnKey >= inputElement.length)
                    {
                        continue;
                    }
                }
                else
                {
                    if(!inputElement.hasOwnProperty(columnKey))
                    {
                        continue;
                    }
                }

                outputElement = inputElement[columnKey];
            }

            if(isReturnArray)
            {
                outputArray.push(outputElement);
            }
            else
            {
                outputObject[inputElement[indexKey]] = outputElement;
            }
        }

        return (isReturnArray ? outputArray : outputObject);
    }

    /**
     * check_duplicate
     * @description Check duplicate data in an array. Returns status 1 if no duplicate and 0 if has duplicate with corresponding error message.
     * @param {array} array
     * @returns {object}
     * @author : Randall Anthony Bondoc
     */
    this.check_duplicate = function(array) {
        var response = {
            'status' : 0,
            'data' : [],
            'message' : '',
        };
        if(typeof(array) != 'undefined' && Object.keys(array).length > 0)
        {
            var unique = [];
            for (var i = 0; i < Object.keys(array).length; i++) {
                var current = array[i];
                if (unique.indexOf(current) < 0)
                {
                    response.status = 1;
                    unique.push(current);
                }
                else
                {
                    response.status = 0;
                    response.message = 'Duplicate value ' +current+ ' in array.';
                    response.value_error = current;
                    break;
                }
            }
            response.data = unique;
        }
        else
        {
            response.message = 'No array given.';
        }
        
        return response;
    }

    /**
     * capitalize
     * @description Capitalize the string given
     * @param {string} string
     * @returns {string}
     * @author : Randall Anthony Bondoc
     */
    this.capitalize = function(string) {
      var i, words, w, result = '';

        words = string.split(' ');

        for (i = 0; i < words.length; i += 1) {
            w = words[i];
            result += w.substr(0,1).toUpperCase() + w.substr(1).toLowerCase();
            if (i < words.length - 1) {
                result += ' ';
            }
        }
        return result;
    }

    this.focus_element = function($element , $container , iOffset)
    {
        if(typeof($container) != 'undefined' && typeof(iOffset) != 'undefined')
        {
            $container.animate({
                scrollTop: (parseInt($element.offset().top) - iOffset) + 'px'
            }, 'fast');
        }

        $('html, body').animate({
            scrollTop: (parseInt($element.offset().top) - 20) + 'px'
        }, 'fast');


        return this; // for chaining...
    }

    /**
     * show_spinner
     * @description This function will add/remove the loading spinner.
     * @dependencies N/A
     * @param {jQuery} $uiElem
     * @param {boolean} bShow
     * @response N/A
     * @criticality CRITICAL
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.show_spinner = function ($uiElem, bShow) {
        if (bShow == true) {
            if($uiElem.find('i.fa-spinner').length > 0)
            {
                $uiElem.find('i.fa-spinner').removeClass('hidden');
            }
            else
            {
                $uiElem.append(' <i class="fa fa-spinner fa-pulse"></i>');
            }

            $uiElem.prop('disabled', true);
        }
        else {
            if($uiElem.find('i.fa-spinner').length > 0)
            {
                $uiElem.find('i.fa-spinner').addClass('hidden');
                $uiElem.find('i.fa-spinner').remove();
            }
            $uiElem.prop('disabled', false);
        }
    },

    this.css2json = function(css) {
        var s = {};
        if (!css) return s;
        if (css instanceof CSSStyleDeclaration) {
            for (var i in css) {
                if ((css[i]).toLowerCase) {
                    s[(css[i]).toLowerCase()] = (css[css[i]]);
                }
            }
        } else if (typeof css == "string") {
            css = css.split("; ");
            for (var i in css) {
                var l = css[i].split(": ");
                s[l[0].toLowerCase()] = (l[1]);
            }
        }
        return s;
    }

    this.css = function (a) {
        var sheets = document.styleSheets, o = {};
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.is(rules[r].selectorText)) {
                    o = $.extend(o, my_platform.css2json(rules[r].style), my_platform.css2json(a.attr('style')));
                }
            }
        }
        return o;
    }

    /**
     * add_error_message
     * @description This function is for rendering error messages
     * @dependencies 
     * @param {boolean} bAdd
     * @param {jQuery} uiContainer
     * @param {string} sErrorMessages
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.add_error_message = function (bAdd, uiContainer, sErrorMessages) {
        if(my_platform.var_check(uiContainer))
        {
            if(bAdd)
            {
                if (my_platform.var_check(sErrorMessages))
                {
                    uiContainer.find('p.error_message').remove();
                    // uiContainer.empty();
                    uiContainer.removeClass('hidden');
                    uiContainer.append(sErrorMessages);

                    /*hide error messages that have is required*/
                    // uiContainer.find("p.error_message:contains('is required')").hide();
                    // if (uiContainer.find('p.error_message').is(":contains('is required')")) {
                    //     uiContainer.append("<p class='error_message font-15'>Please fill up all required fields.</p>");
                    // }
                    
                    // var uiContainerOffsetTop = uiContainer.offset().top - 120;
                    // $('html body').animate({scrollTop: uiContainerOffsetTop}, "slow");
                }
            }
            else
            {
                // uiContainer.empty();
                uiContainer.addClass('hidden');
                uiContainer.find('.select').removeClass('error');
            }
        }
    }

    /**
     * append_dropdown
     * @description This function will compile the html of dropdown options and put the data of the companies, departments, ranks needed on the dropdown
     * @dependencies N/A
     * @param {object} oData
     * @param {jQuery} uiTemplate
     * @param {boolean} bHidden
     * @param {string} sClass - needed for additional class
     * @param {string} sAdditionalAttrName - needed for additional attributes
     * @param {string} sAdditionalAttrValue - needed for additional attributes
     * @response N/A
     * @criticality CRITICAL
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.append_dropdown = function(oData, uiTemplate, bHidden, sClass, sAdditionalAttrName, sAdditionalAttrValue){
        if(my_platform.var_check(oData) && my_platform.var_check(uiTemplate))
        {
            var sAttr = '';
            if(my_platform.var_check(sAdditionalAttrName) && my_platform.var_check(sAdditionalAttrValue))
            {
                sAttr = sAdditionalAttrName+'='+sAdditionalAttrValue;
            }

            var uiOption = '<div class="option ellipsis-dropdown '+((my_platform.var_check(sClass)) ? sClass : '')+' '+((my_platform.var_check(bHidden) && bHidden) ? 'hidden' : '')+'" data-value="'+oData.id+'" '+sAttr+'>'+oData.name+'</div>'

            uiTemplate.find('.frm-custom-dropdown-option').append(uiOption);
        }
    }

    /**
     * validate_date
     * @description This function will validate the given date
     * @dependencies moment.js
     * @param {string} sDateVal
     * @param {string} sDateFormat
     * @response N/A
     * @criticality CRITICAL
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.validate_date = function(sDateVal, sDateFormat){
        var bReturn = false;
        if(my_platform.var_check(sDateVal) && my_platform.var_check(sDateFormat))
        {
            bReturn = moment(sDateVal, sDateFormat, true).isValid();
        }
        return bReturn;
    }

    /**
     * input_numeric
     * @description This function is for allowing only numeric keys on keydown, and also other keys such as backspace, delete, tab etc.
     * @dependencies 
     * @param {jQuery} uiElement
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.input_numeric = function(uiElement){
        if(my_platform.var_check(uiElement))
        {
            uiElement.off('keydown.input_numeric').on('keydown.input_numeric', function (e){
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                     // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                     // Allow: Ctrl+C
                    (e.keyCode == 67 && e.ctrlKey === true) ||
                     // Allow: Ctrl+X
                    (e.keyCode == 88 && e.ctrlKey === true) ||
                     // Allow: Ctrl+R
                    (e.keyCode == 82 && e.ctrlKey === true) ||
                     // Allow: Ctrl+V
                    (e.keyCode == 86 && e.ctrlKey === true) ||
                     // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                         // let it happen, don't do anything
                         return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }
    }

    /**
     * remove_commas
     * @description This function is for removing all commas in a string given
     * @dependencies 
     * @param {string} string
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.remove_commas = function(string) {
        if(my_platform.var_check(string) && string.length > 0)
        {
            while (string.search(",") >= 0) {
                string = (string + "").replace(',', '');
            }
            return string;
        }
        return '';
    }

    /**
     * clear_sorting_classes
     * @description This function is for clearing sort classes
     * @dependencies 
     * @param {jQuery} uiSortField
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.clear_sorting_classes = function (uiSortField) {
        uiSortField.each(function () {
            $(this).css({"color": "black"});
            $(this).removeClass("active red-color");
            $(this).find("i.fa").removeClass("fa-chevron-up");
            $(this).find("i.fa").removeClass("fa-chevron-down");
        });
    }

    /**
     * ui_sorting
     * @description This function is for sorting passed template
     * @dependencies 
     * @param {jQuery} uiSortField - the element containing the data-sort-value
     * @param {jQuery} sOrderby - the data attribute needed to sort the templates
     * @param {int} iTemplateCount - if template count is not greater than 1 or equal to 1, it wont sort
     * @param {jQuery} uiTemplateForSort - the elements or templates to be sorted
     * @param {jQuery} uiTemplateContainer - the container where the sorted data will append
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.ui_sorting = function(uiSortField, sOrderby, iTemplateCount, uiTemplateForSort, uiTemplateContainer){
        if(my_platform.var_check(uiSortField) && my_platform.var_check(sOrderby) && my_platform.var_check(iTemplateCount) && my_platform.var_check(uiTemplateForSort) && my_platform.var_check(uiTemplateContainer))
        {
            /*validate if order count needs sorting*/
            if(iTemplateCount > 1)
            {
                my_platform.show_spinner(uiSortField, true);

                var iSortDirectionAsc;
                var iSortDirectionDesc;

                uiSortField.addClass("active red-color");
                if(uiSortField.attr("data-sort-value") == "asc")
                {
                    iSortDirectionAsc = -1;
                    iSortDirectionDesc = 1;
                    uiSortField.attr("data-sort-value", "desc");
                    uiSortField.find("i.fa").removeClass("fa-chevron-up");
                    uiSortField.find("i.fa").addClass("fa-chevron-down");
                }
                else
                {
                    iSortDirectionAsc = 1;
                    iSortDirectionDesc = -1;
                    uiSortField.attr("data-sort-value", "asc");
                    uiSortField.find("i.fa").addClass("fa-chevron-up");
                    uiSortField.find("i.fa").removeClass("fa-chevron-down");
                }

                var returnZeroCtr = 0;
                var returnAscCtr = 0;
                var returnDescCtr = 0;

                /*sort visible template*/
                uiTemplateForSort.sort(function(a,b){
                    var akey = $(a).attr(sOrderby);
                    var bkey = $(b).attr(sOrderby);
                    if(my_platform.var_check(akey) && my_platform.var_check(bkey) && akey.length > 0 && bkey.length > 0)
                    {
                        akey = akey.toLowerCase();
                        bkey = bkey.toLowerCase();
                        if (akey == bkey)
                        {
                            returnZeroCtr++;
                            return 0;
                        }
                        if (akey < bkey)
                        {
                            returnAscCtr++;
                            return iSortDirectionAsc;
                        } 
                        if (akey > bkey)
                        {
                            returnDescCtr++;
                            return iSortDirectionDesc;
                        } 
                    }
                    else
                    {
                        return 0;
                    }
                });
                
                /*included validation if the field sorted has no change*/
                if(returnDescCtr > 0 || returnAscCtr > 0 || (uiTemplateForSort.length - 1) > returnZeroCtr)
                {
                    // console.log('not same');
                    if(uiTemplateContainer.find('.last-content').length > 0)
                    {
                        uiTemplateForSort.detach().insertBefore(uiTemplateContainer.find('.last-content'));
                    }
                    else
                    {
                        uiTemplateForSort.detach().appendTo(uiTemplateContainer);
                    }
                }

                my_platform.show_spinner(uiSortField, false);
            }
        }
    }

    /**
     * print_element
     * @description This function is for printing a specific element
     * @dependencies 
     * @param {jQuery} element - the element that should be printed
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.print_element = function(element)
    {
        if(my_platform.var_check(element))
        {
            var elementHTML = element.html();
            //Get the HTML of whole page
            var oldPage = $('body').html();

            //Reset the page's HTML with div's HTML only
            $('body').html(elementHTML);

            //Print Page
            window.print();

            //Restore orignal HTML
            $('body').html(oldPage);
        }
        return true;
    }

    /**
     * delete_file
     * @description This function is for deleting/unlinking file
     * @dependencies 
     * @param N/A
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.delete_file = function(oParams, fnCallback){
        if(my_platform.var_check(oParams))
        {
            /*sample params*/
            /*var oParams = {'file_path' : '.assets/uploads/users/csv/sample.csv'}*/

            var oAjaxConfig = {
                "type"   : "POST",
                "data"   : oParams,
                "url"    : my_platform.config('url.server.base') + "users/delete_file",
                "beforeSend": function () {

                },
                "success": function (oData) {
                    console.log(oData)

                    if(typeof(fnCallback) == 'function')
                    {
                        fnCallback(oData);
                    }
                },
                "complete": function () {

                },
            };

            my_platform.CconnectionDetector.ajax(oAjaxConfig);
        }
    }

    /**
     * delete_all_except
     * @description This function is for deleting/unlinking all files except some
     * @dependencies 
     * @param N/A
     * @response N/A
     * @criticality N/A
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.delete_all_except = function(oParams, fnCallback){
        if(my_platform.var_check(oParams))
        {
            /*sample params*/
            /*
                var oParams = {
                    'directory' : '.assets/uploads/users/csv',
                    'exception_files' : ["15728bb010e158.csv", "15728b84375af2.csv"]
                }
            */
            
            var oAjaxConfig = {
                "type"   : "POST",
                "data"   : oParams,
                "url"    : my_platform.config('url.server.base') + "users/delete_all_except",
                "beforeSend": function () {

                },
                "success": function (oData) {
                    console.log(oData)

                    if(typeof(fnCallback) == 'function')
                    {
                        fnCallback(oData);
                    }
                },
                "complete": function () {

                },
            };

            my_platform.CconnectionDetector.ajax(oAjaxConfig);
        }
    }

    /**
     * get_time
     * @description This function will get the current time from the server
     * @dependencies N/A
     * @param N/A
     * @param {jQuery} uiTemplate
     * @response N/A
     * @criticality CRITICAL
     * @software_architect N/A
     * @author : Randall BondocA
     */
    this.get_time = function(fnCallback){
        var oAjaxConfig = {
            "type"   : "GET",
            "data"   : {'data' : []},
            "url"    : my_platform.config('url.server.base') + "esop/get_time",
            "beforeSend": function () {

            },
            "success": function (oData) {
                //console.log(oData)
                if(my_platform.var_check(oData))
                {
                    fnCallback(oData);
                }
            },
            "complete": function () {

            }
        };

        my_platform.esop.ajax(oAjaxConfig);
    }


}
var my_platform = new CPlatform(),
    dhal          = my_platform;
