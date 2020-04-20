<?php

$merchantId = substr($_SERVER['REQUEST_URI'], 7);

if (!$merchantId) {
    header('Location: https://pos.paynup.com');
    exit();
}

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.paynup.com',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>"{ \"query\": \"query { merchantInfo(identifier: \\\"$merchantId\\\") { name number ... on DealerMerchantInfo { agent { posUrl }}}}\"\n}",
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
));
$response = curl_exec($curl);
curl_close($curl);
$merchantInfo = json_decode($response, true);

if (!isset($merchantInfo['data']['merchantInfo']['agent']['posUrl'])) {
    header('Location: https://pos.paynup.com');
    exit();
}

header('Location: '.$merchantInfo['data']['merchantInfo']['agent']['posUrl'].'?merchant='.$merchantId);

