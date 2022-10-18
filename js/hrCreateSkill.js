const app = Vue.createApp({
    data() {
        return {
            Skill_ID: '',
            Skill_Name:'',
            Skill_Status: 'Active',
            Level_of_Competencies: '',
            Type_of_Skill: '',
            //modify in sprint 3, will hardcode for the course (for sprint 2)
            Course_assign:'tch002'
            
        };
    },
    methods: {
        getAllRoles(){
            const role = '../db/getAllRoles.php'
            axios.get(role)
                .then(response => {
                    console.log(response.data)
                })

        },
        submitSkill() {
            this.getAllRoles()
            if (this.Skill_Name !='' && this.Level_of_Competencies!= '' && this.Type_of_Skill!= '') {
                console.log(this.Skill_Name);
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
                        console.log("yes");
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
                    Swal.fire(
                        'Cancelled',
                        'Oops, something went wrong!',
                        'error',
                    )
                }
            }
        },
        

    
})

const vm = app.mount('#hrCreateSkill')

