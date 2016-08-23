/**
 *    Class that will connection detection
 *    This tool will be used to detect if the client has lost connection to the server by any of the following circumstances:
 *
 *
 */
(function () {
    "use strict";

    var iSizeLimit = 0;
    var iAJAXtimeout = 0;
    /*var oLocalData = {
     "connection_lost": [
     {
     "url": "string",
     "data": {
     "post_data1": "val"
     },
     "success": "function"
     }
     ],
     "connection_timeout": [
     {
     "url": "string",
     "data": {
     "post_data1": "val"
     },
     "success": "function"
     }
     ],


     };*/

    CPlatform.prototype.CconnectionDetector = {

        /**
         * @param : { oAJAXConfig(object)
         * @description : The method that will be used as a wrapper method of the jQuery AJAX.
         * @dependency : ajaxq.js
         * */

        'ajax': function (oAJAXConfig) {
            //console.log('ajax');
            //console.log(typeof(oAJAXConfig.url),//console.log(typeof(oAJAXConfig.success)))
            if (typeof(oAJAXConfig.url) == 'string' && typeof(oAJAXConfig.success) == 'function' && ( oAJAXConfig.data instanceof FormData || Object.getOwnPropertyNames(oAJAXConfig.data).length !== 0 ) ) {


                var oSettings = {
                    type   : oAJAXConfig.type,
                    url    : oAJAXConfig.url,
                    data   : oAJAXConfig.data,
                    datatype : 'jsonp',
                    success: function(sData) {
                        var oData

                        try {
                            oData = JSON.parse(sData);
                        } catch (e) {
                            oData = sData
                        }

                        oAJAXConfig.success(oData)
                    },
                    headers : oAJAXConfig.headers,
                    error  : function (error, errormsg) {
                        setTimeout(function(){
                        if ($("button[disabled]:visible").length > 0)
                        {
                            $("button[disabled]:visible").removeAttr("disabled").children(".fa-spinner").addClass("hidden");
                        }
                        },1000);

                        if (errormsg == 'error') {
                            if(typeof(oLocalData.connection_lost) != 'undefined')
                            {
                                oLocalData.connection_lost.push(oAJAXConfig);
                            }
                        }
                        else if (errormsg == 'timeout') {
                            if(typeof(oLocalData.connection_timeout) != 'undefined')
                            {
                                oLocalData.connection_timeout.push(oAJAXConfig);
                            }
                        }
                       //console.log(oLocalData);
                    },
                    complete : function() {
                        if(typeof(oAJAXConfig.complete) == 'function')
                        {
                            oAJAXConfig.complete();
                        }
                    },
                    beforeSend : function() {
                        if(typeof(oAJAXConfig.beforeSend) == 'function')
                        {
                            oAJAXConfig.beforeSend();
                        }
                    },
                    timeout : function() {
                        if ($("button[disabled]:visible").length > 0)
                        {
                            $("button[disabled]:visible").removeAttr("disabled").children(".fa-spinner").addClass("hidden");
                        }

                        alert('Request Timeout');
                    }

                }

                if(oAJAXConfig.hasOwnProperty("processData")){
                   oSettings["processData"] = oAJAXConfig.processData;
                }

                if(oAJAXConfig.hasOwnProperty("contentType")){
                   oSettings["contentType"] = oAJAXConfig.contentType;
                }

                oSettings.data.csrf_ironman_token = $.cookie('csrf_ironman_cookie');

                $.ajaxq('queued_requests', oSettings); //ajaxq to process queueing
                // $.ajax(oSettings);

            }
            else {
                alert('params error');
            }
        },

        /**
         * @param : { NA }
         * @description : A method that will be used to get the size of the locally stored data in KB.
         * This will convert the JSON local object into string and will compute for the total size of the string in bytes.
         * Note that 1 character = 1 byte.
         * @return : int
         *
         * */

        'get_local_data_size': function (oLocalData) {
            if (Object.getOwnPropertyNames(oLocalData).length !== 0) {
                var sLocalData = JSON.stringify(oLocalData);
                return sLocalData.length;
            }
        },

        /**
         * @param : { NA }
         * @description : The method that will be used to resend requests based on the local data. This will send those data one by one.
         * It will wait for one transaction to be finished before resending the next data in the server.
         * In this way, we can avoid overloading of requests in the server.
         *
         * */

        'resend_requests': function (oLocalData) {
            if(typeof(oLocalData) != 'undefined')
            {
                if (Object.getOwnPropertyNames(oLocalData).length !== 0) {
                    if(typeof(oLocalData.connection_lost) != 'undefined')
                    {
                        $.each(oLocalData.connection_lost, function (key, value) {
                            my_platform.CconnectionDetector.ajax(value);
                        })

                    }

                    if(typeof(oLocalData.connection_timeout) != 'undefined')
                    {
                        $.each(oLocalData.connection_timeout, function (key, value) {
                            my_platform.CconnectionDetector.ajax(value);
                        })
                    }

                    my_platform.CconnectionDetector.clear_local_data(oLocalData);
                }
            }
        },

        /**
         * @method_id:  JSCD04
         * @param : { oAJAXConfig(object)
         * @description : The method that will be used as a wrapper method of the jQuery AJAX.
         * @developer : Lorenz
         *
         * */

        'clear_local_data': function (oLocalData) {

            oLocalData = {
                "connection_lost" : [],
                "connection_timeout" :[]
            };

            my_platform.call_orders.show_spinner($('button.save_customer'), false);

        },

        /**
         * @method_id:  JSCD05
         * @param : { oConfig (object) }
         * @description : The function that will be used to initialize the offline detector plugin.
         * @developer : Lorenz
         *
         * */

        'initialize': {
            'on_online': function () { //type of data that will be resent e.g. agent/product/order
                my_platform.CconnectionDetector.resend_requests(oLocalData);
            },

            'on_offline': function () {
               //console.log('connection cut');
            }
        },

        'check_connection_state' : function(){
            var oConnectionStatus =  Offline.check();
            return oConnectionStatus;
        }

    }

}());
