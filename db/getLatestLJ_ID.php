<?php
require_once 'common.php';
$dao = new PostDAO();

$posts = [];

$posts = $dao->getLJs();

 // Get an Indexed Array of Post objects
 $items = [];
 foreach( $posts as $post_object ) {
     $items[] = $post_object->getLJ_ID();
 }
 // make posts into json and return json data
 echo $items[count($items) - 1];
 ?>