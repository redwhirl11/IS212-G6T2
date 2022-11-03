<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");
// header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

spl_autoload_register(function ($class){
    require_once "model/$class" . ".php";
});

?>