<script>
    import Header from "../components/Header.vue";

    export default {
        name: "hrHome",
        components: {
            Header,
            },
        data() {
        return {
            msg: "Please select a feature to start:",
        };
        }
    };

</script>

<!-- hr home page -->
<template >
    <Header :msg="msg" />
    <div class="row mt-4 ">
        <div class="col-sm-1"></div>
        <div class="col-lg-5 col-sm-5 mt-2">
            <div class="card">
                <!-- change the link to the correct page -->
                <a href="hrRole">
                    <div class="card-body">
                        <h4 class="card-title">Edit Roles</h4>
                        <img src="../images/editrole.jpg" class="img-fluid" alt="">
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
                        <img src="../images/editskill.jpg" class="img-fluid" alt="">
                    </div>
                </a>
            </div>
        </div>
        <div class="col-sm-1"></div>

    </div>
</template>

