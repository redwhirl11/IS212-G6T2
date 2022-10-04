<?php
require_once 'common.php';
$dao = new PostDAO();

$posts=[];

$posts = $dao->getRegCourse();

 // Get an Indexed Array of Post objects
$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["Reg_ID"] = $post_object->getReg_ID();
    $item["Course_ID"] = $post_object->getCourse_ID();
    $item["Staff_ID"] = $post_object->getStaff_ID();
    $item["Reg_Status"] = $post_object->getReg_Status();
    $item["Completion_Status"] = $post_object->getCompletion_Status();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>