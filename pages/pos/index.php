<?php

// tmp forced redirect to ugo POS
if (strpos($_SERVER['HTTP_HOST'], 'myugoonline.net') !== false) {
    header('Location: https://pos.myugoonline.net');
    exit();
}

header('Location: https://pos.paynup.com');
