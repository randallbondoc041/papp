<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends Authenticated_Controller {

	public function index()
    {
        $data = array();

        // $this->template->add_script( assets_url() . '/js/libraries/claims.js' );
        $this->template->add_content( $this->load->view( 'home', $data, TRUE ) );
        $this->template->draw();
    }



}
