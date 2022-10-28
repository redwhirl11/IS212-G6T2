<?php

class AllCourses {
    private $Course_ID;
    private $Course_Name;
    private $Course_Desc;
    private $Course_Status;
    private $Course_Type;
    private $Course_Category;


    public function __construct($Course_ID, $Course_Name, $Course_Desc,$Course_Status,$Course_Type,$Course_Category) { 
        $this->Course_ID = $Course_ID;
        $this->Course_Name= $Course_Name;
        $this->Course_Desc = $Course_Desc;
        $this->Course_Status = $Course_Status;
        $this->Course_Type = $Course_Type;
        $this->Course_Category = $Course_Category;
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

    public function getCourse_Status() {
        return $this->Course_Status;
    }

    public function getCourse_Type() {
        return $this->Course_Type;
    }

    public function getCourse_Category() {
        return $this->Course_Category;
    }



}

?>