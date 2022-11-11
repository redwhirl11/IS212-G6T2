<script>
import axios from 'axios';
import Header from "../components/Header.vue";

export default {
    components: {
            Header,
            },
    data() {
        return {
            roleDict: [],
            rollId: '',
            skillId:'',
            skillList:[],
            deletedRoleDict: []
        }
    },

    created() {
        this.getAllRole()
        this.getSkill()
        this.getDeletedRole()
    },

    methods: {

        getAllRole() {
            const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getAllRoles.php'
            axios.get(allRoleUrl).then(response => {
                var allRole = response.data

                const map = new Map();

                // get the distinct roles from allRole
                for (const role of allRole) {
                    var name = role.LJRole_Name
                    var dept = role.Department
                    var desc = role.LJRole_Description
                    var task = role.Key_Task
                    var status = role.LJRole_Status
                    var skill = role.Skill_ID
                    this.rollId =role.LJRole_ID
                    this.skillId =role.Skill_ID

                    if (!map.has(role.LJRole_ID)) {
                        map.set(role.LJRole_ID, true);
                        this.roleDict.push({ id: role.LJRole_ID, roleName: name, dept: dept, desc: desc, task: task, status: status, skill: skill, skills: [], noOfSkill: 0 })
                    }
                }

                // get the skills of each role
                for (let i = 0; i < allRole.length; i++) {
                    let roleId = allRole[i].LJRole_ID
                    let skill = allRole[i].Skill_ID

                    for (let j = 0; j < this.roleDict.length; j++) {
                        if (this.roleDict[j].id == roleId) {
                            this.roleDict[j]['skills'].push(skill)
                            this.roleDict[j]['noOfSkill'] += 1
                            // console.log('testing', this.skillList)
                        }
                    }
                }

                return this.roleDict;
            })
        },

        getSkill() {
            const skillUrl = 'http://localhost/IS212-G6T2/public/db/getSkills.php'
            axios.get(skillUrl).then(response => {
                var allSkill = response.data
                // console.log(allSkill)

                const map = new Map();
               
                for (const skill of allSkill) {
                    var skillId = skill.Skill_ID
                    var skillName = skill.Skill_Name

                    if (!map.has(skillId)) {
                        map.set(skillId, true);
                        this.skillList.push({ skillId: skillId, skillName: skillName })
                    }
                }
                // console.log(this.skillList)
            })

            return this.skillList

        },
        getDataSend(rollId,skillId){
            this.rollId = rollId;
            this.skillId = skillId;
            localStorage.setItem('data', [this.rollId,this.skillId ])

            window.location.href = "hrEditRole";
            this.rollId = '';
            this.skillId = '';
        } ,

        getDeletedRoleDataSend(rollId,skillId){
            this.rollId = rollId;
            this.skillId = skillId;
            localStorage.setItem('data', [this.rollId,this.skillId ])

            window.location.href = "hrEditDeletedRole";
            this.rollId = '';
            this.skillId = '';
        } ,

        SoftDeleteRole(id) {

            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to see this role!",
                icon: "warning",
                cancelButtonColor: '#c7c6c5',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                showCancelButton: true,

            })
                .then((result) => {
                    if (result.isConfirmed) {
                        var url = "http://localhost/IS212-G6T2/public/db/SoftDeleteRole.php"
                        const data = { LJRole_ID: id }
                        axios.get(url, {
                            params: data
                        })
                            .then(response => {
                                Swal.fire({
                                    title:"Success!",
                                    text: "Role has been soft deleted.",
                                    icon: "success"
                                }).then(function () {
                                    window.location.href = "hrRole";
                                })
                            })

                            .catch(error => {
                            })
                    } else {
                        Swal.fire({
                            title: "Cancelled",
                            text: "Role has not been soft deleted!",
                            icon: "info"});
                    }
                });
        },
        openStatus(evt, statusSelected) {
            
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
                
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(statusSelected).style.display = "block";
            // evt.currentTarget.className += " active";
            // console.log('see class list', document.getElementById(statusSelected).classList)

        },

        getDeletedRole() {
            const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getDeletedRoles.php'
            axios.get(allRoleUrl).then(response => {
                var deletedRole = response.data
                // console.log( 'deleted role', deletedRole)

                const map = new Map();

                // get the distinct roles from allRole
                for (const role of deletedRole) {
                    var name = role.LJRole_Name
                    var dept = role.Department
                    var desc = role.LJRole_Description
                    var task = role.Key_Task
                    var status = role.LJRole_Status
                    var skill = role.Skill_ID
                    this.rollId =role.LJRole_ID
                    this.skillId =role.Skill_ID

                    if (!map.has(role.LJRole_ID)) {
                        map.set(role.LJRole_ID, true);
                        this.deletedRoleDict.push({ id: role.LJRole_ID, roleName: name, dept: dept, desc: desc, task: task, status: status, skill: skill, skills: [], noOfSkill: 0 })
                    }
                }

                // get the skills of each role
                for (let i = 0; i < deletedRole.length; i++) {
                    let roleId = deletedRole[i].LJRole_ID
                    let skill = deletedRole[i].Skill_ID

                    for (let j = 0; j < this.deletedRoleDict.length; j++) {
                        if (this.deletedRoleDict[j].id == roleId) {
                            this.deletedRoleDict[j]['skills'].push(skill)
                            this.deletedRoleDict[j]['noOfSkill'] += 1
                            // console.log('testing', this.skillList)
                        }
                    }
                }

                // console.log('deleted final result', this.deletedRoleDict)
                return this.deletedRoleDict;
            })
        },
    }
    
}
</script>

