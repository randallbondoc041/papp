<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="<?php echo base_url() ?>/assets/images/PAPP-LOGO.ico">

    <title>{title}</title>

    {meta}
    <meta name="{name}" content="{content}" />
    {/meta}

    {style}
    <link rel="stylesheet" type="text/css" href="{href}" media="{media}">
    {/style}

    {javascript}
    <script src="{src}" type="text/javascript"></script>
    {/javascript}

    <!-- Bootstrap core CSS -->
    <!--     
    <link href="<?php echo base_url() ?>/assets/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/bootstrap/bootstrap-theme.min.css" rel="stylesheet"> 
    -->

    <!-- Font Awesome -->
    <link href="<?php echo base_url() ?>/assets/css/font-awesome/font-awesome.min.css" rel="stylesheet">

    <!-- Core CSS -->
    <link href="<?php echo base_url() ?>/assets/css/global/commons.css" rel="stylesheet">

    <!-- Custom CSS -->
    <!-- 
    <link href="<?php echo base_url() ?>/assets/css/global/header.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/section-top-panel.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/section-content-panel.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/ui-widgets.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/unique-widget-style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/extra.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/plugin-style.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/notification-custom.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>/assets/css/global/animate.css" rel="stylesheet">
     -->
    <link href="<?php echo base_url() ?>/assets/css/global/custom-style.css" rel="stylesheet">

    <!--JS Constants-->
    <script>
        var oObject = {};

        var iUserID = '<?php echo $this->session->userdata('user_id'); ?>';
        var sUserName = '<?php echo $this->session->userdata('user_name'); ?>';
        var sFullName = '<?php echo $this->session->userdata('full_name'); ?>';
        var iUserRole = '<?php echo $this->session->userdata('user_role'); ?>';
        var iEmployeeCode = '<?php echo $this->session->userdata('employee_code'); ?>';
        var sFirstName = '<?php echo $this->session->userdata('first_name'); ?>';
        var sMiddleName = '<?php echo $this->session->userdata('middle_name'); ?>';
        var sLastName = '<?php echo $this->session->userdata('last_name'); ?>';
        var sEmail = '<?php echo $this->session->userdata('email'); ?>';
        var iIsDeleted = '<?php echo $this->session->userdata('is_deleted'); ?>';
        var sContactNumber = '<?php echo $this->session->userdata('contact_number'); ?>';
        var iContactNumberType = '<?php echo $this->session->userdata('contact_number_type'); ?>';
        var iCompanyID = '<?php echo $this->session->userdata('company_id'); ?>';
        var iDepartmentID = '<?php echo $this->session->userdata('department_id'); ?>';
        var iRankID = '<?php echo $this->session->userdata('rank_id'); ?>';
        var sCompanyName = '<?php echo $this->session->userdata('company_name'); ?>';
        var sDepartmentName = '<?php echo $this->session->userdata('department_name'); ?>';
        var sRankName = '<?php echo $this->session->userdata('rank_name'); ?>';
        var sUserRoleName = '<?php echo $this->session->userdata('user_role_name'); ?>';
        var sImage = '<?php echo $this->session->userdata('img'); ?>';
        var sCurrentDate = '<?php echo  date("Y-m-d H:i:s"); ?>';
        var sOfferLetterType ;
        var arrLogIDS = [] ;
        var iNotificationOffset = 0 ;

        var oUserInfo = {
            "id" : iUserID,
            "user_name" : sUserName,
            "full_name" : sFullName,
            "user_role" : iUserRole,
            "employee_code" : iEmployeeCode,
            "first_name" : sFirstName,
            "middle_name" : sMiddleName,
            "last_name" : sLastName,
            "email" : sEmail,
            "is_deleted" : iIsDeleted,
            "contact_number" : sContactNumber,
            "contact_number_type" : iContactNumberType,
            "company_id" : iCompanyID,
            "department_id" : iDepartmentID,
            "rank_id" : iRankID,
            "company_name" : sCompanyName,
            "department_name" : sDepartmentName,
            "rank_name" : sRankName,
            "user_role_name" : sUserRoleName,
            "img" : sImage,
        }
    </script>

</head>

