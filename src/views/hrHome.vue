<!-- <script setup>
import hrRole from "../components/hrRole.vue";
</script> -->

<!-- hr home page -->
<template>
    <div class="row" style="background:#6A79F3;">
        <div class="row position-relative">
            <div class="row my-5">
                <div class="col-lg-10 col-md-9"><img id='logo' src="../Icons/Component 1.png"></div>
                <span class="col-lg col-md fs-5 fw-bold" style="color:white">Welcome, Jack </span>
            </div>
            <img src="../Icons/Vector 1.png" alt="background">
            <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                Please select a feature to start:
            </p>
        </div>
    </div>
    <div class="row mt-4 ">
        <div class="col-sm-1"></div>
        <div class="col-lg-5 col-sm-5 mt-2">
            <div class="card">
                <!-- change the link to the correct page -->
                <a href="hrRole">
                    <div class="card-body">
                        <h4 class="card-title">Edit Roles</h4>
                        <img src="../images/edit role.jpg" class="img-fluid" alt="">
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-5 col-sm-5 mt-2">
            <div class="card">
                <!-- change the link to the correct page -->
                <a href="hrSkill">
                    <div class="card-body">
                        <h4 class="card-title">Edit Skills</h4>
                        <img src="../images/edit skill.jpg" class="img-fluid" alt="">
                    </div>
                </a>
            </div>
        </div>
        <div class="col-sm-1"></div>

    </div>
</template>

