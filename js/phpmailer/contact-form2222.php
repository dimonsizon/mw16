<?php
//header('Access-Control-Allow-Origin: *');
//header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'class.phpmailer.php';

if (isset($_POST['userName']) && isset($_POST['userEmail'])) {

    //check if any of the inputs are empty
    if (empty($_POST['userName']) || empty($_POST['userEmail']) || empty($_POST['userPhone'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail             = new PHPMailer(); // defaults to using php "mail()"	
	//$body             = file_get_contents('contents.html');

	
	//$mail->SetFrom($_POST['email'], 'Новый заказ');	
	$mail->From = $_POST['userEmail'];
    $mail->FromName = 'WercuryWorld';
	$mail->AddAddress("dmitry.sizon@gmail.com", "Guest");	
	$mail->Subject    = 'WercuryWorld';	
	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // Alt Body	
	
	//$mail->MsgHTML($body);
	$mail->Body = "<h3>Новая заявка:</h3>
					<p>Имя: " . $_POST['userName'] . "</p>
					<p>E-mail: " . stripslashes($_POST['userEmail']) . "</p>
					<p>Телефон: " . stripslashes($_POST['userPhone']) . "</p>
					<p>Сообщение: " . stripslashes($_POST['userMessage']) . "</p>";
	//$mail->AddAttachment("images/" . stripslashes($_POST['userImage']));      // attachment
	//$mail->AddAttachment("images/2.jpg"); // attachment

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Сообщение не отправлено. Ошибка: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Спасибо! Ваша заявка отправлена.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Заполните форму правильно.');
    echo json_encode($data);

}