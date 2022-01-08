<template>
  <div class="invoice">
    <div>
      <p>{{date}}</p>
      <div></div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  props:{
    invoice: {
      type: Object,
      required: true,
    }
  },
  name: 'Invoice',
  data(){
    return {

    }
  },
  mounted(){
    // console.log(this.invoice)
  },
  computed:{
    date(){
      return this.invoice.time.split('-')[1]+'/'+this.invoice.time.substring(8,10)
    }
  }
}
</script>

<style>
.invoice{
  width: 100%;
  background-color: white;
  padding: 12px 10px 13px 8px;
}
</style>
