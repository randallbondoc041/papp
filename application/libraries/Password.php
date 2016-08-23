<?php

/**
 *		A library that will handle the password encryption using blowfish algorithm.
 *		This library provides a way to secure the password of the users by generating 22 bit password salt and encrypt it using PHP crypt (Blowfish Algorithm) so that the salt for each user is unique and
 *		Provides a way to match the input password and the encrypted password
 *
 *		@author: R. Bondoc
 */
class Password {
	
	/**
	 *	A private function that will do the encryption of passwords.
	 *	
	 *	@param: $password (string) (required)
	 *	@param: $encryption_level (int) (optional) (defatul:9). - this will determine the encryption rounds of the password. The higher the value of this, 
	 *															  the more expensive in terms of calculation your password is. But do not set this to very high value as this will take time to encrypt or check your password.
	 * @return: (string) - encrypted password
	 * @access: Private
	*/
	private function _doEncryption ( $password = '', $encryption_rounds = 9 ) {
		// checking if the password is defined and is greater than 0.
		 if (isset ($password) && strlen ($password) > 0) {
			$salt = ''; // defining the password
			$salt_characters = array_merge ( range('A','Z'), range('a','z'), range(0,9) ); // defining salt characters 
			
			/* randomizing the password salt */
			for ($x = 0; $x < 22; $x ++) {
				$salt .= $salt_characters[ array_rand($salt_characters)	];
			}
			
			// encrypting using crypt function of PHP 
			// $2y$02d$ -> string that specifies the function 'crypt' to use the blowfish algorithm. 
			//$2a$%02d$
			return crypt($password, sprintf('$2a$%02d$', $encryption_rounds) . $salt); // return the password
		}
	}
	
	/**
	 *  A privileged function that will call the private function _doEncrypt.
	 *  @param: Password(string)(required)
	 *	@return: string
	 *
	*/
	public function encrypt ( $password = '' ) {
		if (isset ($password) && strlen($password) > 0) {// validate the given password.
			// if password is defined and is not empty
			// call private function _doEncrtyp 
			return $this->_doEncryption ($password);// return the encrypted password
		}
		
		return '';
	}
	
	/**
	 *	A function that will compare if the encrypted password matched with the given password.
	 * 	@param: $password (string)(required)
	 *	@param: $hashed_password (string) (required)
	 *
	 *	@return: boolean true if password matched, false if not
	*/
	public function match ( $password = '', $hashed_password = '' ) {
		$has_matched = false; 
		
		if (isset ($password) && isset($hashed_password) && strlen ($password) > 0 && strlen ($hashed_password) > 0) { // validate if password and hashed password is defined and not empty.
			$has_matched = (crypt($password, $hashed_password) == $hashed_password); // checking if the given password matches the encrypted password
		}
		
		return $has_matched; // return the result of matching
	}
	
}