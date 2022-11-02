<?php
require_once 'common.php';
$status = false;
$result = [];



// dynamic method
if( isset($_REQUEST['LJRole_ID']) && isset($_REQUEST['LJRole_Name'])&& isset($_REQUEST['LJRole_Description']) && isset($_REQUEST['Department']) && isset($_REQUEST['Key_Task']) && isset($_REQUEST['LJRole_Status'])   ) {
    $LJRole_ID = $_REQUEST['LJRole_ID'];
    $LJRole_Name = $_REQUEST['LJRole_Name'];
    $LJRole_Description = $_REQUEST['LJRole_Description'];
    $Department = $_REQUEST['Department'];
    $Key_Task = $_REQUEST['Key_Task'];
    $LJRole_Status = $_REQUEST['LJRole_Status'];
    
    $dao = new PostDAO();
    $status = $dao-> updateLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status);
}

if ($status)
    $result["status"] = "Post updated successfully";
else 
    $result["status"] = "Post was not updated";

$postJSON = json_encode($result);
echo $postJSON;
?>