function getAllRoles(){
    var url = "../db/getAllRoles.php"
    axios.get(url).
    then(response => {
        console.log(response)

        if (response.data.length == 0) {
          alert('No results found')
        } else {
          
          const key = 'LJRole_Name';
          const arrayUniqueByKey = [...new Map(response.data.map(item =>[item[key], item])).values()];    
          console.log('here',arrayUniqueByKey)
          
          var card = '';
          for (i=0; i<arrayUniqueByKey.length; i++) {
            console.log(arrayUniqueByKey[i].LJRole_ID)

            card += 
            `<div class="col-lg-4 col-md-4 col-sm-6">
              <div class="card">
                <img class="card-img-top" src=" ${arrayUniqueByKey[i].LJRole_img} " alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title"> ${arrayUniqueByKey[i].LJRole_Name} </h5>
                    <p class="card-text">${arrayUniqueByKey[i].Key_Task}</p>
                    <a href="createLJ.html?roleID=${arrayUniqueByKey[i].LJRole_ID}" class="btn btn-primary" id="styled" onClick="populateHeader(${arrayUniqueByKey[i].LJRole_ID})">View More</a>
                  </div>
              </div>
            </div>`
          }

          document.getElementsByClassName('row')[0].innerHTML = card 
        }
    })
    .catch(error => {
        console.log(error.message)
    })

  }
