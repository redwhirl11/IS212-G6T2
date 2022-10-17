const app = Vue.createApp({
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
        //hardcode method-- wait for kw to pass the data LJRole_ID,LJ_ID,Staff_ID
        const urlParams = new URLSearchParams(window.location.search);
        const indexValue = urlParams.get('roleID');


        //dynamic method
        const dataValue = localStorage.getItem('data');
        console.log(dataValue)
        // // console.log(dataValue[0],dataValue[2],dataValue[4]);  
        // const datalist = dataValue.split(',');
        // console.log(datalist);
        // this.LJ_ID = parseInt(datalist[0]);
        // this.Staff_ID = parseInt(datalist[1]);
        // this.SubmittedLJRole_ID = parseInt(datalist[2]);
        
        var LJRole_ID = indexValue
        // var LJ_ID = 00006
        //var Staff_ID = parseInt(dataValue.split(',')[1])
        var Staff_ID = 150208

        //relevant php file
        RoleDetailsUrl = '../db/getLJRoleDetails.php'
        RegCourseurl = '../db/getRegCourse.php'
        LjDetailsurl = '../db/getSubmittedLJRoleDetails.php'
        //hardcode method
        const RoleDetaildata = { LJRole_ID: LJRole_ID }
        // const LJDetaildata = { LJ_ID:LJ_ID }
        const RegCourseData = { Staff_ID: Staff_ID}
        
        //dynamic method
        // const RoleDetaildata = { LJRole_ID: this.SubmittedLJRole_ID }
        // const LJDetaildata = { LJ_ID: this.LJ_ID  }
        // const RegCourseData = { Staff_ID: this.Staff_ID }


        ////hardcode method=get the default information 
        // this.LJ_ID = LJ_ID;
        // this.Staff_ID = Staff_ID;
        // this.SubmittedLJRole_ID = LJRole_ID;

        //retrieve data from the php 
        axios.get(RoleDetailsUrl, {
            params: RoleDetaildata
        })
            .then(response => {
                // var LJDetails = response.data;
                // // console.log('LJDetails', LJDetails)
                // this.getSubmittedCourse_ID(LJDetails);
                // axios.get(RoleDetailsUrl, {
                //     params: RoleDetaildata
                // })
                //     .then(response => {
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
                                console.log('reg course', RegCourse)
                                this.getRegStatus(RegCourse)
                                // console.log('course status', this.courseRegStatus_dict)
                                // this.matchStatusWithCourse()
                            })
                    })
            // })
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
            for (i = 0; i < RoleDetails.length; i++) {
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
        // getSubmittedCourse_ID(LJDetails) {
        //     for (i = 0; i < LJDetails.length; i++) {
        //         var SubmittedC_ID = LJDetails[i].Course_ID;
        //         this.SubmittedCourse_dict.push({ SubmittedC_ID: SubmittedC_ID })
        //     }
        //     return this.SubmittedCourse_dict;
        // },
        getCourseDetails(RoleDetails) {
            //for each skillID
            for (var j = 0; j < this.Allskill_dict.length; j++) {
                var Skill_ID = this.Allskill_dict[j].Skill_ID

                //for each skill in ljroles
                for (i = 0; i < RoleDetails.length; i++) {
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
                focusConfirm: true,
                confirmButtonText: 'Back!',
                confirmButtonColor: '#6A79F3'
            })
        },
        submitLJ() {
            console.log(this.Allcourse_dict)
            console.log(this.Allskill_dict)

            
            Swal.fire({
                title: 'Submit your Learning Journey?',
                text: "Please check information before submitting!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: '#c7c6c5',
                confirmButtonColor: '#6A79F3',
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
                width: 'auto'
            }).then((result) => {
                if (result.isConfirmed) {
                    //check the latest selected courses
                    this.getNewSelectedCourse();
                    console.log(this.new_selected_course);
                    //if learner select >1 courses -> confirmation pop up
                    if (this.new_selected_course.length > 0) {
                        const Surl = '../db/deleteLJ.php'
                        const data = {
                            LJ_ID: this.LJ_ID, Staff_ID: this.Staff_ID
                        }
                        axios.get(Surl, {
                            params: data
                        })
                            .then(response => {
                                for (let i = 0; i < this.new_selected_course.length; i++) {
                                    //save the latest selected courses to the database
                                    const Surl = '../db/saveEditedLJ.php'
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
                                                window.location.href = "homepage.html";
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
        // getNewSelectedCourse() {
        //     //reset the new_selected_course
        //     this.new_selected_course = [];

        //     //find the latest selected courses by learner
        //     for (var i = 0; i < this.Allcourse_dict.length; i++) {
        //         var selectedCourse = this.Allcourse_dict[i].Course_ID
        //         var selected = this.Allcourse_dict[i].checked
        //         var skill = this.Allcourse_dict[i].Skill_ID

        //         //if checkbox is checked(selected by the learner), add the skillID, courseID to the new_selected_course list
        //         if (selected == true) {
        //             this.new_selected_course.push({ skill, selectedCourse })
        //         }
        //     }
        //     return this.new_selected_course;
        // },

        getRegStatus(RegCourse) {
            for (i = 0; i < RegCourse.length; i++) {
                var Course_ID = RegCourse[i].Course_ID;
                var Reg_Status = RegCourse[i].Reg_Status;
                var Completion_Status = RegCourse[i].Completion_Status;

                for (j = 0; j < this.Allcourse_dict.length; j++) {
                    if (this.Allcourse_dict[j].Course_ID == Course_ID) {
                        this.Allcourse_dict[j]['RegStatus'] = Reg_Status
                        this.Allcourse_dict[j]['CompletionStatus'] = Completion_Status
                    }
                }
            }
            console.log('testing',this.Allcourse_dict)
            return this.Allcourse_dict
        },

    }
})

const vm = app.mount('#learningJourney')



