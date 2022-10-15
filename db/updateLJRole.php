<?php
require_once 'common.php';
$status = false;
$result = [];

//hardcode method
$LJRole_ID = 1;
$LJRole_Name = 'Regional Data Analyst';
$LJRole_Description = 'The Data Analyst partners with Regional Operations teams to provide analytical support to help the team achieve objectives. The Data Analyst masters both the data and business domains to play a key role in decision-making';
$Department = 'Ops';
$Key_Task = '1) Sourcing and analysing new data sources. 2) Provide actionable recommendations based on data insights to drive business outcomes. 3) Create reports and visualisation tools (dashboards) to facilitate understanding of data';
$LJRole_Status = 'Active';

$dao = new PostDAO();
$status = $dao-> updateLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status);

//dynamic method
// if( isset($_REQUEST['LJRole_ID']) && isset($_REQUEST['LJRole_Name'])&& isset($_REQUEST['LJRole_Description']) && isset($_REQUEST['Department']) && isset($_REQUEST['Key_Task']) && isset($_REQUEST['LJRole_Status'])   ) {
//     $LJRole_ID = $_REQUEST['LJRole_ID'];
//     $LJRole_Name = $_REQUEST['LJRole_Name'];
//     $LJRole_Description = $_REQUEST['LJRole_Description'];
//     $Department = $_REQUEST['Department'];
//     $Key_Task = $_REQUEST['Key_Task'];
//     $LJRole_Status = $_REQUEST['LJRole_Status'];
    
//     $dao = new PostDAO();
//     $status = $dao-> updateLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status);
// }

if ($status)
    $result["status"] = "Post updated successfully";
else 
    $result["status"] = "Post was not updated";

$postJSON = json_encode($result);
echo $postJSON;
?>