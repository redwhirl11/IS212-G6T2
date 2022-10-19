const app = Vue.createApp({
    data() {
        return {
            Skill_ID: '',
            Skill_Name:'',
            Skill_Status: 'Active',
            Level_of_Competencies: '',
            Type_of_Skill: '',
            //modify in sprint 3, will hardcode for the course (for sprint 2)
            Course_assign:'tch002',
            error_message:[],
            error_in_html:''
            
        };
    },
    methods: {
        submitSkill() {
            if (this.Skill_Name !='' && this.Level_of_Competencies!= '' && this.Type_of_Skill!= '') {
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
                        )
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error: ${error}. <br/> Please Try Again Later')
                    })
                }else {
                    this.getErrorMessage();
                    this.changeErrorMsgintoHTML();
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
            if (this.Skill_Name ==''){
                this.error_message.push('Invalid Skill Name')
            }
            if (this.Level_of_Competencies == ''){
                this.error_message.push('You must select the level of competencies for the skill')
            }
            if (this.Type_of_Skill == ''){
                this.error_message.push('You must input the type of skill')
            }
            return this.error_message
        },
        changeErrorMsgintoHTML(){
            this.error_in_html = '<div class="align-left"><ul>';
            for(var i=0;i<this.error_message.length;i++){
                this.error_in_html += '<li>' + this.error_message[i] + '</li>'
            }
            this.error_in_html += '</ul></div>';
            console.log(this.error_in_html);
            return this.error_in_html;
        }



    }
        
        

    
})

const vm = app.mount('#hrCreateSkill')

