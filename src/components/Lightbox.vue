<template>
  <div class="lightbox" v-if="detail">
    <button type="button" class="lightbox_close" @click="close">✕</button>
    <div class="lightbox_card">
      <div class="lightbox_card_titleBlock">
        <p class="lightbox_card_invNum">{{detail.invNum}}</p>
        <p class="lightbox_card_time">{{detail.time}}</p>
        <p class="lightbox_card_seller">{{detail.sellerName? detail.sellerName:'無店家資料'}}</p>
      </div>
      <table class="table">
        <tr>
          <th>品項</th>
          <th>數量</th>
          <th>單價</th>
          <th>小計</th>
        </tr>
        <template v-if="detail.details">
          <tr v-for="item in detail.details" :key="item.description">
            <td>{{item.description}}</td>
            <td>{{getNumSyntax(item.quantity)}}</td>
            <td>{{getNumSyntax(item.unitPrice)}}</td>
            <td>{{getNumSyntax(item.amount)}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" style="text-align: center; padding-top: 7px;">
            -  沒有明細資料 -<br>
            此張發票可能正在等待店家更新或驗證。
            </td>
          </tr>
        </template>
      </table>
      <footer class="lightbox_card_footer">
        <div>總金額</div>
        <div>{{amount}}</div>
      </footer>
    </div>
    <button v-if="detail.status === '驗證中'" class="deleteBtn" type="button" @click="deleteInvoice">
      <img class="deleteBtn_img" src="@/assets/images/Delete.png" alt="deleteIcon" />
      <span>刪除發票</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Lightbox',
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  data(){
    return{
      myId: this.id,
      detail: null,
    }
  },
  methods:{
    close(){
      this.$emit('closeLightbox')
    },
    deleteInvoice(){
      let vm = this
      console.log(vm.id)
      axios.delete(`http://localhost:3000/invoices/${vm.id}`)
      .then(res => {
        console.log(res)
        if(res.status === 200){
          this.$emit('deleteItem')
          this.$destroy();
          this.$el.parentNode.removeChild(this.$el);
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    async getDetail(id){
      this.showLightbox = true
      try {
        let data = await fetch(`http://localhost:3000/invoices/${id}`)
        if(!data.ok){
            throw Error('no data available')
        }
        this.detail = await data.json()
      } catch (err) {
        console.log(err.message)
      }
    },
    getNumSyntax(num){
      if(!num) return '--'
      if(num > 1000){
        return Math.floor(num/1000)+','+num%1000
      }else{
        return num
      }
    }
  },
  watch:{
    id(now){
      if(!now) return
      this.getDetail(now)
    }
  },
  computed:{
    amount(){
      return this.getNumSyntax(this.detail.amount)
    },

  }
}
</script>

<style lang="scss">
.lightbox{
  width: 900px;
  height: 100%;
  position: fixed;
  background-color: rgba(55, 55, 90, 0.9);
  z-index: 1;
  // p{
  //   margin: 0;
  // }
  &_close{
    position: absolute;
    left: calc(50% - 40px/2 + 140px);
    top: calc(50% - 40px/2 - 271px);
    color: white;
    width: 40px;
    height: 40px;
  }
  &_card{
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 340px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    &_titleBlock{
      padding: 10px;
      text-align: center;
    }
    &_invNum{
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      color: #37375A;
      margin: 0;
    }
    &_time{
      font-size: 12px;
      line-height: 18px;
      color: #999999;
      margin: 2px 0;
    }
    &_seller{
      font-size: 12px;
      line-height: 18px;
      color: #5A5A78;
      margin: 0;
    }
    &_footer{
      display: flex;
      justify-content: space-between;
      padding: 10.5px 22.5px;
      font-weight: normal;
      font-size: 12px;
      line-height: 28px;
      color: #999999;
      border-top: 1px solid #E0E0E0;
      position: fixed;
      bottom: 0;
      left: 0;
      height: 50px;
      width: 340px;
    }
  }
}

.table{
  width: 100%;
  border-collapse:collapse;

  th:nth-child(1), td:nth-child(1){
    padding-left: 5px;
    text-align: start;
  }

  tr:nth-child(2){
    margin-top: 4px;
  }


  th{
    background-color:#F2F2F2;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #999999;
    height: 30px;
  }

  td{
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #999999;
    text-align: center;
    height: 30px;
  }
}

.deleteBtn{
  color: white;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  position: absolute;
  width: 75px;
  height: 30px;
  left: calc(50% - 75px/2 - 132px);
  top: calc(50% - 30px/2 + 270px);

  &_img{
    margin-right: 2px;
  }
}

</style>
