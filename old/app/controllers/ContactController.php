<?php
namespace App\Controllers;

ini_set("display_errors", '1');
error_reporting(E_ALL);

class ContactController extends BaseController
{
    /**
     * ctor
     *
     * @param [type] $container
     */
    public function __construct($container)
    {
        parent::__construct($container);
    }

    /**
     * delete client by id
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function sendEmail($request, $response)
    {
        $name = $request->getParam('nume');
        $email = $request->getParam('email');
        $message = $request->getParam('mesaj');
        

        $to = "contact@24plus.ro";
        $subject = "Mesaj de pe 24plus.ro";
        $from =  $email;
        $headers = "From:" . $from;
        $sent = mail($to, $subject, $name . " --> " . $message, $headers);
        if (!$sent) {
            $data = ['Error: ' => 'Emailul nu a fost trimis!'];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }
}
