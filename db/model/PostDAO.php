<?php

require_once 'common.php';

class PostDAO {
    public function getSubmittedRoleDetails($LJ_ID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    SubmittedLJRole_ID, SubmittedSkill_ID, Submitted_CourseID
                FROM learning_journey
                WHERE
                LJ_ID= :LJ_ID"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $SubmittedLJRole = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $SubmittedLJRole[] =
                new Post (
                    $row['SubmittedLJRole_ID'],
                    $row['SubmittedSkill_ID'],
                    $row['Submitted_CourseID']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $SubmittedLJRole;
    }

    public function getAllRoles() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                     *
                FROM ljroles 
                WHERE LJRole_Status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        // $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $AllRoles = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $AllRoles[] =
                new AllRoles (
                    $row['LJRole_Name'],
                    $row['LJRole_Description'],
                    $row['Department'],
                    $row['Key_Task'],
                    $row['LJRole_Status'],
                    $row['LJRole_img'],
                    $row['Skill_ID']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $AllRoles;
    }

    public function getLJRoleDetails($LJRole_ID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // STEP 2
        $sql = "SELECT
                    LJRole_Name, LJRole_Description, Department, Key_Task,LJRole_img, Skill_Name, Type_of_Skills, Level_of_Competencies, Skill_img, Course_Name, Course_Desc, Course_Type,Course_Category 
                FROM ljroles
                JOIN skills ON skills.Skill_ID = ljroles.Skill_ID  
                JOIN course ON skills.Course_ID = course.Course_ID
                WHERE
                LJRole_ID= :LJRole_ID and LJRole_status = 'Active' and Skill_Status = 'Active' and Course_Status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':LJRole_ID', $LJRole_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $LJRoleDetails = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $LJRoleDetails[] =
                new RoleDetails (
                    $row['LJRole_Name'],
                    $row['LJRole_Description'],
                    $row['Department'],
                    $row['Key_Task'],
                    $row['LJRole_img'],
                    $row['Skill_Name'],
                    $row['Type_of_Skills'],
                    $row['Level_of_Competencies'],
                    $row['Skill_img'],
                    $row['Course_Name'],
                    $row['Course_Desc'],
                    $row['Course_Type'],
                    $row['Course_Category']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $LJRoleDetails;
    }
    
}

?>