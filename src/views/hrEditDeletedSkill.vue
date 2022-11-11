<script>
import axios from 'axios';
import Header from "../components/Header.vue";
import Multiselect from '@vueform/multiselect';

export default {
    name: 'hrEditDeletedSkill', 
    components: {
            Header,
            Multiselect,
            },
    props: {  
        skill_status: {
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
            Skill_ID: '',
            Skill_Status:'',
            Skill_Course:'',
            Skill_Name: '',
            Type_of_Skills: '',
            Level_of_Competencies:'',
            errorm: '',
            error_in_html:'',
            numSkillType:0,
            numSkillName:0,
            CurrentInput:this.currentinput,
            sstatus: this.skill_status,
            current_status: this.currentinput_status,
            currentCourses:[],
            value:null,
            courses: this.Course_assign,
            Courses_Options:[],

        }
    },

    created() {
        //fetch data from user selection
         if (localStorage.getItem('data')!= null){
            this.dataValue = localStorage.getItem('data');        
            
            const datalist = this.dataValue.split(',');
            // console.log('datalist', datalist)
            this.Skill_ID = datalist[0]
            this.Skill_Status= datalist[1]
            this.Skill_Course= datalist[2]
        }


        const allSkillUrl = 'http://localhost/IS212-G6T2/public/db/getDeletedSkills.php'
        axios.get(allSkillUrl).then(response => {
            var allSkill = response.data

          

            for (let i=0;i<allSkill.length;i++){
                //currently checking unique skillID + courseID + skill Status
                if(this.current_status == true){
                    if (this.Skill_ID === allSkill[i].Skill_ID && this.Skill_Status === allSkill[i].Skill_Status && this.Skill_Course===allSkill[i].Course_ID){
                        this.CurrentInput.push(allSkill[i])
                        this.Skill_Name= allSkill[i].Skill_Name
                        this.Type_of_Skills=allSkill[i].Type_of_Skills
                        this.Level_of_Competencies=allSkill[i].Level_of_Competencies
                        this.numSkillName= 50 - allSkill[i].Skill_Name.length
                        this.numSkillType= 50 - allSkill[i].Type_of_Skills.length
                        this.currentCourses.push(allSkill[i].Course_ID)
                    }
                }
            }
            this.CurrentInput = this.CurrentInput[0]
            // console.log(this.CurrentInput )
            const getAllCourse = 'http://localhost/IS212-G6T2/public/db/getAllCourses.php'
            axios.get(getAllCourse)
            .then(response => {
                var AllCourse = response.data
                this.getUniqueCourse(AllCourse);
                this.value = this.currentCourses
            })
        })
    },
    methods: {
        getUniqueCourse(AllCourse){
            var tempCourseDict =[]
            for (var i = 0; i < AllCourse.length; i++){
                var Course_ID = AllCourse[i].Course_ID
                var Course_Name = AllCourse[i].Course_Name
                var Course_Status = AllCourse[i].Course_Status
                this.course_status =true
                if (Course_Status =="Active"){
                    if (!tempCourseDict[Course_ID]) {
                        tempCourseDict[Course_ID] = {value: Course_ID,label: Course_Name}
                        this.Courses_Options.push({value: Course_ID,label: Course_Name,Course_Status:Course_Status})
                    }
                }
                else if(Course_Status !="Active"){
                    this.course_status =false
                }
            }
            return this.Courses_Options
        },
        checkSkillStatus(){
            if (this.Skill_Status == 'Inactive') {
        
                this.sstatus = false
            }
        },
        reopenInactiveSkill() {
            this.checkSkillStatus();
   

            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            if (this.sstatus != true) {
                    Swal.fire({
                        icon: 'warning',
                        title: this.error_in_html,
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                }
                else{
                    Swal.fire({
                        title: 'Reopen this skill?',
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
                            const UpdateUrl = 'http://localhost/IS212-G6T2/public/db/changetoActiveSkill.php'
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
                                        'You have successfully reopen this skill!',
                                        'success',
                                    ).then(function() {
                                        window.location.href = "hrSkill";
                                    })
                                    this.error_in_html='';
                                    this.sstatus = true
                                })
                                .catch(error => {
                       
                                    alert('Error: ${error}. <br/> Please Try Again Later')
                                })
                            }
                        })
                }

            this.error_in_html='';
            this.sstatus = true;

        },
        getErrorMessage(){
            // if skill status - inactive
            if (this.sstatus == false){
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
    <Header action='Edit a skill: ' :msg= CurrentInput.Skill_Name />
    <!-- button -->
    <div class="row" id="btnTopRight">
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="backBtn"
            style="border-radius: 20px;" onclick="history.back()">Back</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="submitBtn"
            style="border-radius: 20px;" @click="reopenInactiveSkill()">Submit</button>
        </div>
    </div>

    <div class="shadow p-3 mb-5 bg-white rounded" style="margin: auto; width: 90%;">
        <form class="row g-3 p-2">
            <div><span style="color:red">* Required</span></div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputSkill" class="form-label">Skill Name<span style="color:red">*</span></label></h4>
                <input  v-model="Skill_Name" class="form-control" id="inputSkill" @input ="countSkillName(this.numSkillName)" rows="1" disabled>
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
                <textarea class="form-control" v-model='Type_of_Skills' id="inputSkillType" placeholder="Type in Skill's Type" @input ="countSkillType(this.numSkillType)" disabled></textarea>
                <div style="float: right;"> 
                    <span v-if ='numSkillType>=0'>{{numSkillType}}</span>  
                    <span v-else style="color:red">Exceed Word Limit: {{50-numSkillType}}/50</span> 
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputlevel" class="form-label">Level of Competencies <span style="color:red">*</span></label></h4>
                <select id="inputlevel" class="form-select" v-model="Level_of_Competencies" disabled>
                    <option disabled value="">Please select one</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputCourses" class="form-label">Course(s) Assigned <span style="color:red">*</span></label></h4>
                <!-- <input type="text" class="form-control" id="inputCourses" v-model="Skill_Course" disabled> -->
                <Multiselect v-model='value' mode="tags" class="multiselect-blue" :close-on-select="false" :searchable="true" :options='Courses_Options' />
            </div>
            </form>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

