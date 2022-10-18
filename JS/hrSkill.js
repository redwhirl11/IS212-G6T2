app = Vue.createApp({
    data() {
        return {
            skillDict: []
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
                console.log(allSkill)

                var temp=[];

                for (i=0;i<allSkill.length;i++){
                    var skillId=allSkill[i].Skill_ID
                    var skillName= allSkill[i].Skill_Name
                    var skillType=allSkill[i].Type_of_Skills
                    var level=allSkill[i].Level_of_Competencies
                    var status=allSkill[i].Skill_Status
                    var course=allSkill[i].Course_ID

                    if (!temp[skillId]){
                        temp[skillId]={skillName:skillName,skillType:skillType,level:level,status:status,course:course}

                        this.skillDict.push({skillId:skillId,skillName:skillName,skillType:skillType,level:level,status:status,course:course})
                    }
                   
                }
                console.log('temp', temp)
            })
            
            console.log(this.skillDict)
            return this.skillDict;
        }
    }
})

const vm = app.mount('#hrSkill')