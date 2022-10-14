<?php

class AllLJs {
    private $LJ_ID;
    private $Staff_ID;
    private $SubmittedLJRole_ID;
    private $Submitted_Skill_ID;
    private $Submitted_CourseID;


    public function __construct($LJ_ID, $Staff_ID, $SubmittedLJRole_ID,$Submitted_Skill_ID,$Submitted_CourseID) { 
        $this->LJ_ID = $LJ_ID;
        $this->Staff_ID= $Staff_ID;
        $this->SubmittedLJRole_ID = $SubmittedLJRole_ID;
        $this->Submitted_Skill_ID = $Submitted_Skill_ID;
        $this->Submitted_CourseID= $Submitted_CourseID;
    }


    public function getLJ_ID() {
        return $this->LJ_ID;
    }

    public function getStaff_ID() {
        return $this->Staff_ID;
    }

    public function getSubmittedLJRole_ID() {
        return $this->SubmittedLJRole_ID;
    }

    public function getSubmitted_Skill_ID() {
        return $this->Submitted_Skill_ID;
    }

    public function getSubmitted_CourseID() {
        return $this->Submitted_CourseID;
    }




}

?>