<template>
    <img id='logo' src="../Icons/Component1.png">
    <div style="background:#6A79F3;">
        <div class="row position-relative">
            <div class="row my-3">
                <img src="../Icons/Vector1.png" alt="background" class="responsive" >
                <p class="h1 position-absolute top-50 start-50 translate-middle" id="Header">
                    {{msg}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: "Header",
    props: {
        msg: {
        type: String,
        },
    },
    };
</script>
