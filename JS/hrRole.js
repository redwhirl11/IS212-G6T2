app = Vue.createApp({
    data() {
        return {
            roleDict: []
        }
    },

    created() {
        this.getAllRole()
        // console.log('testing')
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
                    var name=role.LJRole_Name
                    var dept = role.Department
                    var desc = role.LJRole_Description
                    var task = role.Key_Task
                    var status = role.LJRole_Status
                    var skill = role.Skill_ID

                    if (!map.has(role.LJRole_ID)) {
                        map.set(role.LJRole_ID, true);
                        this.roleDict.push({ id: role.LJRole_ID,roleName:name, dept:dept,desc:desc,task:task,status:status,skill:skill,skills:[],noOfSkill:0 })
                    }
                }

                // get the skills of each role
                for (i = 0; i < allRole.length; i++) {
                    roleId = allRole[i].LJRole_ID
                    skill = allRole[i].Skill_ID

                    for (j = 0; j < this.roleDict.length; j++) {
                        if (this.roleDict[j].id == roleId) {
                            this.roleDict[j]['skills'].push(skill)
                            this.roleDict[j]['noOfSkill']+=1
                        }
                    }
                }

                console.log('final result', this.roleDict)

                // correct result --> [3:[4,5,1],4:[6,7], 5:[7,4],6:[1,4,5,6,7]]
            })
            return this.roleDict;
        },

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
                                Swal.fire("Success! Role has been soft deleted.", {
                                    icon: "success",
                                }).then(function () {
                                    window.location.href = "hrRole.html";
                                })
                            })

                            .catch(error => {
                                console.log(error.message)
                            })
                    } else {
                        Swal.fire("Role has not been soft deleted!");
                    }
                });
        }
    }
})

const vm = app.mount('#hrRole')