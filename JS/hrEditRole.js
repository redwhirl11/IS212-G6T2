app = Vue.createApp({
    data() {
        return {
            Role_ID: '',
            Skill_ID:'',
            Role_Name:'',
            LJRole_Description: '',
            Department: '',
            Key_Task: '',
            LJRole_Status: '',
            numRoleName:0,
            numrole_desc:0,
            numkey_tasks:0,
            CurrentInput:[],
        }
    },

    created() {
        //fetch data from user selection
        const dataValue = localStorage.getItem('data');
        const datalist = dataValue.split(',');
        console.log(datalist)
        this.Role_ID = datalist[0]
        this.Skill_ID= datalist[1]

        const allRoleUrl = '../db/getAllRoles.php'
        axios.get(allRoleUrl).then(response => {
            var allRole = response.data
            console.log(allRole)

            for (i=0;i<allRole.length;i++){
                //currently checking unique skillID + courseID + skill Status
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
        })
    },
})

const vm = app.mount('#hrEditRole')