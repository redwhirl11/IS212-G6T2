<?php
require_once 'common.php';
$status = false;
$result = [];



//dynamic method
if( isset($_REQUEST['Skill_ID']) && isset($_REQUEST['Skill_Name'])&& isset($_REQUEST['Type_of_Skills']) && isset($_REQUEST['Level_of_Competencies']) && isset($_REQUEST['Skill_Status'])  ) {
    $Skill_ID = $_REQUEST['Skill_ID'];
    $Skill_Name = $_REQUEST['Skill_Name'];
    $Type_of_Skills = $_REQUEST['Type_of_Skills'];
    $Level_of_Competencies = $_REQUEST['Level_of_Competencies'];
    $Skill_Status = $_REQUEST['Skill_Status'];
    
    $dao = new PostDAO();
    $status = $dao->updateSkill($Skill_ID,$Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Skill_Status);
}

if ($status)
    $result["status"] = "Post updated successfully";
else 
    $result["status"] = "Post was not updated";

$postJSON = json_encode($result);
echo $postJSON;
?>