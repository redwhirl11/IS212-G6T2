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
                console.log(allRole)

                var temp=[];

                for (i=0;i<allRole.length;i++){
                    var roleId=allRole[i].LJRole_ID
                    var roleName= allRole[i].LJRole_Name
                    var dept=allRole[i].Department
                    var desc=allRole[i].LJRole_Description
                    var task=allRole[i].Key_Task
                    var status=allRole[i].LJRole_Status
                    var skill=allRole[i].Skill_ID

                    if (!temp[roleId]){
                        temp[roleId]={roleName:roleName,dept:dept,desc:desc,task:task,status:status,skill:skill}

                        this.roleDict.push({roleId:roleId,roleName:roleName,dept:dept,desc:desc,task:task,status:status,skill:skill})
                    }
                   
                }
                console.log('temp', temp)
            })
            
            console.log(this.roleDict)
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
                    axios.get(url).
                    then(response => {
                        console.log(response.data)
                        Swal.fire("Success! Role has been soft deleted.", {
                        icon: "success",
                        });
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