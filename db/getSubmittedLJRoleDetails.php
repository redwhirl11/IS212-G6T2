<?php
require_once 'common.php';
$dao = new PostDAO();

$posts=[];
// need to modify -- hardcode method
$LJ_ID = 00001;
$posts = $dao->getSubmittedRoleDetails($LJ_ID);

//dynamic method
// if(isset($_REQUEST['LJ_ID'])){
//     $LJ_ID= $_REQUEST['LJ_ID'];
//     $posts = $dao->getSubmittedRoleDetails($LJ_ID);
// }
 // Get an Indexed Array of Post objects
$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["SubmittedLJRole_ID"] = $post_object->getSubmittedLJRole_ID();
    $item["SubmittedSkill_ID"] = $post_object->getSubmittedSkill_ID();
    $item["Submitted_CourseID"] = $post_object->getSubmitted_CourseID();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>