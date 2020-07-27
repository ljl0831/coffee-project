<template>
  <div id="app">
    

<!-- //一级路由插座 -->
<router-view></router-view>
  </div>
</template>
<script>



export default {

  
  
};


</script>

  

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  background: skyblue; 
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
.auto-img{
   width: 100%;
    display: block;
}



</style>