<body>
    <div id="main">
        <!-- start of header -->
        <header>
            <div id="logo">
                <div id="logo_text">
                    <!-- class="logo_colour", allows you to change the colour of the text -->
                    <!-- <h1><a href="<?php echo base_url(); ?>">CSS3<span class="logo_colour">_one</span></a></h1> -->
                    <img src="<?php echo base_url(); ?>assets/images/PAPP-LOGO.png" class="height-120px width-120px f-left">
                    <div class="f-left">
                        <h1 class="margin-left-20"><a href="<?php echo base_url(); ?>"><span class="logo_colour">PAPP</span></a></h1>
                        <h2 class="margin-left-20 margin-top-5">Philippine Academy of Pediatric Pulmonologists</h2>
                    </div>
                    <div class="clear"></div>
                </div>
                    <!-- <form method="post" action="#" id="search"> -->
                <div id="search">
                    <input class="search" type="text" name="search_field" placeholder="Search....." onclick="javascript:void(0)" />
                    <button class="margin-top-20 border-all-empty default-cursor"><img src="<?php echo base_url(); ?>assets/images/search.png" class="f-right border-all-empty margin-0"></button>
                    <!-- <input name="search" type="image" style="float: right;border: 0; margin: 20px 0 0 0;" src="<?php echo base_url(); ?>assets/images/search.png" alt="search" title="search" /> -->
                </div>
                <!-- </form> -->
            </div>

            <nav role="navigation" id="nav">
              <input class="trigger" type="checkbox" id="mainNavButton">
              <label for="mainNavButton" onclick>Menu</label>
              <ul>
                <li><a href="#" class="nav_close">Home</a></li>
                <li><a href="#" class="nav_close">About Us</a></li>
                <li><a href="#" class="nav_close">Virtual Library</a>
                </li>
                <li><a href="#" class="nav_close">Accredited Training Institutions</a></li>
                <li><a href="#" class="nav_close">Certified PAPP Members</a></li>
                <li><a href="#" class="nav_close">Commitees and Task Forces</a></li>
                <li><a href="#" class="nav_close">Contact Us</a></li>
                <li><a href="#" class="nav_close">Guidelines for Research Grant</a></li>
                <li><a href="#" class="nav_close">Join Us</a>
                    <ul>
                        <li><a href="#" class="nav_close">Registration</a></li>
                    </ul>
                </li>
                <li><a href="#" class="nav_close">Journals</a></li>
                <li><a href="#" class="nav_close">Member Login</a>
                    <ul>
                        <li><a href="#" class="nav_close">Password Reset</a></li>
                        <li><a href="#" class="nav_close">Profile</a></li>
                    </ul>
                </li>
                <li><a href="#" class="nav_close">Members Only</a></li>
                <li><a href="#" class="nav_close">Mission and Vision</a></li>
              </ul>
            </nav>
            <!-- <nav>
                <ul class="sf-menu" id="nav">
                    <li class="font-bold"><a href="<?php echo base_url(); ?>">Home</a></li>
                    <li class="font-bold"><a href="<?php echo base_url(); ?>">Menu</a>
                        <ul>
                            <li class="font-bold"><a href="#">Drop Down One</a></li>
                            <li class="font-bold"><a href="#">Drop Down Two</a>
                                <ul>
                                <li class="font-bold"><a href="#">Sub Drop Down One</a></li>
                                <li class="font-bold"><a href="#">Sub Drop Down Two</a></li>
                                <li class="font-bold"><a href="#">Sub Drop Down Three</a></li>
                                <li class="font-bold"><a href="#">Sub Drop Down Four</a></li>
                                <li class="font-bold"><a href="#">Sub Drop Down Five</a></li>
                                </ul>
                            </li>
                            <li class="font-bold"><a href="#">Drop Down Three</a></li>
                            <li class="font-bold"><a href="#">Drop Down Four</a></li>
                            <li class="font-bold"><a href="#">Drop Down Five</a></li>
                        </ul>
                    </li>
                    <li class="font-bold"><a href="<?php echo base_url(); ?>">Virtual Library</a></li>
                    <li class="font-bold"><a href="<?php echo base_url(); ?>">PAPP Accreditation</a></li>
                    <li class="font-bold"><a href="<?php echo base_url(); ?>">Contact Us</a></li>
                    <li class="font-bold"><a href="#">About Us</a></li>
                </ul>
            </nav> -->
        </header>
    </div>

    <!-- start of loading Modal -->
    <div class="modal-container johnCena" id="show-loading-data-shares">
        <div class="modal-body small" style="width: 100px; height: 100px;">
            <div class="modal-close close-me" style="display: none; "></div>
            <div style="padding-top: 10px;">
                <i class="fa fa-spinner fa-pulse fa-5x fa-fw" style="font-size: 80px;"></i>
            </div>
        </div>
    </div>
    <!-- end of loading Modal  -->