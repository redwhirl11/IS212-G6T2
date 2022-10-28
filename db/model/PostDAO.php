<?php

require_once 'common.php';

class PostDAO {
    public function getSubmittedRoleDetails($LJ_ID) {
         // STEP 1
         $connMgr = new ConnectionManager();
         $conn = $connMgr->connect();
         
         // STEP 2
         $sql = "SELECT
                    LJ_ID, Staff_ID, LJRole_ID, LJRole_Name, LJRole_Description, Department, Key_Task,skills.Skill_ID, Skill_Name, Type_of_Skills,Level_of_Competencies,  course.Course_ID , Course_Name, Course_Desc,Course_Type, Course_Category  
                FROM learning_journey 
                JOIN ljroles ON ljroles.LJRole_ID = learning_journey.SubmittedLJRole_ID
                JOIN skills ON skills.Skill_ID = learning_journey.Submitted_Skill_ID
                JOIN course ON course.Course_ID = learning_journey.Submitted_CourseID
                WHERE
                LJ_ID= :LJ_ID and skills.Skill_ID =ljroles.Skill_ID and  skills.Course_ID = course.Course_ID"; 
         $stmt = $conn->prepare($sql);
 
         $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);
 
         // STEP 3
         $stmt->execute();
         $stmt->setFetchMode(PDO::FETCH_ASSOC);
 
