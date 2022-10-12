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
                    $row["LJRole_ID"],
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

    public function getAllCourses() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                     *
                FROM course 
                WHERE Course_Status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        // $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $AllCourses = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $AllCourses[] =
                new AllCourses (
                    $row['Course_ID'],
                    $row['Course_Name'],
                    $row['Course_Desc'],
                    $row['Course_Status'],
                    $row['Course_Type'],
                    $row['Course_Category']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $AllCourses;
    }

    public function getAllSkills() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                     *
                FROM skills 
                WHERE Skill_Status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        // $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $AllSkills = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $AllSkills[] =
                new AllSkills (
                    $row['Skill_ID'],
                    $row['Skill_Name'],
                    $row['Type_of_Skills'],
                    $row['Level_of_Competencies'],
                    $row['Skill_img'],
                    $row['Skill_Status'],
                    $row['Course_ID']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $AllSkills;
    }

    public function getLJRoleDetails($LJRole_ID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // STEP 2
        $sql = "SELECT
                    LJRole_Name, LJRole_Description, Department, Key_Task,LJRole_img, Skill_Name, Type_of_Skills, Level_of_Competencies, skills.Skill_ID, Skill_img, skills.Course_ID, Course_Name, Course_Desc, Course_Type,Course_Category 
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
                    $row['Skill_ID'],
                    $row['Skill_Name'],
                    $row['Type_of_Skills'],
                    $row['Level_of_Competencies'],
                    $row['Skill_img'],
                    $row['Course_ID'],
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
    
    public function getLJs() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                     *
                FROM learning_journey "; 
        $stmt = $conn->prepare($sql);

        // $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $AllLJs = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $AllLJs[] =
                new AllLJs (
                    $row['LJ_ID'],
                    $row['Staff_ID'],
                    $row['SubmittedLJRole_ID'],
                    $row['Submitted_Skill_ID'],
                    $row['Submitted_CourseID']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $AllLJs;
    }

    public function addLJRoleDetails($LJ_ID, $Staff_ID, $SubmittedLJRole_ID, $Submitted_Skill_ID, $Submitted_CourseID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // STEP 2
        $sql = "INSERT into learning_journey (LJ_ID, Staff_ID, SubmittedLJRole_ID, Submitted_Skill_ID, Submitted_CourseID)
                values (:LJ_ID, :Staff_ID, :SubmittedLJRole_ID, :Submitted_Skill_ID, :Submitted_CourseID)"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Staff_ID', $Staff_ID, PDO::PARAM_STR);
        $stmt->bindParam(':SubmittedLJRole_ID', $SubmittedLJRole_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Submitted_Skill_ID', $Submitted_Skill_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Submitted_CourseID', $Submitted_CourseID, PDO::PARAM_STR);

        // STEP 3
        $status = $stmt->execute();
        

        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
}

?>