
<template>
    <div class="topright">
        <a href="/">
            <img src="../Icons/user.png" class="img-fluid" alt="user">
        </a>
    </div>
</template>

<script>
  export default {name: "User"}
</script>

<style>

.topright {
  position: absolute;
  top: 3vh;
  right: 2vw;
  width: 3vw;
  z-index:100
  
}
@media screen and (max-width: 900px) {
  .topright {
    position: absolute;
    top: 2vh;
    right: 20px;
    width: 5vw;
    }
}

</style>
