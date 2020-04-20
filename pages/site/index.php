<?php

if (0 === strpos($_SERVER['REQUEST_URI'], '/site/') {
    $merchantId = substr($_SERVER['REQUEST_URI'], 6);

    if (!$merchantId) {
        header('Location: https://'.$_SERVER['HTTP_HOST'].'/'.$merchantId);
        exit();
    }
}

header('Location: https://'.$_SERVER['HTTP_HOST']);
exit();
