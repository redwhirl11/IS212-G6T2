const homepage = Vue.createApp({
    data(){
        return {
            AllRoles_dict: [],
            Allcourses_dict: [],
        }
    },
    mounted:function()  {
            url="../db/getLearningJourney.php"
            var Staff_ID = 00000
            const data ={Staff_ID:Staff_ID}

            axios.get(url, {
                params: data
            })
            .then(response => { 
                var LJdata = response.data
                this.status = response.data
                this.getLJdetails(LJdata)
                this.getCourseDetails(LJdata);
            })
            .catch(error => {
                this.status = 'There was an error: ' + error.message 
            }) 
            
        },
    methods:{
        getLJdetails(LJdata){
            var tempRoleDict = {};
            var tempSkillDict = {};
            for (i=0; i<LJdata.length; i++){
                var LJid = LJdata[i].LJ_ID; //a staff can hv zero-many LJ
                var LJroleName = LJdata[i].LJRole_Name;
                var SkillId = LJdata[i].Skill_ID; //a LJ can have zero-many skills
                var SkillName = LJdata[i].Skill_Name;

                //if it is a new LJ
                if(!tempRoleDict[LJid]){
                    var tempSkillDict ={};

                    //if it is a new skills under that LJ
                    if(! tempSkillDict[SkillId] ){
                        tempSkillDict[SkillId]= {SkillId:SkillId, SkillName: SkillName}
                    }
                    tempRoleDict[LJid] ={role:LJroleName, skill:tempSkillDict}
                    this.AllRoles_dict.push({LJid: LJid, LJrole:LJroleName, skill:tempSkillDict})
                }

                //if LJ already exist but another skills & course
                else{
                    if(! tempSkillDict[SkillId] ){
                        tempSkillDict[SkillId]= {SkillId:SkillId, SkillName: SkillName}                    }
                }
            }
            return this.AllRoles_dict
        },
        getCourseDetails(LJdata){
            var tempCourselDict = {};
            for (i=0; i<LJdata.length; i++){
                console.log(LJdata)
                var LJid = LJdata[i].LJ_ID; 
                var SkillId = LJdata[i].Skill_ID; 
                var CourseId = LJdata[i].Course_ID; 
                var CourseName = LJdata[i].Course_Name;

                if(!tempCourselDict[CourseId]){
                    tempCourselDict[CourseId] ={CourseName:CourseName}
                    this.Allcourses_dict.push({LJid: LJid, SkillId:SkillId, CourseId:CourseId, CourseName:CourseName})
                }
            }
            return this.Allcourses_dict
        }
    }
})
const homepagevm = homepage.mount("#homepage");