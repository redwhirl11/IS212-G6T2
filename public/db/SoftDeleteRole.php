<?php
require_once 'common.php';
$status = false;
$result = [];


//dynamic method
if( isset($_REQUEST['LJRole_ID']) ) {
    $LJRole_ID = $_REQUEST['LJRole_ID'];
    
    $dao = new PostDAO();
    $status = $dao->SoftDeleteRole($LJRole_ID);
}

if ($status)
    $result["status"] = "Post deleted (updated role status) successfully";
else 
    $result["status"] = "Post was not deleted (updated role status)";

$postJSON = json_encode($result);
echo $postJSON;
?>