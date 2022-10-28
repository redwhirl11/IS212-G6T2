app = Vue.createApp({
    data() {
        return {
            Role_ID: '',
            Skill_ID:'',
            Role_Name:'',
            LJRole_Description: '',
            Department: '',
            Key_Task: '',
            LJRole_Status: '',
            skills_required:'00007',
            error_message:[],
            error_in_html:'',
            numRoleName:0,
            numrole_desc:0,
            numkey_tasks:0,
            CurrentInput:[],
        }
    },

    created() {
        //fetch data from user selection
        const dataValue = localStorage.getItem('data');
        const datalist = dataValue.split(',');
        this.Role_ID = datalist[0]
        this.Skill_ID= datalist[1]

        const allRoleUrl = '../db/getAllRoles.php'
        axios.get(allRoleUrl).then(response => {
            var allRole = response.data

            for (i=0;i<allRole.length;i++){
                //currently by checking Role_ID + first Skill_ID
                if (this.Role_ID === allRole[i].LJRole_ID && this.Skill_ID === allRole[i].Skill_ID){
                    this.CurrentInput.push(allRole[i])
                    this.Role_Name= allRole[i].LJRole_Name
                    this.LJRole_Description=allRole[i].LJRole_Description
                    this.Department=allRole[i].Department
                    this.Key_Task=allRole[i].Key_Task
                    this.LJRole_Status=allRole[i].LJRole_Status
                    this.numRoleName= 50 - allRole[i].LJRole_Name.length
                    this.numrole_desc= 225 - allRole[i].LJRole_Description.length
                    this.numkey_tasks= 225 - allRole[i].Key_Task.length
                }
            }
            this.CurrentInput = this.CurrentInput[0]
            // console.log(this.CurrentInput)
        })
    },
    methods: {
        submitEditRole() {
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            if (this.error_message.length == 0) {
                if(this.Role_Name == this.CurrentInput.LJRole_Name && this.LJRole_Description == this.CurrentInput.LJRole_Description &&  this.Department == this.CurrentInput.Department &&this.Key_Task == this.CurrentInput.Key_Task && this.LJRole_Status == this.CurrentInput.LJRole_Status){
                    Swal.fire({
                        icon: 'warning',
                        title: 'No changes found!',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    }
                else{
                    Swal.fire({
                        title: 'Save the Edited Role?',
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
                            const UpdateUrl = '../db/updateLJRole.php'
                            const data = {
                                LJRole_ID: this.Role_ID,
                                LJRole_Name: this.Role_Name, 
                                LJRole_Description: this.LJRole_Description, 
                                Department: this.Department, 
                                Key_Task: this.Key_Task, 
                                LJRole_Status: this.LJRole_Status, 
                            }
                            axios.get(UpdateUrl, {
                                params: data
                            })
                                .then(response => {
                                    Swal.fire(
                                        'Congratulations!',
                                        'You have successfully edited the role!',
                                        'success',
                                    ).then(function() {
                                        window.location.href = "hrRole.html";
                                    })
                                    this.error_in_html='';
                                    this.error_message=[];
                                })
                                .catch(error => {
                                    console.log(error);
                                    alert('Error: ${error}. <br/> Please Try Again Later')
                                })
                            }
                        })
                }
            }
            else{                   
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
            // if user didnt input for role name
            if (this.Role_Name ==''){
                this.error_message.push('Invalid Role Name')
            }else{
                //if user did input the role name but the char not from 3-50
                if (this.numRoleName<0){
                    this.error_message.push('The maximum number of characters for Role Name has been reached')
                }
                if (this.numRoleName>47){
                    this.error_message.push('Role Name must have at least 3 characters')
                }
            }
            // if user didnt select for department
            if (this.Department == ''){
                this.error_message.push('You must input the department for the role')
            }

            // if user didnt assign skill to role
            if (this.skills_required == ''){
                this.error_message.push('You must assign a skill(s) to the role')
            }
            
            //if user did input the role description but the char more than 225
            if (this.numrole_desc<0){
                this.error_message.push('The maximum number of characters for Role Description has been reached')
            }

            //if user did input the key tasks but the char more than 225
            if (this.numkey_tasks<0){
                this.error_message.push('The maximum number of characters for Key Tasks has been reached')
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
        countRoleName(){
            this.numRoleName = 50-this.Role_Name.length;
            return this.numRoleName
        },
        countrole_desc(){
            this.numrole_desc = 225-this.LJRole_Description.length;
            return this.numrole_desc
        }
        ,
        countkey_tasks(){
            this.numkey_tasks = 225-this.Key_Task.length;
            return this.numkey_tasks
        }

    }
})



const vm = app.mount('#hrEditRole')