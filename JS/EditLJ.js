const app = Vue.createApp({
    data() {
        return {
            ljId: '',
            roleName: '',
            roleDesc: '',
            department: '',
            tasks: '',
            role_img: '',
            skills_list: [],
            course_list: [],
            reg_status: '',
            complete_status: '',
            courseDesc: ''

            // Skill_Name, 
            // Type_of_Skills, 
            // Level_of_Competencies, 
            // Skill_img, 
            // Course_Name, 
            // Course_Desc, 
            // Course_Type,
            // Course_Category
        }
    },
    mounted: function () {
        this.getRoleDetails()
    },

    methods: {
        getRoleDetails() {
            var LJRole_ID  = 00001
            url='../db/getLJRoleDetails.php'
            const data={LJRole_ID :LJRole_ID }

            axios.get(url,{
                params:data
            })
            .then(response=>{
                console.log(response.data)
                this.roleName=response.data[0].LJRole_Name
                this.roleDesc=response.data[0].LJRole_Description
                this.tasks=response.data[0].Key_Task
                // console.log('testing')
            })
        }
    }
})

const vm=app.mount('#learningJourney')