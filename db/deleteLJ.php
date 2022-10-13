<?php
require_once 'common.php';
$status = false;
$result = [];

// $LJ_ID = 6;
// $Staff_ID= 2;
// $dao = new PostDAO();
// $status = $dao->deleteEditedLJcourses($LJ_ID, $Staff_ID, $SubmittedLJRole_ID,$Submitted_Skill_ID,$Submitted_CourseID);

//dynamic method

if( isset($_REQUEST['LJ_ID']) && isset($_REQUEST['Staff_ID'])) {
    $LJ_ID = $_REQUEST['LJ_ID'];
    $Staff_ID= $_REQUEST['Staff_ID'];
    
    $dao = new PostDAO();
    $status = $dao->deleteEditedLJcourses($LJ_ID, $Staff_ID);
}
if ($status)
    $result["status"] = "Post deleted successfully";
else 
    $result["status"] = "Post was not deleted";

$postJSON = json_encode($result);
echo $postJSON;
?>