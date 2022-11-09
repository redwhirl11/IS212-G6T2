<script>
import axios from 'axios';
import Header from "../components/Header.vue";
import Multiselect from '@vueform/multiselect';
export default {
    name: 'hrEditRole', 
    components: {
        Multiselect,
        Header
      },
    props: {  
        department: {
            type: String,
            default: ""
        },
        RoleName: {
            type: String,
            default: ""
        },
        skills_required: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        skills_status: {
            type: Boolean,
            default: true
        },
        datavalue:{
            type: String,
            default: ""
        }
        
    
    }, 
    data() {
        return {
            Role_Status: "", 
            Role_ID: '',         
            Skill_ID:'',
            Role_Name:this.RoleName,
            Department: this.department,
            LJRole_Description: '',
            Key_Task: '',
            LJRole_Status: '',
            error_message:[],
            errorm: this.error,
            error_in_html:'',
            AllUniqueSkill:[],
            numRoleName:0,
            numrole_desc:0,
            numkey_tasks:0,
            CurrentInput:[],
            currentSkills:[],
            value:null ,
            skills: this.skills_required,
            Skills_Options: [],
            saved_roleID:'',
            checkAllRoles:[],
            skill_status: this.skills_status,
            dataValue: this.datavalue
        }
    },
    created() {
        //fetch data from user selection
        const dataValue = localStorage.getItem('data');
        console.log('here', dataValue);
        const datalist = dataValue.split(',');
        this.Role_ID = datalist[0]
        

        const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getAllRoles.php'
        axios.get(allRoleUrl).then(response => {
            var allRole = response.data
            //console.log(allRole)
            for (let i=0;i<allRole.length;i++){
                //currently by checking Role_ID
                if (this.Role_ID === allRole[i].LJRole_ID){
                    this.CurrentInput.push(allRole[i])
                    this.Role_Name= allRole[i].LJRole_Name
                    this.LJRole_Description=allRole[i].LJRole_Description
                    this.Department=allRole[i].Department
                    this.Key_Task=allRole[i].Key_Task
                    this.LJRole_Status=allRole[i].LJRole_Status
                    this.numRoleName= 50 - allRole[i].LJRole_Name.length
                    this.numrole_desc= 225 - allRole[i].LJRole_Description.length
                    this.numkey_tasks= 225 - allRole[i].Key_Task.length
                    this.currentSkills.push(allRole[i].Skill_ID)
                }
            }
            this.CurrentInput = this.CurrentInput[0]
            

            const getAllSkills = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
            axios.get(getAllSkills)
                    .then(response => {
                    var AllSkills = response.data;
                    this.getUniqueSkill(AllSkills);
                    // console.log(this.Skills_Options);

                    // display the current skills
                    this.value = this.currentSkills

                    
                })
        })
    },
    methods: {
        getUniqueSkill(AllSkills){
            var tempSkillDict =[]
            for (var i = 0; i < AllSkills.length; i++){
                var Skill_Name = AllSkills[i].Skill_Name
                var Skill_ID = AllSkills[i].Skill_ID
                var Skill_Status = AllSkills[i].Skill_Status
                if (!tempSkillDict[Skill_Name]) {
                    tempSkillDict[Skill_Name] = {value: Skill_ID,label: Skill_Name}
                    this.Skills_Options.push({value: Skill_ID,label: Skill_Name, Skill_Status:Skill_Status})
                }
            }
            return this.Skills_Options
        },
        getSavedRoleID(checkAllRoles){
            for (var i = 0; i < checkAllRoles.length; i++){
                if (checkAllRoles[i].LJRole_Name == this.Role_Name){
                    this.saved_roleID = checkAllRoles[i].LJRole_ID;
                    
                }
            }
            return this.saved_roleID
        },
        saveOtherSkills(){
            const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/updateLJRole.php'
            console.log(this.saved_roleID);
            if (this.value.length>1){
                        for (var j=1; j<this.value.length; j++){
                            var Skill_id = this.value[j]
                            const data = {
                            LJRole_ID: this.saved_roleID,
                            LJRole_Name: this.Role_Name, 
                            LJRole_Description: this.LJRole_Description, 
                            Department: this.Department, 
                            Key_Task: this.Key_Task, 
                            LJRole_Status:this.LJRole_Status,
                            Skill_ID: Skill_id
                            }
                            
                            axios.get(UpdateUrl, {
                                params: data
                            })
                        }
                    }  
        },
        checkSkillStatus(){
            if (this.value != null) {             
                for (var i = 0; i <this.value.length; i++){
                    var selected_skill_id = this.value[i];
                    for (var j = 0; j < this.Skills_Options.length; j++){
                        var Skill_option_id = this.Skills_Options[j].value
                        var Skill_option_status = this.Skills_Options[j].Skill_Status
                        // console.log(selected_skill_id)
                        if (selected_skill_id == Skill_option_id){
                            if(Skill_option_status == 'Inactive'){
                                this.skill_status = false
                            }
                        }
                    }
                }
            }

        },
        submitEditRole() {
            if (this.value != null) {
                if (this.value.length > 0) {
                    this.skills = true
                }
            }
            this.checkSkillStatus();
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            if (this.error_message.length == 0) {
                if(this.Role_Name == this.CurrentInput.LJRole_Name && this.LJRole_Description == this.CurrentInput.LJRole_Description &&  this.Department == this.CurrentInput.Department &&this.Key_Task == this.CurrentInput.Key_Task && this.LJRole_Status == this.CurrentInput.LJRole_Status &&this.value ==this.currentSkills){
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
                            console.log(this.value)
                            if (this.value.length>0){
                                const Deleteurl = 'http://localhost/IS212-G6T2/public/db/deleteLJRole.php'
                                const data = {
                                    LJRole_ID: this.Role_ID
                                }
                                axios.get(Deleteurl, {
                                    params: data
                                })
                                    .then(response=>{
                                        const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/updateLJRole.php'

                                        const data = {
                                        LJRole_ID: this.Role_ID,
                                        LJRole_Name: this.Role_Name, 
                                        LJRole_Description: this.LJRole_Description, 
                                        Department: this.Department, 
                                        Key_Task: this.Key_Task, 
                                        LJRole_Status:this.LJRole_Status,
                                        Skill_ID: this.value[0]
                                        }
                                        axios.get(UpdateUrl, {
                                            params: data
                                        })
                                        .then(response => {      
                            
                                        // get the saved ljrole id -- for next loop                    
                                        const CheckAllRoles = 'http://localhost/IS212-G6T2/public/db/getAllRoles.php'
                                        axios.get(CheckAllRoles)
                                        .then(response => {
                                            var checkAllRoles = response.data;    
                                            // find the ljrole id by ljrole name   
                                            console.log(checkAllRoles);                     
                                            this.getSavedRoleID(checkAllRoles);
                                            this.saveOtherSkills();
                                            
                                        })
                                    })

                                    })

                                Swal.fire(
                                    'Congratulations!',
                                    'You have successfully edited the role!',
                                    'success',
                                ).then(function() {
                                    window.location.href = "hrRole";
                                })
                                this.error_in_html='';
                                this.error_message=[];
                                this.skills = false;

                            }
                            
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
            // if selected skill status - inactive
            if (this.skill_status == false){
                this.error_message.push('You must select an active skill')
                this.errorm = 'You must select an active skill'
            }

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
            if (this.skills== false){
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
}
</script>

<template>
    <Header action='Edit a role: ' :msg= CurrentInput.LJRole_Name />
    <!-- button -->
    <div class="row" id="btnTopRight">
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="backBtn"
            style="border-radius: 20px;" onclick="history.back()">Back</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="submitBtn"
            style="border-radius: 20px;" @click="submitEditRole()">Submit</button>
        </div>
    </div>
    <!-- display -->
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
                <select id="inputStatus" class="form-select" v-model="LJRole_Status">
                    <option value ='Active'>Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            
            <div class="col-lg-12 col-md-12">
                <h4><label class="form-label">Role Description</label></h4>
                <textarea class="form-control" v-model='LJRole_Description' placeholder="Type in role description"  @input ="countrole_desc(this.numrole_desc)" rows = '3'></textarea>
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
                <h4><label for="inputRoles" class="form-label">Skills Required <span style="color:red">*</span> <span style="font-size: 14px;font-weight: normal">Cannot find Skills? <a href="hrCreateSkill">Create New Skill</a></span></label></h4>
                
                <div>
        <Multiselect v-model="value" mode="tags" :close-on-select="false" :searchable="true" :options=Skills_Options
/></div>
            </div>
            <div class="col-lg-6 col-md-6">
            </div>

            <div class="col-lg-12 col-md-12">
                <h4><label class="form-label">Key Tasks</label></h4>
                <textarea class="form-control" v-model='Key_Task' placeholder="Type in key tasks"  @input ="countkey_tasks(this.numkey_tasks)" rows = '3'></textarea>
                <div style="float: right;"> 
                    <span v-if ='numkey_tasks>=0'>{{numkey_tasks}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{225-numkey_tasks}}/225</span> 
                </div>

            </div>
            </form>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
