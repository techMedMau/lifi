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

.invoice_tag{
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  border-radius: 8px;
  width: 36px;
  height: 16px;
}
</style>
