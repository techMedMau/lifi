<template>
  <div class="container inputBlock">
    <header class="inputBlock_header">
      <router-link to="/" class="inputBlock_header_arrowLeft"></router-link>
      <p class="inputBlock_header_title">手動輸入發票</p>
    </header>
    <div class="inputBlock_form">
      <div>
        <p>發票號碼</p>
        <div class="inputBlock_form_num">
          <input v-model="invNumEng" class="w110" type="text" placeholder="大寫英文" oninput="value=value.replace(/[^A-Z]/g,'')" maxlength="2">
          <input v-model="invNumNum" class="w200" type="text" placeholder="8碼發票號碼" oninput="value=value.replace(/[^\d]/g,'')" maxlength="8">
        </div>
      </div>
      <div>
        <p>開立時間</p>
        <div class="inputBlock_form_date">
          <input v-model="year" class="w110" type="text" placeholder="西元年" oninput="value=value.replace(/[^\d]/g,'')" maxlength="4"/>
          <input v-model="month" class="w95" type="text" placeholder="月份" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2"/>
          <input v-model="day" class="w95" type="text" placeholder="日期" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2"/>
        </div>
      </div>
     <button class="inputBlock_form_submit" type="button" @click="createNewInvoice">提交</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'InputBlock',
  data(){
    return {
      year: '',
      month: '',
      day: '',
      invNumEng: '',
      invNumNum: '',
    }
  },
  methods:{
    test(){
    },
    resetInputs(){
      this.year = ''
      this.month = ''
      this.day = ''
      this.invNumEng = ''
      this.invNumNum = ''
    },
    createNewInvoice(){
      axios.post('http://localhost:3000/invoices', {
        "id": this.$store.state.id,
        "invNum": this.invNumEng+this.invNumNum,
        "status": "驗證中",
        "time": this.year+"-"+this.month+"-"+this.day+" 00:00:00",
        "type": 1
      })
      .then(res => {
        console.log(res.data);
        this.resetInputs();
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
.inputBlock{
  & p{
    margin: 0;
    color: #5A5A78;
    font-size: 14px;
    line-height: 30px;
    height: 30px;
  }
  input{
    border: 1px solid #E0E0E0;
    color: #9191A0;
    height: 36px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 5px;
    text-align: center;
    margin: 7px 0;
    & + & {
      margin-left: 10px;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
  &_header{
    height: 45px;
    background-color: #FFCE33;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &_arrowLeft {
      position: absolute;
      top: 18px;
      left: 23px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right:6px solid white;
    }
    &_title{
      font-size: 14px;
      line-height: 21px;
      color: #37375A;
    }
  }
  &_form{
    padding-top: 20px;
    padding-left: 28px;
    padding-right: 27px;
    width: 375px;
    margin: 0 auto;
    &_date, &_num{
      display: flex;
      justify-content: space-between;
    }
    &_submit{
      width: 160px;
      height: 40px;
      background: #FFCE33;
      border-radius: 5px;
      font-size: 14px;
      line-height: 21px;
      color: #37375A;
      display: block;
      margin: 40px auto 0 auto;
    }
  }
}

.w95{
  width: 95px;
}

.w110{
  width: 110px;
}

.w200{
  width: 200px;
}
</style>
