<script>
import axios from 'axios';
import Header from "../components/Header.vue";
import Multiselect from '@vueform/multiselect';
export default {
    components: {
            Header,
        Multiselect,
      },
    props: {  
        Skill_Name: {
            type: String,
            default: ""
        },
        Type_of_Skill: {
            type: String,
            default: ""
        },
        Level_of_Competencies: {
            type: String,
            default: ""
        },
        Course_assign: {
            type: Boolean,
            default: false
        },
        course_status: {
            type: Boolean,
            default: true
        },
        error: {
            type: String,
            default: ""
        }
    
    },
    data() {
        return {
            Skill_ID: '',
            Skill_Status: 'Active',
            error_message:[],
            error_in_html:'',
            errorm: this.error,
            numSkillType:50,
            numSkillName:50,
            AllUniqueSkills:[],
            courses: this.Course_assign,
            value:null ,
            Courses_Options:[],
            savedSkillId:'',
            courseStatus: this.course_status,
            
        };
    },
    created(){
        const getAllSkills = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
        const getAllCourse = 'http://localhost/IS212-G6T2/public/db/getAllCourses.php'
        axios.get(getAllSkills)
            .then(response => {
                var AllSkills = response.data;
                axios.get(getAllCourse)
                .then(response => {
                    var AllCourse = response.data
                    this.getUniqueCourse(AllCourse);
                    const getDeletedSkills = 'http://localhost/IS212-G6T2/public/db/getDeletedSkills.php'
                    axios.get(getDeletedSkills)
                        .then(response => {
                            var deletedSkills = response.data;
                            //concat 2 array - active and inactive skills
                            var newSkillsDict = AllSkills.concat(deletedSkills)
                            this.getUniqueSkillName(newSkillsDict);
                        })
                })
            })
    },
    methods: {
        getUniqueSkillName(AllSkills){
            var tempSkillDict =[]
            for (let i = 0; i < AllSkills.length; i++){
                //Skill Name preprosseing --> easier to compare (unique name) 
                //lowercase the skillname
                var SkillName = AllSkills[i].Skill_Name.toLowerCase()
                //remove all the spaces
                SkillName = SkillName.replaceAll(' ', '');
                if (!tempSkillDict[SkillName]) {
                    tempSkillDict[SkillName] = {SkillName: SkillName}
                    this.AllUniqueSkills.push({SkillName: SkillName})
                }
            }
            return this.AllUniqueSkills
        },
        getUniqueCourse(AllCourse){
            var tempCourseDict =[]
            for (var i = 0; i < AllCourse.length; i++){
                var Course_ID = AllCourse[i].Course_ID
                var Course_Name = AllCourse[i].Course_Name
                this.courseStatus =true
                if (AllCourse[i].Course_Status =="Active"){
                    if (!tempCourseDict[Course_ID]) {
                        tempCourseDict[Course_ID] = {value: Course_ID,label: Course_Name}
                        this.Courses_Options.push({value: Course_ID,label: Course_Name})
                    }
                }
                else if(AllCourse[i].Course_Status !="Active"){
                    this.courseStatus =false
                }
            }
            return this.Courses_Options
        },
        getSavedSkillID(CheckAllSkills){
            for (var i = 0; i < CheckAllSkills.length; i++){
                if (CheckAllSkills[i].Skill_Name == this.Skill_Name){
                    this.savedSkillId = CheckAllSkills[i].Skill_ID;
                    
                }
            }
            return this.savedSkillId
        },
        saveOtherCourses(){
            const createSkill = 'http://localhost/IS212-G6T2/public/db/createSkill.php'
            // console.log(this.savedSkillId);
            if (this.value.length>1){
                for (var j=1; j<this.value.length; j++){
                    var Course_id = this.value[j]
                    const data = {
                        Skill_ID: this.savedSkillId,
                        Skill_Name: this.Skill_Name, 
                        Skill_Status: this.Skill_Status, 
                        Level_of_Competencies: this.Level_of_Competencies, 
                        Type_of_Skills: this.Type_of_Skill, 
                        Course_ID: Course_id
                    }
                    
                    axios.get(createSkill, {
                        params: data
                    })
                }
            } 
        },
        submitSkill() {
            if (this.value != null) {
                if (this.value.length > 0) {
                    this.courses = true
                }
            }
            //todo - check inactive course selected

            this.getErrorMessage();
            this.changeErrorMsgintoHTML();
            
            //happy path in creating skill, no null value, no error msg
            if (this.error_message.length == 0) {

                // Save the 1st course into db
                const createSkill = 'http://localhost/IS212-G6T2/public/db/createSkill.php'
                const data = {
                    Skill_ID: this.Skill_ID,
                    Skill_Name: this.Skill_Name, 
                    Skill_Status: this.Skill_Status, 
                    Level_of_Competencies: this.Level_of_Competencies, 
                    Type_of_Skills: this.Type_of_Skill, 
                    Course_ID: this.value[0]
                }
                axios.get(createSkill, {
                    params: data
                })
                    .then(response => {

                        // get the saved skill id -- for next loop
                        const CheckAllSkills = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
                        axios.get(CheckAllSkills)
                        .then(response => {
                            var CheckAllSkills = response.data;    
                            // find the skill id by skill name                           
                            this.getSavedSkillID(CheckAllSkills);
                            this.saveOtherCourses();
                            
                    })

                    })
                    .catch(error => {
                        // console.log(error);
                        alert('Error: ${error}. <br/> Please Try Again Later')
                    })
                    Swal.fire(
                            'Congratulations!',
                            'You have created a new skill!',
                            'success',
                        ).then(function() {
                            window.location.href = "hrSkill";
                        })
                        this.error_in_html='';
                        this.error_message=[];
                        this.courses = false
                }else {                   
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: this.error_in_html
                    })

                    this.error_in_html='';
                    this.error_message=[];
                    this.courses = false
                }
        },
        getErrorMessage(){
            // if user didnt input for skill name
            if (this.Skill_Name ==''){
                this.error_message.push('Invalid Skill Name')
                this.errorm = 'Invalid Skill Name'
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
                this.errorm = 'You must select the level of competencies for the skill'
 
            }

            // if user didnt input for courses assigned
            if (this.courses == false){
                this.error_message.push('You must assign a course(s) to the skill')
                this.errorm = 'You must assign a course(s) to the skill'

            }

            // if user didnt input for type of skill
            if (this.Type_of_Skill == ''){
                this.error_message.push('You must input the type of skill')
                this.errorm = 'You must input the type of skill'

            }else{
                //if user did input the type of skill but the char not from 4-50
                if (this.numSkillType<0){
                    this.error_message.push('The maximum number of characters for Type of Skill has been reached')
                }
                if (this.numSkillType>46){
                    this.error_message.push('Type of Skill must have at least 4 characters')
                }
            }            
            if (this.courseStatus == false){
                this.error_message.push('You must select an active course')
                this.errorm = 'You must select an active course'
            }

            //check for duplicate Skill name
            var tidyupSkillName = this.Skill_Name.toLowerCase();
            tidyupSkillName= tidyupSkillName.replaceAll(' ', '');
            var index = this.AllUniqueSkills.map(object => object.SkillName).indexOf(tidyupSkillName);
            // console.log(index);
            if (index != -1 ){
                this.error_message.push('Duplicate skill name, only unique skills are allowed!')
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
        countSkillType(){
            this.numSkillType = 50-this.Type_of_Skill.length;
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
    <Header action='Create a new skill:' />
    <!-- button -->
    <div class="row" id="btnTopRight">
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="backBtn"
            style="border-radius: 20px;" onclick="history.back()">Back</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-light px-4" id="submitBtn"
            style="border-radius: 20px;" @click="submitSkill()">Submit</button>
        </div>
    </div>
    <!-- display -->
    
    <div class="shadow p-3 mb-5 bg-white rounded" style="margin: auto; width: 90%;">
        <form class="row g-3 p-2">
            <div><span style="color:red">* Required</span></div>
            <div class="col-lg-6 col-md-6">
                <h4><label for="inputSkill" class="form-label">Skill Name <span style="color:red">*</span></label></h4>
                <textarea  v-model="Skill_Name" class="form-control" @input ="countSkillName(this.numSkillName)" rows="1"></textarea>
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
                <h4><label class="form-label">Type of Skill   <span style="color:red">*</span></label></h4>
                <textarea class="form-control" v-model='Type_of_Skill' placeholder="Type in Skill's Type"  @input ="countSkillType(this.numSkillType)"></textarea>
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
            <div class="col-lg-6">
                <h4><label for="inputCourses" class="form-label">Course(s) Assigned  <span style="color:red">*</span></label></h4>
            <Multiselect v-model="value" mode="tags" class="multiselect-blue" :close-on-select="false" :searchable="true" :options=Courses_Options />
            </div>
            </form>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect-blue {
  --ms-tag-bg: #D1FAE5;
  --ms-tag-color: #4C5BDD;
}

</style>
