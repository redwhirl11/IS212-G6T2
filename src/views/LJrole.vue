<script>
import axios from 'axios';
import Header from "../components/Header.vue";

export default{
  name: 'LJrole', 
  components: {
            Header,
            },
  props:{
    error: {
        type: String,
        default: ""
      },
    search_data:{
        type: String,
        default: ""
    },
    check_html:{
      type: Boolean,
      default: true
    },
    Role_dict:{
      type: Array,
      default: []
    },
    in_DB:{
      type: Boolean,
      default: true
    }
  
  },
  data(){
    return{
      errorm: this.error,
      search_doc: this.search_data,
      blank: false,
      role_name: this.Role_dict,
      in_db: this.in_DB,
      alldata_dict: []
    }
  },

  mounted:function(){
    var url = "http://localhost/IS212-G6T2/public/db/getAllRoles.php"
    axios.get(url).
    then(response => {
        // console.log(response.data)

        if (response.data.length == 0) {
          alert('No results found')
        } else {
          
          const key = 'LJRole_Name';
          const arrayUniqueByKey = [...new Map(response.data.map(item =>[item[key], item])).values()];   
          this.alldata_dict = arrayUniqueByKey;
          
          
          var card = '';
          for (let i=0; i<arrayUniqueByKey.length; i++) {
            // console.log(arrayUniqueByKey[i].LJRole_ID);
            

            card += 
            `<div class="col-lg-4 col-md-4 col-sm-6 role-cards">
              <div class="card">
                <img class="card-img-top" src="http://localhost/IS212-G6T2/src/Icons/role.jpg" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title"> ${arrayUniqueByKey[i].LJRole_Name} </h5>
                    <p class="card-text">${arrayUniqueByKey[i].Key_Task}</p>
                    <a href="createLJ?roleID=${arrayUniqueByKey[i].LJRole_ID}" class="btn btn-primary" id="styled" >View More</a>
                  </div>
              </div>
            </div>`
          }

          document.getElementsByClassName('row')[0].innerHTML = card 
        }
    })
    .catch(error => {
        //console.log(error.message)
    })
    
    this.searchRole()
    // this.getErrorMessage()
  },
  created(){
    var url = "http://localhost/IS212-G6T2/public/db/getAllRoles.php"
    axios.get(url).
      then(response => {
        this.alldata_dict = response.data
        
      })
  },
  

  methods: {
        searchRole() { 
          
            // Declare variables
            var input, filter, li, a, i, txtValue;
            input = document.getElementById('search-bar');

          
            //check the search bar is not empty == user did input value
            if (this.check_html == true){
              var input_value = input.value;
              filter = input_value.toUpperCase();
              
            }
            
            
            li = document.getElementsByClassName('role-cards');

            var count= 0;
            // console.log(this.in_db)
            // console.log(this.errorm)
            
            
            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByClassName("card-title")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                } else {
                li[i].style.display = "none";
                count +=1
                }
            }
            // console.log(this.alldata_dict)
            if (this.alldata_dict!=0){           
              if(count == this.alldata_dict.length){
                this.in_db = false
                this.getErrorMessage();
              }else{
                this.in_db = true;
                this.errorm = '';
              }
            }
            // console.log(this.alldata_dict.length)
            // console.log(this.in_db)
            // console.log(this.errorm)
            
            
        },
        getErrorMessage(){
          if (this.in_db == false){
            this.errorm = "Sorry... No record found! :("
          }
          
        }
  }

} 
</script>

<template>
    <!-- <Header msg="Step 1:  Select a job role that you are interested in " /> -->

    <div class='container-fluid' id="myHeader">
        <img id= 'logo' src="../Icons/Component1.png">
        <img src="../Icons/Vector1.png" alt="Nature" class="responsive">

        <div class="container-fluid" id="container1" >
            <div class="h1" id="Header">
                Step 1:  Select a job role that you are interested in 
            </div>
            
            <input class="form-control" id="search-bar" type="text" placeholder="For E.g. Business Analyst, Operations Manager" v-on:keyup="searchRole()">
            
            <span ><a href=""><img src="../images/searchicon.png" id="search-icon" alt=""></a></span>
            <span><a href=""><img src="../images/Filterlist.png" id="filterlist-icon" alt=""></a></span>
            <button type="button" class="btn btn-light" id="back-btn" onclick="history.back()">Back</button>
        </div>
       
        
        

    </div>
   


    <div class="container" id="content">
        
        <div class="row"></div>
        <span style="font-weight: bold; font-size: 36px; text-align: center;">{{errorm}}</span>
    </div>

