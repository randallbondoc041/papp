<?php

class Logs {

   


    private $role = array(
        'esop/add_distribute_share' => "1,2,3,4",//done
        'esop/edit_distribute_share' => "1,2,3,4",//done
        'esop/insert_upload_share_distribution' => "esop",//done

        'esop/edit' => "2,3,4",//done

        'esop/accept_offer' => "2,3",//done

        'esop/add' => "2,3,4",//done

        'esop/update_stock_offer_status' => "2,3,4",//done
        'esop/accept_multiple_offer' => "2,3,4",
        'esop/save_upon_edit_stock_offers'=>"2,3,4",
        'esop/insert_gratuity' => "4",//done
        'esop/approve_gratuity' => "3",//done
        'esop/send_gratuity_to_employees' => "1,2,3,4",//done

        'esop/add_payment_record' => "2,3,4",//done

        'esop/add_vesting_claims' => "2,3",//done

        'claims/send_claim_esop_to_admin' => "1,2,3,4",//done
        'claims/approve_esop_claim' => "3",//done
        'claims/mark_claim_as_completed' => "1,2,3,4",//done

    );
    private $type = array(
        /*company action methods*/
        'companies/add' => "company",//done
        'companies/edit' => "company",//done

        /*department action methods*/
        'departments/add' => "department",//done
        'departments/edit' => "department",//done

        /*rank action methods*/
        'ranks/add' => "rank",//done
        'ranks/edit' => "rank",//done

        /*user action methods*/
        'users/add' => "user",//done
        'users/edit' => "user",//done
        'users/insert_upload_user_list' => 'user',//done

        /*esop action methods*/
        'esop/add' => "esop",//done
        'esop/edit' => "esop",//done
        'esop/add_distribute_share' => "esop",//done
        'esop/edit_distribute_share' => "esop",//done
        'esop/insert_upload_share_distribution' => "esop",//done
        'esop/update_stock_offer_status' => "esop",//done
        'esop/add_new_employee' => "esop",//done
        'esop/accept_offer' => "esop",//done

        'esop/insert_gratuity' => "esop",//done
        'esop/approve_gratuity' => "esop",//done
        'esop/reject_gratuity' => "esop",//done
        'esop/send_gratuity_to_employees' => "esop",//done

        'esop/accept_multiple_offer' => "esop-group",
        'esop/save_upon_edit_stock_offers'=>"esop-group",


        'esop/add_payment_record' => "esop/user",//done
        'esop/insert_upload_payment_record' => "esop/user",//done

        'settings/add_payment_method' => 'payment_method',//done
        'settings/update_payment_method' => 'payment_method',//done
        'settings/delete_payment_method' => 'payment_method',//done

        'esop/add_vesting_claims' => "esop/user",//done

        'settings/add_offer_letter' => "offer_letter",//done
        'settings/update_offer_letter' => "offer_letter",//done
        'settings/archive_offer_letter' => "offer_letter",//done

        'claims/send_claim_esop_to_admin' => "claims",//done
        'claims/approve_esop_claim' => "claims",//done
        'claims/mark_claim_as_completed' => "claims",//done

    );
    private $action_lexicon = array(
        /*company action methods*/
        'companies/add' => "Created company",//done
        'companies/edit' => "Edited Company",//done

        /*department action methods*/
        'departments/add' => "Created department",//done
        'departments/edit' => "Edited department",//done

        /*rank action methods*/
        'ranks/add' => "Created rank",//done
        'ranks/edit' => "Edited rank",//done

        /*user action methods*/
        'users/add' => "Created user",//done
        'users/edit' => "Edited user",//done
        'users/insert_upload_user_list' => 'Uploaded User',//done

        /*esop action methods*/
        'esop/add' => "Added Esop",//done
        'esop/edit' => "Edited Esop",//done
        'esop/add_distribute_share' => "Added Distribute Share",//done
        'esop/edit_distribute_share' => "Edited Distribute Share",//done
        'esop/insert_upload_share_distribution' => "Uploaded Share Distribution Template",//done
        'esop/update_stock_offer_status' => "Esop Offer Letter Sent",//done
        'esop/add_new_employee' => "Added New Employee To Esop",//done
        'esop/accept_offer' => "Accepted Stock Offer",//done

        'esop/insert_gratuity' => "Added Gratuity",//done
        'esop/approve_gratuity' => "Approved Gratuity",//done
        'esop/reject_gratuity' => "Rejected Gratuity",//done
        'esop/send_gratuity_to_employees' => "Gratuity Sent To Employees",//done

        'esop/add_payment_record' => "Added Payment Record",//done
        'esop/insert_upload_payment_record' => "Uploaded Payment Record",//done
        
        'settings/add_payment_method' => "Added Payment Method",//done
        'settings/update_payment_method' => 'Edited Payment Method',//done
        'settings/delete_payment_method' => 'Deleted Payment Method',//done

        'esop/add_vesting_claims' => "Added Vesting Claims",//done

        'settings/add_offer_letter' => "Added Offer Letter",//done
        'settings/update_offer_letter' => "Edited Offer Letter",//done
        'settings/archive_offer_letter' => "Archived Offer Letter",//done

        'claims/send_claim_esop_to_admin' => "Claim Sent to Esop Admin",//done
        'claims/approve_esop_claim' => "Approved Esop Claim",//done
        'claims/mark_claim_as_completed' => "Mark Claim as Completed",//done

        'esop/accept_multiple_offer' => "Marked as Accepted",
        'esop/save_upon_edit_stock_offers'=>"Inserted/Updated Offer",

    );

	
	public function __construct()
	{

	}
	
	
	/* 
		inserts logs of functions declared at the action_lexicon array and type array above
	*/
    public function hook_log ()
    {
        error_reporting(0);
        $CI =& get_instance();

         $CI->load->library('emailer');
         $CI->load->model('users/Users_model');

        $invoker = $CI->uri->segment(1) ."/". $CI->uri->segment(2);
    

        if ( isset($this->action_lexicon[$invoker]) && isset($this->type[$invoker]) )
        {
            $data = $_POST;

            if(isset($data['status']) && $data['status'] == TRUE)
            {
                if(isset($data['params']) && $invoker == 'companies/add')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_create_log_text($data['params'], "Company");

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'companies/edit')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'departments/add')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_create_log_text($data['params'], "Department");

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'departments/edit')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'ranks/add')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_create_log_text($data['params'], "Rank");

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'ranks/edit')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'users/add')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_create_log_text($data['params'], "User");

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'users/edit')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    if(isset($data['params']['diff']) && count($data['params']['diff']) > 0)
                    {
                        if(isset($data['params']['diff']['user_role']) && isset($data['params']['diff']['user_role_name']))
                        {
                            $data['params']['diff']['user_role'] = $data['params']['diff']['user_role_name'];
                            $data['params']['from']['user_role'] = $data['params']['from']['user_role_name'];
                            unset($data['params']['diff']['user_role_name']);
                        }

                        if(isset($data['params']['diff']['company_name']) && isset($data['params']['diff']['company_id']))
                        {
                            $data['params']['diff']['company'] = $data['params']['diff']['company_name'];
                            $data['params']['from']['company'] = $data['params']['from']['company_name'];
                            unset($data['params']['diff']['company_name']);
                            unset($data['params']['diff']['company_id']);
                        }

                        if(isset($data['params']['diff']['department_name']) && isset($data['params']['diff']['department_id']))
                        {
                            $data['params']['diff']['department'] = $data['params']['diff']['department_name'];
                            $data['params']['from']['department'] = $data['params']['from']['department_name'];
                            unset($data['params']['diff']['department_name']);
                            unset($data['params']['diff']['department_id']);
                        }

                        if(isset($data['params']['diff']['rank_name']) && isset($data['params']['diff']['rank_id']))
                        {
                            $data['params']['diff']['rank'] = $data['params']['diff']['rank_name'];
                            $data['params']['from']['rank'] = $data['params']['from']['rank_name'];
                            unset($data['params']['diff']['rank_name']);
                            unset($data['params']['diff']['rank_id']);
                        }

                        if(isset($data['params']['diff']['contact_number_type_name']) && isset($data['params']['diff']['contact_number_type']))
                        {
                            $data['params']['diff']['contact_number_type'] = $data['params']['diff']['contact_number_type_name'];
                            $data['params']['from']['contact_number_type'] = $data['params']['from']['contact_number_type_name'];
                            unset($data['params']['diff']['contact_number_type_name']);
                        }
                    }

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'users/insert_upload_user_list')
                {
                    if(isset($data['params']['added']))
                    {
                        foreach ($data['params']['added'] as $key => $value) {
                            $insert_data = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "type"    => $this->type[$invoker],
                                "ref_id"  => isset($value['params']['id']) ? $value['params']['id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $insert_data['value'] = $this->_create_log_text($value['params'], "User");

                            $CI->db->insert("logs", $insert_data);
                        }
                    }
                }
                else if(isset($data['params']) && $invoker == 'esop/add')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s")
                    );

                     // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role"    => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s")
                    );

                    if(isset($data['params']['type']))
                    {
                        if($data['params']['type'] == 'main_esop')
                        {
                            $insert_data['action_note'] = $this->action_lexicon[$invoker];
                            $insert_data['value'] = $this->_create_log_text($data['params'], "Esop");

                            $insert_data_notif['action_note'] = $this->action_lexicon[$invoker];
                            $insert_data_notif['value'] ='<p>"'.$CI->session->userdata('full_name').'" has created "'.$data['params']["name"].'" Please go to the ESOP Page to start Share Distribution."</p>';
                        }
                        else if($data['params']['type'] == 'batch_esop')
                        {
                            $insert_data['action_note'] = "Added Esop Batch";
                            $insert_data['value'] = $this->_create_log_text($data['params'], "Esop batch");

                            $insert_data_notif['action_note'] = "Added Esop Batch";
                            $insert_data_notif['value'] ='<p>"'.$CI->session->userdata('full_name').'" has created "'.$data['params']["name"].'" Please go to the ESOP Page to start Share Distribution."</p>';
                        }
                    }

                    $CI->db->insert("logs", $insert_data);

                    $CI->db->insert("notification", $insert_data_notif);



                    // For Email Notification

                    $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                    $email_notif = array(
                            "to"=>$user_info[0]["email"],
                            "user_name"=>$user_info[0]["name"],
                            "subject" => $insert_data_notif['action_note'],
                            "message"=>$insert_data_notif['value']
                        );

                    
                    // $try_print = $CI->emailer->send_mail($email_notif);

                    // End For Email Notification



                }
                else if(isset($data['params']) && $invoker == 'esop/edit')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    if(isset($data['params']['diff']) && count($data['params']['diff']) > 0)
                    {
                        if(isset($data['params']['diff']['currency_name']) && isset($data['params']['diff']['currency']))
                        {
                            $data['params']['diff']['currency'] = $data['params']['diff']['currency_name'];
                            $data['params']['from']['currency'] = $data['params']['from']['currency_name'];
                            unset($data['params']['diff']['currency_name']);
                        }

                        if(isset($data['params']['diff']['total_share_qty']))
                        {
                            $data['params']['diff']['total_share_quantity'] = number_format($data['params']['diff']['total_share_qty'], 2);
                            $data['params']['from']['total_share_quantity'] = number_format($data['params']['from']['total_share_qty'], 2);
                            unset($data['params']['diff']['total_share_qty']);
                        }
                    }

                    if(isset($data['params']['type']))
                    {
                        if($data['params']['type'] == 'esop_normal_edit')
                        {
                            $insert_data['value'] = $this->_from_to_log_text($data['params']);
                        }
                        else if($data['params']['type'] == 'set_offer_expiration')
                        {
                            $insert_data['value'] = '<p>Set Offer Expiration to <span class="font-bold">"'.$data['params']['to']['offer_expiration'].'"</span></p>';
                            $insert_data['action_note'] = 'Offer Expiration Set';

                            $insert_data_notif = array(
                                    "user_id" => $CI->session->userdata('user_id'),
                                    "user_role" => "2,3,4",
                                    "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                                    "date_created" => date("Y-m-d H:i:s"),
                                    "action_note" => 'Offer Expiration Set'
                            );

                            $insert_data_notif['value'] = '<p>"'.$CI->session->userdata('full_name').'" has set the offer expiration for "'.$data['params']['esop_name'].'". Please go to the ESOP Page to send the offer letters.</p>';

                            $CI->db->insert("notification", $insert_data_notif);

                            // For Email Notification

                                $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                                $email_notif = array(
                                        "to"=>$user_info[0]["email"],
                                        "user_name"=>$user_info[0]["name"],
                                        "subject" => $insert_data_notif['action_note'],
                                        "message"=>$insert_data_notif['value']
                                    );

                                
                                // $CI->emailer->send_mail($email_notif);

                            // End For Email Notification
                        }
                    }

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'esop/add_distribute_share')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = '<p>Added distribute shares</p>';

                    $CI->db->insert("logs", $insert_data);

                    if(isset($data['params']['user_offer_data']))
                    {
                        foreach ($data['params']['user_offer_data'] as $key => $value) {
                            $insert_data_notif = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "user_role" => $this->role[$invoker],
                                "ref_id"  => isset($value['user_id']) ? $value['user_id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $insert_data_notif['value'] = '<p>Congratulations! You have been offered "'.number_format($value["stock_amount"], 2).'" shares in "'.$data['params']['esop_name'].'". Please go to the Offers page to check it out!</p>';

                            $CI->db->insert("notification", $insert_data_notif);

                            // For Email Notification

                            $message = '<p>Congratulations! You have been offered "'.number_format($value["stock_amount"], 2).'" shares in "'.$data['params']['esop_name'].'". Please go to the Offers page to check it out!</p>';

                            $user_info = $CI->Users_model->get_user_email($value['user_id']);

                            $email_notif = array(
                                    "to"=>$user_info[0]["email"],
                                    "user_name"=>$user_info[0]["name"],
                                    "subject" => "Offered Shares",
                                    "message"=>$message 
                                );

                            
                            // $try_print = $CI->emailer->send_mail($email_notif);

                            // echo $try_print;

                            // print_r($try_print);
                            // exit();

                            // end Email Notification

                        }
                    }

                    $inser_data_distribution = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => "2,3,4",
                            "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                    );

                    $inser_data_distribution['value'] = '<p>"'.$CI->session->userdata('full_name').'" has distributed shares for "'.$data['params']['esop_name'].'". Please go to the ESOP Page to set its offer expiration.</p>';

                    $CI->db->insert("notification", $inser_data_distribution);

                    // For Email Notification

                        $user_info_dist = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif_dist = array(
                                "to"=>$user_info_dist[0]["email"],
                                "user_name"=>$user_info_dist[0]["name"],
                                "subject" => $inser_data_distribution['action_note'],
                                "message"=>$inser_data_distribution['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif_dist);

                    // End For Email Notification

                }
                else if(isset($data['params']) && $invoker == 'esop/edit_distribute_share')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = '<p>Edited distribute shares</p>';

                    $CI->db->insert("logs", $insert_data);

                    if(isset($data['params']['user_offer_data']))
                    {
                        foreach ($data['params']['user_offer_data'] as $key => $value) {
                            $insert_data_notif = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "user_role" => $this->role[$invoker],
                                "ref_id"  => isset($value['user_id']) ? $value['user_id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $insert_data_notif['value'] = '<p>Congratulations! You have been offered "'.number_format($value["stock_amount"], 2).'" shares in "'.$data['params']['esop_name'].'". Please go to the Offers page to check it out!</p>';

                            $CI->db->insert("notification", $insert_data_notif);

                            // For Email Notification

                                $user_info = $CI->Users_model->get_user_email($value['user_id']);

                                $email_notif = array(
                                        "to"=>$user_info[0]["email"],
                                        "user_name"=>$user_info[0]["name"],
                                        "subject" => $insert_data_notif['action_note'],
                                        "message"=>$insert_data_notif['value']
                                    );

                                
                                // $CI->emailer->send_mail($email_notif);

                            // End For Email Notification
                        }
                    }

                    $inser_data_distribution = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => "2,3,4",
                            "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                    );

                    $inser_data_distribution['value'] = '<p>"'.$CI->session->userdata('full_name').'" has edited distribut shares for "'.$data['params']['esop_name'].'". Please go to the ESOP Page to set its offer expiration.</p>';

                    $CI->db->insert("notification", $inser_data_distribution);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $inser_data_distribution['action_note'],
                                "message"=>$inser_data_distribution['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification

                }
                else if(isset($data['params']) && $invoker == 'esop/insert_upload_share_distribution')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = '<p>Uploaded distribute shares</p>';

                    $CI->db->insert("logs", $insert_data);

                    if(isset($data['params']['user_offer_data']))
                    {
                        foreach ($data['params']['user_offer_data'] as $key => $value) {
                            $insert_data_notif = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "user_role" => $this->role[$invoker],
                                "ref_id"  => isset($value['user_id']) ? $value['user_id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $insert_data_notif['value'] = '<p>Congratulations! You have been offered "'.number_format($value["stock_amount"], 2).'" shares in "'.$data['params']['esop_name'].'". Please go to the Offers page to check it out!</p>';

                            $CI->db->insert("notification", $insert_data_notif);


                            // For Email Notification

                                $user_info = $CI->Users_model->get_user_email(isset($value['user_id']) ? $value['user_id'] : 0);

                                $email_notif = array(
                                        "to"=>$user_info[0]["email"],
                                        "user_name"=>$user_info[0]["name"],
                                        "subject" => $insert_data_notif['action_note'],
                                        "message"=>$insert_data_notif['value']
                                    );

                                
                                // $CI->emailer->send_mail($email_notif);

                            // End For Email Notification

                        }
                    }

                    $inser_data_distribution = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => "2,3,4",
                            "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                    );

                    $inser_data_distribution['value'] = '<p>"'.$CI->session->userdata('full_name').'" has uploaded distribute shares for "'.$data['params']['esop_name'].'". Please go to the ESOP Page to set its offer expiration.</p>';

                    $CI->db->insert("notification", $inser_data_distribution);

                     // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $inser_data_distribution['action_note'],
                                "message"=>$inser_data_distribution['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/update_stock_offer_status')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = '<p>Offer letter sent</p>';

                    $CI->db->insert("logs", $insert_data);

                    $insert_data_notif = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => "2,3,4",
                            "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$CI->session->userdata('full_name').'" has sent the offer letters for "'.$data['params']['esop_name'].'". Please go to the ESOP Page to view the "'.$data['params']['esop_name'].'" details.</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/add_new_employee')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $employee_name = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>Added employee'.$employee_name.'</p>';

                    $CI->db->insert("logs", $insert_data);
                }     
                else if(isset($data['params']) && $invoker == 'esop/accept_offer')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker],

                    );

                    $employee_name = isset($data['params']['name']) ? '<span class="font-bold">"'.$data['params']['name'].'</span>" ' : '' ;
                    $stocks_accepted = isset($data['params']['stocks_accepted']) ? '<span class="font-bold">"'.number_format(str_replace(",", "", $data['params']['stocks_accepted']), 2).'</span>" of ' : '' ;
                    $insert_data['value'] = '<p>User '.$employee_name.'accepted '.$stocks_accepted.'the stock offer</p>';

                    $CI->db->insert("logs", $insert_data);

                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker],
                        'user_role' => $this->role[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$employee_name.'" has accepted "'.$stocks_accepted.'" shares in "'.$data['params']["esop_name"].'".</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                     // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/insert_gratuity')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $gratuity = (isset($data['params']['price_per_share']) && isset($data['params']['currency_name'])) ? ' <span class="font-bold">"'.$data['params']['currency_name'].' '.number_format(str_replace(",", "", $data['params']['price_per_share']), 2).'</span>"' : '' ;
                    $insert_data['value'] = '<p>Added gratuity'.$gratuity.'</p>';

                    $CI->db->insert("logs", $insert_data);

                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$CI->session->userdata('full_name').'" has added gratuity for "'.$data['params']["esop_name"].'". Please go to the gratuity page for approval.</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/approve_gratuity')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $gratuity = (isset($data['params']['price_per_share']) && isset($data['params']['currency_name'])) ? ' <span class="font-bold">"'.$data['params']['currency_name'].' '.number_format(str_replace(",", "", $data['params']['price_per_share']), 2).'</span>"' : '' ;
                    $insert_data['value'] = '<p>Approved gratuity'.$gratuity.'</p>';

                    $CI->db->insert("logs", $insert_data);

                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$CI->session->userdata('full_name').'" has approved gratuity for "'.$data['params']["esop_name"].'". Please go to the gratuity page to send it to the employees.</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/reject_gratuity')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $gratuity = (isset($data['params']['price_per_share']) && isset($data['params']['currency_name'])) ? ' <span class="font-bold">"'.$data['params']['currency_name'].' '.number_format(str_replace(",", "", $data['params']['price_per_share']), 2).'</span>"' : '' ;
                    $insert_data['value'] = '<p>Rejected gratuity'.$gratuity.'</p>';

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'esop/send_gratuity_to_employees')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $gratuity = (isset($data['params']['price_per_share']) && isset($data['params']['currency_name'])) ? ' <span class="font-bold">"'.$data['params']['currency_name'].' '.number_format(str_replace(",", "", $data['params']['price_per_share']), 2).'</span>"' : '' ;
                    $insert_data['value'] = '<p>Gratuity'.$gratuity.' sent to employees</p>';

                    $CI->db->insert("logs", $insert_data);

                    if(isset($data['params']['user_esop_data']))
                    {
                        foreach ($data['params']['user_esop_data'] as $key => $value) {
                            // For Notification
                            $insert_data_notif = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "user_role" => $this->role[$invoker],
                                "ref_id"  => isset($value['user_id']) ? $value['user_id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $insert_data_notif['value'] = '<p>You have been granted "'.$value['gratuity_per_share'].'" per share Gratuity for "'.$data['params']["esop_name"].'". Please check your ESOP page to see the update.</p>';

                            $CI->db->insert("notification", $insert_data_notif);

                            // For Email Notification

                                $user_info = $CI->Users_model->get_user_email(isset($value['user_id']) ? $value['user_id'] : 0);

                                $email_notif = array(
                                        "to"=>$user_info[0]["email"],
                                        "user_name"=>$user_info[0]["name"],
                                        "subject" => $insert_data_notif['action_note'],
                                        "message"=>$insert_data_notif['value']
                                    );

                                
                                // $CI->emailer->send_mail($email_notif);

                            // End For Email Notification
                        }
                    }
                }
                else if(isset($data['params']) && $invoker == 'esop/add_payment_record')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $employee_name = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>User'.$employee_name.' added payment record</p>';

                    $CI->db->insert("logs", $insert_data);

                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $employee_name = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>User'.$employee_name.' added payment record</p>';

                    $CI->db->insert("logs", $insert_data);

                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$data['params']['name'].'" has made a "'.$data['params']["payment_type"].'" payment amounting to "'.number_format($data['params']['amount_paid'], 2).'" for "'.$data['params']['esop_name'].'".</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email(isset($data['params']['user_id']) ? $data['params']['user_id'] : 0);

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/insert_upload_payment_record')
                {
                    if(isset($data['params']['added']))
                    {
                        foreach ($data['params']['added'] as $key => $value) {
                            $insert_data = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "type"    => $this->type[$invoker],
                                "ref_id"  => isset($value['params']['id']) ? $value['params']['id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $employee_name = isset($value['params']['name']) ? ' <span class="font-bold">"'.$value['params']['name'].'</span>"' : '' ;
                            $insert_data['value'] = '<p>User'.$employee_name.' added payment record</p>';

                            $CI->db->insert("logs", $insert_data);

                            $insert_data = array(
                                "user_id" => $CI->session->userdata('user_id'),
                                "type"    => $this->type[$invoker],
                                "ref_id"  => isset($value['params']['user_id']) ? $value['params']['user_id'] : 0 ,
                                "date_created" => date("Y-m-d H:i:s"),
                                "action_note" => $this->action_lexicon[$invoker]
                            );

                            $employee_name = isset($value['params']['name']) ? ' <span class="font-bold">"'.$value['params']['name'].'</span>"' : '' ;
                            $insert_data['value'] = '<p>User'.$employee_name.' added payment record</p>';

                            $CI->db->insert("logs", $insert_data);
                        }
                    }
                }
                else if(isset($data['params']) && $invoker == 'settings/add_payment_method')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $payment_method = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>Added payment method'.$payment_method.'</p>';

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'settings/update_payment_method')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'settings/delete_payment_method')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $payment_name = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>" ' : '' ;
                    $insert_data['value'] = '<p>Deleted payment method'.$payment_name.'</p>';


                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'esop/add_vesting_claims')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $employee_name = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>"' : '' ;
                    $claimed_vesting_rights = isset($data['params']['vesting_rights_name']) ? ' <span class="font-bold">"'.$data['params']['vesting_rights_name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>User'.$employee_name.' claimed'.$claimed_vesting_rights.' vesting rights</p>';

                    $CI->db->insert("logs", $insert_data);

                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $claimed_vesting_rights = isset($data['params']['vesting_rights_name']) ? ' <span class="font-bold">"'.$data['params']['vesting_rights_name'].'</span>"' : '' ;
                    $insert_data['value'] = '<p>Claimed'.$claimed_vesting_rights.' vesting rights</p>';

                    $CI->db->insert("logs", $insert_data);                

                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>"'.$data['params']['name'].'" has made a claim for "'.$data['params']['esop_name'].'". Please go to claims page to view the employee'."'".'s claim</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email(isset($data['params']['user_id']) ? $data['params']['user_id'] : 0);

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'settings/add_offer_letter')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $offer_letter = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>" ' : '' ;
                    $insert_data['value'] = '<p>Created letter'.$offer_letter.'</p>';

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'settings/update_offer_letter')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    if(isset($data['params']['diff']) && count($data['params']['diff']) > 0)
                    {
                        if(isset($data['params']['diff']['user_id']) && isset($data['params']['diff']['user_name']))
                        {
                            $data['params']['diff']['creator'] = $data['params']['diff']['user_name'];
                            $data['params']['from']['creator'] = $data['params']['from']['user_name'];
                            unset($data['params']['diff']['user_id']);
                            unset($data['params']['diff']['user_name']);
                        }

                        if(isset($data['params']['diff']['type']) && isset($data['params']['diff']['type_name']))
                        {
                            $data['params']['diff']['letter_type'] = $data['params']['diff']['type_name'];
                            $data['params']['from']['letter_type'] = $data['params']['from']['type_name'];
                            unset($data['params']['diff']['type']);
                            unset($data['params']['diff']['type_name']);
                        }
                    }

                    $insert_data['value'] = $this->_from_to_log_text($data['params']);

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'settings/archive_offer_letter')
                {
                    $insert_data = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "type"    => $this->type[$invoker],
                        "ref_id"  => isset($data['params']['id']) ? $data['params']['id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $offer_letter = isset($data['params']['name']) ? ' <span class="font-bold">"'.$data['params']['name'].'</span>" ' : '' ;
                    $insert_data['value'] = '<p>Archived letter'.$offer_letter.'</p>';

                    $CI->db->insert("logs", $insert_data);
                }
                else if(isset($data['params']) && $invoker == 'claims/send_claim_esop_to_admin')
                {
                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>Your claim is in process now. Please check your Claims page for updates on the status of your claim.</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Notification
                    $insert_data_notif_admin = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => '4',
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif_admin['value'] = '<p>"'.$CI->session->userdata('full_name').'" has sent "'.$data['params']['user_name'].'" claim for "'.$data['params']["esop_name"].'". Please go to the claims page to view the employee'."'".'s claim.</p>';

                    $CI->db->insert("notification", $insert_data_notif_admin);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email(isset($data['params']['user_id']) ? $data['params']['user_id'] : 0);

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif_admin['action_note'],
                                "message"=>$insert_data_notif_admin['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'claims/approve_esop_claim')
                {
                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>Admin "'.$CI->session->userdata('full_name').'" has approved '.$data['params']['user_name'].''."'s".' claim for "'.$data['params']["esop_name"].'". Please go to the claims page to finalize the claim.</p>';

                    $CI->db->insert("notification", $insert_data_notif);


                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email(isset($data['params']['user_id']) ? $data['params']['user_id'] : 0);

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'claims/mark_claim_as_completed')
                {
                    // For Notification
                    $insert_data_notif = array(
                        "user_id" => $CI->session->userdata('user_id'),
                        "user_role" => $this->role[$invoker],
                        "ref_id"  => isset($data['params']['user_id']) ? $data['params']['user_id'] : 0 ,
                        "date_created" => date("Y-m-d H:i:s"),
                        "action_note" => $this->action_lexicon[$invoker]
                    );

                    $insert_data_notif['value'] = '<p>Congratulations! Your claim for "'.$data['params']['esop_name'].'" has been finalized!</p>';

                    $CI->db->insert("notification", $insert_data_notif);

                    // For Email Notification

                        $user_info = $CI->Users_model->get_user_email(isset($data['params']['user_id']) ? $data['params']['user_id'] : 0);

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                }
                else if(isset($data['params']) && $invoker == 'esop/accept_multiple_offer')
                {
                    if(isset($data['params']['info']))
                    {
                        $employee_names = [];
                        foreach ($data['params']['info'] as $key => $info) {

                              $insert_data = array(
                                    "user_id" => $CI->session->userdata('user_id'),
                                    "type"    => $this->type[$invoker],
                                    "ref_id"  => isset($info['esop_id']) ? $info['esop_id'] : 0 ,
                                    "date_created" => date("Y-m-d H:i:s"),
                                    "action_note" => $this->action_lexicon[$invoker]
                                );

                              $employee_names[] = isset($info['empname']) ? $info['empname'] : '' ;
                              $insert_data['value'] = '<p>User '.$CI->session->userdata('full_name').' marked accepted '.$info['empname']."'".'s stock offer</p>';
                              $CI->db->insert("logs", $insert_data);
                            
                        }
                    
                      $employee_name = '<span class="font-bold">"'.implode(',', $employee_names).'</span>" ';
                      // For Notification
                      $insert_data_notif = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => $this->role[$invoker],
                            "ref_id"  => isset( $info['esop_id']) ?  $info['esop_id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                      );

                      $insert_data_notif['value'] = '<p>User '.$CI->session->userdata('full_name').' marked accepted '.$employee_name.'the stock offer</p>';
                      $CI->db->insert("notification", $insert_data_notif); 

                      // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        
                        // $CI->emailer->send_mail($email_notif);

                    // End For Email Notification
                    
                    }
                }
                else if(isset($data['params']) && $invoker == 'esop/save_upon_edit_stock_offers')
                {
                    if($data['params']['esop_name'])
                    {

                         $insert_data = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "type"    => $this->type[$invoker],
                            "ref_id"  => isset($data['params']['esop_id']) ? $data['params']['esop_id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                        );
                         
                        $insert_data['value'] = '<p>User '.$CI->session->userdata('full_name').' '.$data['params']['action'].' '.$data['params']['empname']."'".'s stock offer</p>';
                        $CI->db->insert("logs", $insert_data);
                        $insert_data_notif = array(
                            "user_id" => $CI->session->userdata('user_id'),
                            "user_role" => $this->role[$invoker],
                            "ref_id"  => isset($data['params']['esop_id']) ? $data['params']['esop_id'] : 0 ,
                            "date_created" => date("Y-m-d H:i:s"),
                            "action_note" => $this->action_lexicon[$invoker]
                        );

                      $insert_data_notif['value'] = '<p>User '.$CI->session->userdata('full_name').' '.$data['params']['action'].' '.$data['params']['empname'].'the stock offer</p>';
                      $CI->db->insert("notification", $insert_data_notif); 

                      // For Email Notification

                        $user_info = $CI->Users_model->get_user_email($CI->session->userdata('user_id'));

                        $email_notif = array(
                                "to"=>$user_info[0]["email"],
                                "user_name"=>$user_info[0]["name"],
                                "subject" => $insert_data_notif['action_note'],
                                "message"=>$insert_data_notif['value']
                            );

                        // $CI->emailer->send_mail($email_notif);
                        
                    // End For Email Notification


                    }
                }
            }
        }
    }

    /*returns text that will be saved in value field of logs*/
    private function _from_to_log_text($data = array())
    {
        $text = '';
        if (isset($data) && isset($data['from']) && isset($data['to']) && isset($data['diff']))
        {
            foreach ($data['diff'] as $key => $value) {
                if($key != 'password' && $key != 'img' && $key != 'content')
                {
                    $from_data = $data['from'][$key];
                    $to_data = $value;
                    $key_name = explode('_', $key);
                    $key_name = join(' ', $key_name);
                    $text .= '<p>Edited '.$key_name.' from <span class="font-bold">"'.$from_data.'"</span> to <span class="font-bold">"'.$to_data.'"</span></p>';
                }
                else
                {
                    if($key == 'img')
                    {
                        $text .= '<p>Edited image</p>';
                    }
                    else if($key == 'content')
                    {
                        $text .= '<p>Edited content</p>';
                    }
                    else
                    {
                        $key_name = explode('_', $key);
                        $key_name = join(' ', $key_name);
                        $text .= '<p>Edited '.$key_name.'</p>';
                    }
                }
            }   
        }
        return $text;
    }

    /*returns text that will be saved in value field of logs*/
    private function _create_log_text($data = array(), $created_text = '')
    {
        if (isset($data) && isset($data['name']) && isset($created_text) && strlen($created_text) > 0)
        {
            $text = '<p>Created '.$created_text.' <span class="font-bold">"'.$data['name'].'"</span></p>';
        }
        return $text;
    }

    private function _sanitize_log_data($data)
    {
        if (isset($data) && isset($data['id']))
        {
            unset($data['id']);
        }
        return $data;
    }
}