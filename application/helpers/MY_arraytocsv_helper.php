<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists( 'array_to_csv_download' ) )
{
    function array_to_csv_download($array, $filename, $report_type, $download = TRUE) {

        if($filename != '')
        {
            header('Content-Type: application/csv');
            header('Content-Disposition: attachment; filename="'.$filename.'";');
        }

        ob_start();
        $f = fopen("php://output", 'w');
        $str = "";

        switch($report_type)
        {
            case 'transaction':
                $str = _process_csv( array( 'report' => 'transaction' ), $array, $f );
                break;
            case 'billing':
                $str = _process_csv( array( 'report' => 'billing' ), $array, $f );
                break;
            case 'aging':
                $str = _process_agingreport( $array, $f );
                break;
            case 'order':
                $str = _process_csv( array( 'order' => 'Order' ), $array, $f );
                break;
        }

        ob_end_clean();

        if ($download)
        {
            echo $str;
        }
        else
        {
            return $str;
        }
    }
}

if ( ! function_exists( '_process_csv' ) )
{
    /**
     * The main processor of csv download
     * Puts the data to csv file
     *
     * @param array    $report_type Sample data array('report'=>'transaction')
     * @param array    $data        The array to be put in the csv file
     * @param resource $f           The file reference resource
     *
     * @return void
     */
    function _process_csv( $report_type, $data, $f )
    {
        $type = ucfirst( current( $report_type ) );
        fputcsv( $f, array( $type . ' Report' ), ',' );
        fputcsv( $f, array( '', '', 'Processed By:' ), ',' );

        fputcsv( $f, array(
            $type . ' ID',
            'Status',
            'Rep.Full name',
            'Division',
            'Position',
            'Rep.Contact No.',
            'Date Created',
            'Date Delivered',
            'Department',
            'Billing Address',
            'Dept.Contact No.',
            'Products',
            'Purchase Order Reference No.',
            'AMT NET OF 12% VAT',
            'Discount',
            'Total Quantity',
            'Total Amount'
        ), ',' );

        foreach($data as $data)
        {
        $price = 0;
        $quantity = 0;
        $key  = key( $report_type );
        $type = ucfirst( current( $report_type ) );
        $names = "";


        foreach ( $data['client_order'] as $k => $v )
        {
            $names .=  $data['client_order'][ $k ]['name'].'('. $data['client_order'][ $k ]['quantity'] .'),';
            $price += $data['client_order'][ $k ]['price'];
            $quantity += $data['client_order'][ $k ]['quantity'];
            /*fputcsv( $f,
                    array('', '','', '','', '','', '','', '','',
                        $names,
                        $price,
                        $quantity
                ), ','
            );*/

            $price += $data['client_order'][ $k ]['price'];
        }

        fputcsv( $f, array(
            ( isset( $data[ $key ]['transaction_id'] ) ? "".$data[ $key ]['transaction_id']."" : '' ),
            ( isset( $data['order_status']['name'] ) ? "".humanize( $data['order_status']['name']."" ) : '' ),
            ( isset( $data[ $key ]['representative_name'] ) ? "".$data[ $key ]['representative_name']."" : '' ),
            ( isset( $data[ $key ]['representative_division'] ) ? "".$data[ $key ]['representative_division']."" : '' ),
            ( isset( $data[ $key ]['representative_position'] ) ? "".$data[ $key ]['representative_position']."" : '' ),
            ( isset( $data[ $key ]['representative_contact_number'] ) ? "".$data[ $key ]['representative_contact_number']."" : '' ),
            _process_date("".$data[ $key ]['date_created'].""),
            _process_date("".$data[ $key ]['delivery_date'].""),
            ( isset( $data[ $key ]['representative_department'] ) ? "".$data[ $key ]['representative_department']."" : '' ),
            ( isset( $data[ $key ]['billing_address'] ) ? "".$data[ $key ]['billing_address']."" : '' ),
            ( isset( $data[ $key ]['department_contact_number'] ) ? "".$data[ $key ]['department_contact_number']."" : '' ),
            $names ,
            ( isset( $data[ $key ]['po_file'] ) ? "".$data[ $key ]['po_file']."" : 'No Purchase Order no. specified' ),
            ( isset( $data[ $key ]['vat'] ) ? "".$data[ $key ]['vat']."" : '' ),( isset( $data[ $key ]['discount'] ) ? "".$data[ $key ]['discount']."" : '' ), $quantity, to_money($price) ), ',' );

        $total = $price;

        /*fputcsv( $f, array( ' ' ), ',' );
            fputcsv( $f, array('', '','', '','', '','', '','', '','', 'Price', format_tomoney( $price ) ), ',' );
            fputcsv( $f, array('', '','', '','', '','', '','', '','',
            'Discount',
            ( isset( $data[ $key ]['discount'] ) ? $data[ $key ]['discount'] : '' )
        ), ',' );
            fputcsv( $f, array('', '','', '','', '','', '','', '','', 'Vat', ( (isset( $data[ $key ]['vat'] ) AND $data[ $key ]['vat'] == 0) ? '0.12' : '' ) ), ',' );
            fputcsv( $f, array('', '','', '','', '','', '','', '','', 'Total', format_tomoney( $total ) ), ',' );
        fputcsv( $f, array( ' ' ), ',' );
        fputcsv( $f, array( ' ' ), ',' );*/
        }


        // 	Price
        // Discount
        // Vat
        // Total

        // print_r($array);
        // echo "transaction to csv";
        // foreach ($array as $line )
        //    {
        //        fputcsv($f, $line,',');
        //    }
        // fclose($f);
        fclose($f);
        return ob_get_contents();
    }
}

