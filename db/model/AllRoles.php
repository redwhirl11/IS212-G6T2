<?php

class AllRoles {
    private $LJRole_Name;
    private $LJRole_Description;
    private $Department;
    private $Key_Task;
    private $LJRole_Status;
    private $Skill_ID;


    public function __construct($LJRole_Name, $LJRole_Description, $Department,$Key_Task,$LJRole_Status,$Skill_ID) { 
        $this->LJRole_Name = $LJRole_Name;
        $this->LJRole_Description= $LJRole_Description;
        $this->Department = $Department;
        $this->Key_Task = $Key_Task;
        $this->LJRole_Status= $LJRole_Status;
        $this->Skill_ID = $Skill_ID;
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

    public function getLJRole_Status() {
        return $this->LJRole_Status;
    }


    public function getSkill_ID() {
        return $this->Skill_ID;
    }


}

?>