<script>
import axios from 'axios';
export default {
    data() {
        return {
            roleDict: [],
            rollId: '',
            skillId:'',
            skillList:[]
        }
    },
    created() {
        this.getAllRole()
        this.getSkill()
    },
    methods: {

        getAllRole() {
            const allRoleUrl = 'http://localhost/IS212-G6T2/public/db/getAllRoles.php'
            axios.get(allRoleUrl).then(response => {
                var allRole = response.data
                console.log('all role', allRole)

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

                console.log('final result', this.roleDict)
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

        SoftDeleteRole(id) {
            console.log(id)

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
                                console.log(response.data)
                                Swal.fire({
                                    title:"Success!",
                                    text: "Role has been soft deleted.",
                                    icon: "success"
                                }).then(function () {
                                    window.location.href = "hrRole";
                                })
                            })

                            .catch(error => {
                                console.log(error.message)
                            })
                    } else {
                        Swal.fire({
                            title: "Cancelled",
                            text: "Role has not been soft deleted!",
                            icon: "info"});
                    }
                });
        }, 
        searchRole() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                } else {
                li[i].style.display = "none";
                }
            }
            }
    }

}
</script>

<template>
    <div class="row" style="background:#6A79F3;">
        <div class="row position-relative">
            <div class="row my-5">
                <div class="col-lg-2 col-md-3"><img id='logo' src="../Icons/Component 1.png"></div>
                <!-- nav bar start -->
                <nav class="col-lg-8 col-md-6 navbar navbar-expand-lg navbar-expand-md navbar-light">
                    <div class="container-fluid">
                        <div class="navbar" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="navbar-brand" href="hrHome" style="color:white">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="hrRole"
                                        style="color:white">Role</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="hrSkill" style="color:white">Skill</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <!-- nav bar end -->
                <span class="col-lg col-md fs-5 fw-bold" style="color:white">Welcome, Jack </span>
            </div>
            <img src="../Icons/Vector 1.png" alt="background">
            <div class="row">
                <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                    Let's keep the information <br> up-to-date for roles
                </p>
                <!-- search bar start -->
                <div class="d-inline-flex mt-3 position-absolute translate-middle w-50" style="top:70%; left:55%;">
                    <input class="form-control me-3" type="search"
                        placeholder="For E.g. Business Analyst, Operations Manager" aria-label="Search"
                        id="searchBar">
                    <!-- add new role btn Fang Ting -->
                    <button class="btn btn-light" type="submit" style="border-radius: 40px;"><a
                            class="nav-link active" style='color: black;padding:0' aria-current="page"
                            href="hrCreateRole">Add New Role</a> </button>
                    
                </div>
                <div>
                    <!--search list of all roles (have to hide it later on)-->
                    <ul id="myUL">
                        <li v-for="role in roleDict">
                            <a href = "#">
                                {{role.roleName}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- All role cards-->
    <div class="row mt-4">
        <div class="col-lg-5 col-md-8 col-sm-6 mt-3 ms-lg-5 mx-md-auto" v-for="role in roleDict">
            <div class="card p-2">
                <div class="row card-body">
                    <div class="row my-2">
                        <h4 class="col-8 col-lg-7 col-md-6 col-sm-1 card-title">{{role.roleName}}</h4>
                        <!-- edit button -->
                        <span class="col-lg-2 col-md col-sm-2"><button id="editButton" @click="getDataSend(role.id, role.skill)">Edit</button></span>
                        <!-- delete button -->
                        <span class="col-lg col-md col-sm-2"><button id="deleteButton" @click="SoftDeleteRole(role.id)">Delete</button></span>
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

</template>

<style scoped>
/*  #Header  && #logo under main.css   */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    #searchBar {
        background: #4C5BDD;
        border-radius: 40px;
        border-color: #4C5BDD;
        color: white
    }

    #searchBar::placeholder {
        color: #FFFFFF;
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
        display: block
    }
</style>