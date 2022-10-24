<?php
require_once 'common.php';
$status = false;
$result = [];

//hardcode method
// $Skill_ID = 2;
// $dao = new PostDAO();
// $status = $dao->SoftDeleteSkill($Skill_ID);

//dynamic method
if( isset($_REQUEST['Skill_ID']) ) {
    $Skill_ID = $_REQUEST['Skill_ID'];
    
    $dao = new PostDAO();
    $status = $dao->SoftDeleteSkill($Skill_ID);
}

if ($status)
    $result["status"] = "Post deleted (updated skill status) successfully";
else 
    $result["status"] = "Post was not deleted (updated skill status)";

$postJSON = json_encode($result);
echo $postJSON;
?>