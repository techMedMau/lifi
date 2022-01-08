<template>
  <div class="container">
    <header class="header">
     <div class="img_outer">
      <img class="img_resp" src="@/assets/images/LOGO.png" alt="logo" width="167" height="41"/>
     </div>
    </header>
    <main class="main">
      <div class="info">
        <h3 class="info_date">{{year}}年{{month}}月</h3>
        <p class="info_overall">共{{totalItems}}張,總金額{{totalExpense}}元</p>
      </div>
      <div>
        <invoice @click.native="getDetail(item.id)" v-for="item in invoices" :key="item.id" :invoice="item"/>
      </div>
    </main>
    <!-- <button @click="test">test</button> -->
    <nav class="nav container">
      <ul class="nav_items">
        <li class="nav_item"><button class="nav_item_btn" type="button">掃描輸入</button></li>
        <li class="nav_item">
          <button class="nav_item_btn" type="button">
            <router-link class="nav_item_btn" to="/create">手輸發票</router-link>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Invoice from '../components/InvoiceItem.vue'
import InputBlock from './InputBlock.vue'

export default {
  name: 'Main',
  components: { Invoice, InputBlock },
  data(){
    return{
      invoices: null,
      detail: null,
    }
  },
  created(){
    this.load()
  },
  methods: {
    async load(){
      try {
        let data = await fetch('http://localhost:3000/invoices')
        if(!data.ok){
            throw Error('no data available')
        }
        this.invoices = await data.json()
        this.invoices.sort((a, b)=>{
          return Date.parse(b.time) - Date.parse(a.time)
        })
        this.$store.dispatch('getInitialId', this.invoices[0].id)
      } catch (err) {
        console.log(err.message)
      }
    },
    test(id){
      console.log(id)
    },
    async getDetail(id){
      try {
        let data = await fetch(`http://localhost:3000/invoices/${id}`)
        if(!data.ok){
            throw Error('no data available')
        }
        console.log(await data.json())

      } catch (err) {
        console.log(err.message)
      }
    }
  },
  mounted(){
  },
  watch: {
  },
  computed: {
    month(){
      if(!this.invoices) return
      return this.invoices[0].time.substring(5,7)
    },
    year(){
      if(!this.invoices) return
      return this.invoices[0].time.substring(0,4) - 1911
    },
    totalExpense(){
      if(!this.invoices) return
      const sum = this.invoices.reduce((acc, cur)=>{
        if(cur.amount) return cur.amount+acc
        return acc
      },0)
      if(sum > 1000){
        return Math.floor(sum/1000)+','+sum%1000
      }else{
        return sum
      }
    },
    totalItems(){
      if(!this.invoices) return
      if(this.invoices.length > 1000){
        return Math.floor(this.invoices.length/1000)+','+this.invoices.length%1000
      }else{
        return this.invoices.length
      }
    }
  }
}
</script>

<style lang="scss">

.header{
  width: 100%;
  height: 120px;
  background-color: #FFCE33;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img{
  &_outer{
    width: 167px;
    height: 40px;
  }
  &_resp{
    display: block;
    height: 100%;
  }
}

.info{
  text-align: center;
  background-color: white;
  padding: 10px;
  &_date{
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #37375A;
    line-height: 27px;
  }
  &_overall{
    margin: 1px 0 0 0;
    font-size: 14px;
    color: #51519B;
    line-height: 21px;
  }
}

.nav{
  box-shadow: 0px -1px 0px #E0E0E0;
  position: fixed;
  background-color: white;
  bottom: 0;
  // width: 900px;
  &_items{
    display: flex;
    height: 59px;
    margin: 0;
  }
  &_item{
    width: 50%;
    height: 100%;
    &_btn{
      width: 100%;
      margin-top: 16px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #5A5A78
    }
  }
}
.main{
  margin-bottom: 59px;
}
</style>
