const homepage = Vue.createApp({
    data(){
        return {
            learning_journey:[],
        }
    },
    mounted:function()  {
            console.log("are we supposed to host on web!!!! (run on wamp)")
            url="../db/getLearningJourney.php"
            // const data = { LJ_ID: LJ_ID, Staff_ID: Staff_ID,
            //     LJRole_Name: LJRole_Name, LJRole_Description: LJRole_Description, Department:Department,Key_Task:Key_Task, LJRole_img:LJRole_img, Skill_Name:Skill_Name, Type_of_Skills:Type_of_Skills, Level_of_Competencies:Level_of_Competencies, Skill_img:Skill_img,Course_ID:Course_ID , Course_Name:Course_Name, Course_Desc:Course_Desc , Course_Type:Course_Type, Course_Category:Course_Category
            //     }
            var Staff_ID = 00001
            const data ={Staff_ID:Staff_ID}

            axios.get(url, {
                params: data
            })
            .then(response => { 
                console.log(response.data)
                this.learning_journey= response.data
                this.status = response.data
            })
            .catch(error => {
                this.status = 'There was an error: ' + error.message 
            }) 
            
        }
})
const homepagevm = homepage.mount("#homepage");