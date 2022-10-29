<?php

class Post {
    private $SubmittedLJRole_ID;
    private $SubmittedSkill_ID;
    private $Submitted_CourseID;


    public function __construct($SubmittedLJRole_ID, $SubmittedSkill_ID, $Submitted_CourseID) { 
        $this->SubmittedLJRole_ID = $SubmittedLJRole_ID;
        $this->SubmittedSkill_ID= $SubmittedSkill_ID;
        $this->Submitted_CourseID = $Submitted_CourseID;
    }


    public function getSubmittedLJRole_ID() {
        return $this->SubmittedLJRole_ID;
    }

    public function getSubmittedSkill_ID() {
        return $this->SubmittedSkill_ID;
    }

    public function getSubmitted_CourseID() {
        return $this->Submitted_CourseID;
    }


}

?>