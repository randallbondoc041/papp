<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
if ( ! function_exists('kprint')){
	function kprint($array, $exit=FALSE) {
		if (defined('ENVIRONMENT'))
		{
			switch (ENVIRONMENT)
			{
				case 'development':
					echo '<pre>';
						print_r($array);
					echo '</pre>';
					if($exit === TRUE) exit;
				break;
			}
		}
	}
}

if ( ! function_exists('array_check')){
		function array_check($array){
			if(is_array($array) and count($array) > 0){
				return true;
			}
			else{
				return false;
			}
		}
}


if ( ! function_exists('dropdown_array'))
{
    function dropdown_array( $object, $field = '', $include_default = FALSE, $default_option = 'Please Select' )
	{
		// loop through each object in the $all array, convert them to
		// an array, and add them to a new array.
		$result = array();
		if ( ! empty($field) )
		{
            if ( $include_default )
            {
                $result[0] = $default_option;
            }

			foreach($object as $o)
			{
				isset($o->{$field}) and $result[$o->id] = $o->{$field};
			}					
		}
		return $result;
	}
}

if ( ! function_exists('cities_array'))
{
	function cities_array($object,$field='')
	{
		// loop through each object in the $all array, convert them to
		// an array, and add them to a new array.
		$result = array();
		if ( ! empty($field) )
		{
			foreach($object as $o)
			{
				isset($o->{$field}) and $result[$o->province_id][$o->id] = $o->{$field};
			}					
		}
		return $result;
	}
}

if ( ! function_exists('location_array'))
{
	function location_array($object,$field='')
	{
		// loop through each object in the $all array, convert them to
		// an array, and add them to a new array.
		$result = array();
		if ( ! empty($field) )
		{
			foreach($object as $o)
			{
				isset($o->{$field}) and $result[$o->city_id][$o->id] = $o->{$field};
			}					
		}
		return $result;
	}
}

if( ! function_exists('autocomplete_array'))
{
	function autocomplete_array($object,$field='')
	{
		// loop through each object in the $all array, convert them to
		// an array, and add them to a new array.
		$result = array();
		if ( ! empty($field) )
		{
			foreach($object as $o)
			{
				isset($o->{$field}) and $result[] = array("label" => $o->{$field});
			}					
		}
		return $result;
	}
}

if( ! function_exists('values_in'))
{
	function values_in($values=array(), $in='')
	{
		$result = FALSE;

		if(is_array($values))
		{
			if(in_array($in, $values, TRUE))
			{
				return TRUE;
			}
		}
		else
		{
			if(strpos(trim($values), trim($in)) != FALSE)
			{
				$result = TRUE;
			}
		}

		return $result;
	}
}

if ( ! function_exists('csv_to_array')){
	function csv_to_array($file, $is_import = FALSE, $delimiter=","){
		$csv_array = array();
		
		if( file_exists(str_replace(base_url(),'',$file)) ){
			$file = str_replace(base_url(),'',$file);
			
			if (($handle = fopen($file, "r")) !== FALSE) {
					
				if($is_import === TRUE){
					//line length was originally set to 1000
					while (($data = fgetcsv($handle, 0, ",")) !== FALSE)
					{
						$csv_array[] = $data;
					}
				}
				else{
					$contents = '';
					
					while ( ($buf=fread( $handle, 8192 )) != '' )
					{
						// Here, $buf is guaranteed to contain data
						$contents .= $buf;
					}
					if($buf===FALSE)
					{
						echo "THERE WAS AN ERROR READING THE FILE\n"; exit;
					}

					$contents = nl2br($contents);
					$contents = str_replace("<br />", "\n", $contents);
					$data = explode("\n", $contents);
					
					if(count($data)>0)
					{
						for($x=0; $x<=count($data)-1; $x++)
						{
							$line = trim($data[$x]);
							//$line_explode = explode(",",$line);
							$col = improv_str_getcsv($data[$x], $delimiter);
							$csv_array[] = $col;
						}
					}
					
				}
				
				fclose($handle);
			}
			return $csv_array;
		}
		else
		{
			// echo $file;
			return FALSE;
		}
	}
}	

if (!function_exists('improv_str_getcsv')) {
    function improv_str_getcsv($input, $delimiter = ",", $enclosure = '"', $escape = "\\") {
        $fiveMBs = 10 * 1024 * 1024;
        $fp = fopen("php://temp/maxmemory:$fiveMBs", 'r+');
        fputs($fp, $input);
        rewind($fp);

        $data = fgetcsv($fp, 0, $delimiter, $enclosure); //  $escape only got added in 5.3.0

        fclose($fp);
        return $data;
    }
}

if (!function_exists('clean_csv_converted_array')) {
	function clean_csv_converted_array($array, $include_internal_values=FALSE) {
		$bool_empty = FALSE;
		$return_array = array();
		$return_index = 0;

		if($array != FALSE)
		{
			foreach ($array as $index => $contents) {
				
				if(is_array($array[$index]) AND count($array[$index])>0){
					foreach ($array[$index] as $key => $value) {
						if(is_null($value)) {
							$bool_empty = TRUE;
						}else {
							$bool_empty = FALSE;
						}
					}
				}

				if( ! $bool_empty){
					$return_array[$return_index] = $array[$index];
					$return_index++;
				}
			}
			
			// unset the array keys that has all blank values
			if($include_internal_values) {
				$all_key_values_blank = array();
				foreach ($return_array as $key => $col) {
					$is_blank = TRUE;
					foreach ($col as $index => $value) {
						if($value!='') {
							$is_blank = FALSE;
						}else {
							$is_blank = TRUE;
						}
					}
					if($is_blank==TRUE) {
						$all_key_values_blank[] = $key;
					}
				}
				
				if(count($all_key_values_blank)>0) {
					foreach ($all_key_values_blank as $value) {
						unset($return_array[$value]);
					}
				}
			}

			return $return_array;
		}
		else
		{
			return FALSE;
		}
	} 
}