         // STEP 4
         $SubmittedLJRole = []; // Indexed Array of Post objects
         while( $row = $stmt->fetch() ) {
             $SubmittedLJRole[] =
                 new SubmittedLJRole (
                     $row['LJ_ID'],
                     $row['Staff_ID'],
                     $row['LJRole_ID'],
                     $row['LJRole_Name'],
                     $row['LJRole_Description'],
                     $row['Department'],
                     $row['Key_Task'],
                     $row['Skill_ID'],
                     $row['Skill_Name'],
                     $row['Type_of_Skills'],
                     $row['Level_of_Competencies'],
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
                    $row['Skill_ID']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $AllRoles;
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
                    LJRole_Name, LJRole_Description, Department, Key_Task, Skill_Name, Type_of_Skills, Level_of_Competencies, skills.Skill_ID,  skills.Course_ID, Course_Name, Course_Desc, Course_Type,Course_Category 
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
                    $row['Skill_ID'],
                    $row['Skill_Name'],
                    $row['Type_of_Skills'],
                    $row['Level_of_Competencies'],
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
    
    
    public function getLearningJourney($Staff_ID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();
        
        // STEP 2
        $sql = "SELECT
                    LJ_ID, Staff_ID, LJRole_ID, LJRole_Name, LJRole_Description, Department, Key_Task, skills.Skill_ID, Skill_Name, Type_of_Skills,Level_of_Competencies, course.Course_ID , Course_Name, Course_Desc,Course_Type, Course_Category  
                FROM learning_journey 
                JOIN ljroles ON ljroles.LJRole_ID = learning_journey.SubmittedLJRole_ID
                JOIN skills ON skills.Skill_ID = learning_journey.Submitted_Skill_ID
                JOIN course ON course.Course_ID = learning_journey.Submitted_CourseID
                WHERE
                Staff_ID= :Staff_ID and skills.Skill_ID =ljroles.Skill_ID and  skills.Course_ID = course.Course_ID and Course_Status = 'Active'"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':Staff_ID', $Staff_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $LearningJourney = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $LearningJourney[] =
                new LearningJourney (
                    $row['LJ_ID'],
                    $row['Staff_ID'],
                    $row['LJRole_ID'],
                    $row['LJRole_Name'],
                    $row['LJRole_Description'],
                    $row['Department'],
                    $row['Key_Task'],
                    $row['Skill_ID'],
                    $row['Skill_Name'],
                    $row['Type_of_Skills'],
                    $row['Level_of_Competencies'],
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
        return $LearningJourney;
    }

    public function getRegCourse($Staff_ID) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT *  
                FROM registration
                WHERE Staff_ID= :Staff_ID "; 

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':Staff_ID', $Staff_ID, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $RegCourses = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $RegCourses[] =
                new RegCourses (
                    $row['Reg_ID'],
                    $row['Course_ID'],
                    $row['Staff_ID'],
                    $row['Reg_Status'],
                    $row['Completion_Status']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $RegCourses;
    }

    public function saveEditedLJ($LJ_ID, $Staff_ID, $SubmittedLJRole_ID,$Submitted_Skill_ID,$Submitted_CourseID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO learning_journey
                    (
                        LJ_ID, 
                        Staff_ID,
                        SubmittedLJRole_ID,
                        Submitted_Skill_ID,
                        Submitted_CourseID
                    )
                VALUES
                    (
                        :LJ_ID,
                        :Staff_ID,
                        :SubmittedLJRole_ID,
                        :Submitted_Skill_ID,
                        :Submitted_CourseID
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Staff_ID', $Staff_ID, PDO::PARAM_STR);
        $stmt->bindParam(':SubmittedLJRole_ID', $SubmittedLJRole_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Submitted_Skill_ID', $Submitted_Skill_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Submitted_CourseID', $Submitted_CourseID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function deleteEditedLJcourses($LJ_ID, $Staff_ID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "DELETE FROM learning_journey 
                WHERE LJ_ID = :LJ_ID and Staff_ID = :Staff_ID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':LJ_ID', $LJ_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Staff_ID', $Staff_ID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function SoftDeleteSkill($Skill_ID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE skills
                SET Skill_Status = 'Inactive'
                WHERE Skill_ID = :Skill_ID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Skill_ID', $Skill_ID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function SoftDeleteRole($LJRole_ID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE ljroles
                SET LJRole_Status = 'Inactive'
                WHERE LJRole_ID =:LJRole_ID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':LJRole_ID', $LJRole_ID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function updateSkill($Skill_ID,$Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Skill_Status) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE `skills` 
                SET `Skill_Name` = :Skill_Name , `Type_of_Skills` = :Type_of_Skills 
                , `Level_of_Competencies` = :Level_of_Competencies , `Skill_Status` = :Skill_Status
                WHERE `Skill_ID` = :Skill_ID ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Skill_ID', $Skill_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Skill_Name', $Skill_Name, PDO::PARAM_STR);
        $stmt->bindParam(':Type_of_Skills', $Type_of_Skills, PDO::PARAM_STR);
        $stmt->bindParam(':Level_of_Competencies', $Level_of_Competencies, PDO::PARAM_STR);
        $stmt->bindParam(':Skill_Status', $Skill_Status, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function updateLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE `ljroles` SET `LJRole_Name` = :LJRole_Name, 
        `LJRole_Description` = :LJRole_Description, 
        `Department` = :Department,
        `Key_Task` = :Key_Task,
        `LJRole_Status` = :LJRole_Status
         WHERE `LJRole_ID` = :LJRole_ID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':LJRole_ID', $LJRole_ID, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Name', $LJRole_Name, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Description', $LJRole_Description, PDO::PARAM_STR);
        $stmt->bindParam(':Department', $Department, PDO::PARAM_STR);
        $stmt->bindParam(':Key_Task', $Key_Task, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Status', $LJRole_Status, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function createSkill($Skill_ID,$Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Skill_Status,$Course_ID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO `skills` (`Skill_ID`, `Skill_Name`, `Type_of_Skills`, `Level_of_Competencies`, `Skill_Status`, `Course_ID`) VALUES (:Skill_ID, :Skill_Name, :Type_of_Skills, :Level_of_Competencies, :Skill_Status, :Course_ID);";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Skill_ID', $Skill_ID, PDO::PARAM_STR);
        $stmt->bindParam(':Skill_Name', $Skill_Name, PDO::PARAM_STR);
        $stmt->bindParam(':Type_of_Skills', $Type_of_Skills, PDO::PARAM_STR);
        $stmt->bindParam(':Level_of_Competencies', $Level_of_Competencies, PDO::PARAM_STR);
        $stmt->bindParam(':Skill_Status', $Skill_Status, PDO::PARAM_STR);
        $stmt->bindParam(':Course_ID', $Course_ID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    
    public function createLJRole($LJRole_ID,$LJRole_Name,$LJRole_Description,$Department,$Key_Task,$LJRole_Status,$Skill_ID) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO `ljroles` (`LJRole_ID`, `LJRole_Name`, `LJRole_Description`, `Department`, `Key_Task`, `LJRole_Status`, `Skill_ID`) VALUES (:LJRole_ID, :LJRole_Name, :LJRole_Description, :Department, :Key_Task, :LJRole_Status, :Skill_ID)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':LJRole_ID', $LJRole_ID, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Name', $LJRole_Name, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Description', $LJRole_Description, PDO::PARAM_STR);
        $stmt->bindParam(':Department', $Department, PDO::PARAM_STR);
        $stmt->bindParam(':Key_Task', $Key_Task, PDO::PARAM_STR);
        $stmt->bindParam(':LJRole_Status', $LJRole_Status, PDO::PARAM_STR);
        $stmt->bindParam(':Skill_ID', $Skill_ID, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    
    public function getAllCourses() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                     *
                FROM course
               "; 
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

    
    
}

?>