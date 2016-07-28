<!DOCTYPE html>
<html lang="en">

	<head>

		<!-- Basic -->
		<meta charset="utf-8">
		<title>Thank You | Front End Developer | Contact</title>
		<meta name="author" content="Josh Manion">
		<meta name="norobots" content="noindex,nofollow">
		<meta name="keywords" content="Contact form, Thank you, Contact Thank You">
		<meta name="description" content="Intermediate HTML thank you page to be seen after filling out the contact form.">		
		   
		<!-- Libs CSS -->
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
		
		<!-- Google Fonts -->	
		<link href='http://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900' rel='stylesheet' type='text/css'>
		   
		<!-- Google Analytics -->
		<script>

		</script>
		   
	</head>

	<body>
	
		<div id="contentForm">

			<?php
			header('Content-Type: text/html; charset=utf-8');

			if(isset($_POST['email'])) {
				 
					 
				// EDIT THE 2 LINES BELOW AS REQUIRED
				 
				$email_to = "frontenddev99@gmail.com";
				 
				$email_subject = "Front End Developer Contact";
				 
				   
				$first_name = $_POST['first_name']; // required 
				$email_from = $_POST['email']; // required
				$phone = $_POST['phone']; // required
				 
				$email_message = "Form details below.\n\n";
				 
					
				function clean_string($string) {
					$bad = array("content-type","bcc:","to:","cc:","href");
					return str_replace($bad,"",$string);
				}
				 
				 
				$email_message .= "Name: ".clean_string($first_name)."\n";
				$email_message .= "Email Address: ".clean_string($email_from)."\n";
				$email_message .= "Phone Number: ".clean_string($phone)."\n";
				 
					 
				// create email headers
				 
				$headers = 'From: '.$email_from."\r\n".
				 
				'Reply-To: '.$email_from."\r\n" .
				 
				'X-Mailer: PHP/' . phpversion();
				 
				@mail($email_to, $email_subject, $email_message, $headers); 
				 
				?>
				 
				<!-- Message sent! (change the text below as you wish)-->
				<div class="container">
					<div class="row">
						<div class="col-sm-6 col-sm-offset-3">
							<div id="form_response" class="text-center">
								<img class="img-responsive" src="images/mail_sent.png" alt="image" />
								<h1>Congratulations!!!</h1>
								<p>Thank you <b><?=$first_name;?></b>, your message is sent!</p>
								<a href="index.html">
								<button class="btn btn-theme btn-lg">Back To The Site</button></a>
							</div>
						</div>	
					</div>					
				</div>
				 <!--End Message Sent-->

				<?php
				 
				}

				?>

		</div>
		
	</body>

</html>