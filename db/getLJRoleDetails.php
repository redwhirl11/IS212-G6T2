<?php
require_once 'common.php';
$dao = new PostDAO();

$posts=[];

// need to modify -- hardcode method
// $LJRole_ID = 00002;
// $posts = $dao->getLJRoleDetails($LJRole_ID);

//dynamic method
if(isset($_REQUEST['LJRole_ID'])){
    $LJRole_ID= $_REQUEST['LJRole_ID'];
    $posts = $dao->getLJRoleDetails($LJRole_ID);
}

 // Get an Indexed Array of Post objects
$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["LJRole_Name"] = $post_object->getLJRole_Name();
    $item["LJRole_Description"] = $post_object->getLJRole_Description();
    $item["Department"] = $post_object->getDepartment();
    $item["Key_Task"] = $post_object->getKey_Task();
    $item["Skill_ID"] = $post_object->getSkill_ID();
    $item["Skill_Name"] = $post_object->getSkill_Name();
    $item["Type_of_Skills"] = $post_object->getType_of_Skills();
    $item["Level_of_Competencies"] = $post_object->getLevel_of_Competencies();
    $item["Course_ID"] = $post_object->getCourse_ID();
    $item["Course_Name"] = $post_object->getCourse_Name();
    $item["Course_Desc"] = $post_object->getCourse_Desc();
    $item["Course_Type"] = $post_object->getCourse_Type();
    $item["Course_Category"] = $post_object->getCourse_Category();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>