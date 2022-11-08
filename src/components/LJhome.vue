<script>
import axios from 'axios';
import User from "../components/user.vue";

export default {
    components: {
        User,
        },
    data(){
        return {
            AllRoles_dict: [],
            Allcourses_dict: [],
            lj_id : '',
            staffid : 150208,
            roleid : ''

        }
    },
    mounted:function()  {
            //calling LJ data
            const LJurl='http://localhost/IS212-G6T2/public/db/getLearningJourney.php'
            const data ={Staff_ID:this.staffid}
        
            axios.get(LJurl, {
                params: data
            })
            .then(response => { 
                console.log('Role',response.data);
                var LJdata = response.data
                this.status = response.data
                this.getCourseDetails(LJdata);
                this.getLJdetails(LJdata);
                
                
                //calling registered course data
                const RegCourseurl="http://localhost/IS212-G6T2/public/db/getRegCourse.php"
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
            var uniqueLJDict = [];
            
            for(var i=0; i<LJdata.length; i++){
                var LJid = LJdata[i].LJ_ID
                if (!uniqueLJDict[LJid]){
                    uniqueLJDict[LJid]= LJid
                }
            }
            uniqueLJDict = uniqueLJDict.filter(elm => elm)
            // console.log(uniqueLJDict.length);
            for (var j=0; j<uniqueLJDict.length; j++){
                var tempLJID = uniqueLJDict[j];
                var tempSkillDict = [];
                var tempLJRole = [];
                var tempStaffID = [];
                var tempLJRoleID = [];
                var uniqueSkill = [];
                for (var k=0;k<LJdata.length; k++){
                    
                    
                    if (tempLJID == LJdata[k].LJ_ID){
                        var skillid = LJdata[k].Skill_ID;
                        if (!uniqueSkill[skillid]){
                            uniqueSkill[skillid] = {skillid:skillid};
                            tempSkillDict.push({SkillID:LJdata[k].Skill_ID, SkillName: LJdata[k].Skill_Name});
                            tempLJRole.push(LJdata[k].LJRole_Name);
                            tempStaffID.push(LJdata[k].Staff_ID);
                            tempLJRoleID.push(LJdata[k].LJRole_ID);
                        }
                        
                    }
                    
                }

                this.AllRoles_dict.push({LJid: tempLJID, LJrole:tempLJRole[0], skill:tempSkillDict, StaffId:tempStaffID[0],RoleId:tempLJRoleID[0] })
            }

            return this.AllRoles_dict
            
            
            
            // for (var i=0; i<LJdata.length; i++){
            //     var LJid = LJdata[i].LJ_ID; //a staff can hv zero-many LJ
            //     var LJroleName = LJdata[i].LJRole_Name;
            //     var SkillId = LJdata[i].Skill_ID; //a LJ can have zero-many skills
            //     var SkillName = LJdata[i].Skill_Name;
            //     var StaffId = LJdata[i].Staff_ID;
            //     var RoleId = LJdata[i].LJRole_ID ;
            //     console.log("yes");
            //     if (!uniqueRoleDict[LJid]) {

            //         uniqueRoleDict[LJid].push({LJid: LJid});
            //     }
            // }
                
                
                
                // //if it is a new LJ
                // if(!tempRoleDict[LJid]){
                //     var tempSkillDict ={};

                //     //if it is a new skills under that LJ
                //     if(! tempSkillDict[SkillId] ){
                //         tempSkillDict[SkillId]= {SkillId:SkillId, SkillName: SkillName}
                //         console.log(tempSkillDict)
                //     }
                //     tempRoleDict[LJid] ={role:LJroleName, skill:tempSkillDict}
                    
                //     this.AllRoles_dict.push({LJid: LJid, LJrole:LJroleName, skill:tempSkillDict, StaffId:StaffId,RoleId:RoleId })
                // }

                // //if LJ already exist but another skills & course
                // else{
                //     if(! tempSkillDict[SkillId] ){
                //         tempSkillDict[SkillId]= {SkillId:SkillId, SkillName: SkillName}
                                        
                //     }
                // }
                
            
        },
        getCourseDetails(LJdata){
            var tempCourselDict = {};
            for (let i=0; i<LJdata.length; i++){
                var LJid = LJdata[i].LJ_ID; 
                var SkillId = LJdata[i].Skill_ID; 
                var CourseId = LJdata[i].Course_ID; 
                var CourseName = LJdata[i].Course_Name;
                
                this.Allcourses_dict.push({LJid: LJid, SkillId:SkillId, CourseId:CourseId, CourseName:CourseName})

                
                // if(!tempCourselDict[CourseId]){
                //     tempCourselDict[CourseId] ={CourseName:CourseName}
                //     this.Allcourses_dict.push({LJid: LJid, SkillId:SkillId, CourseId:CourseId, CourseName:CourseName})
                // }
            }
            console.log("course",this.Allcourses_dict)
            return this.Allcourses_dict
        },
        getCompletionStatus(RegCourse){
            for (let i=0; i<RegCourse.length; i++){
                var Course_ID = RegCourse[i].Course_ID; 
                var Reg_Status = RegCourse[i].Reg_Status; 
                var Completion_Status = RegCourse[i].Completion_Status;

                for(let j=0; j<this.Allcourses_dict.length; j++){
                    if(this.Allcourses_dict[j].CourseId== Course_ID){
                        this.Allcourses_dict[j]['RegStatus']= Reg_Status
                        this.Allcourses_dict[j]['CompletionStatus']= Completion_Status
                            
                        
                    }
                }
            }
            //console.log(this.Allcourses_dict);
            return this.Allcourses_dict
        },
        getDataSend(LJid,StaffId,RoleId){
            this.lj_id = LJid;
            this.roleid = RoleId;
            this.staffid = StaffId,
            localStorage.setItem('data', [this.lj_id, this.staffid ,this.roleid ])

            window.location.href = "editLJ";
            this.lj_id = '';
            this.roleid = '';
        },
        deleteLJ(LJId, StaffId) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonColor: '#c7c6c5',
                confirmButtonColor: '#6A79F3',
              }).then((result) => {
                if (result.isConfirmed) {

                const url = "http://localhost/IS212-G6T2/public/db/deleteLJ.php"
                const data = {
                    LJ_ID: LJId,
                    Staff_ID: StaffId
                }
                
                axios.delete(url, {
                    params: data
                })
                .then(response => { 
                    
                    })
                .catch(error => {
                    this.status = 'There was an error: ' + error.message 
                }) 
                
                    swal.fire({title: "Deleted!", text: "Your learning journey has been deleted.", icon: 'success', type: 
                    "success", confirmButtonColor: '#6A79F3'}).then(function(){ 
                    location.reload();
                    }
                    )

                }
            })
        },
        getDataSendtoRole(){
            
            localStorage.clear()
            localStorage.setItem('createLJ', [this.staffid])

            window.location.href = "LJrole";
        },

    }

}
</script>

