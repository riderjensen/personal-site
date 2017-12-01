<?php
error_reporting(E_ALL ^ E_NOTICE);

/*
Thank you for choosing FormToEmail by FormToEmail.com
Version 2.6 May 2014
COPYRIGHT FormToEmail.com 2003 - 2009
You are not permitted to sell this script, but you can use it, copy it or distribute it, providing that you do not delete this copyright notice, and you do not remove any reference or links to FormToEmail.com
For support, please visit: http://formtoemail.com/support/
SETUP INSTRUCTIONS
Enter your email address. Enter the email address below to send the contents of the form to.  You can enter more than one email address separated by commas, like so: $my_email = "info@example.com"; or $my_email = "bob@example.com,sales@example.co.uk,jane@example.com";
*/

$my_email = "riderjensen1@gmail.com";

/*

----------You do not need to make anty changes below this line ---------------
Optional.  Enter a From: email address.  Only do this if you know you need to.  By default, the email you get from the script will show the visitor's email address as the From: address.  In most cases this is desirable.  On the majority of setups this won't be a problem but a minority of hosts insist that the From: address must be from a domain on the server.  For example, if you have the domain example.com hosted on your server, then the From: email address must be something@example.com (See your host for confirmation).  This means that your visitor's email address will not show as the From: address, and if you hit "Reply" to the email from the script, you will not be replying to your visitor.  You can get around this by hard-coding a From: address into the script using the configuration option below.  Enabling this option means that the visitor's email address goes into a Reply-To: header, which means you can hit "Reply" to respond to the visitor in the conventional way.  (You can also use this option if your form does not collect an email address from the visitor, such as a survey, for example, and a From: address is required by your email server.)  The default value is: $from_email = "";  Enter the desired email address between the quotes, like this example: $from_email = "contact@example.com";  In these cases, it is not uncommon for the From: ($from_email) address to be the same as the To: ($my_email) address, which on the face of it appears somewhat goofy, but that's what some hosts require.

*/

$from_email = "";

/*

Optional.  Enter the continue link to offer the user after the form is sent.  If you do not change this, your visitor will be given a continue link to your homepage.

If you do change it, remove the "/" symbol below and replace with the name of the page to link to, eg: "mypage.htm" or "http://www.elsewhere.com/page.htm"

*/

//CHANGED BY PAUL CHENEY
$continue=$_REQUEST['redirect'];
if ($continue == null) 
{
	$continue = "/";
}



$errors = array();

// Remove $_COOKIE elements from $_REQUEST.

if(count($_COOKIE)){foreach(array_keys($_COOKIE) as $value){unset($_REQUEST[$value]);}}

// Validate email field.

if(isset($_REQUEST['email']) && !empty($_REQUEST['email']))
{

$_REQUEST['email'] = trim($_REQUEST['email']);

if(substr_count($_REQUEST['email'],"@") != 1 || stristr($_REQUEST['email']," ") || stristr($_REQUEST['email'],"\\") || stristr($_REQUEST['email'],":")){$errors[] = "Email address is invalid";}else{$exploded_email = explode("@",$_REQUEST['email']);if(empty($exploded_email[0]) || strlen($exploded_email[0]) > 64 || empty($exploded_email[1])){$errors[] = "Email address is invalid";}else{if(substr_count($exploded_email[1],".") == 0){$errors[] = "Email address is invalid";}else{$exploded_domain = explode(".",$exploded_email[1]);if(in_array("",$exploded_domain)){$errors[] = "Email address is invalid";}else{foreach($exploded_domain as $value){if(strlen($value) > 63 || !preg_match('/^[a-z0-9-]+$/i',$value)){$errors[] = "Email address is invalid"; break;}}}}}}

}

// Check referrer is from same site.

if(!(isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER']) && stristr($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST']))){$errors[] = "You must enable referrer logging to use the form";}

// Check for a blank form.

function recursive_array_check_blank($element_value)
{

global $set;

if(!is_array($element_value)){if(!empty($element_value)){$set = 1;}}
else
{

foreach($element_value as $value){if($set){break;} recursive_array_check_blank($value);}

}

}

recursive_array_check_blank($_REQUEST);

if(!$set){$errors[] = "You cannot send a blank form";}

