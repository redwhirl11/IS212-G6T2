const app = Vue.createApp({
    data() {
        return {
            Role_ID: '',
            Role_Name:'',
            Role_Status: 'Active',
            role_desc: '',
            Department: '',
            key_tasks: '',
            error_message:[],
            error_in_html:'',
            numRoleName:50,
            numDepartment:50,
            numrole_desc:225,
            numkey_tasks:225,
            AllUniqueRoles:[],
            //modify in sprint 3, will hardcode for the skill (for sprint 2)
            skills_required:'00007'
            
            
        };
    },
    created(){
        const getAllRoles = '../db/getAllRoles.php'
        axios.get(getAllRoles)
            .then(response => {
                var AllRoles = response.data;
                this.getUniqueRoleName(AllRoles);
                console.log(this.AllUniqueRoles);
            })
    },
    methods: {
        getUniqueRoleName(AllRoles){
            var tempRoleDict =[]
            for (i = 0; i < AllRoles.length; i++){
                //Role Name preprosseing --> easier to compare (unique name) 
                //lowercase the rolename
                var LJRole_Name = AllRoles[i].LJRole_Name.toLowerCase()
                //remove all the spaces
                LJRole_Name = LJRole_Name.replaceAll(' ', '');
                if (!tempRoleDict[LJRole_Name]) {
                    tempRoleDict[LJRole_Name] = {LJRole_Name: LJRole_Name}
                    this.AllUniqueRoles.push({LJRole_Name: LJRole_Name})
                }
            }
            return this.AllUniqueRoles
        },
        submitLJRole() {
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            
            //happy path in creating skill, no null value, no error msg
            if (this.Role_Name !='' && this.Department!= ''  && this.error_message.length == 0) {
                const createLJRole = '../db/createLJRole.php'
                const data = {
                    LJRole_ID: this.Role_ID,
                    LJRole_Name: this.Role_Name, 
                    LJRole_Description: this.role_desc, 
                    Department: this.Department, 
                    Key_Task: this.key_tasks, 
                    LJRole_Status:this.Role_Status,
                    Skill_ID: this.skills_required
                }
                axios.get(createLJRole, {
                    params: data
                })
                    .then(response => {
                        Swal.fire(
                            'Congratulations!',
                            'You have created a new role!',
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
            
            //if user did input the role description but the char more than 225
            if (this.numrole_desc<0){
                this.error_message.push('The maximum number of characters for Role Description has been reached')
            }

            //if user did input the key tasks but the char more than 225
            if (this.numkey_tasks<0){
                this.error_message.push('The maximum number of characters for Key Tasks has been reached')
            }
            

            //check for duplicate Role name
            var tidyupRoleName = this.Role_Name.toLowerCase();
            tidyupRoleName= tidyupRoleName.replaceAll(' ', '');
            index = this.AllUniqueRoles.map(object => object.LJRole_Name).indexOf(tidyupRoleName);
            console.log(index);
            if (index != -1 ){
                this.error_message.push('Duplicate role name, only unique role are allowed!')
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
            this.numrole_desc = 225-this.role_desc.length;
            return this.numrole_desc
        },
        countDepartment(){
            this.numDepartment = 50-this.Department.length;
            return this.numDepartment
        }
        ,
        countkey_tasks(){
            this.numkey_tasks = 225-this.key_tasks.length;
            return this.numkey_tasks
        }

    }
        
        

    
})

const vm = app.mount('#hrCreateSkill')
