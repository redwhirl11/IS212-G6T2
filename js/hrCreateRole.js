const app = Vue.createApp({
    data() {
        return {
            Skill_ID: '',
            Skill_Name:'',
            Skill_Status: 'Active',
            Level_of_Competencies: '',
            Type_of_Skill: '',
            error_message:[],
            error_in_html:'',
            numSkillType:50,
            numSkillName:50,
            AllUniqueSkills:[],
            //modify in sprint 3, will hardcode for the course (for sprint 2)
            Course_assign:'tch002'
            
            
        };
    },
    created(){
        const getAllSkills = '../db/getSkills.php'
        axios.get(getAllSkills)
            .then(response => {
                var AllSkills = response.data;
                this.getUniqueSkillName(AllSkills);
                console.log(this.AllUniqueSkills);
            })
    },
    methods: {
        getUniqueSkillName(AllSkills){
            var tempSkillDict =[]
            for (i = 0; i < AllSkills.length; i++){
                //Skill Name preprosseing --> easier to compare (unique name) 
                //lowercase the skillname
                var SkillName = AllSkills[i].Skill_Name.toLowerCase()
                //remove all the spaces
                SkillName = SkillName.replaceAll(' ', '');
                if (!tempSkillDict[SkillName]) {
                    tempSkillDict[SkillName] = {SkillName: SkillName}
                    this.AllUniqueSkills.push({SkillName: SkillName})
                }
            }
            return this.AllUniqueSkills
        },
        submitSkill() {
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            
            //happy path in creating skill, no null value, no error msg
            if (this.Skill_Name !='' && this.Level_of_Competencies!= '' && this.Type_of_Skill!= '' && this.error_message.length == 0) {
                const createSkill = '../db/createSkill.php'
                const data = {
                    Skill_ID: this.Skill_ID,
                    Skill_Name: this.Skill_Name, 
                    Skill_Status: this.Skill_Status, 
                    Level_of_Competencies: this.Level_of_Competencies, 
                    Type_of_Skills: this.Type_of_Skill, 
                    Course_ID: this.Course_assign
                }
                axios.get(createSkill, {
                    params: data
                })
                    .then(response => {
                        Swal.fire(
                            'Congratulations!',
                            'You have created a new skill!',
                            'success',
                        ).then(function() {
                            window.location.href = "hrSkill.html";
                        })
                        this.error_in_html='';
                        this.error_message=[];
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error: ${error}. <br/> Please Try Again Later')
                    })
                }else {                   
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: this.error_in_html
                    })

                    this.error_in_html='';
                    this.error_message=[];
                }
        },
        getErrorMessage(){
            // if user didnt input for skill name
            if (this.Skill_Name ==''){
                this.error_message.push('Invalid Skill Name')
            }else{
                //if user did input the skill name but the char not from 3-50
                if (this.numSkillName<0){
                    this.error_message.push('The maximum number of characters for Skill Name has been reached')
                }
                if (this.numSkillName>47){
                    this.error_message.push('Skill name must have at least 3 characters')
                }
            }
            // if user didnt select for level of competencies
            if (this.Level_of_Competencies == ''){
                this.error_message.push('You must select the level of competencies for the skill')
            }
            // if user didnt input for type of skill
            if (this.Type_of_Skill == ''){
                this.error_message.push('You must input the type of skill')
            }else{
                //if user did input the type of skill but the char not from 4-50
                if (this.numSkillType<0){
                    this.error_message.push('The maximum number of characters for Type of Skill has been reached')
                }
                if (this.numSkillType>46){
                    this.error_message.push('Type of Skill must have at least 4 characters')
                }
            }

            //check for duplicate Skill name
            var tidyupSkillName = this.Skill_Name.toLowerCase();
            tidyupSkillName= tidyupSkillName.replaceAll(' ', '');
            index = this.AllUniqueSkills.map(object => object.SkillName).indexOf(tidyupSkillName);
            console.log(index);
            if (index != -1 ){
                this.error_message.push('Duplicate skill name, only unique skills are allowed!')
            }

            return this.error_message
        },
        changeErrorMsgintoHTML(){
            this.error_in_html = '<div class="align-left"><ul>';
            for(var i=0;i<this.error_message.length;i++){
                this.error_in_html += '<li>' + this.error_message[i] + '</li>'
            }
            this.error_in_html += '</ul></div>';
            //console.log(this.error_in_html);
            return this.error_in_html;
        },
        countSkillType(){
            this.numSkillType = 50-this.Type_of_Skill.length;
            return this.numSkillType
        },
        countSkillName(){
            this.numSkillName = 50-this.Skill_Name.length;
            return this.numSkillName
        }

    }
        
        

    
})

const vm = app.mount('#hrCreateSkill')
