<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'common.php';
$dao = new PostDAO();

$posts=[];

$posts = $dao->getAllRoles();

 // Get an Indexed Array of Post objects
$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["LJRole_ID"] = $post_object->getLJRole_ID();
    $item["LJRole_Name"] = $post_object->getLJRole_Name();
    $item["LJRole_Description"] = $post_object->getLJRole_Description();
    $item["Department"] = $post_object->getDepartment();
    $item["Key_Task"] = $post_object->getKey_Task();
    $item["LJRole_Status"] = $post_object->getLJRole_Status();
    $item["Skill_ID"] = $post_object->getSkill_ID();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>