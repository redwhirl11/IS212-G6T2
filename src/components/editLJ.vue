<script>
import axios from 'axios';
export default {
    data() {
        return {
            roleName: '',
            roleDesc: '',
            department: '',
            tasks: '',
            role_img: '',
            Course_Name: '',
            reg_status: '',
            complete_status: '',
            courseDesc: '',
            //default information
            LJ_ID: '',
            Staff_ID: '',
            SubmittedLJRole_ID: '',
            //AllXX_dict means retrieve from Role Details
            Allskill_dict: [],
            Allcourse_dict: [],
            new_selected_course: [],
            //retrieve data from getLJ.php
            SubmittedCourse_dict: [],
            submittedCourseID: '',
            checked: false,
            courseRegStatus_dict: []
        };
    },
    created() {
        //dynamic method
        const dataValue = localStorage.getItem('data'); 
        const datalist = dataValue.split(',');
        console.log(datalist);
        this.LJ_ID = parseInt(datalist[0]);
        this.Staff_ID = parseInt(datalist[1]);
        this.SubmittedLJRole_ID = parseInt(datalist[2]);
        

        //relevant php file
        const RoleDetailsUrl = 'http://localhost/IS212-G6T2/public/db/getLJRoleDetails.php'
        const RegCourseurl = 'http://localhost/IS212-G6T2/public/db/getRegCourse.php'
        const LjDetailsurl = 'http://localhost/IS212-G6T2/public/db/getSubmittedLJRoleDetails.php'
        
        //dynamic method
        const RoleDetaildata = { LJRole_ID: this.SubmittedLJRole_ID }
        const LJDetaildata = { LJ_ID: this.LJ_ID  }
        const RegCourseData = { Staff_ID: this.Staff_ID }

        //retrieve data from the php 
        axios.get(LjDetailsurl, {
            params: LJDetaildata
        })
            .then(response => {
                var LJDetails = response.data;
                //console.log('LJDetails', LJDetails)
                this.getSubmittedCourse_ID(LJDetails);
                axios.get(RoleDetailsUrl, {
                    params: RoleDetaildata
                })
                    .then(response => {
                        var RoleDetails = response.data;
                        console.log(RoleDetails);
                        this.getRoleDetails(RoleDetails);
                        this.getSkillDetails(RoleDetails);
                        this.getCourseDetails(RoleDetails);
                
                        axios.get(RegCourseurl, {
                            params: RegCourseData
                        })
                            .then(response => {
                                var RegCourse = response.data;
                                // console.log('reg course', RegCourse)
                                this.getRegStatus(RegCourse)
                                console.log('course status', this.courseRegStatus_dict)
                                //this.checkCompletion()
                                // this.matchStatusWithCourse()
                            })
                    })
            })
    },
    methods: {
        getRoleDetails(RoleDetails) {
            this.roleName = RoleDetails[0].LJRole_Name
            this.department = RoleDetails[0].Department
            this.roleDesc = RoleDetails[0].LJRole_Description
            var keyTasks = RoleDetails[0].Key_Task
            this.tasks = keyTasks.split('.')
            // console.log(this.tasks)
            //console.log(RoleDetails)
        },
        getSkillDetails(RoleDetails) {
            var temp_skill_dict = [];
            //for loop to get (multiple) skill's info 
            for (var i = 0; i < RoleDetails.length; i++) {
                var SkillID = RoleDetails[i].Skill_ID;
                var SkillName = RoleDetails[i].Skill_Name;
                var Type_of_Skills = RoleDetails[i].Type_of_Skills;
                var Level_of_Competencies = RoleDetails[i].Level_of_Competencies;
                var Skill_img = RoleDetails[i].Skill_img;

                //check if the skill has already appeared in the temp dict
                //if no, add the skill to the Allskill_dict
                if (!temp_skill_dict[SkillID]) {
                    temp_skill_dict[SkillID] = { SkillName: SkillName, Type_of_Skills: Type_of_Skills, Level_of_Competencies: Level_of_Competencies, Skill_img: Skill_img }

                    //e.g. of Allskill_dict = {SkillName:Python, Type of Skills: Technical, LOC: Beginner}
                    this.Allskill_dict.push({ Skill_ID: SkillID, SkillName: SkillName, Type_of_Skills: Type_of_Skills, Level_of_Competencies: Level_of_Competencies, Skill_img: Skill_img })

                }
            }

            return this.Allskill_dict;
        },
        getSubmittedCourse_ID(LJDetails) {
            for (let i = 0; i < LJDetails.length; i++) {
                var SubmittedC_ID = LJDetails[i].Course_ID;
                this.SubmittedCourse_dict.push({ SubmittedC_ID: SubmittedC_ID })
            }
            return this.SubmittedCourse_dict;
        },
        getCourseDetails(RoleDetails) {
            //for each skillID
            for (let j = 0; j < this.Allskill_dict.length; j++) {
                var Skill_ID = this.Allskill_dict[j].Skill_ID

                //for each skill in ljroles
                for (var i = 0; i < RoleDetails.length; i++) {
                    var SkillID = RoleDetails[i].Skill_ID;
                    var courseID = RoleDetails[i].Course_ID;
                    var courseName = RoleDetails[i].Course_Name;
                    var courseDesc = RoleDetails[i].Course_Desc;
                    var coursetype = RoleDetails[i].Course_Type;
                    var coursecat = RoleDetails[i].Course_Category;
                    // console.log(this.SubmittedCourse_dict);
                    // check if the passed skill_ID = the skill id in the role details
                    // if yes == under same skill, will put the course info in one dict
                    if (Skill_ID == SkillID) {
                        var index = '';

                        // find the index of ljcourseid in the submittedcourse_dict
                        index = this.SubmittedCourse_dict.map(object => object.SubmittedC_ID).indexOf(courseID);
                        console.log(courseID);
                        console.log(index);

                        //if index == -1 means the course has not been submitted before, checkbox checked = false (not selected)
                        if (index != -1) {
                            this.Allcourse_dict.push({ Skill_ID: SkillID, Course_ID: courseID, Course_Name: courseName, Course_Desc: courseDesc, Course_Type: coursetype, Course_Category: coursecat, checked: true })
                        } else {
                            this.Allcourse_dict.push({ Skill_ID: SkillID, Course_ID: courseID, Course_Name: courseName, Course_Desc: courseDesc, Course_Type: coursetype, Course_Category: coursecat, checked: this.checked })
                        }
                    }
                }
            }
            console.log('allCourse_dict', this.Allcourse_dict);
            return this.Allcourse_dict;
        },
        getCoursePopUp(Course_Name, Course_Desc, Course_Type, Course_Category) {
            Swal.fire({
                title: '<span style="color: #6A79F3">' + Course_Name + '</span>',
                html: `<div class="row" style="overflow-x: hidden;">
                        <div class="col-6"><strong> Course_Type: </strong>`+ Course_Type + `</div>
                        <div class="col-6"> <strong> Course_Category: </strong>`+ Course_Category + `</div> 
                        <div class="col" style="overflow-x: hidden;word-wrap:break-word"> <strong> Course Description: </strong>`+ Course_Desc + `</div></div>`,
                width: '40rem',
                showCloseButton: true,
                focusConfirm: true,
                confirmButtonText: 'Back!'
            })
        },
        saveLJ() {
            Swal.fire({
                title: 'Save your Learning Journey?',
                text: "Please check information before saving!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: '#c7c6c5',
                confirmButtonColor: '#6A79F3',
                confirmButtonText: 'Yes, save it!',
                cancelButtonText: 'No, Cancel',
                width: 'auto',
            }).then((result) => {
                if (result.isConfirmed) {
                    //check the latest selected courses
                    this.getNewSelectedCourse();
                    console.log(this.new_selected_course);
                    //if learner select >1 courses -> confirmation pop up
                    if (this.new_selected_course.length > 0) {
                        const Surl = 'http://localhost/IS212-G6T2/public/db/deleteLJ.php'
                        const data = {
                            LJ_ID: this.LJ_ID, Staff_ID: this.Staff_ID
                        }
                        axios.get(Surl, {
                            params: data
                        })
                            .then(response => {
                                for (let i = 0; i < this.new_selected_course.length; i++) {
                                    //save the latest selected courses to the database
                                    const Surl = 'http://localhost/IS212-G6T2/public/db/saveEditedLJ.php'
                                    var Submitted_Skill_ID = parseInt(this.new_selected_course[i].skill)
                                    var Submitted_CourseID = this.new_selected_course[i].selectedCourse
                                    const data = {
                                        LJ_ID: this.LJ_ID, Staff_ID: this.Staff_ID,
                                        SubmittedLJRole_ID: this.SubmittedLJRole_ID,
                                        Submitted_Skill_ID: Submitted_Skill_ID,
                                        Submitted_CourseID: Submitted_CourseID,
                                    }
                                    axios.get(Surl, {
                                        params: data
                                    })
        
                                        .then(response => {
                                            // console.log(response);
                                            Swal.fire(
                                                'Congratulations!',
                                                'Your changes have been successfully saved!',
                                                'success',
                                            ).then(function() {
                                                window.location.href = "LJhome";
                                            })
                                        })
        
                                        .catch(error => {
                                            console.log(error);
                                            alert('Error: ${error}. <br/> Please Try Again Later')
                                        })
                                }
                                
                        })
                    } else {
                        Swal.fire(
                            'Cancelled',
                            'Oops, you must pick a least 1 course :(',
                            'error',
                        )
                    }
                }
            })
        },
        getNewSelectedCourse() {
            //reset the new_selected_course
            this.new_selected_course = [];

            //find the latest selected courses by learner
            for (var i = 0; i < this.Allcourse_dict.length; i++) {
                var selectedCourse = this.Allcourse_dict[i].Course_ID
                var selected = this.Allcourse_dict[i].checked
                var skill = this.Allcourse_dict[i].Skill_ID

                //if checkbox is checked(selected by the learner), add the skillID, courseID to the new_selected_course list
                if (selected == true) {
                    this.new_selected_course.push({ skill, selectedCourse })
                }
            }
            return this.new_selected_course;
        },

        getRegStatus(RegCourse) {
            for (let i = 0; i < RegCourse.length; i++) {
                var Course_ID = RegCourse[i].Course_ID;
                var Reg_Status = RegCourse[i].Reg_Status;
                var Completion_Status = RegCourse[i].Completion_Status;

                for (var j = 0; j < this.Allcourse_dict.length; j++) {
                    if (this.Allcourse_dict[j].Course_ID == Course_ID) {
                        this.Allcourse_dict[j]['RegStatus'] = Reg_Status
                        this.Allcourse_dict[j]['CompletionStatus'] = Completion_Status
                    }
                }
            }
            console.log('testing',this.Allcourse_dict)
            return this.Allcourse_dict
        },
        //function to disable checkboxes for completed courses
        /*
        checkCompletion(){
            console.log(this.Allcourse_dict)
            for (let i = 0; i < this.Allcourse_dict.length; i++){
                if (this.Allcourse_dict[i].CompletionStatus == "Completed"){
                    document.getElementById(this.Allcourse_dict[i].Course_ID).disabled = true
                }
            }
            
        }
        */
    }

}
</script>

