<?php
require_once 'common.php';
$dao = new PostDAO();

$posts=[];

// need to modify -- hardcode method
// $Staff_ID = 00002;
// $posts = $dao->getRegCourse($Staff_ID);

//dynamic method
if(isset($_REQUEST['Staff_ID'])){
    $Staff_ID= $_REQUEST['Staff_ID'];
    $posts = $dao->getRegCourse($Staff_ID);
}

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