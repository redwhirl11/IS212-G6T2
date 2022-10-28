app = Vue.createApp({
    data() {
        return {
            skillDict: [],
            skillId : '',
            status : '',
            course : '',
            courseList:[]
        }
    },

    created() {
        this.getAllSkill()
        this.getAllCourse()
        // console.log('testing')
    },

    methods: {
        
        getAllSkill() {
            const allSkillUrl = '../db/getSkills.php'
            axios.get(allSkillUrl).then(response => {
                var allSkill = response.data
                // console.log(allSkill)

                const map = new Map();

                // get the distinct skill from allSkill
                for (const skill of allSkill) {
                    var skillId=skill.Skill_ID
                    var skillName= skill.Skill_Name
                    var skillType=skill.Type_of_Skills
                    var level=skill.Level_of_Competencies
                    var status=skill.Skill_Status
                    var course=skill.Course_ID

                    if (!map.has(skillId)) {
                        map.set(skillId, true);
                        this.skillDict.push({ skillId:skillId,skillName:skillName,skillType:skillType,level:level,status:status,course:course,courses:[],noOfCourse:0 })
                    }
                }

                // get the courses of each skill
                for (i = 0; i < allSkill.length; i++) {
                    skillId = allSkill[i].Skill_ID
                    course= allSkill[i].Course_ID

                    for (j = 0; j < this.skillDict.length; j++) {
                        if (this.skillDict[j].skillId == skillId) {
                            this.skillDict[j]['courses'].push(course)
                            this.skillDict[j]['noOfCourse']+=1
                        }
                    }
                }

                console.log('final result', this.skillDict)

            })
            
            // console.log(this.skillDict)
            return this.skillDict;
        },
        getAllCourse(){
            const courseUrl = '../db/getAllCourses.php'
            axios.get(courseUrl).then(response => {
                var allCourse = response.data
                console.log(allCourse)

                const map = new Map();
               
                for (const course of allCourse) {
                    var courseId = course.Course_ID
                    var courseName = course.Course_Name
                    var status=course.Course_Status

                    if (!map.has(courseId)) {
                        map.set(courseId, true);
                        this.courseList.push({courseId: courseId, courseName: courseName,status:status})
                    }
                }
                console.log(this.courseList)
            })

            return this.courseList

        },

        getDataSend(skillId,status,course){
            this.skillId = skillId;
            this.status = status;
            this.course = course;
            localStorage.setItem('data', [this.skillId,this.status ,this.course ])

            window.location.href = "hrEditSkill.html";
            this.skillId = '';
            this.status = '';
            this.course = '';
        } ,
        SoftDeleteSkill(id) {
            console.log(id)

            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to see this skill!",
                icon: "warning",
                cancelButtonColor: '#c7c6c5',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                showCancelButton: true,
        
              })
              .then((result) => {
                if (result.isConfirmed) {
                    var url = "../db/SoftDeleteSkill.php"
                    const data = {Skill_ID: id}
                    axios.get(url , {
                        params: data
                    })
                    .then(response => {
                        console.log(response.data)
                        Swal.fire({
                            title:"Success!",
                            text: "Skill has been soft deleted.",
                            icon: "success"
                        }).then(function() {
                            window.location.href = "hrSkill.html";
                        })
                    })
                    
                    .catch(error => {
                        console.log(error.message)
                    })
                } else {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Skill has not been soft deleted!",
                        icon: "info"});
                }
              });
        }


    }
})

const vm = app.mount('#hrSkill')