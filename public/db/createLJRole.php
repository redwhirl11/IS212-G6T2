<?php
require_once 'common.php';
$status = false;
$result = [];

//hardcode method
// $LJRole_ID = Null;
// $LJRole_Name = 'test';
// $LJRole_Description = 'test';
// $Department = 'Ops';
// $Key_Task = 'test';
// $LJRole_Status = 'Active';
// $Skill_ID = 2;

// $dao = new PostDAO();
// $status = $dao->createLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status,$Skill_ID);

//dynamic method
if( isset($_REQUEST['LJRole_ID']) && isset($_REQUEST['LJRole_Name'])&& isset($_REQUEST['LJRole_Description']) && isset($_REQUEST['Department']) && isset($_REQUEST['Key_Task']) && isset($_REQUEST['LJRole_Status']) && isset($_REQUEST['Skill_ID'])   ) {
    $LJRole_ID = $_REQUEST['LJRole_ID'];
    $LJRole_Name = $_REQUEST['LJRole_Name'];
    $LJRole_Description = $_REQUEST['LJRole_Description'];
    $Department = $_REQUEST['Department'];
    $Key_Task = $_REQUEST['Key_Task'];
    $LJRole_Status = $_REQUEST['LJRole_Status'];
    $Skill_ID = $_REQUEST['Skill_ID'];
    
    $dao = new PostDAO();
    $status = $dao-> createLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status,$Skill_ID);
}

if ($status)
    $result["status"] = "Post updated successfully";
else 
    $result["status"] = "Post was not updated";

$postJSON = json_encode($result);
echo $postJSON;
?>