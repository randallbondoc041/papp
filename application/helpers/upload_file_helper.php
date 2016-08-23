<?php

if ( ! function_exists( 'upload_file' ) )
{
    /**
     * File uploader
     *
     * @author EricN
     *
     * @param string $file_name         REQUIRED Filename of the image to be encrypted using md5
     * @param string $form_name         REQUIRED Name attribute of the input file
     * @param string $upload_path       REQUIRED Path of the uploaded image
     * @param string $allowed_types     OPTIONAL Default values are 'bmp','jpg','jpeg','png','gif'.
     *                                  If uploading file type do not exist just override this option
     *
     * @return array Contains status and data of the uploaded file (status = true) or error details (status = false)
     */
    function upload_file( $file_name, $form_name, $upload_path, $allowed_types = 'bmp|jpg|jpeg|png|gif' )
    {
        $ci =& get_instance();

        // load needed library and helpers
        $ci->load->library( 'upload' );
        $ci->load->helper( array( 'form', 'url' ) );

        $file_name = md5( $file_name );

        // creates directory
        $dir_creation_stat = create_directory( $upload_path );

        if ( ! $dir_creation_stat['status'] )
        {
            return $dir_creation_stat;
        }

        $config = array(
            'file_name'     => $file_name,
            'upload_path'   => $upload_path,
            'allowed_types' => $allowed_types,
        );

        $ci->upload->initialize( $config );

        if ( ! $ci->upload->do_upload( $form_name ) )
        {
            $error = array(
                'status'  => FALSE,
                'message' => 'File not uploaded',
                'data'    => $ci->upload->display_errors()
            );

            return $error;
        }

        $data = $ci->upload->data();

        // include upload_path to the data
        $exp_upload_path = explode( '/', $upload_path );
        if ( $exp_upload_path[0] === '.' )
        {
            array_shift( $exp_upload_path );
        }
        if ( end( $exp_upload_path ) === '' )
        {
            array_pop( $exp_upload_path );
        }
        $data['path'] = implode( '/', $exp_upload_path );

        // include directory name or basename of $path_info to the data
        $data['basename'] = $dir_creation_stat['data']['basename'];

        // remove the file path and full path for security reasons
        unset( $data['file_path'], $data['full_path'] );

        return array( 'status' => TRUE, 'message' => 'File successfully uploaded', 'data' => $data );
    }
}

if ( ! function_exists( 'create_directory' ) )
{
    /**
     * Creates a directory
     *
     * @author EricN
     *
     * @param string $upload_path Relative path of the directory to be created
     *                            Ex. './assets/images/temps/'
     *
     * @return array Status and message of the directory creation
     */
    function create_directory( $upload_path )
    {
        $path_info = pathinfo( $upload_path );

        $dir_status = array( 'status' => FALSE, 'message' => 'Directory name not set.' );

        if ( file_exists( $upload_path ) )
        {
            $dir_status = array( 'status' => TRUE, 'message' => 'Upload path already exists', 'data' => $path_info );
        }
        elseif ( isset( $path_info['dirname'] ) )
        {
            @mkdir( $path_info['dirname'], 0777 ); // this make the dir if does not exists returns no error if dir exists
            @mkdir( $upload_path, 0777 ); // this make the dir if does not exists returns no error if dir exists
            @chmod( $path_info['dirname'], 0777 ); // this make the dir if does not exists returns no error if dir exists
            @chmod( $upload_path, 0777 ); // this make the dir if does not exists returns no error if dir exists

            if ( ! file_exists( $upload_path ) )
            {
                $dir_status = array(
                    'status'  => FALSE,
                    'message' => 'Upload path directory not found'
                );
            }
            else
            {
                $dir_status = array(
                    'status'  => TRUE,
                    'message' => 'Successfully created upload path directory',
                    'data'    => $path_info
                );
            }
        }

        return $dir_status;
    }
}