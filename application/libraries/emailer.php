<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 	

class Emailer {
	
	public function send_mail($options=array()) {
		//print_r($options);exit;
		//return;
		// return false;
		$CI =& get_instance();
		
		$CI->load->library('email');
		
	/* 	$config['protocol']  = 'smtp';
		$config['smtp_host']  = 'ssl://box599.bluehost.com';
		$config['smtp_user'] = 'noreply@becr8v.com';
		$config['smtp_pass'] = 'MngHfKUrVa';
		$config['smtp_port'] = '465';
		$config['mailtype']  = 'html';
		$config['validate']  = 'FALSE';
							 */
	  $config['protocol']  = 'smtp';
	  $config['smtp_host']  = 'smtp.mailgun.org';
	  $config['smtp_user'] = 'no-reply@1stopxbrl.becr8v.com';
	  $config['smtp_pass'] = 'demo@123';
	  $config['smtp_port'] = '587';
	  
	  $config['mailtype']  = 'html';
	  $config['validate']  = 'FALSE';
  
		$CI->email->initialize($config);
		
		$CI->email->from('no-reply@roxasholdings.com', 'Roxas Holdings');
			// $CI->email->to('dominic.canillo@becr8v.com');
			if( isset($options['to']) ):
				$CI->email->to($options['to']);
			endif;
		
		
		$CI->email->subject($options['subject']);

		$fullname = "";

		if(isset($options["user_name"]))
		{
			$fullname = $options["user_name"];
		}


		/*echo 'Wow'; exit();*/
		// print_r($options['message']);exit;
		$CI->email->message($CI->load->view('email_template/email_template_view', array('message'=>$options['message'], 'fullname'=>$fullname), true));
		
		
		
		if(isset($options['reply_to']) && isset($options['reply_to_name'])){
			$CI->email->reply_to($options['reply_to'], $options['reply_to_name']);
		}
		if(isset($options['cc']) && $options['cc'] !=""){
			$CI->email->cc($options['cc']);
		}
		

		// $email_bcc = 'cr8v_dominic@hotmail.com';
		/*if(isset($options['bcc']) && $options['bcc'] !=""){
			$CI->email->bcc($options['bcc'] . ",{$email_bcc}");
		}else{
			$CI->email->bcc($email_bcc);
		}*/
		
	
		if(isset($options['attachment'])){
			$CI->email->attach($options['attachment']);
		}
		
		if($CI->email->send()) {
			$return['error'] = 0;
		} else {
			$return['error'] = 1;
		}

		$return['msg'] = $CI->email->print_debugger();

		//print_r($CI->email->print_debugger());

		return $return;

	}
}

/* End of file Emailer.php */