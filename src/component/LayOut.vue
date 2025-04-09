<template>
    <div 
      :class="`mycontainer p-2 flex justify-center items-center w-screen h-screen relative bg-cover `"
    >
    <div
      class="absolute top-4 left-10 w-10 h-10"
      :style="{
        backgroundImage: `url(${require('../assets/icons/taiSan/TaiSan.png')})`,
        backgroundSize: 'cover'
      }"
    ></div>
        <router-view></router-view>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'LayOut',
    data() {
      return {

      };
    }
  }
  </script>
  
  <style scoped>
  /* 如果需要额外的样式，可以在这里添加 */
  .mycontainer{
    background-image: url('../assets/image/bg_1.png');
    background-size: 100% 100%;
    min-width: 1400px;
    /* background: rgba(76, 161, 247, 0.4); */
    /* background: linear-gradient(to bottom,rgba(34,170,244,0.5),rgba(34,170,244,0.1)); */
}
.main{
    height: 95%;
    border-radius: 20px;
}
.title{
    height: 5%;
}
  </style>