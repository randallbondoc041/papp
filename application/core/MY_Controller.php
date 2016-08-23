<?php if ( !defined( 'BASEPATH' ) )
{
    exit( 'No direct script access allowed' );
}


//
class MY_Controller extends MX_Controller
{

    public function __construct()
    {
        parent::__construct();
		// get user ip
		// get whitelisted ip
		// compare
		// redirect if not 
    }

    public function get_navigation()
    {

    }
}


class Authenticated_Controller extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        /*user authentication can be put here*/

        $this->load->library( 'template' );

        /*load title*/
        $this->template->set_title( 'PAPP - Philippine Academy of Pediatric Pulmonologists' );

        /*load css*/
        // $this->template->add_style( assets_url() . '/css/font-awesome/font-awesome.min.css' );

        /*load scripts*/
        // $this->template->add_script( assets_url() . 'js/plugins/jsPDF-master/dist/jspdf.debug.js' );
        $this->template->add_script( base_url() . '/assets/js/extras/php.full.min.js' );

        $this->template->add_script( base_url() . '/assets/js/jQueries/jquery-1.11.1.js' );
        // $this->template->add_script( base_url() . '/assets/js/jQueries/jquery-te-1.4.0.min.js' );
        // $this->template->add_script( base_url() . '/assets/js/jQueries/jquery.tinysort.min.js' );
        $this->template->add_script( base_url() . '/assets/js/jQueries/jquery.cookie.js' );

        $this->template->add_script( base_url() . '/assets/js/bootstrap/bootstrap.min.js' );

        $this->template->add_script( base_url() . '/assets/js/core/platform.js' );
        $this->template->add_script( base_url() . '/assets/js/core/config.js' );
        $this->template->add_script( base_url() . '/assets/js/core/ajax.js' );
        $this->template->add_script( base_url() . '/assets/js/core/errors.js' );
        $this->template->add_script( base_url() . '/assets/js/core/form_validation.js' );

        $this->template->add_script( base_url() . '/assets/js/plugins/ajaxq.js' );
        $this->template->add_script( base_url() . '/assets/js/plugins/CconnectionDetector.js' );
        // $this->template->add_script( base_url() . '/assets/js/plugins/jquery.dataTables.min.js' );
        // $this->template->add_script( base_url() . '/assets/js/plugins/jquery.filtertable.min.js' );
        // $this->template->add_script( base_url() . '/assets/js/plugins/jquery.table2excel.js', true );

        $this->template->set_header( 'template/header' );
        $this->template->set_template( 'template/index' );
        $this->template->set_footer( 'template/footer' );
    }

}

/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */