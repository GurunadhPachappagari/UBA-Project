<?php


$Name=$_POST["Name"];
$Desig=$_POST["Designation"];
$Email=$_POST["Email"];
$Number=$_POST["Number"];
$Insti_name=$_POST["Institute_name"];

$Msg=$_POST["Message"];
$tomail="rajsurya1012@gmail.com";
$details="Name :".$Name."\n Designation :".$Desig.
		"\n Email :".$Email."\n Contact Number :".$Number."\n Institute Name :".$Insti_name."\n Message :".$Msg."\n";
$subject="Mail from UBA IIT PALAKKAD";

if(mail($tomail, $subject, $details))
{
	echo "Email sent";
}
else {
	echo "Failed to send";
}
$file = fopen("queries.csv","a");
$list = array (
	array($Name,$Desig,$Email,$Number,$Insti_name,$Insti_type,$Msg)
  );
  foreach ($list as $line) {
	fputcsv($file, $line);
  }
  
  fclose($file);
?>
