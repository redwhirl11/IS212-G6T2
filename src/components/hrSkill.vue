<script>
import axios from 'axios';
import Header from "../components/Header.vue";

export default {
    components: {
            Header,
            },
    data() {
        return {
            skillDict: [],
            skillId : '',
            status : '',
            course : '',
            courseList:[],
            deletedSkillDict: []
        }
    },

    created() {
        this.getAllSkill()
        this.getAllCourse()
        this.getDeletedSkill()
        // console.log('testing')
    },

    methods: {
        
        getAllSkill() {
            const allSkillUrl = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
            axios.get(allSkillUrl).then(response => {
                var allSkill = response.data
                // console.log(allSkill)

                const map = new Map();

                // get the distinct skill from allSkill
                for (const skill of allSkill) {
                    var skillId=skill.Skill_ID
                    var skillName= skill.Skill_Name
                    var skillType=skill.Type_of_Skills
                    var level=skill.Level_of_Competencies
                    var status=skill.Skill_Status
                    var course=skill.Course_ID

                    if (!map.has(skillId)) {
                        map.set(skillId, true);
                        this.skillDict.push({ skillId:skillId,skillName:skillName,skillType:skillType,level:level,status:status,course:course,courses:[],noOfCourse:0 })
                    }
                }

                // get the courses of each skill
                for (let i = 0; i < allSkill.length; i++) {
                    skillId = allSkill[i].Skill_ID
                    course= allSkill[i].Course_ID

                    for (let j = 0; j < this.skillDict.length; j++) {
                        if (this.skillDict[j].skillId == skillId) {
                            this.skillDict[j]['courses'].push(course)
                            this.skillDict[j]['noOfCourse']+=1
                        }
                    }
                }

                // console.log('final result', this.skillDict)

            })
            
            // console.log(this.skillDict)
            return this.skillDict;
        },
        getAllCourse(){
            const courseUrl = 'http://localhost/IS212-G6T2/public/db/getAllCourses.php'
            axios.get(courseUrl).then(response => {
                var allCourse = response.data

                const map = new Map();
               
                for (const course of allCourse) {
                    var courseId = course.Course_ID
                    var courseName = course.Course_Name
                    var status=course.Course_Status

                    if (!map.has(courseId)) {
                        map.set(courseId, true);
                        this.courseList.push({courseId: courseId, courseName: courseName,status:status})
                    }
                }
            })

            return this.courseList

        },

        getDataSend(skillId,status,course){
            this.skillId = skillId;
            this.status = status;
            this.course = course;
            localStorage.setItem('data', [this.skillId,this.status ,this.course ])

            window.location.href = "hrEditSkill";
            this.skillId = '';
            this.status = '';
            this.course = '';
        } ,

        getDeletedSkillDataSend(skillId,status,course){
            this.skillId = skillId;
            this.status = status;
            this.course = course;
            localStorage.setItem('data', [this.skillId,this.status ,this.course ])

            window.location.href = "hrEditDeletedSkill";
            this.skillId = '';
            this.status = '';
            this.course = '';
        } ,

        SoftDeleteSkill(id) {

            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to see this skill!",
                icon: "warning",
                cancelButtonColor: '#c7c6c5',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                showCancelButton: true,
        
              })
              .then((result) => {
                if (result.isConfirmed) {
                    var url = "http://localhost/IS212-G6T2/public/db/SoftDeleteSkill.php"
                    const data = {Skill_ID: id}
                    axios.get(url , {
                        params: data
                    })
                    .then(response => {
                        Swal.fire({
                            title:"Success!",
                            text: "Skill has been soft deleted.",
                            icon: "success"
                        }).then(function() {
                            window.location.href = "hrSkill";
                        })
                    })
                    
                    .catch(error => {
                        // console.log(error.message)
                    })
                } else {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Skill has not been soft deleted!",
                        icon: "info"});
                }
              });
        },

        openStatus(evt, statusSelected) {
            
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            // console.log(tabcontent)
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            // console.log('tb',tablinks[1])
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(statusSelected).style.display = "block";
            // evt.currentTarget.className += " active";
            // console.log('see class list', document.getElementById(statusSelected).classList)

        },

        getDeletedSkill() {
            const allSkillUrl = 'http://localhost/IS212-G6T2/public/db/getDeletedSkills.php'
            axios.get(allSkillUrl).then(response => {
                var allSkill = response.data
                // console.log(allSkill)

                const map = new Map();

                // get the distinct skill from allSkill
                for (const skill of allSkill) {
                    var skillId=skill.Skill_ID
                    var skillName= skill.Skill_Name
                    var skillType=skill.Type_of_Skills
                    var level=skill.Level_of_Competencies
                    var status=skill.Skill_Status
                    var course=skill.Course_ID

                    if (!map.has(skillId)) {
                        map.set(skillId, true);
                        this.deletedSkillDict.push({ skillId:skillId,skillName:skillName,skillType:skillType,level:level,status:status,course:course,courses:[],noOfCourse:0 })
                    }
                }

                // get the courses of each skill
                for (let i = 0; i < allSkill.length; i++) {
                    skillId = allSkill[i].Skill_ID
                    course= allSkill[i].Course_ID

                    for (let j = 0; j < this.deletedSkillDict.length; j++) {
                        if (this.deletedSkillDict[j].skillId == skillId) {
                            this.deletedSkillDict[j]['courses'].push(course)
                            this.deletedSkillDict[j]['noOfCourse']+=1
                        }
                    }
                }

                // console.log('final result', this.deletedSkillDict)

            })
            
            // console.log(this.skillDict)
            return this.deletedSkillDict;
        }


    }


}
</script>

