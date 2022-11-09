<?php
require_once 'common.php';
$status = false;
$result = [];

//dynamic method
if( isset($_REQUEST['Skill_ID']) ) {
    $LJRole_ID = $_REQUEST['LJRole_ID'];
    
    $dao = new PostDAO();
    $status = $dao->deleteLJSkill($LJRole_ID);
}
if ($status)
    $result["status"] = "Post deleted successfully";
else 
    $result["status"] = "Post was not deleted";

$postJSON = json_encode($result);
echo $postJSON;
?>