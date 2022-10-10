<?php

class RegCourses{
    private $Reg_ID;
    private $Course_ID;
    private $Staff_ID;
    private $Reg_Status;
    private $Completion_Status;


    public function __construct($Reg_ID, $Course_ID, $Staff_ID,$Reg_Status,$Completion_Status) { 
        $this->Reg_ID = $Reg_ID;
        $this->Course_ID= $Course_ID;
        $this->Staff_ID = $Staff_ID;
        $this->Reg_Status = $Reg_Status;
        $this->Completion_Status= $Completion_Status;
    }


    public function getReg_ID() {
        return $this->Reg_ID;
    }

    public function getCourse_ID() {
        return $this->Course_ID;
    }

    public function getStaff_ID() {
        return $this->Staff_ID;
    }

    public function getReg_Status() {
        return $this->Reg_Status;
    }

    public function getCompletion_Status() {
        return $this->Completion_Status;
    }


}

?>