<template>
    <Header msg="Let's keep the information" dept="up-to-date for skills" />
    <!-- nav bar start -->
    <div class="row" id= 'hrNavBar'>
        <div class="col">
            <a href="hrHome" style="color:white">Home</a>
        </div>
        <div class="col">
            <a href="hrRole" style="color:white">Role</a>
        </div>
        <div class="col">
            <a  href="hrSkill" style="color:darkblue">Skill</a>
        </div>
    </div>
    <!-- search bar start -->
    <div id='search' class="d-inline-flex">
        <input class="form-control me-3" type="search"
            placeholder="For E.g. Business Analyst, Operations Manager" aria-label="Search"
            id="searchBar">
        <button class="button" type="submit"><a aria-current="page"
                href="hrCreateSkill">Add New Skill</a> </button>
    </div>

    <!-- Tab Button -->
    <div class="tab">
        <button class="tablinks btn active" @click="openStatus(event, 'Active')">Active</button>
        <button class="tablinks btn" @click="openStatus(event, 'Deleted')" style="margin-left:1px;">Deleted</button>
    </div>
    <!-- All skill cards-->
    <div id="Active" class="tabcontent"  style="position:relative; top:-60px">

    <div class="row">
        <div class="col-md-5 col-sm-6 mt-3 ms-lg-5 mx-md-auto" v-for="skill in skillDict">
            <div class="card p-2">
                <div class="row card-body">
                    <div class="row my-2">
                        <h5 class="col-sm-8">{{skill.skillName}}</h5>
                        <!-- Edit Button-->
                        <span class="col-sm-2"><button id="editButton"
                                @click="getDataSend(skill.skillId, skill.status, skill.courses)">Edit</button></span>
                        <!-- Delete button -->
                        <span class="col-sm-2"><button id="deleteButton"
                                @click="SoftDeleteSkill(skill.skillId)">Delete</button></span>
                    </div>
                    <div class="row my-2">
                        <!-- <div class="col-lg-3 col-md-3 col-sm-3 badge rounded-pill badges ms-2 pe-3" id="courseBadge">
                            {{skill.noOfCourse}} courses</div> -->
                            <div class="col-lg-3 col-md-3 col-sm badge rounded-pill badges ms-2 pe-3">
                                {{skill.skillType}}</div>
                            <div class="col-xl-3 col-lg-4 col-md-3 col-sm badge rounded-pill badges ms-2 pe-3">
                                {{skill.level}}
                            </div>

                    </div>
                    <!-- <div class="row my-2">
                        <div class="col"> <strong>Skill Type: </strong> <span> {{skill.skillType}}</span></div>
                        <div class="col"> <strong>Competency Level:</strong> <span>{{skill.level}}</span></div>
                    </div> -->
                    <div class="row my-2">
                            <!-- display course names of the skill -->
                            <h6> Courses </h6>
                            <div v-for="course in skill.courses" style="margin:0px" id="courseNames">
                            <ul v-for="c in courseList" style="margin:0px">
                                <div v-if="course == c.courseId" >
                                    <li v-if="c.status=='Active'" style="margin:0px">  {{c.courseName}}</li>
                                    <li v-else-if="c.status=='Retired'" style="margin:0px"> {{c.courseName}} <span class="badge bg-secondary">{{c.status}}</span></li>

                                </div>
                                
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
    </div>

    <!-- Deleted Skill -->
    <div id="Deleted" class="tabcontent" style="display: none;position:relative; top:-60px">

        <div class="row">
            <div class="col-md-5 col-sm-6 mt-3 ms-lg-5 mx-md-auto" v-for="skill in deletedSkillDict">
                <div class="card p-2">
                    <div class="row card-body">
                        <div class="row my-2">
                            <h5 class="col-sm-10">{{skill.skillName}}</h5>
                            <!-- Edit Button-->
                            <span class="col-sm-2"><button id="editButton"
                                    @click="getDeletedSkillDataSend(skill.skillId, skill.status, skill.course)">Edit</button></span>
                        </div>
                        <div class="row my-2">
                            <!-- <div class="col-lg-3 col-md-3 col-sm-3 badge rounded-pill badges ms-2 pe-3" id="courseBadge">
                                {{skill.noOfCourse}} courses</div> -->
                                <div class="col-lg-3 col-md-3 col-sm badge rounded-pill badges ms-2 pe-3">
                                    {{skill.skillType}}</div>
                                <div class="col-xl-3 col-lg-4 col-md-3 col-sm badge rounded-pill badges ms-2 pe-3">
                                    {{skill.level}}
                                </div>

                        </div>
                        <!-- <div class="row my-2">
                            <div class="col"> <strong>Skill Type: </strong> <span> {{skill.skillType}}</span></div>
                            <div class="col"> <strong>Competency Level:</strong> <span>{{skill.level}}</span></div>
                        </div> -->
                        <div class="row my-2">
                                <!-- display course names of the skill -->
                                <h6> Courses </h6>
                                <div v-for="course in skill.courses" style="margin:0px" id="courseNames">
                                <ul v-for="c in courseList" style="margin:0px">
                                    <div v-if="course == c.courseId" >
                                        <li v-if="c.status=='Active'" style="margin:0px">  {{c.courseName}}</li>
                                        <li v-else-if="c.status=='Retired'" style="margin:0px"> {{c.courseName}} <span class="badge bg-secondary">{{c.status}}</span></li>

                                    </div>
                                    
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<style scoped>
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }


    a:hover {
        color: gray;
    }

    a:active {
        font-size: 1em;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .badges {
        background-color: #919CF8;
        font-size: 16px;
    }

    #deleteButton,
    #editButton {
        background: none;
        border: none;
        color: gray;
    }
</style>
