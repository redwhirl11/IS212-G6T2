<?php
require_once 'common.php';
$status = false;
$result = [];

// $LJ_ID = 6;
// $Staff_ID= 2;
// $SubmittedLJRole_ID = 2;
// $Submitted_Skill_ID = 1;
// $Submitted_CourseID= 'C8';
// $dao = new PostDAO();
// $status = $dao->saveEditedLJ($LJ_ID, $Staff_ID, $SubmittedLJRole_ID,$Submitted_Skill_ID,$Submitted_CourseID);

//dynamic method

if( isset($_REQUEST['LJ_ID']) && isset($_REQUEST['Staff_ID']) && isset($_REQUEST['SubmittedLJRole_ID'])&& isset($_REQUEST['Submitted_Skill_ID']) && isset($_REQUEST['Submitted_CourseID']) ) {
    $LJ_ID = $_REQUEST['LJ_ID'];
    $Staff_ID= $_REQUEST['Staff_ID'];
    $SubmittedLJRole_ID = $_REQUEST['SubmittedLJRole_ID'];
    $Submitted_Skill_ID = $_REQUEST['Submitted_Skill_ID'];
    $Submitted_CourseID= $_REQUEST['Submitted_CourseID'];
    
    $dao = new PostDAO();
    // $delete = $dao->deleteEditedLJcourses($LJ_ID, $Staff_ID);
    $status = $dao->saveEditedLJ($LJ_ID, $Staff_ID, $SubmittedLJRole_ID,$Submitted_Skill_ID,$Submitted_CourseID);
}
if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo $postJSON;
?>