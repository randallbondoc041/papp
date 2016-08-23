
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="keywords" content="">
        <link rel="shortcut icon" href="<?php echo base_url() ?>/assets/images/PAPP-LOGO.ico">

        <title>PAPP - Philippine Academy of Pediatric Pulmonologists</title>

        <!-- Bootstrap core CSS -->
        <link href="<?php echo base_url(); ?>assets/css/bootstrap/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>assets/css/bootstrap/bootstrap-theme.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="<?php echo base_url(); ?>assets/css/font-awesome/font-awesome.min.css" rel="stylesheet">

        <!-- Core CSS -->
    
    
        <!-- Custom CSS -->
        <link href="<?php echo base_url(); ?>assets/css/global/commons.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>assets/css/global/ui-widgets.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>assets/css/global/login.css" rel="stylesheet">
    </head>
    <body>
        <section class="login-parent">
            <!-- <div class="login-form">
                <form id="login_form">
                    <div class="image-content margin-bottom-20">
                        <img src="<?php echo base_url(); ?>assets/images/PAPP-LOGO.jpg" alt="roxas logo">
                    </div>
                    <p class="black-color font-bold text-center margin-bottom-10 font-20 ">ESOP Management System</p>  
                    <div class="error login_error_message hidden">
                        <p class="text-center font-14 error_message">Username and Password do not match. Please try again.</p>
                    </div>
                    <div class="success login_success_message hidden">
                        <p class="text-center font-14 success_message">Username and Password do not match. Please try again.</p>
                    </div>

                    <input type="text" class="normal width-100per margin-top-30 add-border-radius-5px " placeholder="Username" name="user_name" datavalid="required" labelinput="User Name">
                    <input type="password" class="normal margin-top-20 width-100per add-border-radius-5px" placeholder="Password" name="password" datavalid="required" labelinput="Password">
                
                   
                    <p class="forgot"><a href="javascript:void(0)">Can't Remember Password?</a></p>
                    <button class="btn-normal margin-top-30 width-200px" id="login_btn">Login </button>
                </form>

                <div class="email">
                </div>        
            </div>  -->

            <div class="modal-container login showed">
                <div class="modal-body small bg-white">
                    <!-- content -->
                    <form id="login_form">
                        <div class="modal-content text-center"> 
                            <img class="w-logo" src="<?php echo base_url(); ?>/assets/images/PAPP-LOGO.jpg">
                            <!-- <p class="font-25 font-bold">Philippine Academy of Pediatric Pulmonologists</p> -->
                            <div class="error login_error_message hidden">
                                <p class="text-center font-14 error_message">Username and Password do not match. Please try again.</p>
                            </div>
                            <div class="success login_success_message hidden">
                                <p class="text-center font-14 success_message">Username and Password do not match. Please try again.</p>
                            </div>

                            <div class="margin-bottom-20 margin-top-20">
                                <p class="display-inline-mid padding-right-10">Username: </p>
                                <input type="text" class="small add-border-radius-5px width-300px display-inline-mid" placeholder="Username" name="user_name" datavalid="required" labelinput="User Name">

                            </div>
                            <div class="margin-bottom-20 margin-top-20">
                                <p class="display-inline-mid padding-right-10">Password: </p>
                                <input type="password" class="small add-border-radius-5px width-300px display-inline-mid" placeholder="Password" name="password" datavalid="required" labelinput="Password">
                            </div>
                            <div class="margin-bottom-20 margin-top-20 text-left padding-left-100 margin-left-15 modal-trigger" modal-target="forgot-modal">
                                <p class="forgot"><a href="javascript:void(0)">Can't Remember Password?</a></p>
                            </div>
                            <div class="margin-bottom-10">
                                <button class="btn-normal display-inline-mid margin-left-10" id="login_btn">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!--cant remember password-->
        <div class="modal-container" id="forgot-modal">
            <div class="modal-body small bg-white ">
                <!-- content -->
                <form id="forgot_form">
                    <div class="modal-content width-90percent margin-auto text-center"> 
                        <div class="text-center">
                            <img class="w-logo" src="<?php echo base_url(); ?>/assets/images/PAPP-LOGO.jpg" class="">
                        </div>
                        <!-- <p class="font-25 font-bold">Philippine Academy of Pediatric Pulmonologists</p> -->
                        <div class="error forgot_error_message hidden">
                            <p class="text-center font-14 error_message">Username and Password do not match. Please try again.</p>
                        </div>
                        <div class="success forgot_success_message hidden">
                            <p class="text-center font-14 success_message">Username and Password do not match. Please try again.</p>
                        </div>
                        <p class="margin-top-20 margin-bottom-20 text-left margin-left-20">Please enter your email for Password Reset:</p>
                        <div class="margin-bottom-20 margin-top-20 text-left margin-left-20">
                            <p class="display-inline-mid padding-right-10">Email: </p>
                            <input type="text" class="small add-border-radius-5px width-300px display-inline-mid" id="email" name="email" datavalid="email"  datavalid="required" labelinput="Email">
                        </div>
                        <div class="margin-bottom-10 text-center">
                            <button class="btn-normal display-inline-mid margin-left-10" id="forgot_btn">Reset Password</button>
                        </div>
                        <div class="margin-bottom-10 text-center">
                            <button class="btn-cancel display-inline-mid margin-left-10 color-cancel" id="forgot_cancel">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!--cant remember password-->


        </section>

    </body>
</html>