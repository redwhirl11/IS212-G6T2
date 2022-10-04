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
        this.getRoleName()
    },

    methods: {
        getRoleName() {
            // var ljId = 
        }
    }
})