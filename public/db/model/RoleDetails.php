<?php

class RoleDetails {
    private $LJRole_Name;
    private $LJRole_Description;
    private $Department;
    private $Key_Task;
    private $Skill_ID;
    private $Skill_Name;
    private $Type_of_Skills;
    private $Level_of_Competencies;
    private $Course_ID;
    private $Course_Name;
    private $Course_Desc;
    private $Course_Type;
    private $Course_Category;


    public function __construct($LJRole_Name, $LJRole_Description, $Department,$Key_Task,$Skill_ID, $Skill_Name,$Type_of_Skills,$Level_of_Competencies,$Course_ID, $Course_Name,$Course_Desc,$Course_Type,$Course_Category) { 
        $this->LJRole_Name = $LJRole_Name;
        $this->LJRole_Description= $LJRole_Description;
        $this->Department = $Department;
        $this->Key_Task = $Key_Task;
        $this->Skill_ID = $Skill_ID;
        $this->Skill_Name = $Skill_Name;
        $this->Type_of_Skills = $Type_of_Skills;
        $this->Level_of_Competencies= $Level_of_Competencies;
        $this->Course_ID = $Course_ID;
        $this->Course_Name = $Course_Name;
        $this->Course_Desc= $Course_Desc;
        $this->Course_Type = $Course_Type;
        $this->Course_Category = $Course_Category;
    }


    public function getLJRole_Name() {
        return $this->LJRole_Name;
    }

    public function getLJRole_Description() {
        return $this->LJRole_Description;
    }

    public function getDepartment() {
        return $this->Department;
    }

    public function getKey_Task() {
        return $this->Key_Task;
    }


    public function getSkill_ID() {
        return $this->Skill_ID;
    }

    public function getSkill_Name() {
        return $this->Skill_Name;
    }
    
    public function getType_of_Skills() {
        return $this->Type_of_Skills;
    }

    public function getLevel_of_Competencies() {
        return $this->Level_of_Competencies;
    }

    public function getCourse_ID() {
        return $this->Course_ID;
    }

    public function getCourse_Name() {
        return $this->Course_Name;
    }

    public function getCourse_Desc() {
        return $this->Course_Desc;
    }

    public function getCourse_Type() {
        return $this->Course_Type;
    }

    public function getCourse_Category() {
        return $this->Course_Category;
    }



}

?>