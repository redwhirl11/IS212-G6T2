const app = Vue.createApp({
    data() {
        return {
            ljId: '',
            roleName: '',
            roleDesc: '',
            department: '',
            tasks: '',
            role_img: '',
            //AllXX_dict means retrieve from Role Details
            Allskill_dict: [],
            Allcourse_dict: [],
            Course_Name: '',
            reg_status: '',
            complete_status: '',
            courseDesc: ''
        };
    },
    created() {
        var LJRole_ID = 00001
        RoleDetailsUrl = '../db/getLJRoleDetails.php'
        RegCourseurl='../db/getRegCourse.php'
        LjDetailsurl='../db/getLearningJourney.php'
        const data = { LJRole_ID: LJRole_ID }

        axios.get(RoleDetailsUrl, {
            params: data
        })
            .then(response => {
                var RoleDetails = response.data;
                this.getRoleDetails(RoleDetails);
                this.getSkillandCourseDetails(RoleDetails);
                this.getRegStatus()
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
        getSkillandCourseDetails(RoleDetails) {
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
                    this.Allskill_dict.push({ SkillName: SkillName, Type_of_Skills: Type_of_Skills, Level_of_Competencies: Level_of_Competencies, Skill_img: Skill_img })
                }
                // pass the skill ID and role details 

                this.getCourseDetails(SkillID, RoleDetails);
                // console.log(this.Allcourse_dict);

            }
            return this.Allskill_dict;
        },
        getCourseDetails(Skill_ID, RoleDetails) {

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
                    this.Allcourse_dict.push({ Course_ID: courseID, Course_Name: courseName, Course_Desc: courseDesc, Course_Type: coursetype, Course_Category: coursecat })
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

        getRegStatus(){

        }

    }
})

const vm = app.mount('#learningJourney')