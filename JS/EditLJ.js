const app = Vue.createApp({
    data() {
        return {
            ljId: '',
            roleName: '',
            roleDesc: '',
            department: '',
            tasks: '',
            role_img: '',
            Course_Name: '',
            reg_status: '',
            complete_status: '',
            courseDesc: '',
            //AllXX_dict means retrieve from Role Details
            Allskill_dict: [],
            Allcourse_dict: [],
            new_selected_course:[],
            //retrieve data from getLJ.php
            SubmittedCourse_dict:[]
            
        };
    },
    created() {
        var LJRole_ID = 00002
        var LJ_ID = 00006
        RoleDetailsUrl = '../db/getLJRoleDetails.php'
        RegCourseurl='../db/getRegCourse.php'
        LjDetailsurl='../db/getSubmittedLJRoleDetails.php'
        const RoleDetaildata = { LJRole_ID: LJRole_ID }
        const LJDetaildata = { LJ_ID: LJ_ID }

        axios.get(RoleDetailsUrl, {
            params: RoleDetaildata
        })
            .then(response => {
                var RoleDetails = response.data;
                this.getRoleDetails(RoleDetails);
                this.getSkillDetails(RoleDetails);
                this.getCourseDetails(RoleDetails);
                this.getRegStatus();
                
            })
        axios.get(LjDetailsurl, {
                params: LJDetaildata
            })
                .then(response => {
                    var LJDetails = response.data;
                    this.getSubmittedCourse_ID(LJDetails);
                    console.log(this.SubmittedCourse_dict);
                })
    },
    methods: {
        getRoleDetails(RoleDetails) {
            this.roleName = RoleDetails[0].LJRole_Name
            this.department=RoleDetails[0].Department
            this.roleDesc = RoleDetails[0].LJRole_Description
            var keyTasks = RoleDetails[0].Key_Task
            this.tasks = keyTasks.split('.')
            // console.log(this.tasks)
            console.log(RoleDetails)
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
                    this.Allskill_dict.push({ Skill_ID:SkillID,SkillName: SkillName, Type_of_Skills: Type_of_Skills, Level_of_Competencies: Level_of_Competencies, Skill_img: Skill_img })
                }
            }
            
            return this.Allskill_dict;
        },
        getCourseDetails(RoleDetails) {
            //for each skillID
            for (var j = 0; j < this.Allskill_dict.length; j++){
                var Skill_ID = this.Allskill_dict[j].Skill_ID
                
                //for each skill in ljroles
                for (i = 0; i < RoleDetails.length; i++) {
                    var SkillID = RoleDetails[i].Skill_ID;
                    var courseID = RoleDetails[i].Course_ID;
                    var courseName = RoleDetails[i].Course_Name;
                    var courseDesc = RoleDetails[i].Course_Desc;
                    var coursetype = RoleDetails[i].Course_Type;
                    var coursecat = RoleDetails[i].Course_Category;

                    // check if the passed skill_ID = the skill id in the role details
                    // if yes == under same skill, will put the course info in one dict
                    if (Skill_ID == SkillID) {
                        this.Allcourse_dict.push({ Skill_ID:SkillID, Course_ID: courseID, Course_Name: courseName, Course_Desc: courseDesc, Course_Type: coursetype, Course_Category: coursecat})
                    }
                    //console.log(this.Allcourse_dict);
                }
            }
            
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
        saveLJ(){
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
                    if(this.selected_course.length>0){
                        Swal.fire(
                            'Congratulations!',
                            'Your changes have been successfully saved!',
                            'success',
                        )
                    }else{
                        Swal.fire(
                            'Cancelled',
                            'Oops, you must pick a least 1 course :(',
                            'error',
                        )
                    }
                }
            })
        },
        getSubmittedCourse_ID(LJDetails){
            for (i = 0; i < LJDetails.length; i++){
                var SubmittedC_ID = LJDetails[i].Course_ID;
                this.SubmittedCourse_dict.push({SubmittedC_ID: SubmittedC_ID})
            }
            return this.SubmittedCourse_dict;
        },

        getRegStatus(){

        }

    }
})

const vm = app.mount('#learningJourney')