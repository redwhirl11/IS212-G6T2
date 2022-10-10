function getAllRoles(){
    var url = "../db/getAllRoles.php"
    axios.get(url).
    then(response => {
        console.log(response.data)
        const key = 'LJRole_Name';
        const arrayUniqueByKey = [...new Map(response.data.map(item =>[item[key], item])).values()];    
        console.log('here',arrayUniqueByKey)
        var card = '';
        for (i=0; i<arrayUniqueByKey.length; i++) {
          console.log(arrayUniqueByKey[i])
          card += 
          `<div class="col-sm-6 col-lg-4">
            <div class="card">
              <img class="card-img-top" src=" ${arrayUniqueByKey[i].LJRole_img} " alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title"> ${arrayUniqueByKey[i].LJRole_Name} </h5>
                  <p class="card-text">${arrayUniqueByKey[i].Key_Task}</p>
                  <a href="Role_Specific.html?index=${i}" class="btn btn-primary" id="styled">View More</a>
                </div>
            </div>
          </div>`
        }

        document.getElementsByClassName('row')[0].innerHTML = card 

    })
    .catch(error => {
        console.log(error.message)
    })

  }