unset($set);

// Display any errors and exit if errors exist.

if(count($errors)){foreach($errors as $value){print "$value<br>";} exit;}

if(!defined("PHP_EOL")){define("PHP_EOL", strtoupper(substr(PHP_OS,0,3) == "WIN") ? "\r\n" : "\n");}

// Build message.

function build_message($request_input){if(!isset($message_output)){$message_output ="";}if(!is_array($request_input)){$message_output = $request_input;}else{foreach($request_input as $key => $value){if(!empty($value)){if(!is_numeric($key)){$message_output .= str_replace("_"," ",ucfirst($key)).": ".build_message($value).PHP_EOL.PHP_EOL;}else{$message_output .= build_message($value).", ";}}}}return rtrim($message_output,", ");}

$message = build_message($_REQUEST);

$message = $message . PHP_EOL.PHP_EOL."-- ".PHP_EOL."Thank you for using FormToEmail from http://FormToEmail.com";

$message = stripslashes($message);

//CHANGED BY PAUL CHENEY
$subject=$_REQUEST['subject'];
if ($subject == null) 
{
	$subject = "From Your Website";
}
$subject = stripslashes($subject);
echo $subject;




if($from_email)
{

$headers = "From: " . $from_email;
$headers .= PHP_EOL;
$headers .= "Reply-To: " . $_REQUEST['email'];

}
else
{

$from_name = "";

if(isset($_REQUEST['name']) && !empty($_REQUEST['name'])){$from_name = stripslashes($_REQUEST['name']);}

$headers = "From: {$from_name} <{$_REQUEST['email']}>";

}

mail($my_email,$subject,$message,$headers);

// ADDED BY PAUL CHENEY
if ($continue != "/") {
	header("Location: $continue");
}

?>

<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Rider Jensen Creations</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
        

    </head>
    <body>

   <nav class="navbar navbar-inverse navbar-default navbar-fixed-top" data-spy="affix">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html"><img class="logo" src="img/noWords.png"></a>
          <a class="navbar-brand" href="index.html"><img  class="logo" src="img/logo.png"></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <ul id="ulClassHeader" class="nav navbar-nav navbar-right hidden">
            <li><a id="greetingMessage" href="#"></a></li>
          </ul>
          <ul class="nav navbar-nav navbar-left">
            <li><a href="#practice">Skill Set</a></li>
            </li>
            <li><a href="#people">Mission Statement</a></li>
            </li>
            <li><a href="#contact">Contact</a></li>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="https://www.facebook.com/notocarrider" target="_blank"><img class="logo" src="img/Facebook.png"></a>
            </li>
            <li><a href="https://www.linkedin.com/in/rider-jensen-a168a2102/" target="_blank"><img class="logo" src="img/Linked.png"></a>
            </li>
            <li><a href="https://twitter.com/RiderJensen1" target="_blank"><img class="logo" src="img/Twit.png"></a>
            </li>
            <li><a href="https://medium.com/@riderjensen1" target="_blank"><img class="logo" src="img/Medium.png"></a>
            </li>
            <li><a href="https://github.com/riderjensen" target="_blank"><img class="logo" src="img/github.png"></a>
            </li>

          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <br>
        <h1>Confirmation</h1>
        <p>Your message is on its way! You should be contacted shortly. Thank you for choosing Rider Jensen Creations. </p>
        <p>This email was transferred using <a href="http://FormToEmail.com">FormToEmail.com</a></p>
      </div>
    </div>


      <div class="container">
        <br>
        <p>Redirecting in 10 seconds...</p>
      </div>

  


   <div class="container">
      <div class="row fixingWidth siteWidth">
        <br>
        <div class="row">
          <br>
          
           <hr>
          <div class="col-md-4">
            <div>
              <p>&copy; Rider Jensen Creations 2018</p>
            </div>
          </div>
          <div class="col-md-4">
            <div>
             
            </div>
          </div>
          <div class="col-md-4"> 
            <a href="#top" class="alignCenter">Back To Top</a>
            
          </div>
        </div>  
      </div>
    </div><!--/container -->   

      <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
     
      <script src="js/vendor/bootstrap.min.js"></script>

      <script src="js/main.js"></script>
    </body>
</html>