function _process_agingreport ($data, $f)
{
    $test = 0;
    fputcsv( $f, array( 'Ageing Report' ), ',' );
    fputcsv( $f, array( ' ' ), ',' );
    fputcsv( $f, array(
            'Client Code:',
            'Client',
            'Rep. Full Name',
            'Invoice Number',
            'Invoice Date',
            'Date Received',
            'Due Date',
            'No. of Days Late',
            'OR Number',
        'Status',
        'Current',
        '1-30 Days',
        '31-60 Days',
        '61-120 Days',
        '121-180 Days',
        '181-360 Days',
        'Over 360 Days'
        ), ',' );
    foreach($data as $data_info)
    {

        foreach($data_info['data'] as $data)
        {


    fputcsv( $f, array(
        ( isset( $data['client_code'] ) ? "".$data['client_code']."" : '' ),
        ( isset( $data['client_name'] ) ? "".$data['client_name']."" : '' ),
        ( isset( $data['full_name'] ) ? "".$data['full_name']."" : '' ),
        ( isset( $data['invoice_num'] ) ? "".$data['invoice_num']."" : '' ),
        ( isset( $data['invoice_date'] ) ? "".$data['invoice_date']."" : '' ),
        ( ( $data['delivery_date'] != '0000-00-00 00:00:00' ) ? "".$data['delivery_date']."" : '' ),
        ( isset( $data['due_date'] ) ? "".$data['due_date']."" : '' ),
        ( isset( $data['num_days_late'] ) ? "".$data['num_days_late']."" : '' ),
        ( isset( $data['or_num'] ) ? "".$data['or_num']."" : '' ),
        ( isset( $data['payment_status_name'] ) ? "".$data['payment_status_name']."" : '' ),
            ($data['num_days_late'] == 0) ? $data['amount'] : '--',
            ($data['num_days_late'] >= 1 AND $data['num_days_late'] <= 30) ? "".$data['total_outstanding_receivables']."" : '--',
            ($data['num_days_late'] >= 31 AND $data['num_days_late'] <= 60) ? "".$data['total_outstanding_receivables']."" : '--',
            ($data['num_days_late'] >= 61 AND $data['num_days_late'] <= 120) ? "".$data['total_outstanding_receivables']."" : '--',
            ($data['num_days_late'] >= 121 AND $data['num_days_late'] <= 180) ? "".$data['total_outstanding_receivables']."" : '--',
            ($data['num_days_late'] >= 181 AND $data['num_days_late'] <= 360) ? "".$data['total_outstanding_receivables']."" : '--',
            ($data['num_days_late'] > 360) ? $data['amount'] : '--'
        ), ',' );

        }
    }
    fclose($f);
    return ob_get_contents();

}

if ( ! function_exists( '_process_date' ) )
{
    /**
     * Process the date
     *
     * @param string $date
     *
     * @return bool|string
     */
    function _process_date($date)
    {
        $return_date = '';

        if( isset( $date ) ){
            $d = to_full_date($date, 'M j, Y g:ia');

            $return_date = ( $d ) ? $d : '';
        }

        return $return_date;
    }
}

if ( ! function_exists('array_to_csv')){
    function array_to_csv($array, $download = "")
    {
        if ($download != "")
        { 
            header('Content-Type: application/csv; charset=utf-8');
            header('Content-Disposition: attachement; filename="' . $download . '"');
        }  

        ob_start();
        $f = fopen('php://output', 'w') or show_error("Can't open php://output");
        $n = 0;  
        foreach ($array as $line)
        {
            $n++;
            if ( ! fputcsv($f, $line))
            {
                show_error("Can't write line $n: $line");
            }
        }
        fclose($f) or show_error("Can't close php://output");
        $str = ob_get_contents();
        ob_end_clean();

        if ($download == "")
        {
            return $str; 
        }
        else
        { 
            echo $str;
        }  
    }
}