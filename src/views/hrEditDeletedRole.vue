<script>
import axios from 'axios';
import Header from "../components/Header.vue";
import Multiselect from '@vueform/multiselect';

export default {
    name: 'hrEditDeletedRole', 
    components: {
            Multiselect,
            Header
            },
    props: {  
        role_status: {
            type: Boolean,
            default: true
        },
        currentinput:{
            type: Array,
            default:[]
        },
        currentinput_status:{
            type: Boolean,
            default: true
        }
    }, 
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
            // error_message:[],
            errorm: '',
            error_in_html:'',
            numRoleName:0,
            numrole_desc:0,
            numkey_tasks:0,
            CurrentInput:this.currentinput,
            rstatus: this.role_status,
            current_status: this.currentinput_status,
            currentSkills:[],
            value:null ,
            skills: this.skills_required,
            Skills_Options: [],
        }
    },
    created() {
         //fetch data from user selection
         if (localStorage.getItem('data')!= null){
            this.dataValue = localStorage.getItem('data');        
            
            const datalist = this.dataValue.split(',');
            //console.log('data', datalist)
            this.Role_ID = datalist[0]
            this.Skill_ID = datalist[1]
        }

        const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getDeletedRoles.php'
        axios.get(allRoleUrl).then(response => {
            var allRole = response.data

            for (let i=0;i<allRole.length;i++){
                //currently by checking Role_ID + first Skill_ID
                // console.log('',)
                
                if(this.current_status== true){
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
                        this.currentSkills.push(allRole[i].Skill_ID)
                    }
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
        checkRoleStatus(){
            if (this.LJRole_Status == 'Inactive') {
                //console.log('ljrole status', this.LJRole_Status)
                //console.log('rStatus', this.rstatus)
                this.rstatus = false
            }
        },
        reopenInactiveRole() {
            this.checkRoleStatus();
            // console.log('role_status', this.rstatus)
            // console.log('ljrole_status', this.LJRole_Status)
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            // console.log('errormsg', this.errorm)
            if(this.rstatus != true) {
                Swal.fire({
                        icon: 'warning',
                        title:  this.error_in_html,
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
            } else {
                Swal.fire({
                        title: 'Reopen this role?',
                        // text: "Please check information before saving!",
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonColor: '#c7c6c5',
                        confirmButtonColor: '#6A79F3',
                        confirmButtonText: 'Yes, reopen it!',
                        cancelButtonText: 'No, Cancel',
                        width: 'auto',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/changetoactiveRole.php'
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
                                    // console.log(response)
                                    Swal.fire(
                                        'Congratulations!',
                                        'You have successfully reopen this role!',
                                        'success',
                                    ).then(function() {
                                        window.location.href = "hrRole";
                                    })
                                    this.error_in_html='';
                                    // this.error_message=[];
                                    this.errorm='';
                                    this.rstatus = true;

                                })
                                .catch(error => {
                                    // console.log(error);
                                    alert('Error: ${error}. <br/> Please Try Again Later')
                                })
                            }
                        })

            }

            this.error_in_html='';
            // this.error_message=[];
            this.errorm='';
            this.rstatus = true;

        },
        getErrorMessage(){
            // if role status - inactive
            if (this.rstatus == false){
                // this.error_message.push('You have not changed your status to active.')
                this.errorm = 'You have not changed your status to active.'
            }
            return this.errorm;
        },
        changeErrorMsgintoHTML(){
            this.error_in_html = '<div class="align-left">' + this.errorm + '</div>' ;
            //console.log(this.error_in_html);
            return this.error_in_html;
        }


    }
}
</script>

<template>
    <Header action='Edit Role: ' :msg= CurrentInput.LJRole_Name />
    <!-- button -->
    <div class="row" id="btnTopRight">
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="backBtn"
            style="border-radius: 20px;" onclick="history.back()">Back</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="submitBtn"
            style="border-radius: 20px;" @click="reopenInactiveRole()">Submit</button>
        </div>
    </div>
 
    <div class="shadow p-3 mb-5 bg-white rounded" style="margin: auto; width: 90%;">
        <form class="row g-3 p-2">
            <div><span style="color:red">* Required</span></div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputRole" class="form-label">Role <span style="color:red">*</span></label></h4>
                <textarea  v-model="Role_Name" class="form-control" @input ="countRoleName(this.numRoleName)" rows="1" disabled></textarea>
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
                <textarea class="form-control" v-model='LJRole_Description' placeholder="Type in role description"  @input ="countrole_desc(this.numrole_desc)" rows = '3' disabled></textarea>
                <div style="float: right;"> 
                    <span v-if ='numrole_desc>=0'>{{numrole_desc}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{225-numrole_desc}}/225</span> 
                </div>

            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputdept" class="form-label">Department <span style="color:red">*</span></label></h4>
                <select id="inputdept" class="form-select" v-model="Department" disabled>
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
                <h4><label for="inputRoles" class="form-label">Skills Required <span style="color:red">*</span></label></h4>
                <!-- <input type="text" class="form-control" id="inputRoles" v-model="skills_required" disabled> -->
                <div>
        <Multiselect v-model="value" mode="tags" :close-on-select="false" :searchable="true" :options=Skills_Options
/></div>
            </div>
            <div class="col-lg-6 col-md-6">
            </div>

            <div class="col-lg-12 col-md-12">
                <h4><label class="form-label">Key Tasks</label></h4>
                <textarea class="form-control" v-model='Key_Task' placeholder="Type in key tasks"  @input ="countkey_tasks(this.numkey_tasks)" rows = '3' disabled></textarea>
                <div style="float: right;"> 
                    <span v-if ='numkey_tasks>=0'>{{numkey_tasks}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{225-numkey_tasks}}/225</span> 
                </div>

            </div>
            </form>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
