app = Vue.createApp({
    data() {
        return {
            skillDict: [],
            Skill_ID: '',
            Skill_Status:'',
            Skill_Course:'',
            Skill_Name: '',
            Skill_Type: '',
            Skill_Level:'',
        }
    },

    created() {
        //fetch data from user selection
        const dataValue = localStorage.getItem('data');
        const datalist = dataValue.split(',');
        this.Skill_ID = datalist[0]
        this.Skill_Status= datalist[1]
        this.Skill_Course= datalist[2]

        //relevant php file
        allSkillUrl = '../db/getSkills.php'
        axios.get(allSkillUrl).then(response => {
            var allSkill = response.data

            for (i=0;i<allSkill.length;i++){
                if (this.Skill_ID === allSkill[i].Skill_ID && this.Skill_Status === allSkill[i].Skill_Status && this.Skill_Course===allSkill[i].Course_ID){
                    this.Skill_Name= allSkill[i].Skill_Name
                    this.Skill_Type=allSkill[i].Type_of_Skills
                    this.Skill_Level=allSkill[i].Level_of_Competencies
                }
            }
        })
    },
})

const vm = app.mount('#hrEditSkill')