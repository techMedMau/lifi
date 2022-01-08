<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
*{
  box-sizing: border-box;
  font-family: 'Noto Sans TC';
}

ul{
  list-style-type: none;
  padding: 0;
}

a{
 text-decoration: none;
}

button{
  border: none;
  background-color: transparent;
}

.container{
  width: 900px;
  margin: 0 auto;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
