<?php

if ( ! function_exists('curl_api'))
{
	function curl_api($url=null,$params=array(),$post=array())
	{
		$ci =& get_instance();

		$username = $ci->config->item('api_username');
	    $password = $ci->config->item('api_password');
	     
	    $ci->load->library('curl');

	    if(is_null($url))
	    {
	    	return FALSE;
	    }

	   	if(count($params) > 0)
	   	{
	   		$params = http_build_query($params, NULL, '&');
	   		$url = $url . "?" . $params;
	   	}
	   
	   	if(count($post) > 0)
	   	{
	   		// print_r($post);
	   		$ci->curl->post($post);
	   	} 
		// echo $url ;
	    $ci->curl->create($url);

        if($url ==  $ci->config->item( 'users_api' ). 'users/authenticate_customer')
        {
            $ci->curl->http_login($username, $password);
        }
        else
        {
            $ci->curl->http_header('X-API-KEY', $ci->config->item('api_key'));
        }

	 

		// $ci->curl->debug();	
	    return $ci->curl->execute();
	}
}

if ( ! function_exists('capture_logs'))
{
	function capture_logs($type='', $had_done='', $user, $log='', $where='')
	{
		$ci =& get_instance();
		$result = FALSE;
		$user_id = $ci->session->userdata('logged_in_id');

		if((! empty($user)))
		{
			$user->get_by_id($user_id);
			switch ($type) {
				case 'activity':
					// $client = $client->get_Company_userinfo($user_id);
					$user->representative->get_by_user_id($user_id);
					$user->activity->get_by_client_id($user->representative->client_id);
					// kprint($user->to_array());
					// kprint($user->representative->to_array());exit;
					$user->activity->user_id = $user_id;
					$user->activity->client_id = $user->representative->client_id;
					$user->activity->activity = ucwords($user->first_name." ".$user->last_name) .  " - " . $had_done;
					$user->activity->date = date("Y-m-d H:i:s");
					unset($user->activity->id);
					// kprint($user->activity->all_to_array());
					$user->activity->save_as_new();

					$result = $user->activity->all_to_array(); 
					$user->clear();

					break;
				
				case 'audit_trail':
					$log->user_id = $user_id;
					$log->ip_address = $_SERVER['REMOTE_ADDR'];
					$log->date_created = date("Y-m-d H:i:s");
					$log->last_value = $where['last_value'];
					$log->value = (is_array($where['value'])) ? implode("<br>", $where['value']) : $where['value'];
					$log->action_note = $where['action_note'];
					// kprint($log->to_array());exit;
					$log->save_as_new();

					$result = $log->all_to_array(); 
					$user->clear();
					$log->clear();

					break;
				
				default:
					$result = "No Actions Done!";
					break;
			}

		}

		// kprint($result);exit;
	    return $result;
	}
}