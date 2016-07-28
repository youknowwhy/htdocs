<!DOCTYPE html>
<html lang="en">

  <head>

  <!-- Basic -->
  <meta charset="utf-8">
  <title>Thank You | seattle mover quote | Contact</title>
  <meta name="author" content="Josh Manion">
  <meta name="norobots" content="noindex,nofollow">
  <meta name="keywords" content="Contact form, Thank you, Contact, Thank You">
  <meta name="description" content="Intermediate HTML thank you page to be seen after filling out the contact form.">   
     
  <!-- Libs CSS -->
  <link href="css/style.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  
  <!-- Google Fonts --> 
  <link href='http://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900' rel='stylesheet' type='text/css'>
     
  <!-- Google Analytics -->
  
       
  </head>

  <body>
  
    <div id="contentForm">

      <?php
/* Josh Manion | Green Dragon Opt-in Script
 * Opt-in list building script
 * Ver 1.30
**/

/* Set the filename where you want to save the email addresses of your subscribers.
 * The script can't function if you don't set this variable properly! Refer to our detailed manual for instructions.
**/
  $emailsFile = 'contact-us.txt';

/* if you want to receive an email every time someone subscribes to your newsletter,
 * enter your email into this variable. Othervise leave it blank.
**/
  $myEmail = 'joshthemover@welike2moveitmoveit.com';

/**** DO NOT EDIT BELOW THIS LINE ****/
/**** DO NOT EDIT BELOW THIS LINE ****/
  ob_start();

  function response($responseStatus, $responseMsg) {
    $out = json_encode(array('responseStatus' => $responseStatus, 'responseMsg' => $responseMsg));

    ob_end_clean();
    die($out);
  }

  // only AJAX calls allowed
 // if (!isset($_SERVER['X-Requested-With']) && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
  //  response('err', 'ajax');
  //}

  // can't read/write to emails file?
  if (($file = fopen($emailsFile, 'r+')) == false) {
    response('err', 'fileopen');
  }

  // invalid name?
  if(!isset($_POST['newsletter-name'])
     || !trim($_POST['newsletter-name'])
     || strtolower($_POST['newsletter-name']) == 'name'
     || strlen($_POST['newsletter-name']) < 3) {
    response('err', 'name');
  }
  
  // invalid email address?
  if(!isset($_POST['newsletter-email']) || !preg_match('/^[^@]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/', trim($_POST['newsletter-email']))) {
    response('err', 'email');
  }

  // duplicate entry
  $name = trim(ucfirst($_POST['newsletter-name']));
  $emailAddress = trim(strtolower($_POST['newsletter-email']));
  while($line = fgets($file)) {
    $line = explode(' ', trim($line));
    $email = $line[0];
    if ($email == $emailAddress) {
      response('err', 'duplicate');
    }
  } // while

  // write email to file
  fseek($file, 0, SEEK_END);
  if (fwrite($file, $emailAddress . ' - ' . $name . PHP_EOL) == strlen($emailAddress . ' - ' . $name . PHP_EOL)) {
    // send email to site owner with new subscrciber info
    if (preg_match('/^[^@]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/', trim($myEmail))) {
        $headers  = "MIME-Version: 1.0 \n";
        $headers .= "Content-type: text/plain; charset=UTF-8 \n";
        $headers .= "X-Mailer: PHP " . PHP_VERSION . "\n";
        $headers .= "From: {$myEmail} \n";
        $headers .= "Return-Path: {$myEmail} \n";
        $message = 'The following person was kind enough to ask for a moving quote:' . PHP_EOL . $name . ' - ' . $emailAddress;
        @mail($myEmail, 'New Moving Quote Request', $message, $headers);
    }
         
        ?>
         
        <!-- Message sent! (change the text below as you wish)--><center>
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <div id="form_response" class="text-center">
                <img class="img-responsive" src="img/mail_sent.png" alt="mail sent image" />
                <h1>Contact Successful!</h1>
                <p>Thank you <b><?=$first_name; /?></b>, I value your time, thank you for requesting a qoute, I will call you as soon as I'm able. =) <br/> You'll also now get our updates, newsletter and special offers! </p>
                <a class="btn btn-theme btn-lg" href="http://welike2moveitmoveit.com">Back To The Site</a>
              </div>
            </div>  
          </div>          
        </div>
         <!--End Message Sent--> </center>

        <?php
         
        }

        ?>

    </div>
    
  </body>

</html>