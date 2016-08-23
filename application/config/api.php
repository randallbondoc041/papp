<?php

if($_SERVER['SERVER_NAME'] == 'localhost')
{
    $config['customers_api'] = 'http://localhost/api.jfc.customers/';
    $config['users_api'] = 'http://localhost/api.jfc.users/';
    $config['happy_plus_api'] = 'http://localhost/api.jfc.happy_plus/';
    $config['products_api'] = 'http://localhost/api.jfc.products/';
    $config['gis_api'] = 'http://localhost/api.jfc.gis/';
    $config['orders_api'] = 'http://localhost/api.jfc.orders/';
    $config['store_api'] = 'http://localhost/api.jfc.store/';
    $config['reports_api'] = 'http://localhost/api.jfc.reports/';
}
else
{
    //$config['api_url'] 		= 'http://xavier-ncr-app2.cr8vwebsolutions.net/xavier_api/index.php/';
	$config['customers_api'] 		= 'http://ni-customer-service-app.cr8vwebsolutions.net:80/api.jfc.customers/';
    $config['happy_plus_api'] 		= 'http://ni-happyp-service-app.cr8vwebsolutions.net:80/api.jfc.happy_plus/';
    $config['gis_api'] 				= 'http://ni-gis-service-app.cr8vwebsolutions.net:80/api.jfc.gis/';
    $config['store_api'] 				= 'ni-riders-services-app.cr8vwebsolutions.net:80/api.jfc.stores/';
	$config['users_api']     		= 'http://ni-users-service-app.cr8vwebsolutions.net:80/api.jfc.users/';
    $config['reports_api']     		= 'http://ni-orders-service-app.cr8vwebsolutions.net/api.jfc.reports/';
}

$config['api_username']		= 'callcenter';
$config['api_password']  	= 'callcenter';
$config['api_key']			= 'IFYRtW2cb7A5Gs54A1wKElECBL65GVls';

