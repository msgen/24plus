<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../bootstrap/app.php';
require __DIR__ . '/../app/routes.php';

$app->run();
