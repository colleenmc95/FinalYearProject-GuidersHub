<?php

$db =
mysql_connect('localhost', 'root', '', 'guidershub')
  or die ('Error connecting to my sql');


  //get values pass from form in loginPage
  $username = $_POST['username'];
  $password = $_POST['password'];


  //to pervent sql injection
  $username = stripcslashes ($username);
  $password = stripcslashes ($password);
  $username = mysql_real_escape_string($username);
  $password = mysql_real_escape_string($password);

  //connect to server and select DB
  // mysql_connect("localhost", "root", "");
  // mysql_select_db("guidershub");


  //Query the DB for user
  $result = mysql_query("select * from admin where username = '$username' and
  password = '$password'")
  or die("failed to query".mysql_error());

  $row = mysql_fetch_array($result);
  if ($row ['username'] == $username && $row['password'] = $password){
   echo "Login success!! Welcome " .$row['username'];
   //show content
  }
  else {
    echo "Fail";
    //if login was a fail then continue to hide content
  }

 ?>