</template>

<style scoped>
#myHeader {
  position: absolute;
  width: 100%;
  height: 626px;
  left: 0px;
  top: 0px;
  background: #6A79F3;
} 

#Header {
position: absolute;
width: 748px;
height: 227px;
left: 381px;
top: 168px;

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 50px;
line-height: 61px;
text-align: center;
letter-spacing: 0.01em;

color: #FFFFFF;
} 

.responsive {
  position: absolute;
  width: 100%;
  height: auto;
  top: 95px;
  left: 0px;
}


#logo {
  position: absolute;
  left: 77px;
  top: 35.2px;
  width: 51.35px;
  height: 34.8px;
}

#search-bar {
  position: absolute;
  width: 663px;
  height: 68px;
  left: 419px;
  top: 355px;
  
  background: #4C5BDD;
  border-radius: 40px;
  border-color: #4C5BDD;

  color: #FFFFFF;

}

#search-bar::placeholder{

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  
  color: #FFFFFF;
}

#search-icon{
  position: absolute;
  width: 36px;
  height: 36px;
  left: 966px;
  top: 372px;    
}

#filterlist-icon{
  position: absolute;
  width: 40px;
  height: 40px;
  left: 1014px;
  top: 370px;
}

#back-btn{
  position: absolute;
  width: 119px;
  height: 56px;
  left: 1318px;
  top: 34px;

  background: #FFFFFF;
  border-radius: 40px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 1000;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.01em;
}

#content{
  position: absolute;
  top: 539px ;
  left: 76px;
  right: 75px;
}

.col-lg-4.col-md-4.col-sm-6{
  box-sizing: border-box;

  margin: 0px 24px 32px 0px ;
  width: 412px !important;
  height: 730px !important;
  /* height: 698px !important; */
  padding-left: 0 !important;
  padding-right: 0 !important;

  background: #FFFFFF;
  border: 1px solid #E4EBFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}


.card-img-top{
  width: 412px;
  height: 395px;
}

.card-body{
  height: 335px;
  padding: 26px 33px 37px !important;
}

.card-title{

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.01em;

  color: #000000;
}

.card-text{
  margin-top: 21px;
  margin-bottom: 47px;
  
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.01em;
  min-height: 114px;
  color: #000000;
}

#styled{
  width: 340px;
  height: 64px;
  line-height: 50px;
  
  background: #4C5BDD;
  border-radius: 5px;
}

@media all and (max-width: 1312px){
  .row{
    width: fit-content;
  }

  #back-btn {
    display:inline-block;
    left: calc(100% - 220px);;
  }

  #Header {
    position: absolute;
    width: 748px;
    height: 227px;
    left: 280px;
    top: 168px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 61px;
    text-align: center;
    letter-spacing: 0.01em;
    
    color: #FFFFFF;
    } 

    #search-bar {
      position: absolute;
      width: 663px;
      height: 68px;
      left: 320px;
      top: 355px;
      
      background: #4C5BDD;
      border-radius: 40px;
      border-color: #4C5BDD;
  
      color: #FFFFFF;
  
    }

    #search-icon{
      position: absolute;
      width: 36px;
      height: 36px;
      left: 875px;
      top: 372px;    
    }
  
    #filterlist-icon{
      position: absolute;
      width: 40px;
      height: 40px;
      left: 920px;
      top: 370px;
    }

    .col-lg-4.col-md-4.col-sm-6{
      box-sizing: border-box;
  
      margin: 0px 24px 32px 0px ;
      width: 353px !important;
      height: 730px !important;
      /* height: 698px !important; */
      padding-left: 0 !important;
      padding-right: 0 !important;
  
      background: #FFFFFF;
      border: 1px solid #E4EBFF;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    .card-body{
      height: 335px;
      padding: 20px 20px 20px !important;
    }

    .card-text{
      height: 133px;
      margin-top: 21px;
      margin-bottom: 20px;
      
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.01em;
      min-height: 114px;
      color: #000000;
    }

    #styled{
      width: 309px;
      height: 64px;
      line-height: 50px;
      
      background: #4C5BDD;
      border-radius: 5px;


  }
}


</style>