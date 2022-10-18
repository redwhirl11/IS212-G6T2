<?php
require_once 'common.php';
$dao = new PostDAO();

$posts = [];

$posts = $dao->getAllSkills();

 // Get an Indexed Array of Post objects
 $items = [];
 foreach( $posts as $post_object ) {
     $item = [];
     $item["Skill_ID"] = $post_object->getSkill_ID();
     $item["Skill_Name"] = $post_object->getSkill_Name();
     $item["Type_of_Skills"] = $post_object->getType_of_Skills();
     $item["Level_of_Competencies"] = $post_object->getLevel_of_Competencies();
     $item["Skill_Status"] = $post_object->getSkill_Status();
     $item["Course_ID"] = $post_object->getCourse_ID();
     $items[] = $item;
 }
 // make posts into json and return json data
 $postJSON = json_encode($items);
 echo $postJSON;
 ?>