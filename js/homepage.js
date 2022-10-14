const homepage = Vue.createApp({
    data(){
        return {
            AllRoles_dict: [],
            Allcourses_dict: [],
            lj_id : '',
            staffid : '',
            roleid : ''

        }
    },
    mounted:function()  {
            //calling LJ data
            LJurl="../db/getLearningJourney.php"
            var Staff_ID = 00002
            const data ={Staff_ID:Staff_ID}

            axios.get(LJurl, {
                params: data
            })
            .then(response => { 
                var LJdata = response.data
                this.status = response.data
                this.getLJdetails(LJdata)
                this.getCourseDetails(LJdata);
                
                //calling registered course data
                RegCourseurl="../db/getRegCourse.php"
                axios.get(RegCourseurl,{
                    params:data
                })
                .then(response=>{
                    var RegCourse=response.data;
                    this.getCompletionStatus(RegCourse)
                })            
                .catch(error => {
                    this.status = 'There was an error: ' + error.message 
                }) 
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
                var StaffId = LJdata[i].Staff_ID;
                var RoleId = LJdata[i].LJRole_ID ;

                //if it is a new LJ
                if(!tempRoleDict[LJid]){
                    var tempSkillDict ={};

                    //if it is a new skills under that LJ
                    if(! tempSkillDict[SkillId] ){
                        tempSkillDict[SkillId]= {SkillId:SkillId, SkillName: SkillName}
                    }
                    tempRoleDict[LJid] ={role:LJroleName, skill:tempSkillDict}
                    this.AllRoles_dict.push({LJid: LJid, LJrole:LJroleName, skill:tempSkillDict, StaffId:StaffId,RoleId:RoleId })
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
        },
        getCompletionStatus(RegCourse){
            for (i=0; i<RegCourse.length; i++){
                var Course_ID = RegCourse[i].Course_ID; 
                var Reg_Status = RegCourse[i].Reg_Status; 
                var Completion_Status = RegCourse[i].Completion_Status;

                for(j=0; j<this.Allcourses_dict.length; j++){
                    if(this.Allcourses_dict[j].CourseId== Course_ID){
                        this.Allcourses_dict[j]['RegStatus']= Reg_Status
                        this.Allcourses_dict[j]['CompletionStatus']= Completion_Status
                            
                        
                    }
                }
            }
            console.log(this.Allcourses_dict);
            return this.Allcourses_dict
        },
        getDataSend(LJid,StaffId,RoleId){
            this.lj_id = LJid;
            this.staffid = StaffId;
            this.roleid = RoleId;
            localStorage.setItem('data', [this.lj_id,this.staffid ,this.roleid ])

            window.location.href = "editLJ.html";
            this.lj_id = '';
            this.staffid = '';
            this.roleid = '';
        }    
    }
})
const homepagevm = homepage.mount("#homepage");