<template>
     <!-- upper portion display homepage -->
     <img  id= 'logo' src="../Icons/Logo(Purple).png">
     <User />
     <div class='row' style="padding-bottom: 10vw;" >
        <div class="row position-relative">
            <img src="../Icons/HomepageVector.png" id="homebgImg">
            <p id="TopHeader">
                <span style="color:black">Your</span> dream role <span style="color:black">is just a </span>learning journey <span style="color:black">away.</span>  
            </p>
            
            <p id="TopDesc">
                With Learning Journey Planner, you can explore thousands of learning journeys tailored to your preferences and needs. 
            </p> 
        </div>
        <div class="text-center" style="padding-top: 40vw;">
            <button class="button button1" @click="getDataSendtoRole()">Create Learning Journey</button>
        </div>
    </div>

     <!-- lower portion Create learning journey-->
     <div class='row'>
         <div>
            <img src="../Icons/Rectangle6.png" id="semiRecImg" >
            <img src="../Icons/HomepageBottom.png" id="HomeBottomImg" >
            <p id="BottomHeader">Your learning journeys</p>
        </div>

        <!-- Empty Data -->
        <div class="text-center" v-if="AllRoles_dict.length < 1">
            <p id="BottomDesc">Oh no! you do not have any learning journays at the moment :( </p>
            <button class="button" @click="getDataSendtoRole()">Create Learning Journey</button>
        </div>

        <!-- With Learning Journey Data -->
        <div v-else>
            <p id="BottomDesc">Feel free to edit your previously created learning journeys.</p>
            <div class="LJboxes" v-for="roles in AllRoles_dict">
                <div class="row" style="margin: auto; font-size: 1vw;">
                    <div class="col">
                        <span style="font-size:2vw"><strong>{{roles.LJrole}}</strong></span>
                    </div>
                    <div class="col col-1">
                        <span style="color: #4C5BDD;" @click="getDataSend(roles.LJid, roles.StaffId, roles.RoleId)">Edit</span>
                    </div>
                    <div class="col col-1">
                        <span @click="deleteLJ(roles.LJid, roles.StaffId)">Delete</span>
                    </div>
                    <strong>Chosen Skills & Courses: </strong> 
                    <div>
                        <ul v-for="skills in roles.skill">
                            
                            <li><b>Skill : </b>{{skills.SkillName}}&nbsp|&nbsp
                                
                                <strong>Courses: </strong> 
                                <span v-for="courses in Allcourses_dict">
                                    
                                    
                                    <span v-if="roles.LJid == courses.LJid && skills.SkillID==courses.SkillId">
                                        {{courses.CourseName}} &nbsp&nbsp
                                        <span class="badge rounded-pill" style="background-color: #5EE1AA" v-if="courses.CompletionStatus =='Completed'">Completed</span>&nbsp&nbsp
                                        <span class="badge rounded-pill" style="background-color: skyblue" v-else-if="courses.CompletionStatus =='OnGoing'">OnGoing</span>&nbsp&nbsp
                                        <span class="badge rounded-pill" style="background-color: red" v-else-if="courses.RegStatus=='Rejected'">Rejected</span>&nbsp&nbsp
                                        <span class="badge rounded-pill" style="background-color:  #919CF8" v-else-if="courses.RegStatus=='Registered'">Registered</span>&nbsp&nbsp
                                        <span class="badge rounded-pill" style="background-color: orange" v-else-if="courses.RegStatus=='Waitlist'">Waitlist</span>&nbsp&nbsp
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

img{
    position: absolute;
    width: 100%;
    height: auto;
    z-index: -1;
}

p{
    text-align: center;
}

#homebgImg {
    top: 12.8vw;
  }

