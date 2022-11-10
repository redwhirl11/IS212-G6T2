<script>
import axios from 'axios';
export default {
    name: 'hrEditDeletedRole', 
    components: {
        Multiselect,
      },
    props: {  
        LJRole_Status: {
            type: String,
            default: ""
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
            LJRole_Status: this.LJRole_Status,
            skills_required:'00007',
            // error_message:[],
            errorm: '',
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
        console.log('print the data value', dataValue)
        const datalist = dataValue.split(',');
        this.Role_ID = datalist[0]
        this.Skill_ID= datalist[1]

        const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getDeletedRoles.php'
        axios.get(allRoleUrl).then(response => {
            var allRole = response.data
            console.log(allRole)

            for (let i=0;i<allRole.length;i++){
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
        reopenInactiveRole() {
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            console.log('errormsg', this.errorm)
            if(this.errorm != null) {
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
                            const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/updateLJRole.php'
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
                                        'You have successfully reopen this role!',
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
                            }
                        })

            }

        },
        getErrorMessage(){
            // if role status - inactive
            if (this.LJRole_Status == "Inactive"){
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
    <div class="row" style="background:#6A79F3;">
        <div class="row position-relative">
            <div class="row my-5">
                <div class="col-lg-9 col-md-8"><img id='logo' src="../Icons/Component1.png"></div>
                <div class="col-lg-3 col-md-4">
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="backBtn"
                    style="border-radius: 20px" onclick="history.back()">Back</button>
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="submitBtn"
                    style="border-radius: 20px" @click="reopenInactiveRole()" >Submit</button>
                </div>
            </div>
            <img src="../Icons/Vector1.png" alt="background">
            <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                Edit Role: {{CurrentInput.LJRole_Name}}
            </p>
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
                <h4><label for="inputRoles" class="form-label">Skills Required (KIV-Sprint 3) <span style="color:red">*</span></label></h4>
                <input type="text" class="form-control" id="inputRoles" v-model="skills_required" disabled>
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

<style>
/* 
#Header  && #logo under main.css
*/

</style>
