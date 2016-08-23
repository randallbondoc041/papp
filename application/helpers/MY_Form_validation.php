<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation
{
	/**
	 * Stores the CodeIgniter core object.
	 *
	 * @access public
	 *
	 * @var object
	 */
	public $CI;

	//--------------------------------------------------------------------
	function unique($value, $params)
	{
		$this->CI->form_validation->set_message('unique', 'The value in &quot;%s&quot; is already being used.');

		// allow for more than 1 parameter
		$fields = explode(",", $params);

		// extract the first parameter
		list($table, $field) = explode(".", $fields[0], 2);

		// setup the db request
		$this->CI->db->select($field)->from($table)
			->where($field, $value)->limit(1);

		// check if there is a second field passed in
		if (isset($fields[1]))
		{
			// this field is used to check that it is not the current record
			// eg select * from users where username='test' AND id != 4

			list($where_table, $where_field) = explode(".", $fields[1], 2);

			$where_value = $this->CI->input->post($where_field);
			if (isset($where_value))
			{
				// add the extra where condition
				$this->CI->db->where($where_field.' !=', $this->CI->input->post($where_field));
			}
		}

		// added for is_deleted field
		if($this->CI->db->field_exists('is_deleted',$table))
		{
			$this->CI->db->where('is_deleted = 0');
		}

		// make the db request
		$query = $this->CI->db->get();

		if ($query->row())
		{
			return FALSE;
		}
		else
		{
			return TRUE;
		}

	}//end unique()

	// --------------------------------------------------------------------

	/**
	 * Check that a string only contains Alpha-numeric characters with
	 * periods, underscores, spaces and dashes
	 *
	 * @abstract Alpha-numeric with periods, underscores, spaces and dashes
	 * @access public
	 *
	 * @param string $str The string value to check
	 *
	 * @return	bool
	 */
	function alpha_extra($str)
	{
		$this->CI->form_validation->set_message('alpha_extra', 'The %s field may only contain alpha-numeric characters, spaces, periods, underscores, and dashes.');
		return ( ! preg_match("/^([\.\s-a-z0-9_-])+$/i", $str)) ? FALSE : TRUE;

	}//end alpha_extra()

	// --------------------------------------------------------------------

	/**
	 * Check that the string matches a specific regex pattern
	 *
	 * @access public
	 *
	 * @param string $str     The string to check
	 * @param string $pattern The pattern used to check the string
	 *
	 * @return bool
	 */
	function matches_pattern($str, $pattern)
	{
		if (preg_match('/^' . $pattern . '$/', $str))
		{
			return TRUE;
		}

		$this->CI->form_validation->set_message('matches_pattern', 'The %s field does not match the required pattern.');

		return FALSE;

	}//end matches_pattern()
	
	// --------------------------------------------------------------------
	
	/**
	 * Check that the string is a valid date
	 *
	 * @access public
	 *
	 * @param string $str     The string to check
	 *
	 * @return bool
	 */
	function valid_date($str)
	{
		if ( preg_match('/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(?:20|19)[0-9]{2}$/', $str) ) {
			list($month , $day , $year) = explode('/',$str);
			return checkdate($month , $day , $year);
		} else {
			$this->CI->form_validation->set_message('valid_date', 'The %s field is not a valid date or does not match the date pattern. (mm/dd/yyyy)');
			return FALSE;
		}
	}
	// --------------------------------------------------------------------


	/**
	 * Check that the string is a valid date
	 *
	 * @access public
	 *
	 * @param string $str     The string to check
	 *
	 * @return bool
	 */
	function valid_datetime($str)
	{
		if ( preg_match('/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/(?:20|19)[0-9]{2}\s(0[0-9]|1[0-2]):([0-6][0-9])\s(?:am|pm)$/', $str) ) {
			return TRUE;
		} else {
			$this->CI->form_validation->set_message('valid_datetime', 'The %s field is not a valid datetime or does not match the datetime pattern. (mm/dd/yyyy hh:mm aa)');
			return FALSE;
		}
	}
	// --------------------------------------------------------------------

	/**
	 * Check that the string is a valid date
	 *
	 * @access public
	 *
	 * @param string $str     The string to check
	 *
	 * @return bool
	 */
	function valid_time($str)
	{
		if ( preg_match('/^(0[0-9]|1[0-2]):([0-6][0-9])\s(?:am|pm)$/', $str) ) {
			return TRUE;
		} else {
			$this->CI->form_validation->set_message('valid_time', 'The %s field is not a valid time or does not match the time pattern. (hh:mm aa)');
			return FALSE;
		}
	}
	// --------------------------------------------------------------------

	/**
	 * Check the entered password against the password strength settings.
	 *
	 * @access public
	 *
	 * @param string $str The password string to check
	 *
	 * @return bool
	 */
	public function valid_password($str)
	{
		// get the password strength settings from the database
		$min_length	= $this->CI->config->item('auth.password_min_length');
		$use_nums   = $this->CI->config->item('auth.password_force_numbers');
		$use_syms   = $this->CI->config->item('auth.password_force_symbols');
		$use_mixed  = $this->CI->config->item('auth.password_force_mixed_case');

		// Check length
		if (strlen($str) < $min_length)
		{
			$this->CI->form_validation->set_message('valid_password', 'The %s field must be at least '. $min_length .' characters long');
			return FALSE;
		}

		// Check numbers
		if ($use_nums)
		{
			if (0 === preg_match('/[0-9]/', $str))
			{
				$this->CI->form_validation->set_message('valid_password', '%s must contain at least 1 number.');
				return FALSE;
			}
		}

		// Check Symbols
		if ($use_syms)
		{
			if (0 === preg_match('/[!@#$%^&*()._]/', $str))
			{
				$this->CI->form_validation->set_message('valid_password', '%s must contain at least 1 punctuation mark.');
				return FALSE;
			}
		}

		// Mixed Case?
		if ($use_mixed)
		{
			if (0 === preg_match('/[A-Z]/', $str))
			{
				$this->CI->form_validation->set_message('valid_password', '%s must contain at least 1 uppercase characters.');
				return FALSE;
			}

			if (0 === preg_match('/[a-z]/', $str))
			{
				$this->CI->form_validation->set_message('valid_password', '%s must contain at least 1 lowercase characters.');
				return FALSE;
			}
		}

		return TRUE;

	}//end valid_password()

	//--------------------------------------------------------------------

	/**
	 * valid_current_passowrd function
	 *
	 * check if the password is match
	 * to the user current password
	 *
	 * @return void
	 * @author 
	 **/
	public function valid_current_passowrd ($password)
	{
		if($this->CI->config->item('salt')) {
			$hash_password = do_hash($password.$this->CI->config->item('salt'),'md5');
		}
		else {
			$hash_password = do_hash($password.$this->CI->session->userdata('user')->email,'md5');
		}

		if($hash_password === $this->CI->session->userdata('user')->password) {
			return TRUE;
		}
		else {
			$this->CI->form_validation->set_message('valid_current_passowrd','The %s you entered is incorrect');
			return FALSE;
		}
	}

	public function valid_gc_value($str) {

		$this->CI->load->config('gift_certificate');

		$gc_values = $this->CI->config->item('gc_values');

		if(in_array($str,$gc_values)) {
			return TRUE;
		}
		else {
			$this->CI->form_validation->set_message('gc_values','Invalid GC Value');
			return FALSE;
		}
	}

	public function except_days($date='',$except_days='') {

		$days = array('sun' => 'Sunday', 'mon' => 'Monday', 'tue' => 'Tuesday', 'wed' => 'Wednesday', 'thu' => 'Thursday', 'fri' => 'Friday', 'sat' => 'Saturday');
		$except_days = explode('|',$except_days);
		if(count($except_days) > 0) {
			foreach($except_days AS $index => $e_day) {
				$except_days[$e_day] = $days[$e_day];
				unset($except_days[$index]);
			}
		}

		$timestamp = strtotime($date);
		$day = date('l',$timestamp);

		if(in_array($day,$except_days)) {
			$this->CI->form_validation->set_message('except_days','The %s not allowed '.implode(', ',$except_days));
			return FALSE;
		}
		return TRUE;
	}

	function numeric_extra($str)
	{
		$this->CI->form_validation->set_message('numeric_extra', 'The %s field may only contain numeric characters, spaces, periods, and dashes.');
		return ( ! preg_match("/^([\.\s-a-z0-9-])+$/i", $str)) ? FALSE : TRUE;
	}
}
/* End of file : ./libraries/MY_Form_validation.php */