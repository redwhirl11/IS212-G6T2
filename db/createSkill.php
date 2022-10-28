<?php
require_once 'common.php';
$status = false;
$result = [];

//hardcode method
// $Skill_ID = '';
// $Skill_Name = 'test';
// $Type_of_Skills = 'Soft';
// $Level_of_Competencies = 'Beginner';
// $Skill_Status = 'Active';
// $Course_ID = 'FIN002';

// $dao = new PostDAO();
// $status = $dao->createSkill($Skill_ID,$Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Skill_Status,$Course_ID);

//dynamic method
if( isset($_REQUEST['Skill_ID']) && isset($_REQUEST['Skill_Name'])&& isset($_REQUEST['Type_of_Skills']) && isset($_REQUEST['Level_of_Competencies']) && isset($_REQUEST['Skill_Status']) && isset($_REQUEST['Course_ID'])  ) {
    $Skill_ID = $_REQUEST['Skill_ID'];
    $Skill_Name = $_REQUEST['Skill_Name'];
    $Type_of_Skills = $_REQUEST['Type_of_Skills'];
    $Level_of_Competencies = $_REQUEST['Level_of_Competencies'];
    $Skill_Status = $_REQUEST['Skill_Status'];
    $Course_ID = $_REQUEST['Course_ID'];
    
    $dao = new PostDAO();
    $status = $dao->createSkill($Skill_ID,$Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Skill_Status,$Course_ID);
}

if ($status)
    $result["status"] = "Post updated successfully";
else 
    $result["status"] = "Post was not updated";

$postJSON = json_encode($result);
echo $postJSON;
?>