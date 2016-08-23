/**
 *  Auth Class
 *
 *
 *
 */
(function () {
    "use strict";

    /*variable declaration*/
    var uiLoginForm,
        uiForgotForm,
        uiLoginBtn,
        uiForgotBtn,
        uiForgotCancel,
        uiLoginError,
        uiForgotError,
        uiResetError,
        uiLoginSuccess,
        uiForgotSuccess,
        uiResetSuccess,
        uiForgotLink,
        uiResetForm,
        uiResetBtn,
        uiDoneBtn;


    CPlatform.prototype.auth = {

        initialize : function() {
            /*declare variables*/
            uiLoginForm = $('form#login_form');
            uiForgotForm = $('form#forgot_form');
            uiResetForm = $('form#confirm_form')
            uiLoginBtn = $('button#login_btn');
            uiForgotBtn = $('button#forgot_btn');
            uiDoneBtn = $('button#btn_done');
            uiForgotCancel = $('button#forgot_cancel');
            uiResetBtn = $('button#confirm_reset');
            uiLoginError = $('.login_error_message');
            uiForgotError = $('.forgot_error_message');
            uiResetError = $('.reset_error_message');
            uiLoginSuccess = $('.login_success_message');
            uiForgotSuccess = $('.forgot_success_message');
            uiResetSuccess = $('.reset_success_message');
            uiForgotLink = $('.forgot');

            /*bind on load data*/
            // $('header[custom-style="header"]').addClass('hidden');

            /*initialize events*/

            uiLoginBtn.on('click', function(){
                // console.log($(this));
                uiLoginForm.submit();
            });

            uiForgotBtn.on('click', function(){
                // console.log($(this));
                uiForgotForm.submit();
            });

            uiResetBtn.on('click', function(){
                // console.log($(this));
                uiResetForm.submit();
            });

            uiForgotLink.off('click').on('click', function() {
                $('.login').removeClass('showed');
                $('#forgot-modal').addClass('showed');
                $('.forgot_error_message').addClass('hidden');
                $('#email').removeClass('input-error');
                $('#email').val('');
            });

            uiForgotCancel.on('click', function() {
                $('#forgot-modal').removeClass('showed');
                $('.login').addClass('showed');
            });

            

            /*prevent on submit of form*/
            uiLoginForm.on('submit', function (e) {
                e.preventDefault();
            });

            uiForgotForm.on('submit', function (e) {
                e.preventDefault();
            });

            uiResetForm.on('submit', function (e) {
                e.preventDefault();
            });

            /*add a validation to logging in*/
            var oValidationConfig = {
                'data_validation'    : 'datavalid',
                'input_label'        : 'labelinput',
                'min_length'         : 0,
                // 'max_length'         : 20,
                'class'              : 'input-error',
                'add_remove_class'   : true,
                'onValidationError'  : function (arrMessages) {
                    // console.log(arrMessages)
                    cr8v.show_spinner(uiLoginBtn, false);

                    if(cr8v.var_check(arrMessages))
                    {
                        var sErrorMessages = '';
                        var uiErrorContainer = uiLoginError;
                        for(var i = 0, max = arrMessages.length; i < max; i++)
                        {
                            var message = arrMessages[i];

                            sErrorMessages += '<p class="font-15 text-center error_message"> ' + message.error_message + '</p>';
                        }

                        cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                    }
                },
                'onValidationSuccess': function () {
                    var uiErrorContainer = uiLoginError;
                    cr8v.add_error_message(false, uiErrorContainer);
                    
                    cr8v.show_spinner(uiLoginBtn, true);
                    
                    roxas.auth.assemble_login_information(uiLoginForm, uiLoginBtn);
                }
            };

            /*bind the validation to login form*/
            cr8v.validate_form(uiLoginForm, oValidationConfig);

            /*add a validation to email*/
            var oValidationConfigEmail = {
                'data_validation'    : 'datavalid',
                'input_label'        : 'labelinput',
                'min_length'         : 0,
                // 'max_length'         : 20,
                'class'              : 'input-error',
                'add_remove_class'   : true,
                'onValidationError'  : function (arrMessages) {
                    // console.log(arrMessages)
                    cr8v.show_spinner(uiForgotBtn, false);

                    if(cr8v.var_check(arrMessages))
                    {
                        var sErrorMessages = '';
                        var uiErrorContainer = uiForgotError;
                        for(var i = 0, max = arrMessages.length; i < max; i++)
                        {
                            var message = arrMessages[i];

                            sErrorMessages += '<p class="font-15 text-center error_message"> ' + message.error_message + '</p>';
                        }

                        cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                    }
                },
                'onValidationSuccess': function () {
                    var uiErrorContainer = uiForgotError;
                    cr8v.add_error_message(false, uiErrorContainer);
                    
                    cr8v.show_spinner(uiForgotBtn, true);
                    
                    roxas.auth.reset_password_info(uiForgotForm, uiForgotBtn);
                }
            };

            /*bind the validation to email form*/
            cr8v.validate_form(uiForgotForm, oValidationConfigEmail);

            /*add a validation to changing password*/
            var oValidationConfigReset = {
                'data_validation'    : 'datavalid',
                'input_label'        : 'labelinput',
                'min_length'         : 0,
                // 'max_length'         : 20,
                'class'              : 'input-error',
                'add_remove_class'   : true,
                'onValidationError'  : function (arrMessages) {
                    // console.log(arrMessages)
                    cr8v.show_spinner(uiResetBtn, false);

                    if(cr8v.var_check(arrMessages))
                    {
                        var sErrorMessages = '';
                        var uiErrorContainer = uiResetForm.find('.change_password_error_message');
                        for(var i = 0, max = arrMessages.length; i < max; i++)
                        {
                            var message = arrMessages[i];

                            sErrorMessages += '<p class="font-15 error_message"> ' + message.error_message + '</p>';
                        }

                        cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                    }
                },
                'onValidationSuccess': function () {
                    var uiErrorContainer = uiResetForm.find('.change_password_error_message');
                    cr8v.add_error_message(false, uiErrorContainer);
                    
                    cr8v.show_spinner(uiResetBtn, true);
                    
                    var bIsPasswordMatch = roxas.auth.validate_password(uiResetForm);
                    if(bIsPasswordMatch)
                    {
                       roxas.auth.assemble_change_password_information(uiResetForm, uiResetBtn);
                    }
                    else
                    {
                        cr8v.show_spinner(uiResetBtn, false);

                        uiResetForm.find('[name="password"]').addClass('input-error');
                        uiResetForm.find('[name="passwordconf"]').addClass('input-error');

                        var sErrorMessages = '<p class="font-15 error_message">Password did not match.</p>';
                        var uiErrorContainer = uiResetForm.find('.change_password_error_message');

                        cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                    }
                }
            };

            /*bind the validation to confirm form*/
            cr8v.validate_form(uiResetForm, oValidationConfigReset);

        },

        reset_password_info : function(uiForgotForm, uiForgotBtn){
            var oParams = {
                "email" : uiForgotForm.find('input[name="email"]').val()
            };

            roxas.auth.authenticate_reset(oParams, uiForgotBtn);
        },

         assemble_change_password_information : function(uiResetForm, uiResetBtn){
            

            var oParams = {
                'password': uiResetForm.find('[name="password"]').val(),
                'rs': uiResetForm.find('[name="res_key"]').val()
            };

            roxas.auth.change_password(oParams, uiResetBtn);
        },

        clear_form : function(){
            uiLoginForm.find('input[name="user_name"]').val('');
            uiLoginForm.find('input[name="password"]').val('');
        },

        assemble_login_information : function(uiLoginForm, uiLoginBtn){
            var oParams = {
                "user_name" : uiLoginForm.find('input[name="user_name"]').val(),
                "password" : uiLoginForm.find('input[name="password"]').val()
            };

            roxas.auth.authenticate(oParams, uiLoginBtn);
        },

       validate_password : function(uiForm){
            /*password*/
            var bReturn = false;
            var sPassword = uiForm.find('[name="password"]').val();
            var sConfirmPassword = uiForm.find('[name="passwordconf"]').val();

            if(sPassword === sConfirmPassword)
            {
                bReturn = true;
            }

            return bReturn;
        },

        change_password : function(oParams, uiResetBtn){
            if(cr8v.var_check(oParams))
            {
                var oAjaxConfig = {
                    "type"   : "POST",
                    "data"   : oParams,
                    "url"    : roxas.config('url.server.base') + "auth/change_password",
                    "beforeSend": function () {
                        if (cr8v.var_check(uiResetBtn)) {
                            cr8v.show_spinner(uiResetBtn, true);
                        }
                    },
                    "success": function (oData) {
                        console.log(oData)
                        if(cr8v.var_check(oData))
                        {
                            if(oData.status == true)
                            {
                                uiResetForm.find('.change_password_success_message').removeClass('hidden').html('<p class="font-15 success_message"> ' + oData.message + '</p>');
                               
                                $('#reset-password-modal').removeClass('showed');
                                $('#password-complete-modal').addClass('showed');

                                uiDoneBtn.on('click', function() {
                                        roxas.auth.save_session(oData.data);
                                 });
                            }
                            else
                            {
                                if(cr8v.var_check(oData.message) && count(oData.message) > 0)
                                {
                                    var arrMessages = oData.message;
                                    var sErrorMessages = '';
                                    var uiErrorContainer = uiResetForm.find('.change_password_error_message');
                                    for(var i = 0, max = arrMessages.length; i < max; i++)
                                    {
                                        var error_message = arrMessages[i];

                                        sErrorMessages += '<p class="font-15 error_message"> ' + error_message + '</p>';
                                    }

                                    cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                                }
                            }
                        }
                    },
                    "complete": function () {
                        if (cr8v.var_check(uiResetBtn)) {
                            cr8v.show_spinner(uiResetBtn, false);
                        }
                    },
                };

                roxas.auth.ajax(oAjaxConfig);
            }
        },


        authenticate_reset : function(oParams, uiForgotBtn){
            if(cr8v.var_check(oParams))
            {
                var oAjaxConfig = {
                    "type"   : "POST",
                    "data"   : oParams,
                    "url"    : roxas.config('url.server.base') + "auth/authenticate_email",
                    "beforeSend": function () {
                        if (cr8v.var_check(uiForgotBtn)) {
                            cr8v.show_spinner(uiForgotBtn, true);
                        }
                    },
                    "success": function (oData) {
                        // console.log(oData)
                        if(cr8v.var_check(oData))
                        {
                            if(oData.status == true)
                            {
                                var sSuccessMsg = oData.message;
                                uiForgotSuccess.removeClass('hidden').html('').append('<p class="font-15 text-center success_message"> ' + sSuccessMsg + '</p>');
                                setTimeout(function(){
                                    window.location.href = roxas.config('url.server.base') + "auth";
                                }, 1000);
                            }
                            else
                            {
                                if(cr8v.var_check(oData.message))
                                {
                                    var sErrorMessages = '';
                                    var uiErrorContainer = uiForgotError;
                                    for(var i = 0, max = oData.message.length; i < max; i++)
                                    {
                                        var message = oData.message[i];

                                        sErrorMessages += '<p class="font-15 text-center error_message"> ' + message + '</p>';
                                    }

                                    cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                                }
                            }
                        }
                    },
                    "complete": function () {
                        if (cr8v.var_check(uiForgotBtn)) {
                            cr8v.show_spinner(uiForgotBtn, false);
                        }
                    },
                };

                roxas.auth.ajax(oAjaxConfig);
            }
        },
        authenticate : function(oParams, uiLoginBtn){
            if(cr8v.var_check(oParams))
            {
                var oAjaxConfig = {
                    "type"   : "POST",
                    "data"   : oParams,
                    "url"    : roxas.config('url.server.base') + "auth/authenticate",
                    "beforeSend": function () {
                        if (cr8v.var_check(uiLoginBtn)) {
                            cr8v.show_spinner(uiLoginBtn, true);
                        }
                    },
                    "success": function (oData) {
                        // console.log(oData)
                        if(cr8v.var_check(oData))
                        {
                            if(oData.status == true)
                            {
                                var sSuccessMsg = oData.message;
                                uiLoginSuccess.removeClass('hidden').html('').append('<p class="font-15 text-center success_message"> ' + sSuccessMsg + '</p>');
                                setTimeout(function(){
                                    roxas.auth.save_session(oData.data);
                                }, 1000);
                            }
                            else
                            {
                                if(cr8v.var_check(oData.message))
                                {
                                    var sErrorMessages = '';
                                    var uiErrorContainer = uiLoginError;
                                    for(var i = 0, max = oData.message.length; i < max; i++)
                                    {
                                        var message = oData.message[i];

                                        sErrorMessages += '<p class="font-15 text-center error_message"> ' + message + '</p>';
                                    }

                                    cr8v.add_error_message(true, uiErrorContainer, sErrorMessages);
                                }
                            }
                        }
                    },
                    "complete": function () {
                        if (cr8v.var_check(uiLoginBtn)) {
                            cr8v.show_spinner(uiLoginBtn, false);
                        }
                    },
                };

                roxas.auth.ajax(oAjaxConfig);
            }
        },

        save_session : function(oUserInformation){
            if(cr8v.var_check(oUserInformation))
            {
                var oAjaxConfig = {
                    "type"   : "POST",
                    "data"   : oUserInformation,
                    "url"    : roxas.config('url.server.base') + "auth/save_session",
                    "beforeSend": function () {
                        if (cr8v.var_check(uiLoginBtn)) {
                            cr8v.show_spinner(uiLoginBtn, true);
                        }
                    },
                    "success": function (oData) {
                        // console.log(oData)
                        if(cr8v.var_check(oData))
                        {
                            if(oData.status == true)
                            {
                                window.location.href = roxas.config('url.server.base') + "esop";
                            }
                        }
                    },
                    "complete": function () {
                        if (cr8v.var_check(uiLoginBtn)) {
                            cr8v.show_spinner(uiLoginBtn, false);
                        }
                    },
                };

                roxas.auth.ajax(oAjaxConfig);
            }
        },

        'ajax': function (oAjaxConfig) {
            if (cr8v.var_check(oAjaxConfig)) {
                roxas.CconnectionDetector.ajax(oAjaxConfig);
            }
        },
    }

}());

$(window).load(function () {
    roxas.auth.initialize();
});
