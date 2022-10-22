app = Vue.createApp({
    data() {
        return {
            skillDict: [],
            skillId : '',
            status : '',
            course : ''
        }
    },

    created() {
        this.getAllSkill()
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
        getDataSend(skillId,status,course){
            this.skillId = skillId;
            this.status = status;
            this.course = course;
            localStorage.setItem('data', [this.skillId,this.status ,this.course ])

            window.location.href = "hrEditSkill.html";
            this.skillId = '';
            this.status = '';
            this.course = '';
        }  

    }
})

const vm = app.mount('#hrSkill')