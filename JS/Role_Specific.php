<?php
echo 
"<div class='RoleInfo' style='margin-top:41px; padding: 0px 0px 0px 0px'>
    <div class='row'>
        <div class='col'>
            <img src='../Icons/Skills Image.png'>
        </div>
        <div class='col-lg-7' style='margin:auto'>
            <div class='card-body'>
                <div class='card-text'>
                    <h1 style='font-family: Inter; font-weight: 550; font-size: 25px;'>User Interface Design</h1>
                    <p style='display: inline-block; font-family: Inter; font-weight: 500;'>Type of Skills: &nbsp;</p><p style='display: inline-block;'>Technical</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style='display: inline-block; font-family: Inter; font-weight: 500;'>Competency level: &nbsp;</p><p style='display: inline-block;'>Intermediate</p><br>

                    <!-- this we will do the for loop -->
                        <div class='form-check' style='display:inline-block; margin-top: 20px'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
                            <label class='form-check-label' for='flexCheckDefault'>
                            User Experience Design 
                            </label>
                            <img src= '../Icons/MoreInfo.png' style='margin-left: 5px'  data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
                            
                            <!-- Modal -->
                            <div class='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                                <div class='modal-dialog modal-dialog-scrollable'>
                                <div class='modal-content'>
                                    <div class='modal-header'>
                                    <h5 class='modal-title' id='staticBackdropLabel'>IS213: User Experience Design</h5>
                                    <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                    </div>
                                    <div class='modal-body'>
                                        With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your preference and needs. ousands of learning journeys tailored to your preferences and needs.  With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your
                                        preferences and needs. ousands of learning journeys tailored to your preferences and needs. 
                                        you can explore the With Learning Journey Planner, you can explore thousands of learning journeys.
                                        With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your preference and needs. ousands of learning journeys tailored to your preferences and needs.  With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your
                                        preferences and needs. ousands of learning journeys tailored to your preferences and needs. 
                                        you can explore the With Learning Journey Planner, you can explore thousands of learning journeys.
                                        With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your preference and needs. ousands of learning journeys tailored to your preferences and needs.  With Learning Journey Planner, you can explore the With Learning Journey Planner, you can explore thousands of learning journeys tailored to your
                                        preferences and needs. ousands of learning journeys tailored to your preferences and needs. 
                                        you can explore the With Learning Journey Planner, you can explore thousands of learning journeys.
                                    </div>
                                    <div class='modal-footer'>
                                    <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        

                        <div class='form-check' style='display:inline-block; margin-top: 20px; margin-left: 50px;'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
                            <label class='form-check-label' for='flexCheckDefault'>
                            User Experience Design 
                            </label>
                            <img src= '../Icons/MoreInfo.png' style='margin-left: 5px'>
                        </div><br>

                        <div class='form-check' style='display:inline-block; margin-top: 20px'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
                            <label class='form-check-label' for='flexCheckDefault'>
                            User Experience Design 
                            </label>
                            <img src= '../Icons/MoreInfo.png' style='margin-left: 5px'>
                        </div>

                        <div class='form-check' style='display:inline-block; margin-top: 20px;  margin-left: 50px;'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
                            <label class='form-check-label' for='flexCheckDefault'>
                            User Experience Design 
                            </label>
                            <img src= '../Icons/MoreInfo.png' style='margin-left: 5px'>
                        </div><br>
                    
                        <div class='form-check' style='display:inline-block; margin-top: 20px'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
                            <label class='form-check-label' for='flexCheckDefault'>
                            User Experience Design 
                            </label>
                            <img src= '../Icons/MoreInfo.png' style='margin-left: 5px'>
                        </div>


                </div>
            </div>
        </div>
    </div>
</div>";
?>
<script>
function reqListener () {
    console.log(this.responseText);
  }

  var oReq = new XMLHttpRequest(); // New request object
  oReq.onload = function() {
      // This is where you handle what to do with the response.
      // The actual data is found on this.responseText
      console.log(this.responseText); // Will alert: 42
      //insert for loop to populate skills and courses
      console.log(this.responseText.length)
  };
  oReq.open("get", "../db/getLJRoleDetails.php", true);
  //                               ^ Don't block the rest of the execution.
  //                                 Don't wait until the request finishes to
  //                                 continue.
  oReq.send();
</script>