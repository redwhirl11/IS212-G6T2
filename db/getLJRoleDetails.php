<?php
require_once 'common.php';
$dao = new PostDAO();

$posts=[];

// need to modify -- hardcode method
$LJRole_ID = 00001;
$posts = $dao->getLJRoleDetails($LJRole_ID);

//dynamic method
// if(isset($_REQUEST['LJ_ID'])){
//     $LJ_ID= $_REQUEST['LJ_ID'];
//     $posts = $dao->getSubmittedRoleDetails($LJ_ID);
// }

 // Get an Indexed Array of Post objects
$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["LJRole_Name"] = $post_object->getLJRole_Name();
    $item["LJRole_Description"] = $post_object->getLJRole_Description();
    $item["Department"] = $post_object->getDepartment();
    $item["Key_Task"] = $post_object->getKey_Task();
    $item["LJRole_Status"] = $post_object->getLJRole_Status();
    $item["LJRole_img"] = $post_object->getLJRole_img();
    $item["Skill_ID"] = $post_object->getSkill_ID();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>