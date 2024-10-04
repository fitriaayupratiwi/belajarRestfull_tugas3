<?php
$url='';
$responser='https://api.coindesk.com/v1/bpi/currentprice.json';
//curl
//file debcontent
if(responser===false)
die("data tidak ada");

$data= json_decode($responser,$url);
print_r(data);
?>