<?php
require_once 'common.php';
$dao = new PostDAO();

$posts = [];

$posts = $dao->getAllCourses();

 // Get an Indexed Array of Post objects
 $items = [];
 foreach( $posts as $post_object ) {
     $item = [];
     $item["Course_ID"] = $post_object->getCourse_ID();
     $item["Course_Name"] = $post_object->getCourse_Name();
     $item["Course_Desc"] = $post_object->getCourse_Desc();
     $item["Course_Status"] = $post_object->getCourse_Status();
     $item["Course_Type"] = $post_object->getCourse_Type();
     $item["Course_Category"] = $post_object->getCourse_Category();
     $items[] = $item;
 }
 // make posts into json and return json data
 $postJSON = json_encode($items);
 echo $postJSON;
 ?>