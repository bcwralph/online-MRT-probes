<?php

  //get data pushed
  $studyid=$_POST['put-studyid-here'];
  $sscode=$_POST['put-sscode-here'];
  $data=$_POST['put-data-here'];

  // write to file
  file_put_contents('data/' . $studyid . '-' . $sscode . '-data.txt', $data, FILE_APPEND);
  include("feedback-letter.html");
?>