#TopHeader {
    position: absolute;
    width: 55%;
    left: 23%;
    top: 15vw;
    font-weight: 600;
    font-size: 4.5vw;
    line-height: 5.5vw;
    color: #6A79F3;
} 

#TopDesc {
    position: absolute;
    width: 50%;
    height: 57px;
    left: 25%;
    top: 32.3vw;
    font-weight: 400;
    font-size: 1.5vw;
    line-height: 2vw;
} 

.button {
    border-radius: 40px;
    width: 16.5vw;
    height: 4vw;
    border:0px;
    font-size:1vw;
    font-weight: 500;
    background: white;
  }

.button1 {
    background: #4C5BDD;
    color: #FFFFFF;
}

#semiRecImg{
    height: 150%;
    right: 0.05%;
}

#HomeBottomImg{
    height: 6.3vw;
    left: 0px;
    top: 75vw;
}

#BottomHeader {
    font-weight: 600;
    font-size: 3.5vw;
    padding-top: 7vw;
    color: #FFFFFF;
} 

#BottomDesc {
    font-weight: 400;
    font-size: 1vw;
    color: #FFFFFF;
    padding-bottom: 3vw;
} 

.LJboxes {
    position: relative;
    width: 90%;
    margin: auto;
    margin-bottom: 2vw;
    background: #FFFFFF;
    border-radius: 10px;    
    padding: 2vw;
  }

</style>