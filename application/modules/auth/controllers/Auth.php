<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends Authenticated_Controller {

	public function index()
    {
        $data = array();


        $this->load->view( 'Auth/login', $data );
    }



}
