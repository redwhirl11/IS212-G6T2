function getAllRoles(){
    var url = "../db/getAllRoles.php"
    axios.get(url).
    then(response => {
        console.log(response.data)
        var card = '';
        for (i=0; i<response.data.length; i++) {
          card += 
          `<div class="col-sm-6 col-lg-4">
            <div class="card">
              <img class="card-img-top" src=" ${response.data[i].LJRole_img} " alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title"> ${response.data[i].LJRole_Name} </h5>
                  <p class="card-text">${response.data[i].Key_Task}</p>
                  <a href="#" class="btn btn-primary" id="styled" onClick="populateHeader(${i})">View More</a>
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

function populateHeader(index) {
    console.log(index)
    var url = "../db/getAllRoles.php"
    axios.get(url).
    then(response => {
        console.log(response.data[index])
    })
}