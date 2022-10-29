<?php

class AllSkills {
    private $Skill_ID;
    private $Skill_Name;
    private $Type_of_Skills;
    private $Level_of_Competencies;
    private $Skill_Status;
    private $Course_ID;


    public function __construct($Skill_ID, $Skill_Name, $Type_of_Skills,$Level_of_Competencies,$Skill_Status,$Course_ID) { 
        $this->Skill_ID = $Skill_ID;
        $this->Skill_Name= $Skill_Name;
        $this->Type_of_Skills = $Type_of_Skills;
        $this->Level_of_Competencies = $Level_of_Competencies;
        $this->Skill_Status = $Skill_Status;
        $this->Course_ID = $Course_ID;
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

    public function getSkill_Status() {
        return $this->Skill_Status;
    }

    public function getCourse_ID() {
        return $this->Course_ID;
    }



}

?>