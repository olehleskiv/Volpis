<?php
$volpis_Email ='leo_04@i.ua'                 //'volpis.info@gmail.com';
$name = $_POST['name']; //Все поля получают данные имени input'a (name="name", name="email", name="message")
$email = $_POST['email'];
$tel = $_POST['tel'];
$message = $_POST['message'];
$subjectuser  = "Сообщение";
$headersuser  = "From: Сообщение\r\n";
$headersuser .= "Reply-To: ". strip_tags($username) . "\r\n";
$headersuser .= "MIME-Version: 1.0\r\n";
$headersuser .= "Content-Type: text/html;charset=utf-8 \r\n";
$my_file = "";

if (!empty($_FILES['file']['tmp_name'])) {
	$path = $_FILES['file']['name']; 
	if (copy($_FILES['file']['tmp_name'], $path)) $my_file = $path; 
}
$my_message = '<b>Ім\'я замовника: </b>'.$name.'<br /><b>E-mail замовника: </b>'.$email.'<br /><b>Телефон замовника:</b>'.$tel.'<br /><b>Повідомлення від замовника: </b>'.$message;
 
require_once('PHPMailer/class.phpmailer.php');

$mail = new PHPMailer(true);                 //New instance, with exceptions enabled
$mail->CharSet = "UTF-8";
$mail->IsSMTP();                             // telling the class to use SMTP
$mail->Host       = "s02.atomsmtp.com";      // SMTP server
$mail->SMTPDebug  = 0;                       // enables SMTP debug information (for testing)
                                             // 1 = errors and messages
                                             // 2 = messages only
$mail->SMTPAuth   = true;                    // enable SMTP authentication
$mail->Port       = 465;                     // set the SMTP port for the GMAIL server
$mail->SMTPSecure = 'ssl';                   //Secure SMTP
$mail->Username   = "leo_04@i.ua";           // SMTP account username (Логин от почты SMTP)
$mail->Password   = "g6FL8teKQj6qTc";        // SMTP account password (Пароль от почты SMTP)
$mail->SetFrom('leo_04@i.ua', 'Volpis');
$mail->AddReplyTo('leo_04@i.ua','Volpis');
$mail->Subject    = "Нове замовлення із сайту Volpis";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
$mail->MsgHTML($my_message);
$address = $volpis_Email;
$mail->AddAddress($address, "Volpis");
$mail->CharSet="UTF-8";

$plik_tmp = $_FILES['file']['tmp_name'];
$plik_rozmiar = $_FILES['file']['size'];
$plik_nazwa = $_FILES['file']['name'];
if(is_uploaded_file($plik_tmp)) {
$nazwa_g=$plik_nazwa;

move_uploaded_file($plik_tmp, 'tmp_emails/'.$nazwa_g); //Set the 777 right to the folder
$mail->AddAttachment('tmp_emails/'.$nazwa_g, $nazwa_g);
}

$mail->IsHTML(true); // send as HTML

if(!$mail->Send())
{
unlink('tmp_emails/'.$plik_nazwa);
echo "Error during sending! Please try again!";

}
else
{
unlink('tmp_zal/'.$plik_nazwa);
echo 'Message was sent successfully!';
}
?>