<template>
    <Header msg="Let's keep the information" dept="up-to-date for roles" />
    <!-- nav bar start -->
    <div class="row" id= 'hrNavBar'>
        <div class="col">
            <a href="hrHome" style="color:white">Home</a>
        </div>
        <div class="col">
            <a href="hrRole" style="color:darkblue">Role</a>
        </div>
        <div class="col">
            <a  href="hrSkill" style="color:white">Skill</a>
        </div>
    </div>

    <!-- search bar start -->
    <div id='search' class="d-inline-flex">
        <input class="form-control me-3" type="search"
            placeholder="For E.g. Business Analyst, Operations Manager" aria-label="Search"
            id="searchBar">
        <!-- add new role btn Fang Ting -->
        <button class="button" type="submit"><a aria-current="page"
                href="hrCreateRole">Add New Role</a> </button>
    </div>

    <!-- Tab Button -->
    <div class="tab">
        <button class="tablinks btn active" @click="openStatus(event, 'Active')">Active</button>
        <button class="tablinks btn" @click="openStatus(event, 'Deleted')" style="margin-left:1px;">Deleted</button>
    </div>

    <!-- Active Role -->
    <div id="Active" class="tabcontent" style="position:relative; top:-60px">

        <!-- All role cards-->
        <div class="row">
            <div class="col-md-5 col-sm-6 mt-3 ms-lg-5 mx-md-auto" v-for="role in roleDict">
                <div class="card p-2">
                    <div class="row card-body">
                        <div class="row my-2">
                            <h4 class="col-sm-8">{{role.roleName}}</h4>
                            <!-- edit button -->
                            <span class="col-sm-2"><button id="editButton" @click="getDataSend(role.id, role.skill)">Edit</button></span>
                            <!-- delete button -->
                            <span class="col-sm-2"><button id="deleteButton" @click="SoftDeleteRole(role.id)">Delete</button></span>
                        </div>
                        <div class="row my-2">
                            <div class="col-lg-3 col-md col-sm badge rounded-pill badges ms-2 pe-3 text-uppercase">
                                {{role.dept}}</div>
                            <div class="col-lg-3 col-md col-sm badge rounded-pill badges ms-2 pe-3" id="skillBadge">
                                {{role.noOfSkill}} skills
                            </div>

                            <!-- display skill names of the role -->
                            <span v-for="skill in role.skills" style="margin:0px" id="skillNames" >
                                <ul v-for="s in skillList" style="margin:0px">
                                    <li v-if="skill == s.skillId" style="margin:0px" > {{s.skillName}} </li>
                                </ul>
                            </span>

                        </div>
                        <div class="row my-2">
                            <h6>Description</h6>
                            <p>
                                {{role.desc}}
                            </p>
                        </div>
                        <div class="row my-2">
                            <h6>Key Tasks</h6>
                            <div v-for="task in role.task.split('.')">
                                <p style="text-decoration:none;margin:0px"> {{task}} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Deleted Role -->
    <div id="Deleted" class="tabcontent" style="display: none;position:relative; top:-60px">
        <!-- Deleted role cards-->
        <div class="row">
            <div class="col-md-5 col-sm-6 mt-3 ms-lg-5 mx-md-auto" v-for="role in deletedRoleDict">
                <div class="card p-2">
                    <div class="row card-body">
                        <div class="row my-2">
                            <h4 class="col-sm-10">{{role.roleName}}</h4>
                            <!-- edit button -->
                            <span class="col-sm-2"><button id="editButton" @click="getDeletedRoleDataSend(role.id, role.skill)">Edit</button></span>
                        </div>
                        <div class="row my-2">
                            <div class="col-lg-3 col-md col-sm badge rounded-pill badges ms-2 pe-3 text-uppercase">
                                {{role.dept}}</div>
                            <div class="col-lg-3 col-md col-sm badge rounded-pill badges ms-2 pe-3" id="skillBadge">
                                {{role.noOfSkill}} skills
                            </div>

                            <!-- display skill names of the role -->
                            <span v-for="skill in role.skills" style="margin:0px" id="skillNames" >
                                <ul v-for="s in skillList" style="margin:0px">
                                    <li v-if="skill == s.skillId" style="margin:0px" > {{s.skillName}} </li>
                                </ul>
                            </span>

                        </div>
                        <div class="row my-2">
                            <h6>Description</h6>
                            <p>
                                {{role.desc}}
                            </p>
                        </div>
                        <div class="row my-2">
                            <h6>Key Tasks</h6>
                            <div v-for="task in role.task.split('.')">
                                <p style="text-decoration:none;margin:0px"> {{task}} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>
/*  #Header  && #logo under main.css   */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }



    .badges {
        background-color: #919CF8;
        font-size: 16px;
    }

    #deleteButton,
    #editButton {
        color: gray;
        background: none;
        border: none;
    }

    #skillNames {
        display: none;
        font-size:12px;
    }

    #skillBadge:hover ~ #skillNames {
        display: block;
    }
</style>