<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect';
export default {
    name: 'hrCreateRole',  
    components: {
        Multiselect,
      },
    props: {  
        Department: {
            type: String,
            default: ""
        },
        RoleName: {
            type: String,
            default: ""
        },
        skills_required: {
            type: String,
            default: "00007"
        },
        error: {
            type: String,
            default: ""
        }
    
    },
    data(){
        return{
            Role_Status: "", 
            Role_ID: '',
            Role_Name:this.RoleName,
            Role_Status:'Active',
            role_desc: '',
            key_tasks: '',
            error_message:[],
            errorm: this.error,
            error_in_html:'',
            AllUniqueRoles:[],
            AllUniqueSkill:[],
            numRoleName:50,
            numDepartment:50,
            numrole_desc:225,
            numkey_tasks:225,
            value: null,
            Skills_Options: []
                // //modify in sprint 3, will hardcode for the skill (for sprint 2)
            // skills_required:'00007'
            // [
            // { value: 'batman', label: 'Batman' },
            // { value: 'robin', label: 'Robin' },
            // { value: 'joker', label: 'Joker' },]

        }
    },
    created(){
        const getAllRoles = 'http://localhost/IS212-G6T2/public/db/getAllRoles.php'
        axios.get(getAllRoles)
            .then(response => {
                var AllRoles = response.data;
                this.getUniqueRoleName(AllRoles);
                //console.log(this.AllUniqueRoles);
                const getAllSkills = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
                axios.get(getAllSkills)
                .then(response => {
                var AllSkills = response.data;
                this.getUniqueSkill(AllSkills);
                console.log(this.Skills_Options);
            })
            })
    },
    methods: {
        getUniqueRoleName(AllRoles){
            var tempRoleDict =[]
            for (var i = 0; i < AllRoles.length; i++){
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
        getUniqueSkill(AllSkills){
            var tempSkillDict =[]
            for (var i = 0; i < AllSkills.length; i++){
                var Skill_Name = AllSkills[i].Skill_Name
                var Skill_ID = AllSkills[i].Skill_ID
                if (!tempSkillDict[Skill_Name]) {
                    tempSkillDict[Skill_Name] = {value: Skill_ID,label: Skill_Name}
                    this.Skills_Options.push({value: Skill_ID,label: Skill_Name})
                }
            }
            return this.Skills_Options
        },
        submitLJRole() {
            console.log('yes');
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            //happy path in creating skill, no null value, no error msg
            if (this.Role_Name !='' && this.Department!= ''  && this.error_message.length == 0) {
                const createLJRole = 'http://localhost/IS212-G6T2/public/db/createLJRole.php'
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
                            window.location.href = "hrRole";
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
                this.errorm = 'Invalid Role Name'
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
                this.errorm = "You must assign a skill(s) to the role"
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
            var index = this.AllUniqueRoles.map(object => object.LJRole_Name).indexOf(tidyupRoleName);
            console.log(index);
            if (index != -1 ){
                this.error_message.push('Duplicate role name, only unique role are allowed!')
            }
            console.log(this.errorm);
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
}
</script>

<template>
    <div class="row" style="background:#6A79F3;">
        <div class="row position-relative">
            <div class="row my-5">
                <div class="col-lg-9 col-md-8"><img id='logo' src="../Icons/Component 1.png"></div>
                <div class="col-lg-3 col-md-4">
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="backBtn"
                    style="border-radius: 20px" onclick="history.back()">Back</button>
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id = 'submitBTN'
                    style="border-radius: 20px" @click='submitLJRole' >Submit</button>

                </div>
            </div>
            <img src="../Icons/Vector 1.png" alt="background">
            <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                Create a new role:
            </p>
        </div>
    </div>
    
    <div class="shadow p-3 mb-5 bg-white rounded" style="margin: auto; width: 90%;">
        <form class="row g-3 p-2">
            <div><span style="color:red">* Required</span></div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputRole" class="form-label">Role <span style="color:red">*</span></label></h4>
                <textarea  v-model="Role_Name" class="form-control" @input ="countRoleName(this.numRoleName)" rows="1"></textarea>
                <div style="float: right;">
                    <span v-if ='numRoleName>=0'>{{numRoleName}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{50-numRoleName}}/50</span> 
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputStatus" class="form-label">Role Status</label></h4>
                <select id="inputStatus" class="form-select" v-model="Role_Status">
                    <option value ='Active'>Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            
            <div class="col-lg-12 col-md-12">
                <h4><label class="form-label">Role Description</label></h4>
                <textarea class="form-control" v-model='role_desc' placeholder="Type in role description"  @input ="countrole_desc(this.numrole_desc)" rows = '3'></textarea>
                <div style="float: right;"> 
                    <span v-if ='numrole_desc>=0'>{{numrole_desc}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{225-numrole_desc}}/225</span> 
                </div>

            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputdept" class="form-label">Department <span style="color:red">*</span></label></h4>
                <select id="inputdept" class="form-select" v-model="Department">
                    <option disabled selected value> -- Select a Department -- </option>
                    <option value="CEO">CEO</option>
                    <option value="Chairman">Chairman</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Ops">Ops</option>
                    <option value="Sales">Sales</option>
                </select>
                
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputRoles" class="form-label">Skills Required (KIV-Sprint 3) <span style="color:red">*</span></label></h4>
                <!-- <input type="text" class="form-control" id="inputRoles" v-model="skills_required"> -->
                <div>
        <Multiselect v-model="value" mode="tags" :close-on-select="false" :searchable="true" :create-option="true" :options=Skills_Options
/>
    </div>
            </div>
            <div class="col-lg-6 col-md-6">
            </div>

            <div class="col-lg-12 col-md-12">
                <h4><label class="form-label">Key Tasks</label></h4>
                <textarea class="form-control" v-model='key_tasks' placeholder="Type in key tasks"  @input ="countkey_tasks(this.numkey_tasks)" rows = '3'></textarea>
                <div style="float: right;"> 
                    <span v-if ='numkey_tasks>=0'>{{numkey_tasks}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{225-numkey_tasks}}/225</span> 
                </div>

            </div>
            </form>
    </div>
</template>


/* 
#Header  && #logo under main.css
*/
<style src="@vueform/multiselect/themes/default.css"></style>

