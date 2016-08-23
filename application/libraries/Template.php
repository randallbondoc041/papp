<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Template
{
  	protected $ci;

  	/**
  	 * header view or string
  	 *
  	 * @var header
  	 **/
  	private $header;
  		/**
  	 * footer view or string
  	 *
  	 * @var footer
  	 **/
  	private $footer;
  		/**
  	 * header view or string/array
  	 *
  	 * @var content
  	 **/
  	private $content = array();
  	/**
  	 * page title
  	 *
  	 * @var header
  	 **/
  	private $title;
  	/**
  	 * meta tags
  	 *
  	 * @var meta
  	 **/
  	private $meta = array();
  	/**
  	 * javascripts file
  	 *
  	 * @var js
  	 **/
  	private $js = array();
  	/**
  	 * css file
  	 *
  	 * @var css
  	 **/
  	private $css = array();
  	/**
  	 * page javascripts
  	 * it will add in the bottom of the page
  	 *
  	 * @var page_js
  	 **/
  	private $page_js = array();
  	/**
  	 * page template
  	 *
  	 * @var template
  	 **/
  	private $template;

	public function __construct()
	{
        $this->ci =& get_instance();
        $this->ci->load->library('parser');
	}

	/**
	 * set_header function
	 *
	 * Set page header
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function set_header($header,$data=array())
	{
		$this->header = $this->ci->load->view($header,$data,TRUE);
	}

	/**
	 * set_footer function
	 *
	 * Set page footer
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function set_footer($footer,$data=array())
	{
		$this->footer = $this->ci->load->view($footer,$data,TRUE);
	}

	/**
	 * add_content function
	 *
	 * Add page content
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function add_content($content=null)
	{
		$this->content[] = array('row_content' => $content);
	}

	/**
	 * set_title function
	 *
	 * Set page title
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function set_title($title)
	{
		$this->title = $title;
	}

	/**
	 * add_meta function
	 *
	 * Add meta tags
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function add_meta($name,$content)
	{
		$this->meta[] = array('name' => $name, 'content' => $content);
	}	

	/**
	 * add_script function
	 *
	 * Add javascripts
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function add_script($src,$page_js=false)
	{
		if($page_js)
		{
			$this->page_js[$src] = array('src' => $src);
		}
		else
		{
			$this->js[$src] = array('src' => $src);
		}
		
	}

	/**
	 * add_style function
	 *
	 * Add css
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function add_style($href,$media="all")
	{

		$this->css[md5($href)] = array('href' => $href, 'media' => $media);
	}

	/**
	 * set_template function
	 *
	 * set the template of the page
	 *
	 * @return void
	 * @author 
	 **/
	public function set_template ($template)
	{
		$this->template = $template;
	}
	/**
	 * draw function
	 *
	 * This will get all the meta,js,css
	 * header,footer and content then
	 * parse it to tempate
	 *
	 * @return void
	 * @author Randall Bondoc
	 **/
	public function draw ()
	{
		$data = array(
			'header'		=> $this->header,
			'footer'		=> $this->footer,
			'contents'		=> $this->content,
			'meta'			=> $this->meta,
			'javascript'	=> $this->js,
			'page_javascript' => $this->page_js,
			'style'			=> $this->css,
			'title'			=> $this->title
		);

		$this->ci->parser->parse($this->template, $data);
		// $this->ci->output->enable_profiler(TRUE);
	}
}

/* End of file template.php */
/* Location: ./application/libraries/template.php */
