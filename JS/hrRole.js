app = Vue.createApp({
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
            const allRoleUrl = '../db/getAllRoles.php'
            axios.get(allRoleUrl).then(response => {
                var allRole = response.data
                console.log('all Role', allRole)

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
                for (i = 0; i < allRole.length; i++) {
                    roleId = allRole[i].LJRole_ID
                    skill = allRole[i].Skill_ID

                    for (j = 0; j < this.roleDict.length; j++) {
                        if (this.roleDict[j].id == roleId) {
                            this.roleDict[j]['skills'].push(skill)
                            this.roleDict[j]['noOfSkill'] += 1
                            // console.log('testing', this.skillList)
                        }
                    }
                }

                console.log('final result', this.roleDict)
            })
            return this.roleDict;
        },

        getSkill() {
            const skillUrl = '../db/getSkills.php'
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

            window.location.href = "hrEditRole.html";
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
                        var url = "../db/SoftDeleteRole.php"
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
                                    window.location.href = "hrRole.html";
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
        }
    }
})

const vm = app.mount('#hrRole')