<template>
    <div class="row" style="background:#6A79F3;">
        <div class="row my-5" >
            <div class="row">
                <div class="col-lg-9 col-md-8"><img id='logo' src="../Icons/Component 1.png"></div>
                <div class="col-lg-3 col-md-4">
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="backBtn"
                        style="border-radius: 20px" onclick="history.back()">Back</button>
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="saveBtn"
                        style="border-radius: 20px" @click="saveLJ()">Submit</button>
                </div>
            </div>
            <img src="../Icons/Vector 1.png" alt="Nature" class="responsive">
            <!-- Role name -->
            <p class="h1 text-center" id="Header">
                <span id="roleName">{{roleName}}</span> <br>
                <span><strong>Dept: </strong> {{department}}</span>
            </p>
        </div>
    </div>
    <!-- Role Description -->
    <div class="row mt-5 mx-5">
        <div class="col">
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne">
                            <img src="../Icons/Role Description.png"
                                style="display: inline-block; width: 31px; height: 31px; margin-right: 15px;">
                            <h1>Role Description</h1>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body" id="roleContent">
                            {{roleDesc}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Key Tasks -->
    <div class="row m-5">
        <div class="col accordion" id="accordionPanelsStayOpen2">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="True" aria-controls="panelsStayOpen-collapseTwo">
                        <img src="../Icons/Keytask.png"
                            style="display: inline-block; width: 31px; height: 31px; margin-right: 15px;">
                        <h1>Key Tasks</h1>
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body" id="taskContent">
                        <ul>
                            <li v-for='task in tasks' style="list-style: none;">{{task}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Skills and Courses -->
    <div class="row m-5">
        <div class="col accordion" id="accordionPanelsStayOpen3">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="True" aria-controls="panelsStayOpen-collapseThree">
                        <img src="../Icons/skillsandcourses.png"
                            style="display: inline-block; width: 31px; height: 31px; margin-right: 15px;">
                        <h1>Skills & Courses</h1>
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body" id="skillContent" v-for="skill in Allskill_dict">
                        <div class="card mb-3 border-0">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="../Icons/sampleImg.jpg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title" id="skillName">{{skill.SkillName}}</h5>
                                        <div class="row">
                                            <div class="col fw-bold">Type of skills: <span class="fw-normal"
                                                    id="skillCat">{{skill.Type_of_Skills}}</span></div>
                                            <div class="col fw-bold">Competency level: <span class="fw-normal"
                                                    id="skillLvl"> {{skill.Level_of_Competencies}}</span></div>
                                        </div>
                                        <h5 class="card-title mt-4 mb-2">Courses</h5>
                                        <div class="row">
                                            <ul>
                                                <!-- show courses -->
                                                <li class="list-group-item m-2" v-for='course in Allcourse_dict'>
                                                    <div v-if="skill.Skill_ID == course.Skill_ID">
                                                        <!-- <div>Checked names: {{ new_selected_course }}</div> -->

                                                        <input class="form-check-input me-1" type="checkbox"
                                                            :checked="course.checked" :id="course.Course_ID"
                                                            :value="course.Course_ID" :aria-label="course.Course_ID"
                                                            v-model='course.checked'>
                                                        <!-- {{course.checked}} -->
                                                        <!-- show course details -->
                                                        <span
                                                            @click="getCoursePopUp(course.Course_Name,course.Course_Desc,course.Course_Type,course.Course_Category)">
                                                            {{course.Course_Name}}
                                                        
                                                            <i class="bi bi-info-circle mx-2" type="button"
                                                            style="color:#919CF8"
                                                            @click="getCoursePopUp(course.Course_Name,course.Course_Desc,course.Course_Type,course.Course_Category)"></i>

                                                        <!-- show completion status of the course -->
                                                        <span class="badge rounded-pill"
                                                        style="background-color: #5EE1AA"
                                                        v-if="course.CompletionStatus =='Completed'"> {{course.CompletionStatus}}</span>&nbsp&nbsp
                                                            <!-- <span class="badge rounded-pill"
                                                            style="background-color:gold"
                                                            v-else-if="course.CompletionStatus =='Not Complete'"> {{course.CompletionStatus}}</span> -->
                                                        <span class="badge rounded-pill"
                                                        style="background-color: skyblue"
                                                        v-else-if="course.CompletionStatus=='OnGoing'"> {{course.CompletionStatus}}</span>&nbsp&nbsp
                                                        <span class="badge rounded-pill"
                                                        style="background-color: #919CF8 "
                                                        v-else-if="course.RegStatus=='Registered'"> {{course.RegStatus}} </span>&nbsp&nbsp
                                                        <span class="badge rounded-pill"
                                                        style="background-color: orange "
                                                        v-else-if="course.RegStatus=='Waitlist'"> {{course.RegStatus}} </span>&nbsp&nbsp
                                                        <span class="badge rounded-pill"
                                                        style="background-color: red"
                                                        v-else-if="course.RegStatus=='Rejected'"> {{course.RegStatus}}</span>&nbsp&nbsp
                                                        <!-- <span class="badge rounded-pill"
                                                            style="background-color: #919CF8"
                                                            v-else>Registered</span>&nbsp&nbsp -->
                                                        
                                                        
                                                        </span>

                                                        
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

/* 
#Header  && #logo under main.css
*/
.accordion-header h1{
  display: inline-block; 
  font-family: 'Inter'; 
  font-weight: 600; 
  font-size: 20px;
}

</style>