<script>
import axios from 'axios';
export default {
    data() {
        return {
            Skill_ID: '',
            Skill_Status:'',
            Skill_Course:'',
            Skill_Name: '',
            Type_of_Skills: '',
            Level_of_Competencies:'',
            error_message:[],
            error_in_html:'',
            numSkillType:0,
            numSkillName:0,
            CurrentInput:[],
        }
    },

    created() {
        //fetch data from user selection
        const dataValue = localStorage.getItem('data');
        const datalist = dataValue.split(',');
        this.Skill_ID = datalist[0]
        this.Skill_Status= datalist[1]
        this.Skill_Course= datalist[2]

        const allSkillUrl = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
        axios.get(allSkillUrl).then(response => {
            var allSkill = response.data

            for (let i=0;i<allSkill.length;i++){
                //currently checking unique skillID + courseID + skill Status
                if (this.Skill_ID === allSkill[i].Skill_ID && this.Skill_Status === allSkill[i].Skill_Status && this.Skill_Course===allSkill[i].Course_ID){
                    this.CurrentInput.push(allSkill[i])
                    this.Skill_Name= allSkill[i].Skill_Name
                    this.Type_of_Skills=allSkill[i].Type_of_Skills
                    this.Level_of_Competencies=allSkill[i].Level_of_Competencies
                    this.numSkillName= 50 - allSkill[i].Skill_Name.length
                    this.numSkillType= 50 - allSkill[i].Type_of_Skills.length
                }
            }
            this.CurrentInput = this.CurrentInput[0]
        })
    },
    methods: {
        submitEditSkill() {
            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            if (this.Skill_Name !='' && this.Level_of_Competencies!= '' && this.Type_of_Skills!= '' && this.error_message.length == 0) {
                if(this.Skill_Name == this.CurrentInput.Skill_Name && this.Skill_Status == this.CurrentInput.Skill_Status &&this.Type_of_Skills == this.CurrentInput.Type_of_Skills && this.Level_of_Competencies == this.CurrentInput.Level_of_Competencies){
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
                        title: 'Save the Edited Skill?',
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
                            const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/updateSkill.php'
                            const data = {
                                Skill_ID: this.Skill_ID,
                                Skill_Name: this.Skill_Name, 
                            Skill_Name: this.Skill_Name, 
                                Skill_Name: this.Skill_Name, 
                                Skill_Status: this.Skill_Status, 
                            Skill_Status: this.Skill_Status, 
                                Skill_Status: this.Skill_Status, 
                                Type_of_Skills: this.Type_of_Skills, 
                            Type_of_Skills: this.Type_of_Skills, 
                                Type_of_Skills: this.Type_of_Skills, 
                                Level_of_Competencies: this.Level_of_Competencies
                            }
                            axios.get(UpdateUrl, {
                                params: data
                            })
                                .then(response => {
                                    Swal.fire(
                                        'Congratulations!',
                                        'You have successfully edited the skill!',
                                        'success',
                                    ).then(function() {
                                        window.location.href = "hrSkill";
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
            if (this.Type_of_Skills == ''){
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

            // //check for duplicate Skill name
            // var tidyupSkillName = this.Skill_Name.toLowerCase();
            // tidyupSkillName= tidyupSkillName.replaceAll(' ', '');
            // index = this.AllUniqueSkills.map(object => object.SkillName).indexOf(tidyupSkillName);
            // if (index != -1 ){
            //     this.error_message.push('Duplicate skill name, skill already existed!')
            // }
            return this.error_message
        },
        changeErrorMsgintoHTML(){
            this.error_in_html = '<div class="align-left"><ul>';
            for(var i=0;i<this.error_message.length;i++){
                this.error_in_html += '<li>' + this.error_message[i] + '</li>'
            }
            this.error_in_html += '</ul></div>';
            return this.error_in_html;
        },
        countSkillType(){
            this.numSkillType = 50-this.Type_of_Skills.length;
            return this.numSkillType
        },
        countSkillName(){
            this.numSkillName = 50-this.Skill_Name.length;
            return this.numSkillName
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
                    <button type="button" class="btn btn-light mx-2 px-4 d-lg-inline-block" id="submitBtn"
                    style="border-radius: 20px" @click="submitEditSkill()" >Submit</button>
                </div>
            </div>
            <img src="../Icons/Vector 1.png" alt="background">
            <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                Edit a skill: {{CurrentInput.Skill_Name}}
            </p>
        </div>
    </div>

    <div class="shadow p-3 mb-5 bg-white rounded" style="margin: auto; width: 90%;">
        <form class="row g-3 p-2">
            <div><span style="color:red">* Required</span></div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputSkill" class="form-label">Skill Name<span style="color:red">*</span></label></h4>
                <input  v-model="Skill_Name" class="form-control" id="inputSkill" @input ="countSkillName(this.numSkillName)" rows="1">
                <div style="float: right;">
                    <span v-if ='numSkillName>=0'>{{numSkillName}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{50-numSkillName}}/50</span> 
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputStatus" class="form-label">Skill Status</label></h4>
                <select id="inputStatus" class="form-select" v-model="Skill_Status">
                    <option value ='Active'>Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputSkillType" class="form-label">Type of Skill <span style="color:red">*</span></label></h4>
                <textarea class="form-control" v-model='Type_of_Skills' id="inputSkillType" placeholder="Type in Skill's Type" @input ="countSkillType(this.numSkillType)"></textarea>
                <div style="float: right;"> 
                    <span v-if ='numSkillType>=0'>{{numSkillType}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{50-numSkillType}}/50</span> 
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputlevel" class="form-label">Level of Competencies <span style="color:red">*</span></label></h4>
                <select id="inputlevel" class="form-select" v-model="Level_of_Competencies">
                    <option disabled value="">Please select one</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputCourses" class="form-label">Course(s) Assigned (KIV-Sprint 3)<span style="color:red">*</span></label></h4>
                <input type="text" class="form-control" id="inputCourses" v-model="Skill_Course">
            </div>
            <div v-for="error in error_message">
                <ul>
                    <li>
                        {{error}}
                    </li>
                    
                </ul>
            </div>
            </form>
    </div>
</template>

