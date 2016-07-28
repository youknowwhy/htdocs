<?php
/* Josh Manion | Red Dragon Web Media
 * Website Giveaway list building script
 * Ver 1.30
**/

/* Set the filename where you want to save the email addresses of your subscribers.
 * The script can't function if you don't set this variable properly! Refer to our detailed manual for instructions.
**/
  $emailsFile = 'SEOcontestlist.txt';

/* if you want to receive an email every time someone subscribes to your newsletter,
 * enter your email into this variable. Othervise leave it blank.
**/
  $myEmail = 'reddragonwebmedia@gmail.com';

/**** DO NOT EDIT BELOW THIS LINE ****/
/**** DO NOT EDIT BELOW THIS LINE ****/
  ob_start();

  function response($responseStatus, $responseMsg) {
    $out = json_encode(array('responseStatus' => $responseStatus, 'responseMsg' => $responseMsg));

    ob_end_clean();
    die($out);
  }

  // only AJAX calls allowed
  //if (!isset($_SERVER['X-Requested-With']) && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
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
        $message = 'The following person was kind enough to enter in your SEO giveaway:' . PHP_EOL . $name . ' - ' . $emailAddress;
        @mail($myEmail, 'You have a new SEO contest entrant', $message, $headers);
    }
    response('ok', 'subscribed');
  } else {
    response('err', 'filewrite');
  }

  response('err', 'undefined');
?>