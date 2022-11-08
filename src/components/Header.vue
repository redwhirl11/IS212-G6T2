<template>
    <img id='logo' src="../Icons/Component1.png">
    <User />
    <div class="row" style="background:#6A79F3;">
        <div class="row position-relative">
            <img src="../Icons/Vector1.png" alt="background" >
            <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                {{action}}{{msg}}  <br class="rwd-break"> {{dept}}{{deptData}}
            </p>
        </div>
    </div>
</template>

<script>
import User from "../components/user.vue";

    export default {
    name: "Header",
    components: {
        User,
        },
    props: {
        msg: {
        type: String,
        },
        action:{
            type:String,
        },
        dept: {
        type: String,
        },
        deptData:{
            type:String,
        },

    }
    };
</script>



<style scoped>

.rwd-break { line-height: 10% }
@media screen and (min-width: 768px){
            .rwd-break { line-height: 200% }
        }

</style>