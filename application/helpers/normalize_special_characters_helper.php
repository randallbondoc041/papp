<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists( 'normalize_special_characters' ) )
{
    /**
     * Parses/replaces an special characters 
     *
     * @author RandallB
     *
     * @param string $str - pass the string that should be parsed/replaced
     *
     * @return string $parsed_letter
     */
    function normalize_special_characters( $str ) 
    { 
        # Quotes cleanup 
        $str = str_replace( chr(ord("")), "'", $str );        #  
        $str = str_replace( chr(ord("´")), "'", $str );        # ´ 
        $str = str_replace( chr(ord("„")), ",", $str );        # „ 
        $str = str_replace( chr(ord("")), "'", $str );        #  
        $str = str_replace( chr(ord("´")), "'", $str );        # ´ 
        $str = str_replace( chr(ord("“")), "\"", $str );        # “ 
        $str = str_replace( chr(ord("”")), "\"", $str );        # ” 
        $str = str_replace( chr(ord("´")), "'", $str );        # ´ 

        $unwanted_array = array(
                'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E', 
                'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 
                'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 
                'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 
                'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y'
            ); 
        $str = strtr( $str, $unwanted_array ); 

        # Bullets, dashes, and trademarks 
        $str = str_replace( chr(149), "&#8226;", $str );    # bullet • 
        $str = str_replace( chr(150), "&ndash;", $str );    # en dash 
        $str = str_replace( chr(151), "&mdash;", $str );    # em dash 
        $str = str_replace( chr(153), "&#8482;", $str );    # trademark 
        $str = str_replace( chr(169), "&copy;", $str );    # copyright mark 
        $str = str_replace( chr(174), "&reg;", $str );        # registration mark 

        return $str; 
    }
}