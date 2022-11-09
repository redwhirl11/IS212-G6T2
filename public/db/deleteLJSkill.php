<?php
require_once 'common.php';
$status = false;
$result = [];

//dynamic method
if( isset($_REQUEST['Skill_ID']) ) {
    $Skill_ID = $_REQUEST['Skill_ID'];
    
    $dao = new PostDAO();
    $status = $dao->deleteLJSkill($Skill_ID);
}
if ($status)
    $result["status"] = "Post deleted successfully";
else 
    $result["status"] = "Post was not deleted";

$postJSON = json_encode($result);
echo $postJSON;
?>