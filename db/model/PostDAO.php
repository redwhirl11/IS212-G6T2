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
                    * 
                FROM ljroles
                WHERE
                LJRole_ID= :LJRole_ID and LJRole_status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':LJRole_ID', $LJRole_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $LJRoleDetails = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $LJRoleDetails[] =
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
        return $LJRoleDetails;
    }
    
}

?>